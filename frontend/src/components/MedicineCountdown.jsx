import React, { useState, useEffect } from 'react';

function MedicineCountdown({ reminder, onTakeMedicine }) {
  const [timeRemaining, setTimeRemaining] = useState('');
  const [nextDoseTime, setNextDoseTime] = useState(null);
  const [isTimeToTake, setIsTimeToTake] = useState(false);

  useEffect(() => {
    const calculateNextDose = () => {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();

      // Find next scheduled time
      let nextTime = null;
      let minDiff = Infinity;

      reminder.schedule.forEach(slot => {
        if (!slot.enabled) return;

        const [hours, minutes] = slot.time.split(':').map(Number);
        const slotTime = hours * 60 + minutes;
        let diff = slotTime - currentTime;

        if (diff < 0) {
          diff += 24 * 60; // Next day
        }

        if (diff < minDiff) {
          minDiff = diff;
          nextTime = new Date(now);
          nextTime.setHours(hours, minutes, 0, 0);
          if (diff >= 24 * 60) {
            nextTime.setDate(nextTime.getDate() + 1);
          }
        }
      });

      setNextDoseTime(nextTime);

      // Check if it's time to take medicine (within 5 minutes)
      if (minDiff <= 5 && minDiff >= 0) {
        setIsTimeToTake(true);
      } else {
        setIsTimeToTake(false);
      }

      // Calculate time remaining
      if (nextTime) {
        const diff = nextTime - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        if (hours > 0) {
          setTimeRemaining(`${hours}h ${minutes}m`);
        } else if (minutes > 0) {
          setTimeRemaining(`${minutes}m ${seconds}s`);
        } else {
          setTimeRemaining(`${seconds}s`);
        }
      }
    };

    calculateNextDose();
    const interval = setInterval(calculateNextDose, 1000);

    return () => clearInterval(interval);
  }, [reminder]);

  return (
    <div style={isTimeToTake ? styles.containerAlert : styles.container}>
      <div style={styles.header}>
        <span style={styles.medicineName}>{reminder.medicineName}</span>
        <span style={styles.dosage}>{reminder.dosage}</span>
      </div>

      {isTimeToTake ? (
        <div style={styles.alertSection}>
          <div style={styles.bellIcon}>🔔</div>
          <p style={styles.alertText}>Time to take your medicine!</p>
          <button onClick={() => onTakeMedicine(reminder)} style={styles.takeButton}>
            ✓ I took my medicine
          </button>
        </div>
      ) : (
        <div style={styles.countdownSection}>
          <p style={styles.label}>Next dose in:</p>
          <p style={styles.countdown}>{timeRemaining}</p>
          {nextDoseTime && (
            <p style={styles.nextTime}>
              at {nextDoseTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    background: 'white',
    borderRadius: '15px',
    padding: '20px',
    marginBottom: '15px',
    border: '2px solid #e0e0e0',
  },
  containerAlert: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '15px',
    padding: '20px',
    marginBottom: '15px',
    border: '2px solid #667eea',
    animation: 'pulse 2s infinite',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
  medicineName: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#333',
  },
  dosage: {
    fontSize: '14px',
    color: '#666',
    background: '#f0f0f0',
    padding: '4px 12px',
    borderRadius: '12px',
  },
  countdownSection: {
    textAlign: 'center',
  },
  label: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '8px',
  },
  countdown: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#667eea',
    marginBottom: '5px',
  },
  nextTime: {
    fontSize: '14px',
    color: '#999',
  },
  alertSection: {
    textAlign: 'center',
  },
  bellIcon: {
    fontSize: '48px',
    marginBottom: '10px',
    animation: 'ring 1s infinite',
  },
  alertText: {
    fontSize: '18px',
    fontWeight: '600',
    color: 'white',
    marginBottom: '15px',
  },
  takeButton: {
    background: 'white',
    color: '#667eea',
    border: 'none',
    padding: '12px 30px',
    borderRadius: '25px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default MedicineCountdown;
