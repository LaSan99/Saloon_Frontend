import axios from 'axios';

const API_URL = 'https://saloon-bakcend.vercel.app/api/v1';

export const getAllServices = async () => {
  try {
    const response = await axios.get(`${API_URL}/services`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getServiceById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/services/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};