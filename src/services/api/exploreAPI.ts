import axios from 'axios';
import { getCookies } from '../../utils/utils';

export const API_BASE_URL = 'https://api.lusso.dev/api/v1';

export const fetchProducts = async () => {
  const token = getCookies('authToken');

  try {
    const response = await axios.get(`${API_BASE_URL}/products?size=100&active=true`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    let data: any[] = response.data.products;
    return data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching products:', error.response?.data || error.message);

      if (error.response?.status === 401) {
        console.log("Unauthorized access - redirecting to login.");
        // Redirect to login page using window.location
        window.location.href = '/login';
      } else {
        throw error; // Re-throw other errors
      }
    }
    throw error; // Re-throw non-Axios errors
  }
};
