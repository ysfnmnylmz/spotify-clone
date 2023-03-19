import React, {FC, useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faStepForward,
    faPlayCircle,
    faStepBackward,
    faEllipsisH,
    faPauseCircle,
    faHeart,
    faRandom,
    faRetweet,
    faVolumeDown
} from '@fortawesome/free-solid-svg-icons';
import './_player.scss';
import {useDispatch, useSelector} from "react-redux";
import setPlay from "store/actions/user/player/setPlay";
import getDevices from "store/actions/user/player/getDevices";
import msToMinutes from "libs/helpers/msToMinutes";
import setPause from "store/actions/user/player/setPause";
import setNext from "store/actions/user/player/setNext";
import setPrev from "store/actions/user/player/setPrev";
import {setPlayerID} from "../../../store/slices/player";

const Player: FC = () => {

    const [playback, setPlayback] = useState<any>(null)
    const [current, setCurrent] = useState<any>(null)
    const [played, setPlayed] = useState<boolean>(false)
    const [paused, setPaused] = useState<boolean>(false)
    const [currentPlayTime, setCurrentPlayTime] = useState<number>(0)
    const [playbackID, setPlaybackID] = useState<string>('')
    const dispatch = useDispatch();
    const {current_track} = useSelector(({music_player}: any) => music_player)
    const {token: {access_token}} = useSelector(({auth}: any) => auth)
    useEffect(()=> {
        // @ts-ignore
        window.onSpotifyWebPlaybackSDKReady = () => {
            const token = access_token;
            // @ts-ignore
            setPlayback(new Spotify.Player({
                name: 'Spotify Clone Player',
                getOAuthToken: (cb: (arg0: string) => void): void => {
                    cb(token);
                },
                volume: 0.01
            }));
        }
    }, [window, access_token])
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
            "context_uri": current_track,
            "offset": {
                "position": 0
            },
            "position_ms": paused ? currentPlayTime : 0
        }
        !played ? await setPlay(req) : await setPause(req)
        playerStatus();
        // @ts-ignore
        await dispatch(getDevices())
    }
    const getCurrentLineWidth = (): string => {
        let max = 0, curr = 0, percent = 0;
        if(current?.duration_ms){
            max = current.duration_ms;
            curr = currentPlayTime
            percent = (curr / max) * 100
        }
        return `${percent}%`
    }
    useEffect(()=>{
        if(playback){
            playback.addListener('ready', ({ device_id }: any) => {
                setPlaybackID(device_id)
                dispatch(setPlayerID(device_id))
            });
            playback.addListener('not_ready', ({ device_id }: any) => {
            });

            playback.addListener('initialization_error', ({ message, ...o }: any) => {
                console.error(message);
            });

            playback.addListener('authentication_error', ({ message }: any) => {
                console.error(message);
            });

            playback.addListener('account_error', ({ message, ...o }: any) => {
                console.error(message);
            });

            playback.addListener('progress', ({position}: any) => {
                setCurrentPlayTime(position);
            });
            playback.addListener('player_state_changed', ( (state: any):any => {
                if (!state) {
                    return;
                }
                setCurrent(state.track_window.current_track)
                playback.getCurrentState().then( (state: any):any => {
                    (!state)? setPlayed(false) : setPlayed(!state.paused)
                });

            }));
            playback.connect();
        }
    }, [playback])
    return(
        <div className="player">
            <div className="player__album">
                {current ? <img className="player__album__image" src={current.album.images.find((i: any)=> i.size === 'SMALL').url} alt={current?.name} /> :<span/>}
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
                <div className="player__seekbar__active_line" style={{width: getCurrentLineWidth()}} />
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
