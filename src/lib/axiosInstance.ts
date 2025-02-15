import axios from 'axios';
import { toast } from 'react-toastify';
import { envValues } from '../constants/envs';
import { getCookies } from '../utils/utils';

const instance = axios.create({
  baseURL: envValues.apiBaseUrl,
});

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  config => {
    const token = getCookies('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => Promise.reject(error),
);

let isRedirecting = false; 

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            const { status } = error.response;

            if (status === 401 && !isRedirecting) {
                isRedirecting = true; 
                document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                
                // toast.error('Your session has expired. Please log in again.', {
                //     position: 'top-right',
                //     autoClose: 3000,
                //     hideProgressBar: true,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                // });

                // setTimeout(() => {
                //     window.location.href = '/login';
                //     isRedirecting = false; 
                // }, 3000);

                // return Promise.reject(error);
                return null;
            }

            // if (status === 500) {
            //     toast.error('Internal server error.', {
            //         position: 'top-right',
            //         autoClose: 3000,
            //         hideProgressBar: true,
            //         closeOnClick: true,
            //         pauseOnHover: true,
            //     });
            // }
        }

        // toast.error('An unexpected error occurred.', {
        //     position: 'top-right',
        //     autoClose: 3000,
        //     hideProgressBar: true,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        // });
        // return Promise.reject(error);
        return null;
    },
);


export default instance;
export { axiosInstance };

