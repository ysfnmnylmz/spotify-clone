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
  getTokenHandler = async () => {
    console.log(this.props.getState());
    // @ts-ignore
    this.props.getToken({
      grant_type: 'client_credentials',
      client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
      client_secret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
    });
  };
  componentDidMount() {
    console.log(this.state, this.props);
    console.log(process.env.REACT_APP_SPOTIFY_CLIENT_ID);
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
