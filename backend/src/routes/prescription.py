from fastapi import APIRouter, HTTPException, UploadFile, File
from src.agents.prescription_ocr import analyze_prescription

router = APIRouter()

@router.post('/analyze')
async def analyze_prescription_route(image: UploadFile = File(...)):
    try:
        if not image:
            raise HTTPException(status_code=400, detail='Image file is required')

        # Validate file type
        if not image.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail='File must be an image')

        # Read image bytes
        image_bytes = await image.read()

        result = analyze_prescription(image_bytes)
        return result

    except HTTPException:
        raise
    except Exception as error:
        print(f'Prescription analysis error: {error}')
        raise HTTPException(
            status_code=500,
            detail=f'Failed to analyze prescription: {str(error)}'
        )
