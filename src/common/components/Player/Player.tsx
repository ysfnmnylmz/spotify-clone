import React, {FC, useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faStepForward,
    faPlayCircle,
    faStepBackward,
    faEllipsisH,
    faPauseCircle
} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faRandom } from '@fortawesome/free-solid-svg-icons';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';
import { faVolumeDown } from '@fortawesome/free-solid-svg-icons';
import './_player.scss';
import {useDispatch, useSelector} from "react-redux";
import setPlay from "../../../store/actions/user/player/setPlay";
import getDevices from "../../../store/actions/user/player/getDevices";
import msToMinutes from "../../../libs/helpers/msToMinutes";
import setPause from "../../../store/actions/user/player/setPause";
import setNext from "../../../store/actions/user/player/setNext";
import setPrev from "../../../store/actions/user/player/setPrev";

const Player: FC = () => {

    const [playback, setPlayback] = useState<any>(null)
    const [current, setCurrent] = useState<any>(null)
    const [played, setPlayed] = useState<boolean>(false)
    const [paused, setPaused] = useState<boolean>(false)
    const [currentPlayTime, setCurrentPlayTime] = useState<number>(0)
    const [playbackID, setPlaybackID] = useState<string>('')
    const dispatch = useDispatch();
    const {user, isLogin, player} = useSelector(({user}: any) => user)
    const {token: {access_token}} = useSelector(({auth}: any) => auth)
    useEffect(()=> {
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
    const playerStatus = () => {
        if(!played) {
            setPaused(true)
        }
        setPlayed(prev => !prev)
    }
    const changeSongHandle = async (type: 'next' | 'prev') => {
        const req ={
            "device_id": playbackID,
        }
        type === 'next' && await setNext(req)
        type === 'prev' && await setPrev(req)

    }
    const playHandle = async () => {
        const req ={
            "device_id": playbackID,
            "context_uri": "spotify:album:5ht7ItJgpBH7W6vJ5BqpPr",
            "offset": {
                "position": 5
            },
            "position_ms": 0
        }
        !played ? await setPlay(req) : await setPause(req)
        playerStatus();
        // @ts-ignore
        await dispatch(getDevices())
    }
    useEffect(()=>{
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
                console.log(state)
                // if (state){
                //     setInterval(()=> {
                //         setCurrentPlayTime(prev => prev + 1000)
                //     }, 1000)
                // }
                setCurrent(state.track_window.current_track)
                console.log('current',state.track_window.current_track);
                playback.getCurrentState().then( (state: any):any => {

                });

            }));
            playback.connect();
        }
    }, [playback])
    return(
        <div className="player">
            <div className="player__album">
                {current ? <img className="player__album__image" src={current.album.images.find((i: any)=> i.size === 'SMALL').url} /> :<span/>}
                <div className="player__album__playing">
                    <p style={{width: 142}}>{current?.name ?? "Nothing's playing"}</p>
                    <p className="player__album__playing_artist">{current?.artists?.[0].name}</p>
                </div>
            </div>
            <div className="player__controls">
                <FontAwesomeIcon icon={faStepBackward} onClick={()=> changeSongHandle('prev')} />
                <FontAwesomeIcon icon={played ? faPauseCircle : faPlayCircle} onClick={playHandle} />
                <FontAwesomeIcon icon={faStepForward} onClick={()=> changeSongHandle('next')}/>
            </div>
            <div className="player__seekbar" >
                {current && <span className="player__seekbar__current">{msToMinutes(currentPlayTime)}</span>}
                {current && <span className="player__seekbar__max">{msToMinutes(current?.duration_ms)}</span>}
            </div>
            <div className="player__actions">
                <FontAwesomeIcon icon={faEllipsisH} />
                <FontAwesomeIcon icon={faHeart} />
                <FontAwesomeIcon icon={faRandom} />
                <FontAwesomeIcon icon={faRetweet} />
                <FontAwesomeIcon icon={faVolumeDown} />
            </div>
        </div>
    )
}
export default Player;
