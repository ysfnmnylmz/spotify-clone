import React from 'react';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphonesAlt, faHeart, faPlayCircle, faSearch, faStream } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Avatar } from '../../../assets/images/avatar.svg';
import './_sidebar.scss';
import * as process from "process";

//TODO: Fix types here

const loginWithSpotifyURL = () => {
    const CLIENT_ID = '3951be1186b040f88187b5f099c3468e';
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    return `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`
}
const renderSideBarOption = (link: any, icon: any, text: any, { selected }: any = {}) => {
  return (
    <div className={cx('sidebar__option', { 'sidebar__option--selected': selected })}>
      <FontAwesomeIcon icon={icon} />
      <p>{text}</p>
    </div>
  );
};

export default class SideBar extends React.Component {

  render = () => (
    <div className="sidebar">
      <div className="sidebar__profile">
          <a href={loginWithSpotifyURL()}>Login
              to Spotify</a>
        <Avatar />
        <p>Bob Smith</p>
      </div>
      <div className="sidebar__options">
        {renderSideBarOption('/', faHeadphonesAlt, 'Discover', { selected: true })}
        {renderSideBarOption('/search', faSearch, 'Search')}
        {renderSideBarOption('/favourites', faHeart, 'Favourites')}
        {renderSideBarOption('/playlists', faPlayCircle, 'Playlists')}
        {renderSideBarOption('/charts', faStream, 'Charts')}
      </div>
    </div>
  );
}
