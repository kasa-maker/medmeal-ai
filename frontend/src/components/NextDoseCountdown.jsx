import React, { useState, useEffect } from 'react';

function NextDoseCountdown({ reminders }) {
  const [nextDose, setNextDose] = useState(null);
  const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateNextDose = () => {
      if (!reminders || reminders.length === 0) {
        setNextDose(null);
        return;
      }

      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();

      let nextDoseInfo = null;
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
            const nextTime = new Date(now);
            nextTime.setHours(hours, minutes, 0, 0);
            if (diff >= 24 * 60) {
              nextTime.setDate(nextTime.getDate() + 1);
            }

            nextDoseInfo = {
              medicine: reminder.medicineName,
              dosage: reminder.dosage,
              time: slot.time,
              nextTime: nextTime,
            };
          }
        });
      });

      setNextDose(nextDoseInfo);

      if (nextDoseInfo) {
        const diff = nextDoseInfo.nextTime - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setCountdown({ hours, minutes, seconds });
      }
    };

    calculateNextDose();
    const interval = setInterval(calculateNextDose, 1000);

    return () => clearInterval(interval);
  }, [reminders]);

  if (!nextDose) {
    return null;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.icon}>⏰</span>
        <span style={styles.title}>Next Dose Countdown</span>
      </div>

      <div style={styles.medicineInfo}>
        <div style={styles.medicineName}>{nextDose.medicine}</div>
        <div style={styles.dosage}>{nextDose.dosage}</div>
      </div>

      <div style={styles.scheduledTime}>
        Scheduled at <strong>{nextDose.time}</strong>
      </div>

      <div style={styles.countdownDisplay}>
        <div style={styles.timeBlock}>
          <div style={styles.timeValue}>{String(countdown.hours).padStart(2, '0')}</div>
          <div style={styles.timeLabel}>Hours</div>
        </div>
        <div style={styles.timeSeparator}>:</div>
        <div style={styles.timeBlock}>
          <div style={styles.timeValue}>{String(countdown.minutes).padStart(2, '0')}</div>
          <div style={styles.timeLabel}>Minutes</div>
        </div>
        <div style={styles.timeSeparator}>:</div>
        <div style={styles.timeBlock}>
          <div style={styles.timeValue}>{String(countdown.seconds).padStart(2, '0')}</div>
          <div style={styles.timeLabel}>Seconds</div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '20px',
    padding: '30px',
    marginBottom: '30px',
    boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
  icon: {
    fontSize: '24px',
  },
  title: {
    fontSize: '20px',
    fontWeight: '700',
    color: 'white',
  },
  medicineInfo: {
    marginBottom: '15px',
  },
  medicineName: {
    fontSize: '24px',
    fontWeight: '800',
    color: 'white',
    marginBottom: '5px',
  },
  dosage: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  scheduledTime: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.85)',
    marginBottom: '20px',
  },
  countdownDisplay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    padding: '20px',
    borderRadius: '15px',
  },
  timeBlock: {
    textAlign: 'center',
  },
  timeValue: {
    fontSize: '36px',
    fontWeight: '800',
    color: 'white',
    fontFamily: 'monospace',
    textShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
  },
  timeLabel: {
    fontSize: '11px',
    color: 'rgba(255, 255, 255, 0.8)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginTop: '5px',
  },
  timeSeparator: {
    fontSize: '36px',
    fontWeight: '800',
    color: 'white',
    animation: 'blink 1s infinite',
  },
};

export default NextDoseCountdown;
