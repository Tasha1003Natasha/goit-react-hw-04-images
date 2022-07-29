import { useState } from 'react';
import { Searchbar } from '../components/Searchbar/Searchbar';
import { ImageGallery } from '../components/ImageGallery/ImageGallery';
import { Modal } from '../components/Modal/Modal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [imageName, setImageName] = useState('');
  const [page, setPage] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');

  const handleModal = () => {
    setLargeImageURL('');
    setTags('');
  };

  const handleImageURL = ({ largeImageURL, tags }) => {
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  const handleSubmit = value => {
    setImageName(value);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery
        imageName={imageName}
        page={page}
        handleLoadMore={handleLoadMore}
        handleImageURL={handleImageURL}
      />
      <ToastContainer />
      {largeImageURL && (
        <Modal
          handleModal={handleModal}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      )}
    </div>
  );
};
