import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import '../styles.css';

export const Modal = ({ handleModal, largeImageURL, tags }) => {
  useEffect(() => {
    const handleCloseModal = event => {
      if (event.code === 'Escape') {
        handleModal();
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleCloseModal);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleCloseModal);
    };
  }, [handleModal]);

  const handleOverlay = event => {
    if (event.currentTarget === event.target) {
      handleModal();
    }
  };

  return createPortal(
    <>
      <button type="button" onClick={handleModal}>
        Open modal
      </button>
      <div className="Overlay" onClick={handleOverlay}>
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
};

Modal.propTypes = {
  handleModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
};
