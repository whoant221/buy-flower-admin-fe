import axios from './axiosInstance';

const getAllColors = () => {
    return axios.get('/api/v1/vars/color');
};

export default {
    getAllColors
};