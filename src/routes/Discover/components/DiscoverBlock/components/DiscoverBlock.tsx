import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import DiscoverItem from './DiscoverItem';
import '../styles/_discover-block.scss';
import {type ICategory, type IFeaturedPlaylist, type INewRelease} from "types";

// TODO: Fix types here

interface IDiscoverBlockProps {
  text: string;
  id: string;
  data: (IFeaturedPlaylist | ICategory | INewRelease)[];
  imagesKey: string;
}

interface IScrollPosition {
  isNegative?: boolean
}
const scrollContainer = (id: string, { isNegative }: IScrollPosition = {}) => {
  return () => {
    const scrollableContainer = document.getElementById(id) as HTMLElement;
    const amount = isNegative ? -scrollableContainer.offsetWidth : scrollableContainer.offsetWidth;

    scrollableContainer.scrollLeft = scrollableContainer.scrollLeft + amount;
  };
};

export default class DiscoverBlock extends React.Component<IDiscoverBlockProps> {
  static defaultProps = {
    imagesKey: 'images',
  };
  render = () => {
    const { text, id, data, imagesKey } = this.props;
    return (
      <div className="discover-block">
        <div className="discover-block__header">
          <h2>{text}</h2>
          <span />
          {data?.length ? (
            <div className="animate__animated animate__fadeIn">
              <FontAwesomeIcon icon={faChevronLeft} onClick={scrollContainer(id, { isNegative: true })} />
              <FontAwesomeIcon icon={faChevronRight} onClick={scrollContainer(id)} />
            </div>
          ) : null}
        </div>
        <div className="discover-block__row" id={id}>
          {data?.map(({ uri,[imagesKey]: images, name }: any) => (
            <DiscoverItem key={name} images={images} name={name} uri={uri} />
          ))}
        </div>
      </div>
    );
  };
}
