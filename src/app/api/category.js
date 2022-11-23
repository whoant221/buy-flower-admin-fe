import axios from './axiosInstance';

const getAllCategories = (title = '') => {
    let url = '/api/admin/categories';
    if (title !== '') url += `?title=${title}`
    return axios.get(url);
};

const createCategory = ({
                            title,
                        }) => {
    return axios.post('/api/admin/categories', {
        title,
    });
};


export default {
    getAllCategories,
    createCategory
};