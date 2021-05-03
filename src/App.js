import React from 'react';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Modal from './components/Modal';
import { fetchImages } from './services/gallery-api';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class App extends React.Component {

  state = {
    modalIsOpen: false,
    searchQuery: '',
    imagesArray: [],
    largeImageURL: '',
    nextPage: 1,
    isLoading: false,
    error: false,
    errorMsg: ''
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) this.pageLoad();
  }

  pageLoad = () => {
    this.setState({ isLoading: true, error: false });
    fetchImages(this.state.searchQuery, this.state.nextPage)
      .then(newImages => this.setState(prevState => {
        return ({
          imagesArray: [...prevState.imagesArray, ...newImages],
          nextPage: prevState.nextPage + 1,
        })
      }))
      .catch(error => {
        this.setState({ error: true, errorMsg: error.message });
      })
      .finally(() => {
        this.setState({ isLoading: false });
        if (this.state.nextPage > 2)
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
      })
  }

  onChangeQuery = (query) => {
    if (this.state.searchQuery === query) return;
    this.setState({
      searchQuery: query,
      imagesArray: [],
      largeImageURL: '',
      nextPage: 1,
    });
  };

  onThumbClick = (event) => {
    this.setState({
      modalIsOpen: true,
      largeImageURL: event.target.dataset.largeimageurl
    });
  }

  onModalClick = (event) => {
    if (event.target === event.currentTarget)
      this.setState({ modalIsOpen: false });
  }

  onEscClick = (event) => {
    if (event.code === 'Escape')
      this.setState({ modalIsOpen: false });
  }

  render() {
    const { modalIsOpen, imagesArray, largeImageURL, isLoading, error, errorMsg } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.onChangeQuery} />
        <ImageGallery images={imagesArray} onThumbClick={this.onThumbClick} isLoading={isLoading} />
        {isLoading && (
          <div className="spinner">
            <Loader
              type="Rings"
              color="#00BFFF"
              height={100}
              width={100}
              visible={true}
            />
          </div>
        )}
        {error &&
          <>
            <p className="error-message">Oops, something went wrong...</p>
          <p className="error-message">{errorMsg}</p>
          </>}
        {imagesArray.length > 0 && !error && <Button onClick={this.pageLoad} />}
        {modalIsOpen && <Modal imageUrl={largeImageURL} onModalClick={this.onModalClick} onEscClick={this.onEscClick} />}
      </div>
    );
  }

}

export default App;
