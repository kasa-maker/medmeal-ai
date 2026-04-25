# MedMeal AI 🏥💊

A comprehensive health companion web app that helps you manage prescriptions, track nutrition, and get personalized meal recommendations using AI-powered image analysis.

## ✨ Features

### 📋 Prescription OCR Scanner
- **Smart Prescription Analysis**: Scan handwritten prescriptions using your camera or upload images
- **AI-Powered Extraction**: Automatically extracts medicine names, dosages, frequency, timing, and duration
- **Editable Reminder Schedules**: Set custom reminder times for Morning, Afternoon, and Evening doses
- **Live Countdown Timers**: Real-time countdown showing time remaining until next dose
- **Browser Notifications**: Automatic alerts when it's time to take your medicine
- **Medicine Adherence Log**: Track taken vs missed doses with daily/weekly statistics
- **3D Clock Widget**: Beautiful clock display with next medicine countdown on home page

### 🍽️ Meal Nutrition Scanner
- **Instant Nutrition Analysis**: Analyze meal photos for calorie and macronutrient information
- **Detailed Breakdown**: Get protein, carbs, and fats breakdown for each meal
- **Health Warnings**: Personalized alerts based on your medical conditions (diabetes, hypertension, etc.)
- **Meal History Tracking**: Automatically saves all analyzed meals
- **Recommended Foods**: AI suggests healthy food alternatives based on your meal

### 🥗 Meal Recommendations (NEW!)
- **Prescription-Based Suggestions**: Get personalized food recommendations based on your medicines
- **Condition-Aware**: Tailored advice for your specific medical condition
- **Foods to Eat**: 5-6 recommended foods with health benefits explained
- **Foods to Avoid**: 4-5 foods to avoid with detailed reasons
- **Beautiful UI**: Green cards for recommended foods, red cards for foods to avoid

## 🛠️ Tech Stack

**Frontend:**
- React 18 with Vite
- React Router for navigation
- Axios for API calls
- Modern CSS with glassmorphism design
- Browser Notification API
- localStorage for data persistence

**Backend:**
- Python 3.11+ with FastAPI
- Google Gemini 2.5 Flash API
- Gemini Vision for image analysis
- Uvicorn ASGI server
- Pillow (PIL) for image processing

**Storage:**
- Browser localStorage (no authentication required)
- Client-side data persistence

## 📋 Prerequisites

