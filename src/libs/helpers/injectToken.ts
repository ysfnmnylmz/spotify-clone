import {AxiosRequestConfig} from "axios";
const injectToken = async (config: AxiosRequestConfig) => {
    const authState = JSON.parse(localStorage.getItem('persist:root') as string) || null;
    const {token: {access_token, token_type}} = JSON.parse(authState.auth)
    if (access_token && token_type) {
        config.headers.Authorization = `${token_type} ${access_token}`;
    }
    return config;
};

export default injectToken;
