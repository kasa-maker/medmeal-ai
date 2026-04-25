import React, { useState, useEffect } from 'react';
import { storage } from '../services/storage';

function Clock3D() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextMedicine, setNextMedicine] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      calculateNextMedicine();
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const calculateNextMedicine = () => {
    const reminders = storage.getReminders();
    if (reminders.length === 0) {
      setNextMedicine(null);
      return;
    }

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    let nextDose = null;
    let minDiff = Infinity;

    reminders.forEach(reminder => {
      if (!reminder.enabled) return;

      reminder.schedule.forEach(slot => {
        if (!slot.enabled) return;

        const [hours, minutes] = slot.time.split(':').map(Number);
        const slotTime = hours * 60 + minutes;
        let diff = slotTime - currentTime;

        if (diff < 0) {
          diff += 24 * 60;
        }

        if (diff < minDiff) {
          minDiff = diff;
          nextDose = {
            medicine: reminder.medicineName,
            time: slot.time,
            diff: diff,
          };
        }
      });
    });

    if (nextDose) {
      const hours = Math.floor(nextDose.diff / 60);
      const minutes = nextDose.diff % 60;
      setTimeRemaining(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`);
      setNextMedicine(nextDose);
    } else {
      setNextMedicine(null);
    }
  };

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  return (
    <div style={styles.container}>
      <div style={styles.clockCard}>
        <div style={styles.clockFace}>
          <div style={styles.digitalTime}>
            <span style={styles.timeDigit}>{String(hours).padStart(2, '0')}</span>
            <span style={styles.timeSeparator}>:</span>
            <span style={styles.timeDigit}>{String(minutes).padStart(2, '0')}</span>
            <span style={styles.timeSeparator}>:</span>
            <span style={styles.timeDigitSmall}>{String(seconds).padStart(2, '0')}</span>
          </div>
          <div style={styles.dateDisplay}>
            {currentTime.toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric'
            })}
          </div>
        </div>

        {nextMedicine && (
          <div style={styles.nextMedicineCard}>
            <div style={styles.nextMedicineHeader}>
              <span style={styles.pillIcon}>💊</span>
              <span style={styles.nextLabel}>Next Medicine</span>
            </div>
            <div style={styles.medicineName}>{nextMedicine.medicine}</div>
            <div style={styles.medicineTime}>at {nextMedicine.time}</div>
            <div style={styles.countdown}>
              <span style={styles.countdownIcon}>⏱️</span>
              <span style={styles.countdownTime}>{timeRemaining}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed',
    top: '100px',
    left: '20px',
    zIndex: 100,
  },
  clockCard: {
    background: 'linear-gradient(145deg, #1a2332 0%, #0f1419 100%)',
    borderRadius: '15px',
    padding: '15px',
    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.6), inset 0 -3px 15px rgba(0, 0, 0, 0.4)',
    transform: 'perspective(800px) rotateX(5deg)',
    transition: 'transform 0.3s ease',
    minWidth: '140px',
    border: '1px solid rgba(0, 255, 255, 0.2)',
  },
  clockFace: {
    background: 'rgba(0, 255, 255, 0.08)',
    backdropFilter: 'blur(10px)',
    borderRadius: '10px',
    padding: '12px',
    marginBottom: '10px',
    boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.4), 0 3px 10px rgba(0, 255, 255, 0.15)',
    transform: 'translateZ(15px)',
    border: '1px solid rgba(0, 255, 255, 0.15)',
  },
  digitalTime: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '6px',
  },
  timeDigit: {
    fontSize: '22px',
    fontWeight: '800',
    color: '#00ffff',
    textShadow: '0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.4)',
    fontFamily: 'monospace',
  },
  timeDigitSmall: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#00e5e5',
    textShadow: '0 0 8px rgba(0, 255, 255, 0.6)',
    fontFamily: 'monospace',
  },
  timeSeparator: {
    fontSize: '22px',
    fontWeight: '800',
    color: '#00ffff',
    margin: '0 2px',
    textShadow: '0 0 10px rgba(0, 255, 255, 0.8)',
    animation: 'blink 1s infinite',
  },
  dateDisplay: {
    textAlign: 'center',
    fontSize: '9px',
    fontWeight: '600',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    textShadow: '0 0 5px rgba(255, 255, 255, 0.5)',
  },
  nextMedicineCard: {
    background: 'rgba(0, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '8px',
    padding: '10px',
    boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(0, 255, 255, 0.2)',
  },
  nextMedicineHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    marginBottom: '5px',
  },
  pillIcon: {
    fontSize: '12px',
  },
  nextLabel: {
    fontSize: '8px',
    fontWeight: '700',
    color: '#00ffff',
    textTransform: 'uppercase',
    letterSpacing: '0.3px',
    textShadow: '0 0 5px rgba(0, 255, 255, 0.6)',
  },
  medicineName: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '3px',
    textShadow: '0 0 5px rgba(255, 255, 255, 0.5)',
  },
  medicineTime: {
    fontSize: '9px',
    color: '#e0e0e0',
    marginBottom: '6px',
  },
  countdown: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    background: 'rgba(0, 255, 255, 0.15)',
    padding: '5px 8px',
    borderRadius: '6px',
    border: '1px solid rgba(0, 255, 255, 0.3)',
  },
  countdownIcon: {
    fontSize: '10px',
  },
  countdownTime: {
    fontSize: '12px',
    fontWeight: '800',
    color: '#00ffff',
    fontFamily: 'monospace',
    textShadow: '0 0 8px rgba(0, 255, 255, 0.8)',
  },
};

export default Clock3D;
