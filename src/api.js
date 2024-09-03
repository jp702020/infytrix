import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const fetchSalesData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/data`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sales data:', error);
    return [];
  }
};

export const fetchSalesDataByDate = async (date) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/data`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sales data by date:', error);
    return [];
  }
};
