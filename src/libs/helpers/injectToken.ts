import {AxiosRequestConfig} from "axios";
import getTokenInfoFromQuery from "./getTokenInfoFromQuery";
const injectToken = async (config: AxiosRequestConfig) => {
    const token = getTokenInfoFromQuery(document.location.hash)
    if (token && (token.access_token && token.token_type)) {
        config.headers.Authorization = `${token.token_type} ${token.access_token}`;
    }
    return config;
};

export default injectToken;
