import os
import requests
import urllib3
import time
import hashlib

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# ---------- ENV VALIDATION ----------

def _require_env(name: str) -> str:
    value = os.getenv(name)
    if not value:
        raise RuntimeError(f"Missing environment variable: {name}")
    return value


CLIPDROP_API = "https://clipdrop-api.co/text-to-image/v1"
CLIPDROP_KEY = _require_env("CLIPDROP_API_KEY")

CLOUD_NAME = _require_env("CLOUDINARY_CLOUD_NAME")
CLOUD_API_KEY = _require_env("CLOUDINARY_API_KEY")
CLOUD_API_SECRET = _require_env("CLOUDINARY_API_SECRET")

CLOUDINARY_UPLOAD_URL = (
    f"https://api.cloudinary.com/v1_1/{CLOUD_NAME}/image/upload"
)

# ---------- FREE CHECK (NO CREDITS) ----------

def _check_cloudinary() -> None:
    resp = requests.get(
        f"https://api.cloudinary.com/v1_1/{CLOUD_NAME}/ping",
        auth=(CLOUD_API_KEY, CLOUD_API_SECRET),
        verify=False,
        timeout=10,
    )

    if resp.status_code != 200:
        raise RuntimeError("Cloudinary not reachable")

# ---------- MAIN ----------

def generate_image(prompt: str) -> str:
    # 1️⃣ Fail fast
    _check_cloudinary()

    # 2️⃣ ClipDrop (PAID)
    clipdrop_response = requests.post(
        CLIPDROP_API,
        headers={"x-api-key": CLIPDROP_KEY},
        files={"prompt": (None, prompt)},
        verify=False,
        timeout=60,
    )

    if clipdrop_response.status_code != 200:
        raise RuntimeError(f"ClipDrop error: {clipdrop_response.text}")

    image_bytes = clipdrop_response.content

    # 3️⃣ Cloudinary SIGNED upload
    timestamp = int(time.time())
    folder = "ust_elseai_images"

    # 🔴 THIS IS THE FIX 🔴
    string_to_sign = f"folder={folder}&timestamp={timestamp}"
    signature = hashlib.sha1(
        (string_to_sign + CLOUD_API_SECRET).encode()
    ).hexdigest()

    upload_response = requests.post(
        CLOUDINARY_UPLOAD_URL,
        files={"file": image_bytes},
        data={
            "api_key": CLOUD_API_KEY,
            "timestamp": timestamp,
            "folder": folder,
            "signature": signature,
        },
        verify=False,
        timeout=60,
    )

    if upload_response.status_code != 200:
        raise RuntimeError(
            f"Cloudinary upload failed: {upload_response.text}"
        )

    return upload_response.json()["secure_url"]
