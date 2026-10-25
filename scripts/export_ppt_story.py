#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
import shutil
import sys
import zipfile
from collections import Counter
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterable
from xml.etree import ElementTree as ET

PML_NS = "http://schemas.openxmlformats.org/presentationml/2006/main"
DML_NS = "http://schemas.openxmlformats.org/drawingml/2006/main"
REL_NS = "http://schemas.openxmlformats.org/package/2006/relationships"
OFFICE_REL_NS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"

NS = {
    "p": PML_NS,
    "a": DML_NS,
    "rel": REL_NS,
    "r": OFFICE_REL_NS,
}

SUPPORTED_IMAGE_EXTS = {"png", "jpg", "jpeg", "svg", "gif"}


def _slugify(name: str) -> str:
    name = name.strip().lower()
    name = re.sub(r"\s+", "-", name)
    name = re.sub(r"[^a-z0-9\u4e00-\u9fff\-_.]+", "", name)
    return name or "showcase"


def _clean_text(s: str) -> str:
    return re.sub(r"\s+", " ", (s or "")).strip()


def _is_noise_line(line: str) -> bool:
    t = _clean_text(line)
    if not t:
        return True
    if len(t) <= 1:
        return True
    if re.fullmatch(r"[\d\W_]+", t):
        return True
    return False


def _cmd_exists(cmd: str) -> bool:
    return shutil.which(cmd) is not None


def _infer_tags(text: str) -> list[str]:
    t = text.lower()
    tags: list[str] = []

    def has_any(words: Iterable[str]) -> bool:
        return any(w.lower() in t for w in words)

    if has_any(["感谢观看", "thank"]):
        tags.append("closing")
    if has_any(["财务", "股权", "融资稀释", "净利率", "roe", "期权池"]):
        tags.append("sensitive_finance")
    if has_any(["顾问", "团队", "创始", "董事长", "教授", "fellow"]):
        tags.append("team")
    if has_any(["痛点", "成本", "门槛", "周期长", "同质", "难题", "瓶颈"]):
        tags.append("problem")
    if has_any(["市场", "规模", "蓝海", "需求", "用户", "消费"]):
        tags.append("market")
    if has_any(["政策", "十四五", "规划", "国家", "税收", "财政支持"]):
        tags.append("policy")
    if has_any(["解决方案", "方案", "平台", "赋能", "一体化", "端到端"]):
        tags.append("solution")
    if has_any(["aigc", "大模型", "核心技术", "算法", "跨模态", "模型统一"]):
        tags.append("tech")
    if has_any(["产品介绍", "模块", "在线设计器", "远程操控", "实时监控"]):
        tags.append("product")
    if has_any(["盈利", "定价", "订阅", "套餐", "按需打印"]):
        tags.append("pricing")
    if has_any(["社会价值", "文化传承", "公共教育", "普惠"]):
        tags.append("impact")
    if has_any(["未来规划", "路线", "2026", "2027", "全球布局", "白皮书"]):
        tags.append("roadmap")

    if not tags:
        tags.append("misc")
    return sorted(set(tags))


@dataclass
class SlideText:
    title_lines: list[str]
    subtitle_lines: list[str]
    body_lines: list[str]
    other_lines: list[str]


def _gather_paragraph_lines(node: ET.Element) -> list[str]:
    lines: list[str] = []
    for p in node.findall(".//a:p", NS):
        chunks = []
        for t in p.findall(".//a:t", NS):
            if t.text:
                chunks.append(t.text)
        line = _clean_text("".join(chunks))
        if not _is_noise_line(line):
            lines.append(line)
    return lines


