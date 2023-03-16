import axios from 'axios';

const BASE_URL = 'spotify_base_url';
const timeout = 10000;

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout,
});

axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';
axiosInstance.defaults.headers.common['Accept'] = '*';

axiosInstance.interceptors.request.use(
    async config => {
        return config;
    },
    err => Promise.reject(err)
);

axiosInstance.interceptors.response.use(
    response => {
        return Promise.resolve(response);
    },
    error => {
        return Promise.reject(error);
    }
);
export default axiosInstance;
