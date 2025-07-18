// API Configuration
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';

export const API_CONFIG = {
  BASE_URL: BACKEND_URL,
  USER_API: `${BACKEND_URL}/user`,
  RECIPE_API: `${BACKEND_URL}/recipe`,
};

export default API_CONFIG; 