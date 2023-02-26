import PropTypes from 'prop-types';

import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

import css from './ImageGallery.module.css';

const ImageGallery = ({ images = [], showModal }) => {
  const element = images.map(image => (
    <ImageGalleryItem
      key={image.id}
      tag={image.tag}
      webformatURL={image.webformatURL}
      showModal={showModal}
      largeImageURL={image.largeImageURL}
    />
  ));

  return <ul className={css.ImageGallery}>{element}</ul>;
};

export default ImageGallery;

ImageGallery.propTypes = {
  showModal: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};
