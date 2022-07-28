import { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import '../styles.css';

export class Modal extends Component {
  componentDidMount() {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', this.handleCloseModal);
  }

  componentWillUnmount() {
    document.body.style.overflow = 'unset';
    window.removeEventListener('keydown', this.handleCloseModal);
  }

  handleCloseModal = event => {
    if (event.code === 'Escape') {
      this.props.handleModal();
    }
  };

  handleOverlay = event => {
    if (event.currentTarget === event.target) {
      this.props.handleModal();
    }
  };

  render() {
    const { handleModal, largeImageURL, tags } = this.props;

    return createPortal(
      <>
        <button type="button" onClick={handleModal}>
          Open modal
        </button>
        <div className="Overlay" onClick={this.handleOverlay}>
          <div className="Modal">
            <img
              className="ImageGalleryItem-large"
              src={largeImageURL}
              alt={tags}
            />
          </div>
        </div>
      </>,
      document.body
    );
  }
}

Modal.propTypes = {
  handleModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
};
