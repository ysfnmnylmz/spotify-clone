import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import { connect, ConnectedProps } from 'react-redux';
import '../styles/_discover.scss';
import getToken from '../../../store/actions/auth/getToken';
import store, { RootState } from '../../../store';

// TODO: Fix `any` types here
const mapState = (state: RootState) => ({
  ...store,
});

const mapDispatch = {
  getToken: getToken,
};
const connector = connect(mapState, mapDispatch);

type IDiscoverProps = ConnectedProps<typeof connector>;

interface IDiscoverState {
  newReleases: any[];
  playlists: any[];
  categories: any[];
}
class Discover extends Component<IDiscoverProps, IDiscoverState> {
  constructor(props: IDiscoverProps) {
    super(props);

    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
    };
  }
  // @ts-ignore
  getTokenHandler = async () => {
    // @ts-ignore
    const {access_token, expire_time} = this.props.getState().auth?.token;
    const isExpiredToken = expire_time - Date.now() < 1000;
    if(!access_token && isExpiredToken){
      // @ts-ignore
      this.props.getToken({
        grant_type: 'client_credentials',
        client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
        client_secret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
      });
    }
  };

  componentDidMount() {
    this.getTokenHandler();
  }

  // TODO: Handle APIs

  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
      </div>
    );
  }
}

export default connector(Discover);
