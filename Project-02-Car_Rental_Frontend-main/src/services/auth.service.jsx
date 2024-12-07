import axios from 'axios';
require('dotenv').config();
// const API_URL = 'http://localhost:3000/api/auth';
const API_URL = process.env.AUTH;

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export { register, login };