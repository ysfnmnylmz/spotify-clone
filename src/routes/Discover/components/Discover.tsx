import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import { connect, ConnectedProps } from 'react-redux';
import getToken from 'store/actions/auth/getToken';
import newRelease from "store/actions/browse/newRelease";
import featuredPlaylists from "store/actions/browse/featuredPlaylists";
import getCategories from "store/actions/browse/categories";
import store, { type RootState } from 'store';

import '../styles/_discover.scss';

interface IAlbumImage {
  height: number,
  url: string,
  width: number
}
interface IArtists {
  "external_urls": any,
  "href": string,
  "id": string,
  "name": string,
  "type": string,
  "uri": string
}
interface INewRelease {
  album_group: string,
  album_type: string,
  artists: IArtists[],
  available_markets: string[],
  external_urls: any,
  href: string,
  id: string,
  images: IAlbumImage[],
  is_playable: boolean,
  name: string,
  release_date: string,
  release_date_precision: string,
  total_tracks: number,
  type: string,
  uri: string
}
// TODO: Fix `any` types here
const mapState = (state: RootState) => ({
  ...state,
  ...store,
});

const mapDispatch = {
  getToken,
  newRelease,
  featuredPlaylists,
  getCategories
};
const connector = connect(mapState, mapDispatch);

type IDiscoverProps = ConnectedProps<typeof connector>;

interface IDiscoverState {
  newReleases: INewRelease [];
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
    if((!access_token || isExpiredToken) && document.location.hash === '' ){
      // @ts-ignore
      this.props.getToken({
        grant_type: 'client_credentials',
        client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
        client_secret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
      });
    }

  };
  getDatas = (new_release: any, featured_playlists: any, categories: any) => {
    // @ts-ignore
    const {access_token} = this.props.getState().auth?.token;
    if(access_token) {
      !new_release && this.props.newRelease();
      !featured_playlists && this.props.featuredPlaylists();
      !categories && this.props.getCategories();
    }
  }
  componentDidMount() {
    this.getTokenHandler();
  }
  componentDidUpdate(prevProps: Readonly<IDiscoverProps>, prevState: Readonly<IDiscoverState>, snapshot?: any) {
    const { browse: {new_release, featured_playlists, categories} }: any = prevProps
    if(!new_release || !featured_playlists || !categories){
      this.getDatas(new_release, featured_playlists, categories);
    }
  }

  // TODO: Handle APIs

  render() {
    const { browse: {new_release, featured_playlists, categories} }: any = this.props.getState();
    if(!new_release && !featured_playlists && !categories) return null
    return (
      <div className="discover">
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={new_release} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={featured_playlists} />
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
      </div>
    );
  }
}

export default connector(Discover);
