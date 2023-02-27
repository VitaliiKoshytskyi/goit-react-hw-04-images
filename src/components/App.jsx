import { useState, useEffect } from 'react';

import { getImages } from './services/getFetch';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Searchbar from './Searchbar/Searchbar';
import Modal from './Modal/Modal';
import ImageGallery from './ImageGallery/ImageGallery';

export const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [imageDetails, setImageDetails] = useState({});
  const [totalImages, setTotalImages] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await getImages(page, search);
        setTotalImages(data.total);

        setImages(prevState => {
          return [...prevState, ...data.hits];
        });
      } catch (response) {
        setError(response.message || 'Oooopppsss! Try again');
      } finally {
        setLoading(false);
      }
    };
    if (search) {
      fetchData();
    }
  }, [search, page]);

  const showModal = ({ largeImageURL, tag }) => {
    setModalShow(true);
    setImageDetails({ largeImageURL, tag });
  };

  const closeModal = () => {
    setModalShow(false);
  };

  const updateSearch = search => {
    setImages([]);
    setPage(1);
    setSearch(search);
  };

  const loadMoreHandle = () => {
    setPage(prevState => {
      return prevState + 1;
    });
  };

  return (
    <>
      {modalShow && (
        <Modal closeModal={closeModal}>
          <img src={imageDetails.largeImageURL} alt={imageDetails.tag} />
        </Modal>
      )}
      <Searchbar onSubmit={updateSearch} />
      {error && <p>{error}</p>}
      {loading && <Loader />}
      {images.length > 0 && (
        <ImageGallery images={images} showModal={showModal} />
      )}
      {totalImages === 0 && <p>Ooopps! we found nothing</p>}
      {totalImages > page * 12 && (
        <Button onBtnClick={loadMoreHandle}> Load more</Button>
      )}
    </>
  );
};
