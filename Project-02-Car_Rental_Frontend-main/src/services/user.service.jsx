import axios from 'axios';
require('dotenv').config();
import { getToken } from '../utils/auth.utils';

// const API_URL = 'http://localhost:3000/api/users';
const API_URL = process.env.USERS;
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