from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from typing import Optional, List
from src.agents.food_nutrition import analyze_meal_nutrition

router = APIRouter()

@router.post('/analyze')
async def analyze_nutrition_route(
    image: UploadFile = File(...),
    healthConditions: Optional[str] = Form(None)
):
    try:
        if not image:
            raise HTTPException(status_code=400, detail='Image file is required')

        # Validate file type
        if not image.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail='File must be an image')

        # Read image bytes
        image_bytes = await image.read()

        # Parse health conditions (comma-separated string to list)
        conditions_list = []
        if healthConditions:
            conditions_list = [c.strip() for c in healthConditions.split(',') if c.strip()]

        result = analyze_meal_nutrition(image_bytes, conditions_list)
        return result

    except HTTPException:
        raise
    except Exception as error:
        print(f'Nutrition analysis error: {error}')
        raise HTTPException(
            status_code=500,
            detail=f'Failed to analyze meal: {str(error)}'
        )
