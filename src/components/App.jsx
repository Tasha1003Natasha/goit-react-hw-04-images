import { Component } from 'react';
import { Searchbar } from '../components/Searchbar/Searchbar';
import { ImageGallery } from '../components/ImageGallery/ImageGallery';
import { Modal } from '../components/Modal/Modal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    imageName: '',
    largeImageURL: '',
    tags: '',
  };

  handleFormSubmit = imageName => {
    this.setState({ imageName });
  };

  handleModal = () => {
    this.setState(state => ({
      largeImageURL: '',
      tags: '',
    }));
  };

  handleImageURL = ({ largeImageURL, tags }) => {
    this.setState(state => ({
      largeImageURL: largeImageURL,
      tags: tags,
    }));
  };

  render() {
    const { largeImageURL, tags } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          imageName={this.state.imageName}
          handleImageURL={this.handleImageURL}
        />
        <ToastContainer />
        {largeImageURL && (
          <Modal
            handleModal={this.handleModal}
            largeImageURL={largeImageURL}
            tags={tags}
          />
        )}
      </div>
    );
  }
}
