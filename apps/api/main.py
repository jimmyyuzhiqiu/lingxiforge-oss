import base64
import hashlib
import hmac
import io
import json
import os
import secrets
import sqlite3
import time
import uuid
from typing import Any, Dict, Optional

import httpx
from fastapi import APIRouter, FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from pydantic import BaseModel
from PIL import Image, ImageDraw, ImageFont


def _resp(*, data: Any = None, success: bool = True, code: int = 200, msg: str = "ok") -> Dict[str, Any]:
    return {"code": code, "success": success, "msg": msg, "message": msg, "data": data}


DB_PATH = os.getenv("LINGXIFORGE_DB_PATH") or os.getenv("TIFA_DB_PATH", "/data/lingxiforge.db")
DB_DIR = os.path.dirname(DB_PATH)
os.makedirs(DB_DIR, exist_ok=True)

UPLOAD_DIR = os.getenv("LINGXIFORGE_UPLOAD_DIR") or os.getenv("TIFA_UPLOAD_DIR", "/data/uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)
MAX_UPLOAD_BYTES = int(
    os.getenv("LINGXIFORGE_MAX_UPLOAD_BYTES") or os.getenv("TIFA_MAX_UPLOAD_BYTES", str(10 * 1024 * 1024))
)

AUTH_SALT = os.getenv("LINGXIFORGE_AUTH_SALT") or os.getenv("TIFA_AUTH_SALT")
if not AUTH_SALT:
    raise RuntimeError("Set LINGXIFORGE_AUTH_SALT to a unique random secret before starting the API.")
HY3D_BASE_URL = os.getenv("HY3D_BASE_URL", "").rstrip("/")
HY3D_TIMEOUT_SECONDS = float(os.getenv("HY3D_TIMEOUT_SECONDS", "600"))


def _db() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS users (
          email TEXT PRIMARY KEY,
          password_hash TEXT NOT NULL,
          created_at INTEGER NOT NULL
        )
        """
    )
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS sessions (
          token TEXT PRIMARY KEY,
          email TEXT NOT NULL,
          created_at INTEGER NOT NULL
        )
        """
    )
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS leads (
          id TEXT PRIMARY KEY,
          payload_json TEXT NOT NULL,
          created_at INTEGER NOT NULL,
          status TEXT NOT NULL DEFAULT 'new'
        )
        """
    )
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS lead_files (
          id TEXT PRIMARY KEY,
          lead_id TEXT,
          filename TEXT NOT NULL,
          content_type TEXT,
          size INTEGER,
          path TEXT NOT NULL,
          created_at INTEGER NOT NULL
        )
        """
    )
    return conn


_captcha_store: Dict[str, Dict[str, Any]] = {}


def _hash_password(password: str) -> str:
    salt = secrets.token_bytes(16)
    iterations = 310_000
    digest = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, iterations)
    return f"pbkdf2_sha256${iterations}${salt.hex()}${digest.hex()}"


def _verify_password(password: str, stored_hash: str) -> bool:
    if stored_hash.startswith("pbkdf2_sha256$"):
        try:
            _, iterations_text, salt_hex, expected_hash = stored_hash.split("$", 3)
            digest = hashlib.pbkdf2_hmac(
                "sha256",
                password.encode("utf-8"),
                bytes.fromhex(salt_hex),
                int(iterations_text),
            ).hex()
            return hmac.compare_digest(digest, expected_hash)
        except (ValueError, TypeError):
            return False

    # Backward compatibility for old local databases; upgrade successful logins.
    legacy_hash = hashlib.sha256(f"{AUTH_SALT}:{password}".encode("utf-8")).hexdigest()
    return hmac.compare_digest(stored_hash, legacy_hash)


