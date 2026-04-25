<div align="center">

# 🏥 MedMeal AI 💊

### *Your AI-Powered Health Companion*

**Manage prescriptions, track nutrition, and get personalized meal recommendations using cutting-edge AI technology**

[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Python FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Google Gemini AI](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![BWAI Hackathon 2026](https://img.shields.io/badge/BWAI%20Hackathon-2026-FF6B6B?style=for-the-badge)](https://github.com/kasa-maker/medmeal-ai)

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Tech Stack](#-tech-stack) • [API Documentation](#-api-documentation) • [Team](#-team)

---

</div>

---

</div>

## 📖 About The Project

MedMeal AI is a comprehensive health companion web application that leverages artificial intelligence to revolutionize how patients manage their medications and nutrition. Built for the BWAI Hackathon 2026, our platform combines prescription OCR, intelligent reminders, and personalized meal recommendations to improve patient adherence and health outcomes.

### 🎯 Problem Statement

- **70% of patients** forget to take their medications on time
- **Lack of awareness** about food-drug interactions
- **Difficulty reading** handwritten prescriptions
- **No personalized dietary guidance** based on medications

### 💡 Our Solution

MedMeal AI uses Google Gemini Vision AI to scan prescriptions, extract medicine details, set up intelligent reminders, and provide personalized meal recommendations based on your medications and health conditions.

---

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

---

## 🎥 Demo

<div align="center">

### 📱 Application Screenshots

| Prescription Scanner | Meal Recommendations | Live Countdown |
|:---:|:---:|:---:|
| ![Prescription Scanner](https://via.placeholder.com/300x200?text=Prescription+Scanner) | ![Meal Recommendations](https://via.placeholder.com/300x200?text=Meal+Recommendations) | ![Live Countdown](https://via.placeholder.com/300x200?text=Live+Countdown) |

*Replace placeholder images with actual screenshots*

**🔗 Live Demo:** [Coming Soon]

**🎬 Video Demo:** [Watch on YouTube](https://youtube.com)

</div>

---

## 🛠️ Tech Stack

---

## 🛠️ Tech Stack

<div align="center">

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

### Backend
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Uvicorn](https://img.shields.io/badge/Uvicorn-2C5F2D?style=for-the-badge&logo=gunicorn&logoColor=white)

### AI & ML
![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)
![Gemini Vision](https://img.shields.io/badge/Gemini_Vision-4285F4?style=for-the-badge&logo=google&logoColor=white)

### Tools & Libraries
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Pillow](https://img.shields.io/badge/Pillow-3776AB?style=for-the-badge&logo=python&logoColor=white)
![LocalStorage](https://img.shields.io/badge/LocalStorage-FFA500?style=for-the-badge&logo=html5&logoColor=white)

</div>

### 📦 Key Technologies

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Frontend Framework** | React 18 + Vite | Fast, modern UI with hot module replacement |
| **Backend Framework** | Python FastAPI | High-performance async API server |
| **AI Engine** | Google Gemini 2.5 Flash | Vision AI for OCR and image analysis |
| **Image Processing** | Pillow (PIL) | Image manipulation and preprocessing |
| **HTTP Client** | Axios | API communication with interceptors |
| **Routing** | React Router v6 | Client-side navigation |
| **Storage** | Browser localStorage | Client-side data persistence |
| **Notifications** | Browser Notification API | Medicine reminder alerts |

---

## 🚀 Installation

---

## 🚀 Installation

### 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.11+** - [Download here](https://www.python.org/downloads/)
- **Node.js 18+** and npm - [Download here](https://nodejs.org/)
- **Google Gemini API Key** - [Get free API key](https://aistudio.google.com/app/apikey)
- **Modern web browser** with camera access (Chrome, Firefox, Edge)

### ⚙️ Setup Instructions

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/kasa-maker/medmeal-ai.git
cd medmeal-ai
```

#### 2️⃣ Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env
```

Edit `.env` and add your Google Gemini API key:

```env
GEMINI_API_KEY=your_actual_api_key_here
PORT=3001
FRONTEND_URL=http://localhost:5173
```

> ⚠️ **Important:** Never commit your `.env` file to version control. It's already in `.gitignore`.

#### 3️⃣ Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Start the FastAPI server
python main.py
```

✅ Backend will run on **http://localhost:3001**

#### 4️⃣ Frontend Setup

Open a **new terminal** and run:

```bash
# Navigate to frontend directory
cd frontend

# Install Node.js dependencies
npm install

# Start the Vite dev server
npm run dev
```

✅ Frontend will run on **http://localhost:5173** (or 5174 if 5173 is busy)

#### 5️⃣ Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

🎉 **You're all set!** Start scanning prescriptions and tracking your health.

---

## 📱 Usage Guide

---

## 📱 Usage Guide

### 🔍 Scanning Prescriptions

<table>
<tr>
<td width="50%">

**Step 1: Navigate to Scanner**
- Click on **"Prescription Scanner"** from the home page
- Allow camera access when prompted

**Step 2: Capture Image**
- Use camera to capture prescription photo
- Or upload an existing image file
- Supports JPEG, PNG formats

**Step 3: Review Results**
- AI extracts medicine details automatically
- Review name, dosage, frequency, timing, duration

</td>
<td width="50%">

**Step 4: Set Reminders**
- Check time slots: Morning ☀️ / Afternoon 🌤️ / Evening 🌙
- Customize reminder times
- Click **"Save Reminder"** for each medicine

**Step 5: Enable Notifications**
- Allow browser notifications
- Receive alerts at scheduled times
- Track adherence in the log

</td>
</tr>
</table>

### 🍽️ Getting Meal Recommendations

1. **After scanning prescription**, scroll to results section
2. Click **"🍽️ Get Meal Recommendations"** button
3. AI analyzes your medicines and condition
4. View personalized recommendations:
   - ✅ **Recommended Foods** (green cards) - Foods that help recovery
   - ⚠️ **Foods to Avoid** (red cards) - Foods that may interfere with medicines

### 🥗 Analyzing Meals

1. Click **"Meal Scanner"** from home page
2. Add health conditions (optional): diabetes, hypertension, etc.
3. Capture or upload meal photo
4. View nutrition breakdown:
   - Total calories
   - Macros (protein, carbs, fats)
   - Health warnings
   - Recommended alternatives

### 📊 Tracking Adherence

- View **Medicine Log** at bottom of Prescription Scanner
- Filter by: Today / Week / All
- See taken vs missed doses
- Track adherence percentage
- Color-coded status: 🟢 Taken / 🔴 Missed

---

## 🔌 API Documentation

---

## 🔌 API Documentation

### Base URL
```
http://localhost:3001/api
```

### Endpoints

#### 1. Prescription Analysis

**POST** `/prescription/analyze`

Analyzes prescription images and extracts medicine information using Gemini Vision AI.

**Request:**
```http
POST /api/prescription/analyze
Content-Type: multipart/form-data

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

---

#### 2. Nutrition Analysis

**POST** `/nutrition/analyze`

Analyzes meal photos and returns detailed nutrition information.

**Request:**
```http
POST /api/nutrition/analyze
Content-Type: multipart/form-data

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
      "reason": "Better glycemic control for diabetes"
    }
  ]
}
```

---

#### 3. Meal Recommendations

**POST** `/meal/recommendations`

Generates personalized meal recommendations based on prescription and medical condition.

**Request:**
```http
POST /api/meal/recommendations
Content-Type: application/json

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
      "reason": "Provides essential fluids and electrolytes to combat dehydration"
    },
    {
      "name": "Bananas",
      "emoji": "🍌",
      "reason": "Rich in potassium, easily digestible"
    }
  ],
  "foodsToAvoid": [
    {
      "name": "Spicy Foods",
      "emoji": "🌶️",
      "reason": "Can irritate the digestive tract during fever"
    },
    {
      "name": "Alcohol",
      "emoji": "🍷",
      "reason": "Dehydrating and interferes with Paracetamol metabolism"
    }
  ]
}
```

### 📚 Interactive API Documentation

FastAPI provides automatic interactive API documentation:

- **Swagger UI:** http://localhost:3001/docs
- **ReDoc:** http://localhost:3001/redoc

---

## 💾 Data Storage

---

## 💾 Data Storage

MedMeal AI uses **browser localStorage** for client-side data persistence. This approach ensures:

- ✅ **Privacy First**: Your data never leaves your device
- ✅ **No Authentication**: Start using immediately without signup
- ✅ **Offline Access**: View your data without internet
- ✅ **Fast Performance**: No network latency for data retrieval

### 📦 Storage Schema

| Key | Description | Data Structure |
|-----|-------------|----------------|
| `medmeal_prescriptions` | Prescription scan history | Array of prescription objects with timestamps |
| `medmeal_meals` | Meal analysis history | Array of meal objects with nutrition data |
| `medmeal_reminders` | Active medicine reminders | Array of reminder objects with schedules |
| `medmeal_medicine_log` | Adherence tracking log | Array of taken/missed medicine records |
| `medmeal_user_conditions` | User health conditions | Array of condition strings |

### 🔐 Reminder Object Structure

```json
{
  "id": "1714089600000",
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

---

## 🔔 Browser Notifications

---

## 🔔 Browser Notifications

MedMeal AI uses the **Browser Notification API** to send timely medicine reminders.

### 🔧 How It Works

1. **Permission Request**: First-time users are prompted to allow notifications
2. **Background Monitoring**: App checks reminders every minute
3. **Smart Alerts**: Notifications appear at scheduled times
4. **Persistent Reminders**: Notifications require user interaction to dismiss

### ⚙️ Setup Requirements

- ✅ Allow notifications when prompted
- ✅ Keep browser tab open or running in background
- ✅ Ensure browser notification settings are enabled
- ✅ For best results, pin the tab or add to bookmarks

### 🌐 Browser Compatibility

| Browser | Notification Support | Recommended |
|---------|---------------------|-------------|
| Chrome 90+ | ✅ Full Support | ✅ Yes |
| Firefox 88+ | ✅ Full Support | ✅ Yes |
| Edge 90+ | ✅ Full Support | ✅ Yes |
| Safari 14+ | ⚠️ Limited | ⚠️ Partial |

---

## 🐛 Troubleshooting

<details>
<summary><b>📷 Camera not working</b></summary>

- Ensure you're accessing via `localhost` (required for camera API)
- Check browser permissions: Settings → Privacy → Camera
- Try using the **file upload** option instead
- Restart browser and try again

</details>

<details>
<summary><b>🔴 API errors / Failed to analyze</b></summary>

- Verify your **Google Gemini API key** in `.env`
- Check backend server is running on port 3001
- Ensure you have sufficient API quota
- Try switching to `gemini-2.5-flash` model if quota exceeded
- Check backend logs for detailed error messages

</details>

<details>
<summary><b>🔕 Notifications not appearing</b></summary>

- Check browser notification permissions
- Ensure browser tab is open (not closed)
- Try refreshing the page
- Clear browser cache and localStorage
- Re-setup reminders after clearing data

</details>

<details>
<summary><b>⚪ Frontend shows blank screen</b></summary>

- Open browser console (F12) to check for errors
- Ensure both backend and frontend servers are running
- Clear browser cache: Ctrl+Shift+Delete
- Clear localStorage: Console → `localStorage.clear()`
- Restart both servers

</details>

<details>
<summary><b>🔌 Port conflicts</b></summary>

- **Backend (3001 busy)**: Change `PORT` in `.env`
- **Frontend (5173 busy)**: Vite auto-switches to 5174
- Update `FRONTEND_URL` in backend `.env` accordingly
- Kill existing processes: `netstat -ano | findstr :3001`

</details>

---

## 🎨 Features Showcase

### 🕐 3D Clock Widget
- Glassmorphism design with dark navy/cyan theme
- Real-time countdown to next medicine dose
- Positioned top-left with perspective transform
- Glowing text effects with CSS animations

### ⏱️ Live Countdown Timers
- HH:MM:SS format with second-level precision
- Updates every second in real-time
- Shows time remaining until next dose
- Alert mode with purple gradient when it's time

### 📊 Adherence Tracking
- Daily/weekly/all-time statistics
- Color-coded status indicators (🟢 taken / 🔴 missed)
- Adherence percentage calculation
- Filterable medicine log

### 🍽️ Meal Recommendations
- Side-by-side layout (recommended vs avoid)
- Green gradient cards for recommended foods
- Red/orange gradient cards for foods to avoid
- Emoji icons with detailed health reasons

### 🎨 Modern UI/UX
- Purple/blue gradient theme
- Smooth animations and transitions
- Responsive design for all screen sizes
- Glassmorphism effects with backdrop blur

---

## 🚀 Future Enhancements

- [ ] **Firebase Integration** - Multi-device sync with cloud storage
- [ ] **Push Notifications** - FCM for mobile notifications
- [ ] **Medicine Interactions** - AI-powered drug interaction warnings
- [ ] **Pharmacy Integration** - Automatic refill reminders
- [ ] **Multi-language Support** - Localization for global users
- [ ] **Voice Reminders** - Text-to-speech for accessibility
- [ ] **Wearable Integration** - Smartwatch notifications
- [ ] **Telemedicine** - Connect with doctors directly
- [ ] **Insurance Claims** - Auto-generate claim documents
- [ ] **Family Accounts** - Manage medications for family members

---

## 👥 Team

<div align="center">

### Built with ❤️ for BWAI Hackathon 2026

| Role | Contributor |
|------|-------------|
| **Full Stack Developer** | [Your Name](https://github.com/kasa-maker) |
| **AI/ML Engineer** | [Your Name](https://github.com/kasa-maker) |
| **UI/UX Designer** | [Your Name](https://github.com/kasa-maker) |

*Add your team members' names and GitHub profiles*

</div>

---

## 🤝 Contributing

Contributions are what make the open-source community amazing! Any contributions you make are **greatly appreciated**.

### How to Contribute

1. **Fork** the Project
2. **Create** your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your Changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the Branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow existing code style and conventions
- Write clear commit messages
- Add comments for complex logic
- Test thoroughly before submitting PR
- Update documentation if needed

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` file for more information.

```
MIT License

Copyright (c) 2026 MedMeal AI Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Support & Contact

<div align="center">

### Need Help?

[![GitHub Issues](https://img.shields.io/badge/GitHub-Issues-red?style=for-the-badge&logo=github)](https://github.com/kasa-maker/medmeal-ai/issues)
[![Email](https://img.shields.io/badge/Email-Contact-blue?style=for-the-badge&logo=gmail)](mailto:your-email@example.com)

**Found a bug?** [Open an issue](https://github.com/kasa-maker/medmeal-ai/issues/new)

**Have a question?** [Start a discussion](https://github.com/kasa-maker/medmeal-ai/discussions)

</div>

---

## 🙏 Acknowledgments

- **Google Gemini AI** - For powerful vision and language models
- **FastAPI** - For the amazing Python web framework
- **React Team** - For the incredible frontend library
- **BWAI Hackathon** - For the opportunity to build this project
- **Open Source Community** - For inspiration and support

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

**Made with ❤️ for BWAI Hackathon 2026**

[![GitHub stars](https://img.shields.io/github/stars/kasa-maker/medmeal-ai?style=social)](https://github.com/kasa-maker/medmeal-ai/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/kasa-maker/medmeal-ai?style=social)](https://github.com/kasa-maker/medmeal-ai/network/members)
[![GitHub watchers](https://img.shields.io/github/watchers/kasa-maker/medmeal-ai?style=social)](https://github.com/kasa-maker/medmeal-ai/watchers)

[Report Bug](https://github.com/kasa-maker/medmeal-ai/issues) • [Request Feature](https://github.com/kasa-maker/medmeal-ai/issues) • [View Demo](#-demo)

</div>
