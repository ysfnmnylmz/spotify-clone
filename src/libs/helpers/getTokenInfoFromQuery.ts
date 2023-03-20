interface IToken {
    access_token: string,
    token_type: string,
    expires_in: number
}
const getTokenInfoFromQuery = (hash: string): IToken => {
    const authState = JSON.parse(localStorage.getItem('persist:root') as string) || null;
    let token_info;
    if(authState) {
        const {token} = JSON.parse(authState.auth)
        token_info = token
    }else {
        token_info = JSON.parse(sessionStorage.getItem('auth') as string)
    }
    if (hash) {
        const queryParams = hash.substring(1).split('&')
        token_info.access_token = queryParams.find(el => el.startsWith('access_token'))?.split('=')[1]
        token_info.token_type = queryParams.find(el => el.startsWith('token_type'))?.split('=')[1]
        token_info.expires_in = Number(queryParams.find(el => el.startsWith('expires_in'))?.split('=')[1])
    }
    console.log({token_info})
    return token_info
}

export default getTokenInfoFromQuery;
