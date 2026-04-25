from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from src.routes.prescription import router as prescription_router
from src.routes.nutrition import router as nutrition_router
from src.routes.meal_recommendations import router as meal_recommendations_router

load_dotenv()

app = FastAPI(title='MedMeal AI Backend', version='1.0.0')

# CORS configuration
FRONTEND_URL = os.getenv('FRONTEND_URL', 'http://localhost:5173')

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

@app.get('/health')
async def health_check():
    return {'status': 'ok', 'message': 'MedMeal AI Backend is running'}

# Include routers
app.include_router(prescription_router, prefix='/api/prescription', tags=['prescription'])
app.include_router(nutrition_router, prefix='/api/nutrition', tags=['nutrition'])
app.include_router(meal_recommendations_router, prefix='/api/meal', tags=['meal'])

if __name__ == '__main__':
    import uvicorn
    port = int(os.getenv('PORT', 3001))
    uvicorn.run('main:app', host='0.0.0.0', port=port, reload=True)
