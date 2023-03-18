import React, {type FC, useEffect, useState} from "react";
import {ReactComponent as Avatar} from "../../../../assets/images/avatar.svg";
import {useDispatch, useSelector} from "react-redux";
import getTokenInfoFromQuery from "../../../../libs/helpers/getTokenInfoFromQuery";
import {setUserToken} from "../../../../store/slices/auth";
import getUser from "../../../../store/actions/user/getUser";
import {setUserStatus} from "../../../../store/slices/user";
import getDevices from "../../../../store/actions/user/player/getDevices";
import setPlay from "../../../../store/actions/user/player/setPlay";

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
    "images": object[] | null,
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
    const {user, isLogin, player} = useSelector(({user}: any) => user)
    const {token: {access_token}} = useSelector(({auth}: any) => auth)
    const loginHandler = async() => {
        // TODO ilk değiştirmede login olmuyor kontrol et
        // @ts-ignore
        await dispatch(getUser());
    }
    useEffect(()=> {
        dispatch(setUserToken(getTokenInfoFromQuery(document.location.hash)));
    },[document.location.hash])
    useEffect(()=> {
        if(!user.display_name && document){
            loginHandler();
        }
    },[user.display_name, access_token])
    const getPlayerInfo = async () => {
        // @ts-ignore
        await dispatch(getDevices());
    }
    useEffect(()=>{
        if(user.display_name){
            getPlayerInfo();
        }
    }, [user])

    if (user.display_name){
        return (
            <div className="sidebar__profile">
                <Avatar/>
                <p>{user.display_name ?? 'Bob Smith'}</p>
            </div>
        )
    }
    return (
        <a href={loginWithSpotifyURL()}>Login
            to Spotify</a>
    )
}

export default ProfileSection;
