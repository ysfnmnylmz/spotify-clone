interface IToken {
    access_token: string,
    token_type: string,
    expires_in: number
}
const getTokenInfoFromQuery = (hash: string): IToken => {
    const token_info = {
        access_token: '',
        token_type: '',
        expires_in: 0
    }
    if (hash) {
        const queryParams = hash.substring(1).split('&')
        // @ts-ignore
        token_info.access_token = queryParams.find(el => el.startsWith('access_token')).split('=')[1]
        // @ts-ignore
        token_info.token_type = queryParams.find(el => el.startsWith('token_type')).split('=')[1]
        // @ts-ignore
        token_info.expires_in = Number(queryParams.find(el => el.startsWith('expires_in')).split('=')[1])
    }
    return token_info
}

export default getTokenInfoFromQuery;
