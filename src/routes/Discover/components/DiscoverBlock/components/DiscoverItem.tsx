import React from 'react';
import '../styles/_discover-item.scss';
import store, {RootState} from "store";
import {setCurrentTrack} from "store/slices/player";
import {connect} from "react-redux";

// TODO: Fix types here
interface IDiscoverItemProps {
  images: any[];
  name: any;
  uri: string;
}

class DiscoverItem extends React.Component<IDiscoverItemProps> {
    playHandle = () => {
        console.log(123)
        // @ts-ignore
        this.props.setCurrentTrack(this.props.uri);
    }
  render = () => {
    const { images, name, uri } = this.props;
    return (
      <div className="discover-item animate__animated animate__fadeIn" onClick={this.playHandle}>
        <div className="discover-item__art" style={{ backgroundImage: `url(${images[0].url})` }} />
        <p className="discover-item__title">{name}</p>
      </div>
    );
  };
}


const mapState = (state: RootState) => ({
    ...store,
});

const mapDispatch = {
    setCurrentTrack,
};
const connector = connect(mapState, mapDispatch);
export default connector(DiscoverItem)