def _gen_captcha_png(code: str) -> bytes:
    width, height = 180, 60
    img = Image.new("RGB", (width, height), color=(255, 255, 255))
    draw = ImageDraw.Draw(img)

    for _ in range(12):
        x1, y1 = secrets.randbelow(width), secrets.randbelow(height)
        x2, y2 = secrets.randbelow(width), secrets.randbelow(height)
        draw.line((x1, y1, x2, y2), fill=(200, 200, 200), width=1)

    try:
        font = ImageFont.truetype("DejaVuSans.ttf", 34)
    except Exception:
        font = ImageFont.load_default()
    draw.text((20, 12), code, fill=(20, 20, 20), font=font)

    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return buf.getvalue()


async def _hy3d_post(path: str, payload: Dict[str, Any]) -> httpx.Response:
    if not HY3D_BASE_URL:
        raise HTTPException(status_code=503, detail="HY3D service is not configured (HY3D_BASE_URL is empty)")
    try:
        async with httpx.AsyncClient(timeout=HY3D_TIMEOUT_SECONDS) as client:
            return await client.post(f"{HY3D_BASE_URL}{path}", json=payload)
    except httpx.TimeoutException as e:
        raise HTTPException(status_code=504, detail=f"HY3D request timeout: {e}") from e
    except httpx.ConnectError as e:
        raise HTTPException(
            status_code=503,
            detail="HY3D service unreachable. Configure HY3D_BASE_URL to point to a compatible inference API.",
        ) from e


async def _hy3d_get(path: str) -> httpx.Response:
    if not HY3D_BASE_URL:
        raise HTTPException(status_code=503, detail="HY3D service is not configured (HY3D_BASE_URL is empty)")
    try:
        async with httpx.AsyncClient(timeout=HY3D_TIMEOUT_SECONDS) as client:
            return await client.get(f"{HY3D_BASE_URL}{path}")
    except httpx.TimeoutException as e:
        raise HTTPException(status_code=504, detail=f"HY3D request timeout: {e}") from e
    except httpx.ConnectError as e:
        raise HTTPException(
            status_code=503,
            detail="HY3D service unreachable. Configure HY3D_BASE_URL to point to a compatible inference API.",
        ) from e


router = APIRouter()


@router.get("/health")
async def health():
    return _resp(data={"status": "healthy"})


@router.post("/code")
async def get_code():
    code = "".join(str(secrets.randbelow(10)) for _ in range(4))
    code_id = str(uuid.uuid4())
    _captcha_store[code_id] = {"code": code, "expires_at": time.time() + 5 * 60}
    png = _gen_captcha_png(code)
    base64_png = base64.b64encode(png).decode("utf-8")
    return _resp(data={"id": code_id, "base64": f"data:image/png;base64,{base64_png}"})


def _verify_code(code_id: str, code: str) -> bool:
    item = _captcha_store.get(code_id)
    if not item:
        return False
    if time.time() > float(item.get("expires_at", 0)):
        _captcha_store.pop(code_id, None)
        return False
    return str(item.get("code", "")).lower() == str(code).lower()


class RegisterRequest(BaseModel):
    email: str
    password: str
    code: str
    codeId: str


@router.post("/register")
async def register(body: RegisterRequest):
    email = body.email
    password = body.password
    code = body.code
    codeId = body.codeId
    if not _verify_code(codeId, code):
        return _resp(success=False, code=400, msg="验证码错误或已过期")
    _captcha_store.pop(codeId, None)

    with _db() as conn:
        cur = conn.execute("SELECT email FROM users WHERE email = ?", (email,))
        if cur.fetchone():
            return _resp(success=False, code=409, msg="用户已存在")
        conn.execute(
            "INSERT INTO users (email, password_hash, created_at) VALUES (?, ?, ?)",
            (email, _hash_password(password), int(time.time())),
        )
        conn.commit()
    return _resp(msg="注册成功")


class LoginRequest(BaseModel):
    email: str
    password: str
    code: Optional[str] = None
    codeId: Optional[str] = None


