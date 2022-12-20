import axios from './axiosInstance';

const getAnalyzeAccessPage = (from_date, to_date) => {
    return axios.get(`/api/admin/reports/analyze_access_page?from_date=${from_date}&to_date=${to_date}`);
};

const getAnalyzeProfit = () => {
    return axios.get(`/api/admin/reports/analyze_profit`);
};

const getAnalyzeProduct = () => {
    return axios.get(`/api/admin/reports/analyze_product`);
};

export default {
    getAnalyzeAccessPage,
    getAnalyzeProfit,
    getAnalyzeProduct
};