def extract_slide_text(root: ET.Element) -> SlideText:
    title_lines: list[str] = []
    subtitle_lines: list[str] = []
    body_lines: list[str] = []
    other_lines: list[str] = []

    for sp in root.findall(".//p:sp", NS):
        tx_body = sp.find("p:txBody", NS)
        if tx_body is None:
            continue

        lines = _gather_paragraph_lines(tx_body)
        if not lines:
            continue

        ph = sp.find("p:nvSpPr/p:nvPr/p:ph", NS)
        ph_type = ph.attrib.get("type") if ph is not None else ""

        if ph_type in {"title", "ctrTitle"}:
            title_lines.extend(lines)
        elif ph_type == "subTitle":
            subtitle_lines.extend(lines)
        elif ph_type in {"body", "obj"}:
            body_lines.extend(lines)
        else:
            other_lines.extend(lines)

    return SlideText(
        title_lines=title_lines,
        subtitle_lines=subtitle_lines,
        body_lines=body_lines,
        other_lines=other_lines,
    )


def extract_slide_images(
    root: ET.Element, rels: dict[str, tuple[str, str]]
) -> list[str]:
    embeds: list[str] = []
    for blip in root.findall(".//a:blip", NS):
        rid = blip.attrib.get(f"{{{OFFICE_REL_NS}}}embed")
        if rid:
            embeds.append(rid)

    targets: list[str] = []
    for rid in embeds:
        target, rtype = rels.get(rid, ("", ""))
        if not target or "/image" not in rtype:
            continue
        # target like "../media/image55.png"
        normalized = ("ppt/" + target.replace("..", "").lstrip("/")).replace("ppt//", "ppt/")
        targets.append(normalized)

    # stable unique
    seen: set[str] = set()
    out: list[str] = []
    for t in targets:
        if t in seen:
            continue
        seen.add(t)
        out.append(t)
    return out


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Extract PPTX images + structured text for a curated marketing page (no slide screenshots)."
    )
    parser.add_argument("pptx", type=str, help="Path to .pptx file")
    parser.add_argument(
        "--out",
        type=str,
        default="public/showcase",
        help="Output base directory (default: public/showcase)",
    )
    parser.add_argument(
        "--slug",
        type=str,
        default="",
        help="Subfolder name under --out (default: slugified PPTX filename)",
    )
    parser.add_argument(
        "--exclude-tags",
        type=str,
        default="sensitive_finance,team,closing",
        help="Comma-separated tags to exclude from export (default: sensitive_finance,team,closing)",
    )
    parser.add_argument(
        "--max-images",
        type=int,
        default=2,
        help="Max extracted images per slide (default: 2)",
    )
    parser.add_argument(
        "--image-frequency-threshold",
        type=int,
        default=3,
        help="Ignore images used by more than N slides (default: 3)",
    )
    parser.add_argument(
        "--min-image-kb",
        type=int,
        default=50,
        help="Ignore images smaller than N KB (default: 50)",
    )
    parser.add_argument(
        "--clean",
        action=argparse.BooleanOptionalAction,
        default=True,
        help="Clean output folder before export (default: true)",
    )
    args = parser.parse_args()

    pptx = Path(args.pptx).expanduser().resolve()
    if not pptx.exists() or pptx.suffix.lower() != ".pptx":
        print(f"[error] PPTX not found: {pptx}", file=sys.stderr)
        return 2

    if not _cmd_exists("python3"):
        print("[error] python3 is required.", file=sys.stderr)
        return 2

    out_base = Path(args.out).expanduser().resolve()
    slug = args.slug.strip() or _slugify(pptx.stem)
    out_dir = out_base / slug
    assets_dir = out_dir / "assets"
    out_dir.mkdir(parents=True, exist_ok=True)

    if args.clean:
        # Remove legacy full-slide exports (if any) and old story/assets, to avoid leaking unused materials.
        (out_dir / "manifest.json").unlink(missing_ok=True)
        (out_dir / "story.json").unlink(missing_ok=True)
        for p in out_dir.glob("slide-*.*"):
            if p.is_file():
                p.unlink(missing_ok=True)
        if assets_dir.exists():
            shutil.rmtree(assets_dir, ignore_errors=True)

    assets_dir.mkdir(parents=True, exist_ok=True)

    excluded_tag_set = {t.strip() for t in args.exclude_tags.split(",") if t.strip()}

    with zipfile.ZipFile(pptx, "r") as zf:
        sizes = {info.filename: info.file_size for info in zf.infolist()}

        slide_names = [
            n for n in zf.namelist() if re.fullmatch(r"ppt/slides/slide\d+\.xml", n)
        ]
        slide_indices = sorted(int(re.search(r"slide(\d+)\.xml$", n).group(1)) for n in slide_names)

        slides_raw = []
        all_lines: list[str] = []
        image_counter: Counter[str] = Counter()

        # first pass: parse slides & build frequencies
        for idx in slide_indices:
            slide_xml = zf.read(f"ppt/slides/slide{idx}.xml")
            root = ET.fromstring(slide_xml)

            rels_path = f"ppt/slides/_rels/slide{idx}.xml.rels"
            rels: dict[str, tuple[str, str]] = {}
            if rels_path in zf.namelist():
                rel_root = ET.fromstring(zf.read(rels_path))
                for rel in rel_root.findall("rel:Relationship", NS):
                    rel_id = rel.attrib.get("Id", "")
                    rels[rel_id] = (rel.attrib.get("Target", ""), rel.attrib.get("Type", ""))

            text = extract_slide_text(root)
            lines = text.title_lines + text.subtitle_lines + text.body_lines + text.other_lines
            all_lines.extend([_clean_text(x) for x in lines if not _is_noise_line(x)])

            images = extract_slide_images(root, rels)
            image_counter.update(images)

            slides_raw.append(
                {
                    "index": idx,
                    "text": text,
                    "images": images,
                }
            )

        line_counter = Counter(all_lines)
        common_lines = {line for line, c in line_counter.items() if c >= 6}

        def filter_lines(lines: list[str]) -> list[str]:
            out: list[str] = []
            seen: set[str] = set()
            for line in lines:
                t = _clean_text(line)
                if _is_noise_line(t):
                    continue
                if t in common_lines:
                    continue
                if t in seen:
                    continue
                seen.add(t)
                out.append(t)
            return out

        copied: dict[str, str] = {}

        slides = []
        for item in slides_raw:
            idx = item["index"]
            text: SlideText = item["text"]
            images: list[str] = item["images"]

            title_candidates = filter_lines(text.title_lines) or filter_lines(text.other_lines)
            title = title_candidates[0] if title_candidates else f"第 {idx} 页"

            subtitle_candidates = filter_lines(text.subtitle_lines)
            subtitle = subtitle_candidates[0] if subtitle_candidates else ""

            bullet_candidates = filter_lines(text.body_lines + text.other_lines)
            bullet_candidates = [b for b in bullet_candidates if b != title and b != subtitle]
            bullets = bullet_candidates[:6]

            full_text = " ".join([title, subtitle, *bullets]).strip()
            tags = _infer_tags(full_text)

            if any(t in excluded_tag_set for t in tags):
                continue

            selected_images: list[dict[str, str]] = []
            filtered = []
            for src in images:
                if image_counter[src] > args.image_frequency_threshold:
                    continue
                ext = src.rsplit(".", 1)[-1].lower()
                if ext not in SUPPORTED_IMAGE_EXTS:
                    continue
                if sizes.get(src, 0) < args.min_image_kb * 1024:
                    continue
                filtered.append(src)

            filtered.sort(key=lambda p: sizes.get(p, 0), reverse=True)
            for seq, src in enumerate(filtered[: max(0, args.max_images)]):
                if src in copied:
                    filename = copied[src]
                else:
                    ext = src.rsplit(".", 1)[-1].lower()
                    filename = f"s{idx:02d}-{seq+1}.{ext}"
                    data = zf.read(src)
                    (assets_dir / filename).write_bytes(data)
                    copied[src] = filename

                selected_images.append(
                    {
                        "src": f"assets/{filename}",
                        "alt": f"{title} 配图",
                    }
                )

            slides.append(
                {
                    "index": idx,
                    "title": title,
                    "subtitle": subtitle,
                    "bullets": bullets,
                    "tags": tags,
                    "images": selected_images,
                }
            )

    story = {
        "deckTitle": pptx.stem,
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "slides": slides,
    }

    (out_dir / "story.json").write_text(
        json.dumps(story, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )

    print(f"[ok] Exported story.json + {len(list((out_dir/'assets').glob('*')))} assets -> {out_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
