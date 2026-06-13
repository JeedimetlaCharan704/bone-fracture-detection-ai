from fastapi import APIRouter, HTTPException, UploadFile, File
from app.services.predictor import get_predictor
from app.services.image_processor import validate_image
from app.config import settings

router = APIRouter()

predictor = get_predictor(settings.model_type, settings.model_path)


@router.on_event("startup")
async def load_model():
    await predictor.load_model()


@router.post("/predict")
async def predict(file: UploadFile = File(...)):
    """
    Upload an X-ray image for fracture detection analysis.

    Accepts JPG, JPEG, and PNG files up to 10MB.
    Returns fracture detection results with confidence score.
    """
    # Validate file extension
    ext = "." + file.filename.rsplit(".", 1)[-1].lower() if "." in file.filename else ""
    if ext not in settings.allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type '{ext}'. Allowed: {', '.join(settings.allowed_extensions)}"
        )

    # Read file
    file_bytes = await file.read()

    # Validate size
    max_bytes = settings.max_image_size_mb * 1024 * 1024
    if len(file_bytes) > max_bytes:
        raise HTTPException(
            status_code=400,
            detail=f"File too large. Maximum size is {settings.max_image_size_mb}MB."
        )

    # Validate image
    if not validate_image(file_bytes):
        raise HTTPException(
            status_code=400,
            detail="Invalid or corrupted image file."
        )

    # Run prediction
    try:
        result = await predictor.predict(file_bytes)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )

    return {
        "fractureDetected": result.fracture_detected,
        "confidence": round(result.confidence, 4),
        "summary": result.summary,
        "regions": result.regions,
        "heatmapUrl": result.heatmap_url,
    }