@router.post("/login")
async def login(body: LoginRequest):
    email = body.email
    password = body.password
    code = body.code
    codeId = body.codeId
    if not code or not codeId or not _verify_code(codeId, code):
        return _resp(success=False, code=400, msg="验证码错误或已过期")
    _captcha_store.pop(codeId, None)

    with _db() as conn:
        cur = conn.execute("SELECT password_hash FROM users WHERE email = ?", (email,))
        row = cur.fetchone()
        if not row:
            return _resp(success=False, code=404, msg="用户不存在")
        if not _verify_password(password, row[0]):
            return _resp(success=False, code=401, msg="账号或密码错误")
        if not row[0].startswith("pbkdf2_sha256$"):
            conn.execute(
                "UPDATE users SET password_hash = ? WHERE email = ?",
                (_hash_password(password), email),
            )
        token = str(uuid.uuid4())
        conn.execute(
            "INSERT INTO sessions (token, email, created_at) VALUES (?, ?, ?)",
            (token, email, int(time.time())),
        )
        conn.commit()
    return _resp(data=token, msg="登录成功")


@router.post("/leads/upload")
async def lead_upload(file: UploadFile = File(...)):
    raw = await file.read()
    if not raw:
        return _resp(success=False, code=400, msg="未收到文件")
    if len(raw) > MAX_UPLOAD_BYTES:
        return _resp(success=False, code=413, msg="文件过大")

    original = file.filename or "upload"
    ext = os.path.splitext(original)[1].lower()
    if ext not in [".jpg", ".jpeg", ".png", ".webp", ".gif"]:
        # Allow unknown ext for safety; treat as .bin
        ext = ".bin"

    file_id = str(uuid.uuid4())
    save_path = os.path.join(UPLOAD_DIR, f"{file_id}{ext}")
    with open(save_path, "wb") as f:
        f.write(raw)

    with _db() as conn:
        conn.execute(
            """
            INSERT INTO lead_files (id, lead_id, filename, content_type, size, path, created_at)
            VALUES (?, NULL, ?, ?, ?, ?, ?)
            """,
            (
                file_id,
                original,
                file.content_type,
                len(raw),
                save_path,
                int(time.time()),
            ),
        )
        conn.commit()

    return _resp(data={"fileId": file_id, "filename": original, "size": len(raw)})


class LeadRequest(BaseModel):
    intent: str
    role: str
    files: list[str] = []
    compliance: Dict[str, Any] = {}
    requirements: Dict[str, Any] = {}
    contact: Dict[str, Any] = {}
    meta: Optional[Dict[str, Any]] = None


@router.post("/leads")
async def create_lead(body: LeadRequest):
    payload = body.model_dump() if hasattr(body, "model_dump") else body.dict()
    lead_id = str(uuid.uuid4())
    created_at = int(time.time())

    with _db() as conn:
        conn.execute(
            "INSERT INTO leads (id, payload_json, created_at, status) VALUES (?, ?, ?, ?)",
            (lead_id, json.dumps(payload, ensure_ascii=False), created_at, "new"),
        )
        for fid in payload.get("files", []) or []:
            conn.execute(
                "UPDATE lead_files SET lead_id = ? WHERE id = ?",
                (lead_id, str(fid)),
            )
        conn.commit()

    return _resp(data={"leadId": lead_id}, msg="ok")


@router.get("/content/home/2image")
async def home_2image():
    demo = [
        {
            "id": "1",
            "title": "欢迎使用 Lingxi Forge",
            "subTitle": "本地一键部署版本",
            "images": ["/brand2.png"],
            "path": "/workbench/text-to-3d",
        }
    ]
    return _resp(data=demo)


@router.get("/content/home/model")
async def home_model_waterfall():
    demo = [
        {"cover": "/models/open/nasa/international-space-station-a.webp", "shelfDate": "2026-01-29", "avatar": "/vite.svg", "username": "demo"}
    ]
    return _resp(data=demo)


class DiscoverRequest(BaseModel):
    pageNum: int = 1
    pageSize: int = 10
    type: int = 0


