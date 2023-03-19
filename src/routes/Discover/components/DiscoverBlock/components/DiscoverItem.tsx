import React from 'react';
import '../styles/_discover-item.scss';
import store, {RootState} from "store";
import {setCurrentTrack} from "store/slices/player";
import {connect} from "react-redux";
import setPlay from "../../../../../store/actions/user/player/setPlay";

// TODO: Fix types here
interface IDiscoverItemProps {
  images: any[];
  name: any;
  uri: string;
  music_player?: any;
}

class DiscoverItem extends React.Component<IDiscoverItemProps> {
    playHandle = async () => {
        const req ={
            "device_id": this.props.music_player.id,
            "context_uri": this.props.uri,
            "offset": {
                "position": 0
            },
            "position_ms": 0
        }
        // @ts-ignore
        this.props.setCurrentTrack(this.props.uri);
        this.props.uri && await setPlay(req)
    }
  render = () => {
    const { images, name } = this.props;
    return (
      <div className="discover-item animate__animated animate__fadeIn" onClick={this.playHandle}>
        <div className="discover-item__art" style={{ backgroundImage: `url(${images[0].url})` }} />
        <p className="discover-item__title">{name}</p>
      </div>
    );
  };
}


const mapState = (state: RootState) => ({
    ...state,
    ...store,
});

const mapDispatch = {
    setCurrentTrack,
};
const connector = connect(mapState, mapDispatch);
export default connector(DiscoverItem)
