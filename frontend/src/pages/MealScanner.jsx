import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Camera from '../components/Camera';
import { analyzeMeal } from '../services/api';
import { storage } from '../services/storage';

function MealScanner() {
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [conditions, setConditions] = useState([]);
  const [newCondition, setNewCondition] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setConditions(storage.getConditions());
  }, []);

  const handleAddCondition = () => {
    if (newCondition.trim()) {
      const updated = [...conditions, newCondition.trim()];
      setConditions(updated);
      storage.saveConditions(updated);
      setNewCondition('');
    }
  };

  const handleRemoveCondition = (index) => {
    const updated = conditions.filter((_, i) => i !== index);
    setConditions(updated);
    storage.saveConditions(updated);
  };

  const handleImageCapture = async (file) => {
    setImageFile(file);
    setLoading(true);
    setError(null);

    try {
      const data = await analyzeMeal(file, conditions);

      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
        storage.saveMeal(data);
      }
    } catch (err) {
      setError('Failed to analyze meal. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImageFile(null);
    setResult(null);
    setError(null);
  };

  return (
    <div style={styles.container}>
      <button onClick={() => navigate('/')} style={styles.backButton}>
        ← Back to Home
      </button>

      <div style={styles.content}>
        <h1 style={styles.title}>Meal Nutrition Scanner</h1>
        <p style={styles.subtitle}>Analyze your meal for calories and nutrition info</p>

        <div style={styles.conditionsCard}>
          <h3 style={styles.conditionsTitle}>Your Health Conditions</h3>
          <div style={styles.conditionsList}>
            {conditions.length === 0 ? (
              <p style={styles.noConditions}>No conditions added yet</p>
            ) : (
              conditions.map((condition, index) => (
                <div key={index} style={styles.conditionTag}>
                  {condition}
                  <button
                    onClick={() => handleRemoveCondition(index)}
                    style={styles.removeButton}
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
          <div style={styles.addCondition}>
            <input
              type="text"
              value={newCondition}
              onChange={(e) => setNewCondition(e.target.value)}
              placeholder="e.g., diabetes, hypertension"
              style={styles.input}
              onKeyPress={(e) => e.key === 'Enter' && handleAddCondition()}
            />
            <button onClick={handleAddCondition} style={styles.addButton}>
              Add
            </button>
          </div>
        </div>

        {!imageFile && !loading && !result && (
          <div style={styles.cameraContainer}>
            <Camera onCapture={handleImageCapture} onFileSelect={handleImageCapture} />
          </div>
        )}

        {loading && (
          <div style={styles.loading}>
            <div style={styles.spinner}></div>
            <p style={styles.loadingText}>Analyzing meal...</p>
          </div>
        )}

        {error && (
          <div style={styles.error}>
            <p>{error}</p>
            <button onClick={handleReset} style={styles.button}>Try Again</button>
          </div>
        )}

        {result && (
          <div style={styles.results}>
            <h2 style={styles.resultsTitle}>Nutrition Analysis</h2>

            <div style={styles.caloriesCard}>
              <div style={styles.caloriesNumber}>{result.totalCalories}</div>
              <div style={styles.caloriesLabel}>Total Calories</div>
            </div>

            <div style={styles.macrosGrid}>
              <div style={styles.macroCard}>
                <div style={styles.macroValue}>{result.macros.protein}</div>
                <div style={styles.macroLabel}>Protein</div>
              </div>
              <div style={styles.macroCard}>
                <div style={styles.macroValue}>{result.macros.carbs}</div>
                <div style={styles.macroLabel}>Carbs</div>
              </div>
              <div style={styles.macroCard}>
                <div style={styles.macroValue}>{result.macros.fats}</div>
                <div style={styles.macroLabel}>Fats</div>
              </div>
            </div>

            <div style={styles.itemsSection}>
              <h3 style={styles.sectionTitle}>Food Items</h3>
              <div style={styles.itemsList}>
                {result.items.map((item, index) => (
                  <div key={index} style={styles.itemTag}>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {result.healthWarnings && result.healthWarnings.length > 0 && (
              <div style={styles.warningsSection}>
                <h3 style={styles.warningsTitle}>⚠️ Health Warnings</h3>
                {result.healthWarnings.map((warning, index) => (
                  <div key={index} style={styles.warningCard}>
                    {warning}
                  </div>
                ))}
              </div>
            )}

            {result.recommendedFoods && result.recommendedFoods.length > 0 && (
              <div style={styles.recommendedSection}>
                <h3 style={styles.recommendedTitle}>✨ Recommended Foods for Recovery</h3>
                <p style={styles.recommendedSubtitle}>
                  Based on your health conditions, these foods can help you recover faster
                </p>
                <div style={styles.recommendedGrid}>
                  {result.recommendedFoods.map((food, index) => (
                    <div key={index} style={styles.foodCard}>
                      <div style={styles.foodIcon}>🥗</div>
                      <div style={styles.foodName}>{food.name}</div>
                      <div style={styles.foodDescription}>{food.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button onClick={handleReset} style={styles.button}>Analyze Another</button>
          </div>
        )}
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
  title: {
    fontSize: '36px',
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: '30px',
  },
  conditionsCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '30px',
    marginBottom: '30px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
  },
  conditionsTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#333',
    marginBottom: '15px',
  },
  conditionsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '15px',
  },
  noConditions: {
    color: '#999',
    fontSize: '14px',
  },
  conditionTag: {
    background: '#667eea',
    color: 'white',
    padding: '8px 15px',
    borderRadius: '20px',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  removeButton: {
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '0',
  },
  addCondition: {
    display: 'flex',
    gap: '10px',
  },
  input: {
    flex: 1,
    padding: '10px 15px',
    borderRadius: '20px',
    border: '2px solid #e0e0e0',
    fontSize: '14px',
    outline: 'none',
  },
  addButton: {
    background: '#667eea',
    color: 'white',
    border: 'none',
    padding: '10px 25px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
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
  },
  resultsTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#333',
    marginBottom: '30px',
    textAlign: 'center',
  },
  caloriesCard: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '15px',
    padding: '30px',
    textAlign: 'center',
    marginBottom: '30px',
  },
  caloriesNumber: {
    fontSize: '48px',
    fontWeight: '800',
    color: 'white',
  },
  caloriesLabel: {
    fontSize: '18px',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  macrosGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '15px',
    marginBottom: '30px',
  },
  macroCard: {
    background: '#f8f9fa',
    borderRadius: '15px',
    padding: '20px',
    textAlign: 'center',
  },
  macroValue: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#667eea',
  },
  macroLabel: {
    fontSize: '14px',
    color: '#666',
    marginTop: '5px',
  },
  itemsSection: {
    marginBottom: '30px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#333',
    marginBottom: '15px',
  },
  itemsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  itemTag: {
    background: '#e8f5e9',
    color: '#2e7d32',
    padding: '8px 15px',
    borderRadius: '20px',
    fontSize: '14px',
  },
  warningsSection: {
    marginBottom: '30px',
  },
  warningsTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#f44336',
    marginBottom: '15px',
  },
  warningCard: {
    background: '#ffebee',
    color: '#c62828',
    padding: '15px',
    borderRadius: '10px',
    marginBottom: '10px',
    fontSize: '14px',
  },
  recommendedSection: {
    marginTop: '30px',
    padding: '25px',
    background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
    borderRadius: '15px',
    marginBottom: '30px',
  },
  recommendedTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#2e7d32',
    marginBottom: '8px',
  },
  recommendedSubtitle: {
    fontSize: '14px',
    color: '#558b2f',
    marginBottom: '20px',
  },
  recommendedGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
  },
  foodCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  foodIcon: {
    fontSize: '36px',
    marginBottom: '10px',
  },
  foodName: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#2e7d32',
    marginBottom: '8px',
  },
  foodDescription: {
    fontSize: '13px',
    color: '#666',
    lineHeight: '1.5',
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
    width: '100%',
  },
};

export default MealScanner;
