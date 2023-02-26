import { Component } from 'react';
import { getImages } from './services/getFetch';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Searchbar from './Searchbar/Searchbar';
import Modal from './Modal/Modal';
import ImageGallery from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
    page: 1,
    search: '',
    showModal: false,
    imageDetails: {},
    totalImages: null,
  };

  componentDidUpdate(_, prevState) {
    const { search, page } = this.state;
    if (search !== prevState.search || page !== prevState.page) {
      this.fetchData();
    }
  }

   async fetchData() {
    const { page, search } = this.state;
    try {
      this.setState({ isLoading: true });
      const { data } = await getImages(page, search);
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        totalImages: data.total,
      }));
    } catch (error) {
      this.setState({ error: error.message || 'Oooopppsss! Try again' });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  showModal = ({ largeImageURL, tag }) => {
    this.setState({
      showModal: true,
      imageDetails: {
        largeImageURL,
        tag,
      },
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  updateSearch = search => {
    this.setState({ search, images: [], page: 1 });
  };

  loadMoreHandle = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const {
      images,
      isLoading,
      error,
      showModal,
      imageDetails,
      totalImages,
      page,
    } = this.state;
    

    return (
      <>
        {showModal && (
          <Modal closeModal={this.closeModal}>
            <img src={imageDetails.largeImageURL} alt={imageDetails.tag} />
          </Modal>
        )}
        <Searchbar onSubmit={this.updateSearch} />
        {error && <p>{error}</p>}
        {isLoading && <Loader />}
        {images.length > 0 && (
          <ImageGallery images={images} showModal={this.showModal} />
        )}
        {totalImages===0 && <p>Ooopps! we found nothing</p>}
        {totalImages > page * 12 && (
          <Button onBtnClick={this.loadMoreHandle}> Load more</Button>
        )}
      </>
    );
  }
}
