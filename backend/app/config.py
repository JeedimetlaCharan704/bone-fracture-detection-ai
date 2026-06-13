import os
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "BoneFracture AI Service"
    debug: bool = False
    max_image_size_mb: int = 10
    allowed_extensions: list[str] = [".jpg", ".jpeg", ".png"]
    model_path: str | None = None
    model_type: str = "mock"  # "mock", "yolov11", "pytorch"

    class Config:
        env_file = ".env"


settings = Settings()
