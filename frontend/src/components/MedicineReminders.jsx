import React, { useState, useEffect } from 'react';
import { storage } from '../services/storage';

function MedicineReminders() {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = () => {
    setReminders(storage.getReminders());
  };

  const toggleReminder = (id) => {
    const reminder = reminders.find(r => r.id === id);
    if (reminder) {
      storage.updateReminder(id, { enabled: !reminder.enabled });
      loadReminders();
    }
  };

  const deleteReminder = (id) => {
    if (window.confirm('Are you sure you want to delete this reminder?')) {
      storage.deleteReminder(id);
      loadReminders();
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (reminders.length === 0) {
    return (
      <div style={styles.container}>
        <h2 style={styles.title}>Medicine Reminders</h2>
        <p style={styles.empty}>No reminders set yet. Scan a prescription to get started!</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Medicine Reminders</h2>
      <div style={styles.remindersList}>
        {reminders.map((reminder) => (
          <div key={reminder.id} style={styles.reminderCard}>
            <div style={styles.reminderHeader}>
              <h3 style={styles.medicineName}>{reminder.medicineName}</h3>
              <label style={styles.toggle}>
                <input
                  type="checkbox"
                  checked={reminder.enabled}
                  onChange={() => toggleReminder(reminder.id)}
                  style={styles.checkbox}
                />
                <span style={styles.toggleLabel}>
                  {reminder.enabled ? 'Enabled' : 'Disabled'}
                </span>
              </label>
            </div>

            <div style={styles.reminderDetails}>
              <p><strong>Dosage:</strong> {reminder.dosage}</p>
              <p><strong>Times:</strong> {reminder.schedule.map(s => s.time).join(', ')}</p>
              <p><strong>Duration:</strong> {formatDate(reminder.startDate)} - {formatDate(reminder.endDate)}</p>
            </div>

            <button
              onClick={() => deleteReminder(reminder.id)}
              style={styles.deleteButton}
            >
              🗑️ Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: 'white',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#333',
    marginBottom: '20px',
  },
  empty: {
    color: '#999',
    fontSize: '16px',
    textAlign: 'center',
    padding: '20px',
  },
  remindersList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  reminderCard: {
    background: '#f8f9fa',
    borderRadius: '15px',
    padding: '20px',
    border: '2px solid #e0e0e0',
  },
  reminderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
  medicineName: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#667eea',
    margin: 0,
  },
  toggle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
  },
  toggleLabel: {
    fontSize: '14px',
    color: '#666',
    fontWeight: '600',
  },
  reminderDetails: {
    marginBottom: '15px',
    fontSize: '14px',
    color: '#666',
  },
  deleteButton: {
    background: '#f44336',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '15px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default MedicineReminders;
