import React, { useState, useEffect } from 'react';
import { storage } from '../services/storage';

function MedicineLog() {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState('today'); // today, week, all

  useEffect(() => {
    loadLogs();
  }, [filter]);

  const loadLogs = () => {
    const allLogs = storage.getMedicineLog();
    const now = new Date();

    let filtered = allLogs;

    if (filter === 'today') {
      const today = now.toDateString();
      filtered = allLogs.filter(log => {
        const logDate = new Date(log.takenAt || log.missedAt).toDateString();
        return logDate === today;
      });
    } else if (filter === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      filtered = allLogs.filter(log => {
        const logDate = new Date(log.takenAt || log.missedAt);
        return logDate >= weekAgo;
      });
    }

    setLogs(filtered);
  };

  const formatTime = (isoString) => {
    return new Date(isoString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStats = () => {
    const taken = logs.filter(l => l.status === 'taken').length;
    const missed = logs.filter(l => l.status === 'missed').length;
    const total = taken + missed;
    const percentage = total > 0 ? Math.round((taken / total) * 100) : 0;

    return { taken, missed, total, percentage };
  };

  const stats = getStats();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>📊 Medicine Log</h3>
        <div style={styles.filters}>
          <button
            onClick={() => setFilter('today')}
            style={filter === 'today' ? styles.filterActive : styles.filter}
          >
            Today
          </button>
          <button
            onClick={() => setFilter('week')}
            style={filter === 'week' ? styles.filterActive : styles.filter}
          >
            Week
          </button>
          <button
            onClick={() => setFilter('all')}
            style={filter === 'all' ? styles.filterActive : styles.filter}
          >
            All
          </button>
        </div>
      </div>

      {logs.length > 0 && (
        <div style={styles.statsCard}>
          <div style={styles.statItem}>
            <div style={styles.statValue}>{stats.percentage}%</div>
            <div style={styles.statLabel}>Adherence</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statValue}>{stats.taken}</div>
            <div style={styles.statLabel}>Taken</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statValue}>{stats.missed}</div>
            <div style={styles.statLabel}>Missed</div>
          </div>
        </div>
      )}

      <div style={styles.logList}>
        {logs.length === 0 ? (
          <p style={styles.empty}>No medicine logs for this period</p>
        ) : (
          logs.map((log) => (
            <div key={log.id} style={styles.logItem}>
              <div style={styles.logIcon}>
                {log.status === 'taken' ? '✓' : '✕'}
              </div>
              <div style={styles.logDetails}>
                <div style={styles.logMedicine}>{log.medicineName}</div>
                <div style={styles.logTime}>
                  {log.status === 'taken' ? 'Taken' : 'Missed'} at{' '}
                  {formatTime(log.takenAt || log.missedAt)}
                </div>
              </div>
              <div
                style={
                  log.status === 'taken'
                    ? styles.statusTaken
                    : styles.statusMissed
                }
              >
                {log.status}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: 'white',
    borderRadius: '20px',
    padding: '25px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    marginTop: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#333',
    margin: 0,
  },
  filters: {
    display: 'flex',
    gap: '8px',
  },
  filter: {
    background: '#f0f0f0',
    color: '#666',
    border: 'none',
    padding: '6px 16px',
    borderRadius: '15px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  filterActive: {
    background: '#667eea',
    color: 'white',
    border: 'none',
    padding: '6px 16px',
    borderRadius: '15px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  statsCard: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '15px',
    marginBottom: '20px',
    padding: '20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '15px',
  },
  statItem: {
    textAlign: 'center',
  },
  statValue: {
    fontSize: '28px',
    fontWeight: '800',
    color: 'white',
    marginBottom: '5px',
  },
  statLabel: {
    fontSize: '13px',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  logList: {
    maxHeight: '400px',
    overflowY: 'auto',
  },
  empty: {
    textAlign: 'center',
    color: '#999',
    padding: '30px',
    fontSize: '14px',
  },
  logItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    background: '#f8f9fa',
    borderRadius: '12px',
    marginBottom: '10px',
  },
  logIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: '700',
    marginRight: '15px',
    background: '#e8f5e9',
    color: '#4CAF50',
  },
  logDetails: {
    flex: 1,
  },
  logMedicine: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '4px',
  },
  logTime: {
    fontSize: '13px',
    color: '#666',
  },
  statusTaken: {
    background: '#e8f5e9',
    color: '#4CAF50',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  statusMissed: {
    background: '#ffebee',
    color: '#f44336',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
};

export default MedicineLog;
