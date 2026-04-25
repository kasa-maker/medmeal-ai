import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Camera from '../components/Camera';
import MedicineCountdown from '../components/MedicineCountdown';
import MedicineLog from '../components/MedicineLog';
import NextDoseCountdown from '../components/NextDoseCountdown';
import { analyzePrescription, getMealRecommendations } from '../services/api';
import { storage } from '../services/storage';
import { requestNotificationPermission, showNotification } from '../utils/notifications';

function PrescriptionScanner() {
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [reminders, setReminders] = useState([]);
  const [editingSchedule, setEditingSchedule] = useState({});
  const [mealRecommendations, setMealRecommendations] = useState(null);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    loadReminders();

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const checkNotifications = () => {
      reminders.forEach(reminder => {
        if (!reminder.enabled) return;

        const now = new Date();
        const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        reminder.schedule.forEach(slot => {
          if (slot.enabled && slot.time === currentTime) {
            showNotification('🔔 Medicine Reminder', {
              body: `Time to take ${reminder.medicineName} - ${reminder.dosage}`,
              tag: `medicine-${reminder.id}`,
            });
          }
        });
      });
    };

    const interval = setInterval(checkNotifications, 60000);
    return () => clearInterval(interval);
  }, [reminders]);

  const loadReminders = () => {
    setReminders(storage.getReminders());
  };

  const handleImageCapture = async (file) => {
    setImageFile(file);
    setLoading(true);
    setError(null);

    try {
      const data = await analyzePrescription(file);

      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
        storage.savePrescription(data);

        // Initialize editing schedule for each medicine
        const initialSchedule = {};
        data.medicines.forEach((medicine, index) => {
          initialSchedule[index] = {
            morning: { enabled: false, time: '08:00' },
            afternoon: { enabled: false, time: '14:00' },
            evening: { enabled: false, time: '20:00' },
          };
        });
        setEditingSchedule(initialSchedule);
      }
    } catch (err) {
      setError('Failed to analyze prescription. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleScheduleChange = (medicineIndex, slot, field, value) => {
    setEditingSchedule(prev => ({
      ...prev,
      [medicineIndex]: {
        ...prev[medicineIndex],
        [slot]: {
          ...prev[medicineIndex][slot],
          [field]: value,
        },
      },
    }));
  };

  const handleSaveReminder = async (medicine, medicineIndex) => {
    const hasPermission = await requestNotificationPermission();

    if (!hasPermission) {
      alert('Please enable notifications to set reminders');
      return;
    }

    const schedule = editingSchedule[medicineIndex];
    const scheduleArray = [];

    if (schedule.morning.enabled) {
      scheduleArray.push({ slot: 'morning', time: schedule.morning.time, enabled: true });
    }
    if (schedule.afternoon.enabled) {
      scheduleArray.push({ slot: 'afternoon', time: schedule.afternoon.time, enabled: true });
    }
    if (schedule.evening.enabled) {
      scheduleArray.push({ slot: 'evening', time: schedule.evening.time, enabled: true });
    }

    if (scheduleArray.length === 0) {
      alert('Please select at least one time slot');
      return;
    }

    const duration = parseInt(medicine.duration) || 7;
    const startDate = new Date().toISOString().split('T')[0];
    const endDate = new Date(Date.now() + duration * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const reminder = {
      medicineName: medicine.name,
      dosage: medicine.dosage,
      frequency: medicine.frequency,
      timing: medicine.timing,
      schedule: scheduleArray,
      startDate,
      endDate,
      enabled: true,
    };

    storage.saveReminder(reminder);
    loadReminders();
    alert(`✓ Reminder saved for ${medicine.name}!`);
  };

  const handleTakeMedicine = (reminder) => {
    const now = new Date();
    const scheduledTime = now.toISOString();

    storage.logMedicineTaken(reminder.id, reminder.medicineName, scheduledTime);
    alert(`✓ Logged: ${reminder.medicineName} taken`);
    loadReminders();
  };

  const handleReset = () => {
    setImageFile(null);
    setResult(null);
    setError(null);
    setEditingSchedule({});
    setMealRecommendations(null);
    setShowRecommendations(false);
  };

  const handleGetMealRecommendations = async () => {
    if (!result || !result.medicines) return;

    setLoadingRecommendations(true);
    try {
      const recommendations = await getMealRecommendations(
        result.medicines,
        result.condition || null
      );
      setMealRecommendations(recommendations);
      setShowRecommendations(true);
    } catch (err) {
      console.error('Failed to get meal recommendations:', err);
      alert('Failed to get meal recommendations. Please try again.');
    } finally {
      setLoadingRecommendations(false);
    }
  };

  const formatDateTime = (date) => {
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div style={styles.container}>
      <button onClick={() => navigate('/')} style={styles.backButton}>
        ← Back to Home
      </button>

      <div style={styles.content}>
        <div style={styles.headerSection}>
          <h1 style={styles.title}>Prescription Scanner</h1>
          <div style={styles.dateTimeCard}>
            <span style={styles.clockIcon}>🕐</span>
            <span style={styles.dateTime}>{formatDateTime(currentTime)}</span>
          </div>
        </div>

        <p style={styles.subtitle}>Scan your prescription to extract medicine details</p>

        {reminders.length > 0 && (
          <NextDoseCountdown reminders={reminders} />
        )}

        {!imageFile && !loading && !result && (
          <div style={styles.cameraContainer}>
            <Camera onCapture={handleImageCapture} onFileSelect={handleImageCapture} />
          </div>
        )}

        {loading && (
          <div style={styles.loading}>
            <div style={styles.spinner}></div>
            <p style={styles.loadingText}>Analyzing prescription...</p>
          </div>
        )}

        {error && (
          <div style={styles.error}>
            <p>{error}</p>
            <button onClick={handleReset} style={styles.button}>Try Again</button>
          </div>
        )}

        {result && result.medicines && result.medicines.length > 0 && (
          <div style={styles.results}>
            <h2 style={styles.resultsTitle}>Extracted Medicines</h2>
            {result.medicines.map((medicine, index) => (
              <div key={index} style={styles.medicineCard}>
                <h3 style={styles.medicineName}>{medicine.name}</h3>
                <div style={styles.medicineDetails}>
                  <p><strong>Dosage:</strong> {medicine.dosage}</p>
                  <p><strong>Frequency:</strong> {medicine.frequency}</p>
                  <p><strong>Timing:</strong> {medicine.timing}</p>
                  <p><strong>Duration:</strong> {medicine.duration}</p>
                </div>

                <div style={styles.scheduleSection}>
                  <h4 style={styles.scheduleTitle}>⏰ Set Reminder Schedule</h4>

                  <div style={styles.scheduleSlot}>
                    <label style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={editingSchedule[index]?.morning.enabled || false}
                        onChange={(e) => handleScheduleChange(index, 'morning', 'enabled', e.target.checked)}
                        style={styles.checkbox}
                      />
                      <span style={styles.slotName}>🌅 Morning</span>
                    </label>
                    <input
                      type="time"
                      value={editingSchedule[index]?.morning.time || '08:00'}
                      onChange={(e) => handleScheduleChange(index, 'morning', 'time', e.target.value)}
                      disabled={!editingSchedule[index]?.morning.enabled}
                      style={styles.timeInput}
                    />
                  </div>

                  <div style={styles.scheduleSlot}>
                    <label style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={editingSchedule[index]?.afternoon.enabled || false}
                        onChange={(e) => handleScheduleChange(index, 'afternoon', 'enabled', e.target.checked)}
                        style={styles.checkbox}
                      />
                      <span style={styles.slotName}>☀️ Afternoon</span>
                    </label>
                    <input
                      type="time"
                      value={editingSchedule[index]?.afternoon.time || '14:00'}
                      onChange={(e) => handleScheduleChange(index, 'afternoon', 'time', e.target.value)}
                      disabled={!editingSchedule[index]?.afternoon.enabled}
                      style={styles.timeInput}
                    />
                  </div>

                  <div style={styles.scheduleSlot}>
                    <label style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={editingSchedule[index]?.evening.enabled || false}
                        onChange={(e) => handleScheduleChange(index, 'evening', 'enabled', e.target.checked)}
                        style={styles.checkbox}
                      />
                      <span style={styles.slotName}>🌙 Evening</span>
                    </label>
                    <input
                      type="time"
                      value={editingSchedule[index]?.evening.time || '20:00'}
                      onChange={(e) => handleScheduleChange(index, 'evening', 'time', e.target.value)}
                      disabled={!editingSchedule[index]?.evening.enabled}
                      style={styles.timeInput}
                    />
                  </div>

                  <button
                    onClick={() => handleSaveReminder(medicine, index)}
                    style={styles.saveReminderButton}
                  >
                    💾 Save Reminder
                  </button>
                </div>
              </div>
            ))}
            <button onClick={handleReset} style={styles.button}>Scan Another</button>

            <button
              onClick={handleGetMealRecommendations}
              style={styles.mealRecommendationsButton}
              disabled={loadingRecommendations}
            >
              {loadingRecommendations ? (
                <>
                  <div style={styles.buttonSpinner}></div>
                  Loading Recommendations...
                </>
              ) : (
                <>
                  🍽️ Get Meal Recommendations
                </>
              )}
            </button>

            {showRecommendations && mealRecommendations && (
              <div style={styles.recommendationsContainer}>
                <h2 style={styles.recommendationsTitle}>
                  Meal Recommendations for {mealRecommendations.condition}
                </h2>

                <div style={styles.recommendationsGrid}>
                  <div style={styles.recommendedSection}>
                    <h3 style={styles.sectionHeader}>✅ Recommended Foods</h3>
                    {mealRecommendations.recommendedFoods?.map((food, index) => (
                      <div key={index} style={styles.recommendedCard}>
                        <div style={styles.foodHeader}>
                          <span style={styles.foodEmoji}>{food.emoji}</span>
                          <span style={styles.foodName}>{food.name}</span>
                        </div>
                        <p style={styles.foodReason}>{food.reason}</p>
                      </div>
                    ))}
                  </div>

                  <div style={styles.avoidSection}>
                    <h3 style={styles.sectionHeader}>⚠️ Foods to Avoid</h3>
                    {mealRecommendations.foodsToAvoid?.map((food, index) => (
                      <div key={index} style={styles.avoidCard}>
                        <div style={styles.foodHeader}>
                          <span style={styles.foodEmoji}>{food.emoji}</span>
                          <span style={styles.foodName}>{food.name}</span>
                        </div>
                        <p style={styles.foodReason}>{food.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {reminders.length > 0 && (
          <div style={styles.remindersSection}>
            <h2 style={styles.sectionTitle}>Active Medicine Reminders</h2>
            {reminders.map((reminder) => (
              <MedicineCountdown
                key={reminder.id}
                reminder={reminder}
                onTakeMedicine={handleTakeMedicine}
              />
            ))}
          </div>
        )}

        <MedicineLog />
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    padding: '20px',
  },
  backButton: {
    background: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '20px',
    fontSize: '14px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  content: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  headerSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    flexWrap: 'wrap',
    gap: '15px',
  },
  title: {
    fontSize: '36px',
    fontWeight: '700',
    color: 'white',
  },
  dateTimeCard: {
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    padding: '12px 20px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  clockIcon: {
    fontSize: '20px',
  },
  dateTime: {
    color: 'white',
    fontSize: '14px',
    fontWeight: '600',
  },
  subtitle: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: '40px',
  },
  cameraContainer: {
    background: 'white',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
  },
  loading: {
    background: 'white',
    borderRadius: '20px',
    padding: '60px',
    textAlign: 'center',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '5px solid #f3f3f3',
    borderTop: '5px solid #667eea',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 20px',
  },
  loadingText: {
    fontSize: '18px',
    color: '#666',
  },
  error: {
    background: 'white',
    borderRadius: '20px',
    padding: '40px',
    textAlign: 'center',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    color: '#f44336',
  },
  results: {
    background: 'white',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    marginBottom: '30px',
  },
  resultsTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#333',
    marginBottom: '20px',
  },
  medicineCard: {
    background: '#f8f9fa',
    borderRadius: '15px',
    padding: '25px',
    marginBottom: '20px',
  },
  medicineName: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#667eea',
    marginBottom: '15px',
  },
  medicineDetails: {
    marginBottom: '20px',
    paddingBottom: '20px',
    borderBottom: '2px solid #e0e0e0',
  },
  scheduleSection: {
    marginTop: '20px',
  },
  scheduleTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#333',
    marginBottom: '15px',
  },
  scheduleSlot: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 15px',
    background: 'white',
    borderRadius: '10px',
    marginBottom: '10px',
    border: '2px solid #e0e0e0',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
  },
  checkbox: {
    width: '20px',
    height: '20px',
    cursor: 'pointer',
  },
  slotName: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#333',
  },
  timeInput: {
    padding: '8px 12px',
    borderRadius: '8px',
    border: '2px solid #e0e0e0',
    fontSize: '15px',
    fontWeight: '600',
    fontFamily: 'monospace',
    color: '#667eea',
  },
  saveReminderButton: {
    background: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '20px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    width: '100%',
    marginTop: '10px',
  },
  button: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    padding: '12px 30px',
    borderRadius: '25px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '20px',
  },
  remindersSection: {
    marginTop: '30px',
  },
  sectionTitle: {
    fontSize: '22px',
    fontWeight: '700',
    color: 'white',
    marginBottom: '20px',
  },
  mealRecommendationsButton: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '25px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '20px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  },
  buttonSpinner: {
    width: '20px',
    height: '20px',
    border: '3px solid rgba(255, 255, 255, 0.3)',
    borderTop: '3px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  recommendationsContainer: {
    marginTop: '30px',
    padding: '30px',
    background: '#f8f9fa',
    borderRadius: '20px',
    border: '2px solid #e0e0e0',
  },
  recommendationsTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#333',
    marginBottom: '25px',
    textAlign: 'center',
  },
  recommendationsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '25px',
  },
  recommendedSection: {
    background: 'rgba(76, 175, 80, 0.05)',
    borderRadius: '15px',
    padding: '20px',
    border: '2px solid rgba(76, 175, 80, 0.3)',
  },
  avoidSection: {
    background: 'rgba(255, 87, 34, 0.05)',
    borderRadius: '15px',
    padding: '20px',
    border: '2px solid rgba(255, 87, 34, 0.3)',
  },
  sectionHeader: {
    fontSize: '18px',
    fontWeight: '700',
    marginBottom: '15px',
    color: '#333',
  },
  recommendedCard: {
    background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
    borderRadius: '12px',
    padding: '15px',
    marginBottom: '12px',
    boxShadow: '0 4px 10px rgba(76, 175, 80, 0.3)',
  },
  avoidCard: {
    background: 'linear-gradient(135deg, #FF5722 0%, #f4511e 100%)',
    borderRadius: '12px',
    padding: '15px',
    marginBottom: '12px',
    boxShadow: '0 4px 10px rgba(255, 87, 34, 0.3)',
  },
  foodHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '8px',
  },
  foodEmoji: {
    fontSize: '24px',
  },
  foodName: {
    fontSize: '16px',
    fontWeight: '700',
    color: 'white',
  },
  foodReason: {
    fontSize: '13px',
    color: 'rgba(255, 255, 255, 0.95)',
    lineHeight: '1.5',
    margin: 0,
  },
};

export default PrescriptionScanner;
