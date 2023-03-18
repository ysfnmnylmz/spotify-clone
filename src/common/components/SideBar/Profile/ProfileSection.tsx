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
    const [playback, setPlayback] = useState<any>(null)
    const [playbackID, setPlaybackID] = useState<string>('')
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

    useEffect(()=> {
        console.log(window)
        // @ts-ignore
        window.onSpotifyWebPlaybackSDKReady = () => {
            const token = access_token;
            // @ts-ignore
            setPlayback(new Spotify.Player({
                name: 'Spotify Clone Player',
                getOAuthToken: (cb: (arg0: string) => void): any => {
                    cb(token);
                },
                volume: 0.5
            }));
        }
    }, [window])

    useEffect(()=>{
        console.log({playback})
        if(playback){
            playback.addListener('ready', ({ device_id }: any) => {
                console.log('Ready with Device ID', device_id);
                setPlaybackID(device_id)
            });
            playback.addListener('not_ready', ({ device_id }: any) => {
                console.log('Device ID has gone offline', device_id);
            });

            playback.addListener('initialization_error', ({ message }: any) => {
                console.error(message);
            });

            playback.addListener('authentication_error', ({ message }: any) => {
                console.error(message);
            });

            playback.addListener('account_error', ({ message }: any) => {
                console.error(message);
            });
            playback.addListener('player_state_changed', ( (state: any):any => {

                if (!state) {
                    return;
                }

                console.log('current',state.track_window.current_track);
                console.log('paused',state.paused);


                playback.getCurrentState().then( (state: any):any => {
                    console.log('state',state)
                });

            }));
            playback.connect();
        }
    }, [playback])

    const playHandle = async () => {
        const req ={
            "device_id": playbackID,
            "context_uri": "spotify:album:5ht7ItJgpBH7W6vJ5BqpPr",
            "offset": {
                "position": 5
            },
            "position_ms": 0
        }
        await setPlay(req)
        // @ts-ignore
        await dispatch(getDevices())
    }
    if (user.display_name){
        return (
            <div className="sidebar__profile">
                {/*{console.log({devices: player.devices})}*/}
                <Avatar/>
                <p>{user.display_name ?? 'Bob Smith'}</p>
                <button onClick={playHandle}>TESSSSSST</button>
            </div>
        )
    }
    return (
        <a href={loginWithSpotifyURL()}>Login
            to Spotify</a>
    )
}

export default ProfileSection;
