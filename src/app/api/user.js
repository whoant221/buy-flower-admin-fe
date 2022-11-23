import axios from './axiosInstance';

const getAllUsers = (email = '') => {
    let url = '/api/admin/users';
    if (email !== '') url += `?email=${email}`
    return axios.get(url);
};

const createUser = ({
                        email,
                        password,
                        password_confirmation,
                        name,
                        address,
                        phone_number
                    }) => {
    return axios.post('/api/admin/users', {
        email,
        password,
        password_confirmation,
        name,
        address,
        phone_number
    });
};


export default {
    getAllUsers,
    createUser
};