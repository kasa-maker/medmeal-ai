export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    console.warn('This browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

export const showNotification = (title, options = {}) => {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      icon: '/pill-icon.png',
      badge: '/pill-icon.png',
      ...options,
    });
  }
};

export const scheduleMedicineReminder = (medicineName, dosage, time) => {
  showNotification('Medicine Reminder', {
    body: `Time to take ${medicineName} - ${dosage}`,
    tag: `medicine-${medicineName}`,
    requireInteraction: true,
  });
};
