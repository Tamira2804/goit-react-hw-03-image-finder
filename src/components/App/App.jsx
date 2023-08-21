import { Component } from 'react';
import Searchbar from '../Searchbar';
import Loader from 'components/Loader/Loader';
import Button from '../Button';
import ImageGallery from '../ImageGallery';
import Modal from '../Modal';
import { fetchImages } from '../../services/HttpService';

import { GlobalStyle } from '../GlobalStyle';
import { Layout } from './App.styled';
import './App.styled.js';

class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    loading: false,
    selectedImage: null,
  };

  handleSearchSubmit = query => {
    this.setState({ query, images: [], page: 1 }, this.fetchImages);
  };

  fetchImages = () => {
    const { query, page } = this.state;

    this.setState({ loading: true });

    fetchImages(query, page)
      .then(response => {
        this.setState(prevState => ({
          images: [...prevState.images, ...response.data.hits],
          page: prevState.page + 1,
        }));
      })
      .catch(error => console.error('Error fetching images:', error))
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  handleImageClick = imageUrl => {
    this.setState({ selectedImage: imageUrl });
  };

  handleCloseModal = () => {
    this.setState({ selectedImage: null });
  };

  render() {
    const { images, loading, selectedImage } = this.state;

    return (
      <Layout>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onItemClick={this.handleImageClick} />
        {loading && <Loader />}
        {images.length > 0 && !loading && (
          <Button onClick={this.fetchImages} label="Load more" />
        )}
        {selectedImage && (
          <Modal image={selectedImage} onClose={this.handleCloseModal} />
        )}
        <GlobalStyle />
      </Layout>
    );
  }
}

export default App;
