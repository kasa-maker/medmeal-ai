# MedMeal AI Backend - Python FastAPI

## Quick Start

### Install Dependencies
```bash
pip install -r requirements.txt
```

### Configure Environment
Create a `.env` file with:
```
ANTHROPIC_API_KEY=your_api_key_here
PORT=3001
FRONTEND_URL=http://localhost:5173
```

### Run the Server
```bash
python main.py
```

Or with auto-reload:
```bash
uvicorn main:app --reload --port 3001
```

The backend will run on `http://localhost:3001`

## API Endpoints

### Health Check
- **GET** `/health`
- Returns server status

### Prescription Analysis
- **POST** `/api/prescription/analyze`
- Body: `{ "image": "base64_encoded_image" }`
- Returns: Medicine details (name, dosage, frequency, timing, duration)

### Nutrition Analysis
- **POST** `/api/nutrition/analyze`
- Body: `{ "image": "base64_encoded_image", "healthConditions": ["diabetes", "hypertension"] }`
- Returns: Calories, macros, food items, health warnings

## Tech Stack
- FastAPI 0.115.0
- Uvicorn (ASGI server)
- Anthropic Claude API (Sonnet 4)
- Python 3.13+

## Project Structure
```
backend/
├── main.py                    # FastAPI application entry point
├── requirements.txt           # Python dependencies
├── .env                       # Environment variables
└── src/
    ├── agents/
    │   ├── prescription_ocr.py    # Prescription OCR agent
    │   └── food_nutrition.py      # Meal nutrition agent
    ├── routes/
    │   ├── prescription.py        # Prescription API routes
    │   └── nutrition.py           # Nutrition API routes
    └── config/
        └── anthropic.py           # Claude API configuration
```
