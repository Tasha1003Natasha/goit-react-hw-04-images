import { useState } from 'react';
import { Searchbar } from '../components/Searchbar/Searchbar';
import { ImageGallery } from '../components/ImageGallery/ImageGallery';
import { Modal } from '../components/Modal/Modal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [imageName, setImageName] = useState('');
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

  return (
    <div>
      <Searchbar onSubmit={setImageName} />
      <ImageGallery imageName={imageName} handleImageURL={handleImageURL} />
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
