# MedMeal AI

A unified health companion web app that helps you manage prescriptions and track nutrition using AI-powered image analysis.

## Features

### 📋 Prescription OCR Scanner
- Scan handwritten prescriptions using your camera or upload images
- AI-powered extraction of medicine names, dosages, frequency, and timing
- Automatic medicine reminder setup with browser notifications
- Track all your prescriptions in one place

### 🍽️ Meal Nutrition Scanner
- Analyze meal photos for instant calorie and nutrition information
- Get detailed macronutrient breakdown (protein, carbs, fats)
- Personalized health warnings based on your conditions (diabetes, hypertension, etc.)
- Track your meal history

## Tech Stack

**Frontend:**
- React 18 with Vite
- React Router for navigation
- Axios for API calls
- Modern CSS with responsive design

**Backend:**
- Node.js with Express
- Anthropic Claude API (Sonnet 4)
- Claude Vision for image analysis

**Storage:**
- Browser localStorage (no authentication required)
- Client-side data persistence

## Prerequisites

- Node.js 18+ and npm
- Anthropic API key ([Get one here](https://console.anthropic.com/))
- Modern web browser with camera access

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/kasa-maker/medmeal-ai.git
cd medmeal-ai
```

### 2. Configure environment variables
```bash
cp .env.example .env
```

Edit `.env` and add your Anthropic API key:
```
ANTHROPIC_API_KEY=your_actual_api_key_here
```

### 3. Install backend dependencies
```bash
cd backend
npm install
```

### 4. Install frontend dependencies
```bash
cd ../frontend
npm install
```

### 5. Start the backend server
```bash
cd backend
npm start
```
Backend will run on `http://localhost:3001`

### 6. Start the frontend (in a new terminal)
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

### 7. Open your browser
Navigate to `http://localhost:5173` and start using MedMeal AI!

## Usage Guide

### Scanning Prescriptions
1. Click on "Prescription Scanner" from the home page
2. Allow camera access when prompted
3. Capture a photo of your prescription or upload an image
4. Review the extracted medicine information
5. Set up reminders for each medicine
6. Enable browser notifications to receive alerts

### Analyzing Meals
1. Click on "Meal Scanner" from the home page
2. Optionally add your health conditions (e.g., diabetes, hypertension)
3. Capture or upload a photo of your meal
4. View detailed nutrition information and health warnings
5. Your meal history is automatically saved

## API Endpoints

### POST `/api/prescription/analyze`
Analyzes prescription images and extracts medicine information.

**Request:**
```json
{
  "image": "base64_encoded_image_string"
}
```

**Response:**
```json
{
  "medicines": [
    {
      "name": "Amoxicillin",
      "dosage": "500mg",
      "frequency": "twice daily",
      "timing": "after meals",
      "duration": "7 days"
    }
  ]
}
```

### POST `/api/nutrition/analyze`
Analyzes meal photos and returns nutrition information.

**Request:**
```json
{
  "image": "base64_encoded_image_string",
  "healthConditions": ["diabetes", "hypertension"]
}
```

**Response:**
```json
{
  "items": ["Rice", "Chicken curry", "Salad"],
  "totalCalories": 650,
  "macros": {
    "protein": "35g",
    "carbs": "70g",
    "fats": "20g"
  },
  "healthWarnings": [
    "High sodium content - monitor for hypertension"
  ]
}
```

## Local Storage Schema

The app uses browser localStorage to persist data:

- `medmeal_prescriptions` - Array of prescription scan results
- `medmeal_meals` - Array of meal scan results
- `medmeal_reminders` - Array of active medicine reminders
- `medmeal_user_conditions` - Array of user health conditions

## Browser Notifications

Medicine reminders use the browser's Notification API. You'll be prompted to allow notifications when setting up your first reminder. Make sure to:
- Allow notifications in your browser
- Keep the browser tab open or running in the background
- Check notification settings if alerts aren't appearing

## Troubleshooting

**Camera not working:**
- Ensure you're accessing the app via `localhost` (required for camera access)
- Check browser permissions for camera access
- Try using the file upload option instead

**API errors:**
- Verify your Anthropic API key is correct in `.env`
- Check that the backend server is running on port 3001
- Ensure you have sufficient API credits

**Notifications not appearing:**
- Check browser notification permissions
- Ensure the browser tab is open
- Try refreshing the page and setting up reminders again

## Development

**Backend development:**
```bash
cd backend
npm run dev  # Uses nodemon for auto-reload
```

**Frontend development:**
```bash
cd frontend
npm run dev  # Vite hot-reload enabled
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions, please open an issue on GitHub.
