import {AxiosRequestConfig} from "axios";
import getTokenInfoFromQuery from "./getTokenInfoFromQuery";
const injectToken = async (config: AxiosRequestConfig) => {
    const a = getTokenInfoFromQuery(document.location.hash)
    if (a.access_token && a.token_type) {
        config.headers.Authorization = `${a.token_type} ${a.access_token}`;
    }
    return config;
};

export default injectToken;
