import axios from "axios";
import { getToken } from "../utils/auth.utils";

const API_URL = "https://car-rental-backend-ogfw.onrender.com/api/cars";
// const API_URL = import.meta.env.CARS;
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
