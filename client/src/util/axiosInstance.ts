// axiosInstance.js
import axios from 'axios';
import config from '@/common/config.ts';

const axiosInstance = axios.create({
    baseURL: `${config.API}/api`,
    withCredentials: true
});

axiosInstance.interceptors.response.use(response => response, async error => {
    if (error.response.status === 401 && !error.config._retry) {
        error.config._retry = true;
        try {
            const res = await axios.post(`${config.API}/api/auth/refresh`);
            const { accessToken } = res.data;
            localStorage.setItem('accessToken', accessToken);
            error.config.headers['Authorization'] = `Bearer ${accessToken}`;
            return axiosInstance(error.config);
        } catch (refreshError) {
            return Promise.reject(refreshError);
        }
    }
    return Promise.reject(error);
});

export default axiosInstance;
