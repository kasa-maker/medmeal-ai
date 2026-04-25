import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const analyzePrescription = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await api.post('/prescription/analyze', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const analyzeMeal = async (imageFile, healthConditions = []) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  if (healthConditions.length > 0) {
    formData.append('healthConditions', healthConditions.join(','));
  }

  const response = await api.post('/nutrition/analyze', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getMealRecommendations = async (medicines, condition = null) => {
  const response = await api.post('/meal/recommendations', {
    medicines,
    condition,
  });
  return response.data;
};

export default api;
