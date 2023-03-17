import axios from 'axios';

var client_id = '3951be1186b040f88187b5f099c3468e';
var secret = '23f652f630894eb8b32ff8e57f0ce44e';

const BASE_URL = 'https://api.spotify.com';
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
