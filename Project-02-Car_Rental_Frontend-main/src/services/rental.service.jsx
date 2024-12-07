import axios from 'axios';
import { getToken } from '../utils/auth.utils';

const API_URL = 'https://car-rental-backend-ogfw.onrender.com/api/rentals';
// const API_URL = import.meta.env.RENTALS;
const rentCar = async (rentalData) => {
  const token = getToken();
  const response = await axios.post(`${API_URL}`, rentalData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

const makePayment = async (paymentData) => {
  const token = getToken();
  const response = await axios.post(`${API_URL}/payment`, paymentData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export { rentCar, makePayment };