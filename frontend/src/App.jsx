import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import PrescriptionScanner from './pages/PrescriptionScanner';
import MealScanner from './pages/MealScanner';
import { storage } from './services/storage';
import { scheduleMedicineReminder } from './utils/notifications';

function App() {
  useEffect(() => {
    const checkReminders = () => {
      const reminders = storage.getReminders();
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      const currentDate = now.toISOString().split('T')[0];

      reminders.forEach(reminder => {
        if (!reminder.enabled) return;

        const startDate = new Date(reminder.startDate);
        const endDate = new Date(reminder.endDate);
        const today = new Date(currentDate);

        if (today >= startDate && today <= endDate) {
          reminder.schedule.forEach(slot => {
            if (slot.enabled && slot.time === currentTime) {
              scheduleMedicineReminder(reminder.medicineName, reminder.dosage, slot.time);
            }
          });
        }
      });
    };

    const interval = setInterval(checkReminders, 60000);
    checkReminders();

    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <div style={styles.app}>
        <nav style={styles.nav}>
          <Link to="/" style={styles.logo}>
            <h1 style={styles.logoText}>MedMeal AI</h1>
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prescription" element={<PrescriptionScanner />} />
          <Route path="/meal" element={<MealScanner />} />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  app: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  nav: {
    padding: '20px 40px',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
  },
  logo: {
    textDecoration: 'none',
  },
  logoText: {
    color: 'white',
    fontSize: '28px',
    fontWeight: '700',
    margin: 0,
  },
};

export default App;
