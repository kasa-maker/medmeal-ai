export const storage = {
  getPrescriptions: () => {
    const data = localStorage.getItem('medmeal_prescriptions');
    return data ? JSON.parse(data) : [];
  },

  savePrescription: (prescription) => {
    const prescriptions = storage.getPrescriptions();
    prescriptions.unshift({ ...prescription, timestamp: new Date().toISOString() });
    localStorage.setItem('medmeal_prescriptions', JSON.stringify(prescriptions));
  },

  getMeals: () => {
    const data = localStorage.getItem('medmeal_meals');
    return data ? JSON.parse(data) : [];
  },

  saveMeal: (meal) => {
    const meals = storage.getMeals();
    meals.unshift({ ...meal, timestamp: new Date().toISOString() });
    localStorage.setItem('medmeal_meals', JSON.stringify(meals));
  },

  getReminders: () => {
    const data = localStorage.getItem('medmeal_reminders');
    return data ? JSON.parse(data) : [];
  },

  saveReminder: (reminder) => {
    const reminders = storage.getReminders();
    const newReminder = {
      ...reminder,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    reminders.push(newReminder);
    localStorage.setItem('medmeal_reminders', JSON.stringify(reminders));
    return newReminder;
  },

  updateReminder: (id, updates) => {
    const reminders = storage.getReminders();
    const index = reminders.findIndex(r => r.id === id);
    if (index !== -1) {
      reminders[index] = { ...reminders[index], ...updates };
      localStorage.setItem('medmeal_reminders', JSON.stringify(reminders));
    }
  },

  deleteReminder: (id) => {
    const reminders = storage.getReminders();
    const filtered = reminders.filter(r => r.id !== id);
    localStorage.setItem('medmeal_reminders', JSON.stringify(filtered));
  },

  getMedicineLog: () => {
    const data = localStorage.getItem('medmeal_medicine_log');
    return data ? JSON.parse(data) : [];
  },

  logMedicineTaken: (reminderId, medicineName, scheduledTime) => {
    const log = storage.getMedicineLog();
    log.unshift({
      id: Date.now().toString(),
      reminderId,
      medicineName,
      scheduledTime,
      takenAt: new Date().toISOString(),
      status: 'taken',
    });
    localStorage.setItem('medmeal_medicine_log', JSON.stringify(log));
  },

  logMedicineMissed: (reminderId, medicineName, scheduledTime) => {
    const log = storage.getMedicineLog();
    log.unshift({
      id: Date.now().toString(),
      reminderId,
      medicineName,
      scheduledTime,
      missedAt: new Date().toISOString(),
      status: 'missed',
    });
    localStorage.setItem('medmeal_medicine_log', JSON.stringify(log));
  },

  getConditions: () => {
    const data = localStorage.getItem('medmeal_user_conditions');
    return data ? JSON.parse(data) : [];
  },

  saveConditions: (conditions) => {
    localStorage.setItem('medmeal_user_conditions', JSON.stringify(conditions));
  },
};