- Python 3.11 or higher
- Node.js 18+ and npm
- Google Gemini API key ([Get one here](https://aistudio.google.com/app/apikey))
- Modern web browser with camera access

## 🚀 Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/kasa-maker/medmeal-ai.git
cd medmeal-ai
```

### 2. Configure environment variables
```bash
cp .env.example .env
```

Edit `.env` and add your Google Gemini API key:
```
GEMINI_API_KEY=your_actual_api_key_here
PORT=3001
FRONTEND_URL=http://localhost:5173
```

### 3. Install backend dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 4. Install frontend dependencies
```bash
cd ../frontend
npm install
```

### 5. Start the backend server
```bash
cd backend
python main.py
```
Backend will run on `http://localhost:3001`

### 6. Start the frontend (in a new terminal)
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173` or `http://localhost:5174`

### 7. Open your browser
Navigate to the frontend URL and start using MedMeal AI!

## 📖 Usage Guide

### Scanning Prescriptions
1. Click on **"Prescription Scanner"** from the home page
2. Allow camera access when prompted
3. Capture a photo of your prescription or upload an image
4. Review the extracted medicine information
5. **Set up reminders**: Check Morning/Afternoon/Evening slots and set custom times
6. Click **"Save Reminder"** for each medicine
7. Enable browser notifications to receive alerts
8. View live countdown timer showing time until next dose

### Getting Meal Recommendations
1. After scanning a prescription, scroll down to the results
2. Click **"🍽️ Get Meal Recommendations"** button
3. Wait for AI to analyze your medicines and condition
4. View two sections:
   - **✅ Recommended Foods**: Foods that help with recovery
   - **⚠️ Foods to Avoid**: Foods that may interfere with medicines
5. Each food includes emoji, name, and detailed health reason

### Analyzing Meals
1. Click on **"Meal Scanner"** from the home page
2. Optionally add your health conditions (e.g., diabetes, hypertension)
3. Capture or upload a photo of your meal
4. View detailed nutrition information and health warnings
5. See recommended food alternatives
6. Your meal history is automatically saved

### Tracking Medicine Adherence
1. When it's time to take medicine, you'll see an alert notification
2. Click **"I took my medicine"** to log it
3. View your adherence log at the bottom of Prescription Scanner page
4. Filter by Today/Week/All to see your history
5. Track your adherence percentage

## 🔌 API Endpoints

### POST `/api/prescription/analyze`
Analyzes prescription images and extracts medicine information.

**Request:** Multipart form data
```
image: File (JPEG/PNG)
```

**Response:**
```json
{
  "medicines": [
    {
      "name": "Paracetamol",
      "dosage": "500mg",
      "frequency": "twice daily",
      "timing": "after meals",
      "duration": "7 days"
    }
  ],
  "condition": "fever"
}
```

### POST `/api/nutrition/analyze`
Analyzes meal photos and returns nutrition information.

**Request:** Multipart form data
```
image: File (JPEG/PNG)
healthConditions: String (comma-separated, optional)
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
  ],
  "recommendedFoods": [
    {
      "name": "Brown Rice",
      "emoji": "🍚",
      "reason": "Better glycemic control"
    }
  ]
}
```

### POST `/api/meal/recommendations`
Generates personalized meal recommendations based on prescription.

**Request:** JSON
```json
{
  "medicines": [
    {
      "name": "Paracetamol",
      "dosage": "500mg"
    }
  ],
  "condition": "fever"
}
```

**Response:**
```json
{
  "condition": "fever",
  "recommendedFoods": [
    {
      "name": "Chicken Broth",
      "emoji": "🍲",
      "reason": "Provides essential fluids and electrolytes"
    }
  ],
  "foodsToAvoid": [
    {
      "name": "Spicy Foods",
      "emoji": "🌶️",
      "reason": "Can irritate the digestive tract"
    }
  ]
}
```

## 💾 Local Storage Schema

The app uses browser localStorage to persist data:

- `medmeal_prescriptions` - Array of prescription scan results with timestamps
- `medmeal_meals` - Array of meal scan results with timestamps
- `medmeal_reminders` - Array of active medicine reminders with schedules
- `medmeal_medicine_log` - Array of taken/missed medicine logs
- `medmeal_user_conditions` - Array of user health conditions

**Reminder Structure:**
```json
{
  "id": "uuid",
  "medicineName": "Paracetamol",
  "dosage": "500mg",
  "frequency": "twice daily",
  "timing": "after meals",
  "schedule": [
    {
      "slot": "morning",
      "time": "08:00",
      "enabled": true
    },
    {
      "slot": "evening",
      "time": "20:00",
      "enabled": true
    }
  ],
  "startDate": "2026-04-25",
  "endDate": "2026-05-02",
  "enabled": true
}
```

## 🔔 Browser Notifications

Medicine reminders use the browser's Notification API. You'll be prompted to allow notifications when setting up your first reminder. Make sure to:
- Allow notifications in your browser
- Keep the browser tab open or running in the background
- Check notification settings if alerts aren't appearing

## 🐛 Troubleshooting

**Camera not working:**
- Ensure you're accessing the app via `localhost` (required for camera access)
- Check browser permissions for camera access
- Try using the file upload option instead

**API errors:**
- Verify your Google Gemini API key is correct in `.env`
- Check that the backend server is running on port 3001
- Ensure you have sufficient API quota
- If you get quota errors, try switching to a different Gemini model in `backend/src/config/gemini.py`

**Notifications not appearing:**
- Check browser notification permissions
- Ensure the browser tab is open
- Try refreshing the page and setting up reminders again

**Frontend shows blank screen:**
- Check browser console for errors
- Ensure both backend and frontend servers are running
- Clear browser cache and localStorage
- Restart both servers

**Port conflicts:**
- If port 3001 is busy, change PORT in `.env`
- If port 5173 is busy, Vite will auto-switch to 5174
- Update FRONTEND_URL in backend `.env` accordingly

## 🔧 Development

**Backend development:**
```bash
cd backend
python main.py  # Auto-reload enabled with uvicorn
```

**Frontend development:**
```bash
cd frontend
npm run dev  # Vite hot-reload enabled
```

**Build for production:**
```bash
cd frontend
npm run build
```

## 🎨 Features Showcase

- **3D Clock Widget**: Glassmorphism design with dark navy/cyan theme, positioned top-left
- **Live Countdowns**: Real-time HH:MM:SS countdown for next medicine dose
- **Medicine Alerts**: Purple gradient alert cards when it's time to take medicine
- **Adherence Tracking**: Daily percentage with color-coded status (green/red)
- **Meal Recommendations**: Side-by-side green/red cards for recommended/avoid foods
- **Responsive Design**: Works on desktop and mobile browsers
- **Modern UI**: Purple/blue gradient theme with smooth animations

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💬 Support

For issues and questions, please open an issue on GitHub.

## 🏆 Built For

BWAI Hackathon - AI-Powered Health Companion

---

Made with ❤️ using React, FastAPI, and Google Gemini AI
