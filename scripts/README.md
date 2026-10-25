# Scripts

## PPT 内容结构化（图片 + 文案精选素材）

从 PPTX 里提取 **图片素材（非整页截图）** 与对应页的关键文案，输出 `story.json` + `assets/`，用于在网页中做“内容重排/大厂风格”展示。

```bash
python3 scripts/export_ppt_story.py "素材内容/灵犀造物-博物馆文创3D打印.pptx" --out public/showcase --slug lingxi-museum
```

输出：

- `public/showcase/lingxi-museum/story.json`
- `public/showcase/lingxi-museum/assets/*`
