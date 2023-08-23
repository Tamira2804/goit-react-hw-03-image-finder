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
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    loading: false,
    selectedImage: null,
    showBtn: false,
    status: Status.IDLE,
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      fetchImages(query, page).then(response => {
        if (response.data.hits.length === 0) {
          toast.error(`Sorry, no image for "${query}" request!`, {
            position: toast.POSITION.TOP_RIGHT,
          });
          return;
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...response.data.hits],
          showBtn: page < Math.ceil(response.data.totalHits / 12),
        }));
      });
    }
  };

  handleSearchSubmit = query => {
    this.setState({ query, images: [], page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleImageClick = imageUrl => {
    this.setState({ selectedImage: imageUrl });
  };

  handleCloseModal = () => {
    this.setState({ selectedImage: null });
  };

  render() {
    const { images, loading, selectedImage, showBtn, status } = this.state;

    return (
      <Layout>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        {status === Status.IDLE && <div>Enter a search query</div>}
        {status === Status.PENDING && <Loader />}
        {status === Status.REJECTED && (
          <div>Error occurred while loading images.</div>
        )}
        {status === Status.RESOLVED && (
          <div>
            <ImageGallery images={images} onItemClick={this.handleImageClick} />
            {loading && <Loader />}
            {showBtn && !loading && (
              <Button onClick={this.handleLoadMore} label="Load more" />
            )}
            {selectedImage && (
              <Modal image={selectedImage} onClose={this.handleCloseModal} />
            )}
          </div>
        )}
        <GlobalStyle />
      </Layout>
    );
  }
}

export default App;

//     return (
//       <Layout>
//         <Searchbar onSubmit={this.handleSearchSubmit} />
//         <ImageGallery images={images} onItemClick={this.handleImageClick} />
//         {loading && <Loader />}
//         {showBtn && !loading && (
//           <Button onClick={this.handleLoadMore} label="Load more" />
//         )}
//         {selectedImage && (
//           <Modal image={selectedImage} onClose={this.handleCloseModal} />
//         )}
//         <GlobalStyle />
//       </Layout>
//     );
//   }
// }
