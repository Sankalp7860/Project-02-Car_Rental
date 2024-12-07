import axios from 'axios';
// const API_URL = 'http://localhost:3000/api/auth';
const API_URL = import.meta.env.AUTH;

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export { register, login };