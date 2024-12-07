import axios from 'axios';
import { getToken } from '../utils/auth.utils';

const API_URL = 'https://car-rental-backend-ogfw.onrender.com/api/users';
// const API_URL = import.meta.env.USERS;
const getUserProfile = async () => {
  const token = getToken();
  const response = await axios.get(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

const updateUserProfile = async (userData) => {
  const token = getToken();
  const response = await axios.put(`${API_URL}/profile`, userData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export { getUserProfile, updateUserProfile };