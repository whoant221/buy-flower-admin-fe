import axios from './axiosInstance';

const getAllBuds = (name = '') => {
    let url = '/api/admin/buds';
    if (name !== '') url += `?name=${name}`
    return axios.get(url);
};

const createBud = ({
                       name,
                   }) => {
    return axios.post('/api/admin/buds', {
        name,
    });
};


export default {
    getAllBuds,
    createBud
};