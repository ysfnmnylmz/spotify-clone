import React from 'react';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphonesAlt, faHeart, faPlayCircle, faSearch, faStream, type IconDefinition } from '@fortawesome/free-solid-svg-icons';
import './_sidebar.scss';
import {ProfileSection} from "./Profile";

interface ISelectState {
    selected?: boolean
}
const renderSideBarOption = (link: string, icon: IconDefinition, text: string, { selected }: ISelectState = {}) => {
  return (
    <div className={cx('sidebar__option', { 'sidebar__option--selected': selected })}>
      <FontAwesomeIcon icon={icon} />
      <p>{text}</p>
    </div>
  );
};
export default class SideBar extends React.Component {

    render = () => {
        return (
            <div className="sidebar">
                <div className="sidebar__profile">
                    <ProfileSection />
                </div>
                <div className="sidebar__options">
                    {renderSideBarOption('/', faHeadphonesAlt, 'Discover', {selected: true})}
                    {renderSideBarOption('/search', faSearch, 'Search')}
                    {renderSideBarOption('/favourites', faHeart, 'Favourites')}
                    {renderSideBarOption('/playlists', faPlayCircle, 'Playlists')}
                    {renderSideBarOption('/charts', faStream, 'Charts')}
                </div>
            </div>
        )
    };
}
