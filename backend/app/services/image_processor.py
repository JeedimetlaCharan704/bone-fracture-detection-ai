from PIL import Image
import io
import numpy as np


def validate_image(file_bytes: bytes) -> bool:
    try:
        img = Image.open(io.BytesIO(file_bytes))
        img.verify()
        return True
    except Exception:
        return False


def preprocess_image(file_bytes: bytes, target_size: tuple[int, int] = (640, 640)) -> np.ndarray:
    img = Image.open(io.BytesIO(file_bytes)).convert("RGB")
    img = img.resize(target_size, Image.LANCZOS)
    img_array = np.array(img, dtype=np.float32) / 255.0
    return np.expand_dims(np.transpose(img_array, (2, 0, 1)), axis=0)
