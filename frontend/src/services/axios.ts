import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
});

api.interceptors.request.use((cfg) => {
    const token = Cookies.get('XSRF-TOKEN');
    if (token) cfg.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
    return cfg;
});


export default api;
