import PropTypes from 'prop-types'

import css from './ImageGalleryItem.module.css'

const ImageGalleryItem = ({ tag,webformatURL,showModal,largeImageURL}) => {
  return (
    <li className={css.ImageGalleryItem} onClick={() => showModal({largeImageURL,tag})}>
          <img className={css.ImageGalleryItem_image} src={webformatURL} alt={tag}  />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
    showModal: PropTypes.func.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tag: PropTypes.string,
  largeImageURL: PropTypes.string.isRequired
};
