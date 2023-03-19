import React, {type FC, useEffect} from "react";
import {ReactComponent as Avatar} from "assets/images/avatar.svg";
import {useDispatch, useSelector} from "react-redux";
import getTokenInfoFromQuery from "libs/helpers/getTokenInfoFromQuery";
import {setUserToken} from "store/slices/auth";
import getUser from "store/actions/user/getUser";
import {IAlbumImage} from "../../../../types/components/Discover";

interface IExternalURL {
    spotify: string
}
interface IFollowers {
    href: string,
    total: number
}

interface IUserInfo {
    "display_name": string | null,
    "external_urls": IExternalURL | null,
    "followers": IFollowers | null,
    "href": string | null,
    "id": string | null,
    "images": IAlbumImage[] | null,
    "type": string | null,
    "uri": string | null
}
interface IProfileProps {
    user_info: IUserInfo,
    isLogin: boolean
}
// spotify:album:79ONNoS4M9tfIA1mYLBYVX

const loginWithSpotifyURL = () => {
    const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = process.env.REACT_APP_SPOTIFY_USER_AUTH_URL
    const RESPONSE_TYPE = "token"
    const SCOPE = process.env.REACT_APP_SPOTIFY_SCOPES
    return `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&scope=${SCOPE}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`
}
const ProfileSection:FC = () => {
    const dispatch = useDispatch();
    const {user} = useSelector(({user}: any) => user)
    const {token: {access_token}, isUserLogin} = useSelector(({auth}: any) => auth)
    const loginHandler = async() => {
        const queryToken = getTokenInfoFromQuery(document.location.hash)
        if(access_token !== queryToken.access_token) {
            // @ts-ignore
            await dispatch(getUser());
        }
    }
    const loginCheck = async () => {
        await dispatch(setUserToken(getTokenInfoFromQuery(document.location.hash)));
    }
    useEffect(()=> {
        loginCheck();
    },[document.location.hash])
    useEffect(()=> {
        if(!user.display_name){
            loginHandler();
        }
    },[user.display_name, isUserLogin, access_token])
    if (isUserLogin && user.display_name){
        return (
            <div className="sidebar__profile">
                <Avatar/>
                <p>{user.display_name ?? 'Bob Smith'}</p>
            </div>
        )
    }
    return (
        <a href={loginWithSpotifyURL()} className="sidebar__login_with_spotify"><span>Login with Spotify</span></a>
    )
}

export default ProfileSection;
