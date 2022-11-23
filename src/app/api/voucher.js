import axios from './axiosInstance';

const getVouchers = (state = '') => {
    return axios.get('/api/admin/vouchers', { params: { state } });
};

const createVoucher = ({
                           code,
                           content,
                           discount,
                           effective_at,
                           expiration_at,
                           limit_count,
                           max_amount,
                           threshold,
                           title
                       }) => {
    return axios.post('/api/admin/vouchers', {
        code,
        content,
        discount,
        effective_at,
        expiration_at,
        limit_count,
        max_amount,
        threshold,
        title
    });
};


export default {
    getVouchers,
    createVoucher
};