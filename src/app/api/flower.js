import axios from './axiosInstance';

const getAllFlowers = (data) => {
    return axios.get('/api/admin/flowers', {
        params: {
            name: data?.name,
            color: data?.color,
            category_id: data?.category_id
        }
    });
};

const createFlower = ({
    name,
    color,
    original_price,
    sale_price,
    description,
    images,
    category_ids,
    bud_data
}) => {
    return axios.post('/api/admin/flowers', {
        name,
        color,
        original_price,
        sale_price,
        description,
        images,
        category_ids,
        bud_data,
    });
};


const updateFlower = ({
    name,
    color,
    original_price,
    sale_price,
    description,
    images,
    category_ids,
    bud_data,
    id
}) => {
    return axios.put(`/api/admin/flowers/${id}`, {
        name,
        color,
        original_price,
        sale_price,
        description,
        images,
        category_ids,
        bud_data,
    });
};


export default {
    getAllFlowers,
    createFlower,
    updateFlower
};