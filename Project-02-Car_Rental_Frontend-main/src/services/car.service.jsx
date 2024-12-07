import axios from "axios";
require('dotenv').config();
import { getToken } from "../utils/auth.utils";

// const API_URL = "http://localhost:3000/api/cars";
const API_URL = process.env.CARS;
const addCar = async (carData) => {
  const token = getToken();
  console.log(carData);
  const response = await axios.post(`${API_URL}`, carData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getAvailableCars = async () => {
  const token = getToken();
  const response = await axios.get(`${API_URL}/available`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const updateCarStatus = async (data) => {
  const token = getToken();
  const response = await axios.put(`${API_URL}/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);
  return response;
}

export { addCar, getAvailableCars ,updateCarStatus};
