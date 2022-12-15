import axios from 'axios';
import { toastError } from '../components/Toast'

const instance = axios.create({
    // baseURL: 'https://api-buy-flower.votuan.xyz',
    baseURL: process.env.REACT_APP_API_END_POINT || 'https://api-buy-flower.votuan.xyz',
});

instance.interceptors.request.use(function(config) {
    const storageUser = localStorage.getItem('user');

    if (storageUser) {
        const { token } = JSON.parse(storageUser);
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`
        };
    }

    return config;
}, function(error) {

    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function(response) {

    return response;
}, function(error) {
    toastError(error);
    return Promise.reject(error);
});

export default instance;
