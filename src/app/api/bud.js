import axios from './axiosInstance';

const getAllBuds = (name = '') => {
    let url = '/api/admin/buds';
    if (name !== '') url += `?name=${name}`
    return axios.get(url);
};

const createBud = ({
    name,
    count
}) => {
    return axios.post('/api/admin/buds', {
        name,
        count
    });
};

const updateBud = ({
    name,
    count,
    id
}) => {
    return axios.put(`/api/admin/buds/${id}`, {
        name,
        count
    });
};


export default {
    getAllBuds,
    createBud,
    updateBud
};