import React from 'react';
import { Link } from 'react-router-dom';
import Clock3D from '../components/Clock3D';

function Home() {
  return (
    <div style={styles.container}>
      <Clock3D />

      <div style={styles.hero}>
        <h1 style={styles.title}>Your AI Health Companion</h1>
        <p style={styles.subtitle}>
          Scan prescriptions and analyze meals with AI-powered vision technology
        </p>
      </div>

      <div style={styles.features}>
        <Link to="/prescription" style={styles.featureCard}>
          <div style={styles.icon}>💊</div>
          <h2 style={styles.featureTitle}>Prescription Scanner</h2>
          <p style={styles.featureDesc}>
            Scan handwritten prescriptions and get automatic medicine reminders
          </p>
          <button style={styles.button}>Start Scanning</button>
        </Link>

        <Link to="/meal" style={styles.featureCard}>
          <div style={styles.icon}>🍽️</div>
          <h2 style={styles.featureTitle}>Meal Nutrition Scanner</h2>
          <p style={styles.featureDesc}>
            Analyze your meals for calories, macros, and health insights
          </p>
          <button style={styles.button}>Analyze Meal</button>
        </Link>
      </div>

      <div style={styles.info}>
        <div style={styles.infoCard}>
          <h3 style={styles.infoTitle}>🔒 Privacy First</h3>
          <p style={styles.infoText}>All data stored locally on your device</p>
        </div>
        <div style={styles.infoCard}>
          <h3 style={styles.infoTitle}>🤖 AI Powered</h3>
          <p style={styles.infoText}>Claude Vision for accurate analysis</p>
        </div>
        <div style={styles.infoCard}>
          <h3 style={styles.infoTitle}>🔔 Smart Reminders</h3>
          <p style={styles.infoText}>Never miss your medicine schedule</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    position: 'relative',
  },
  hero: {
    textAlign: 'center',
    marginBottom: '60px',
  },
  title: {
    fontSize: '48px',
    fontWeight: '800',
    color: 'white',
    marginBottom: '20px',
  },
  subtitle: {
    fontSize: '20px',
    color: 'rgba(255, 255, 255, 0.9)',
    maxWidth: '600px',
    margin: '0 auto',
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    marginBottom: '60px',
  },
  featureCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '40px',
    textAlign: 'center',
    textDecoration: 'none',
    color: 'inherit',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
  },
  icon: {
    fontSize: '64px',
    marginBottom: '20px',
  },
  featureTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#333',
    marginBottom: '15px',
  },
  featureDesc: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '25px',
    lineHeight: '1.6',
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
    transition: 'transform 0.2s ease',
  },
  info: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
  infoCard: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    padding: '30px',
    textAlign: 'center',
  },
  infoTitle: {
    fontSize: '20px',
    color: 'white',
    marginBottom: '10px',
  },
  infoText: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.8)',
  },
};

export default Home;