@router.post("/discover/list/select")
async def discover_list_select(body: DiscoverRequest):
    pageNum = body.pageNum
    cover_list = [
        {
            "userId": "demo",
            "cover": "/brand2.png",
            "avatar": "/vite.svg",
            "username": "demo",
            "shelfDate": "2026-01-29",
            "views": 0,
            "favorites": 0,
        }
    ]
    page_info = {"pageNum": pageNum, "total": len(cover_list), "pages": 1, "hasNext": False, "hasPrevious": False}
    return _resp(data={"pageInfo": page_info, "coverList": cover_list})


@router.post("/user/img")
async def user_img(image: UploadFile = File(...)):
    _ = await image.read()
    return _resp(msg="ok")


@router.post("/model/image")
async def model_image(
    image: UploadFile = File(...),
    texture: bool = Form(False),
    remove_background: bool = Form(True),
    seed: int = Form(1234),
    octree_resolution: int = Form(256),
    num_inference_steps: int = Form(5),
    guidance_scale: float = Form(5.0),
    num_chunks: int = Form(8000),
    face_count: int = Form(40000),
):
    raw = await image.read()
    if not raw:
        return _resp(success=False, code=400, msg="未收到图片")

    img_b64 = base64.b64encode(raw).decode("utf-8")
    payload = {
        "image": img_b64,
        "texture": texture,
        "remove_background": remove_background,
        "seed": seed,
        "octree_resolution": octree_resolution,
        "num_inference_steps": num_inference_steps,
        "guidance_scale": guidance_scale,
        "num_chunks": num_chunks,
        "face_count": face_count,
    }

    try:
        r = await _hy3d_post("/send", payload)
    except HTTPException as e:
        return _resp(success=False, code=e.status_code, msg=str(e.detail))
    if r.status_code >= 400:
        raise HTTPException(status_code=502, detail=f"HY3D /send failed: {r.status_code} {r.text}")
    uid = r.json().get("uid")
    if not uid:
        raise HTTPException(status_code=502, detail="HY3D /send returned no uid")

    return _resp(
        data={
            "uid": uid,
            "statusUrl": f"/lingxiforge/model/status/{uid}",
            "resultUrl": f"/lingxiforge/model/result/{uid}",
        }
    )


@router.get("/model/status/{uid}")
async def model_status(uid: str):
    try:
        r = await _hy3d_get(f"/status/{uid}")
    except HTTPException as e:
        return _resp(success=False, code=e.status_code, msg=str(e.detail))
    if r.status_code >= 400:
        raise HTTPException(status_code=502, detail=f"HY3D /status failed: {r.status_code} {r.text}")
    body = r.json()
    status = body.get("status", "unknown")
    model_b64 = body.get("model_base64")
    return _resp(data={"status": status, "modelBase64": model_b64})


@router.get("/model/result/{uid}")
async def model_result(uid: str):
    r = await _hy3d_get(f"/status/{uid}")
    if r.status_code >= 400:
        raise HTTPException(status_code=502, detail=f"HY3D /status failed: {r.status_code} {r.text}")
    body = r.json()
    if body.get("status") != "completed" or not body.get("model_base64"):
        raise HTTPException(status_code=409, detail=f"not ready: {body.get('status')}")
    model_bytes = base64.b64decode(body["model_base64"])
    return Response(
        content=model_bytes,
        media_type="model/gltf-binary",
        headers={"Content-Disposition": f'attachment; filename="{uid}.glb"'},
    )


CORS_ORIGINS = [
    origin.strip()
    for origin in os.getenv(
        "LINGXIFORGE_CORS_ORIGINS",
        "http://localhost:8080,http://127.0.0.1:8080",
    ).split(",")
    if origin.strip()
]

app = FastAPI(title="Lingxi Forge API", version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(router, prefix="/lingxiforge")
# Compatibility window for legacy clients.
app.include_router(router, prefix="/tifa")
