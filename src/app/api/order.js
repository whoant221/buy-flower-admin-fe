import axios from './axiosInstance';

const getOrders = () => {
    return axios.get('/api/admin/orders');
};

const markAsProcessing = (orderId) => {
    return axios.post(`api/admin/orders/${orderId}/mark_as_processing`);
};

const markAsSuccessful = (orderId) => {
    return axios.post(`api/admin/orders/${orderId}/mark_as_successful`);
};

const markAsCancelled = (orderId) => {
    return axios.post(`api/admin/orders/${orderId}/mark_as_cancelled`);
};


export default {
    getOrders,
    markAsProcessing,
    markAsSuccessful,
    markAsCancelled
};
