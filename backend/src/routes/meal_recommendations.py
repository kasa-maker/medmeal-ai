from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from src.agents.meal_recommendations import get_meal_recommendations

router = APIRouter()

class MealRecommendationRequest(BaseModel):
    medicines: List[dict]
    condition: Optional[str] = None

@router.post('/recommendations')
async def get_meal_recommendations_route(request: MealRecommendationRequest):
    try:
        if not request.medicines:
            raise HTTPException(status_code=400, detail='Medicines list is required')

        result = get_meal_recommendations(request.medicines, request.condition)
        return result

    except Exception as error:
        print(f'Meal recommendations error: {error}')
        raise HTTPException(
            status_code=500,
            detail=f'Failed to get meal recommendations: {str(error)}'
        )
