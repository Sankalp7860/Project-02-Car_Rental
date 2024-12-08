import axios from 'axios';
import { useLoading } from '../utils/LoadingContext';
const API_URL = 'https://car-rental-backend-ogfw.onrender.com/api/auth';
// const API_URL = import.meta.env.AUTH;

const register = async (userData, showLoader, hideLoader) => {
  try {
    showLoader();
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    hideLoader();
  }
};

const login = async (email, password, showLoader, hideLoader) => {
  try {
    showLoader();
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    hideLoader();
  }
};

export { register, login };
