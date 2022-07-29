import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles.css';
import { toast } from 'react-toastify';
import { Loader } from '../Loader/Loader';

const STATUS = {
  Idle: 'idle',
  Loading: 'loading',
  Error: 'error',
  Success: 'success',
};

export const ImageGallery = ({
  imageName,
  page,
  handleLoadMore,
  handleImageURL,
}) => {
  const [images, setImages] = useState({});
  const [status, setStatus] = useState('idle');
  const [isLoadMore, setIsLoadMore] = useState(false);

  useEffect(() => {
    if (!imageName) return;
    setStatus(STATUS.Loading);
    fetch(
      `https://pixabay.com/api/?q=${imageName}&page=1&key=28317427-cd386f88f666cbda8176ce58f&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => {
        if (response.ok) {
          // console.log(response);
          return response.json();
        }
      })
      .then(data => {
        setImages(data);
        // console.log(data);
        setStatus(STATUS.Success);
      })
      .catch(error => {
        // setError(error);
        setStatus(STATUS.Error);
      });
  }, [imageName]);

  useEffect(() => {
    if (page === 1) return;
    setIsLoadMore(true);
    fetch(
      `https://pixabay.com/api/?q=${imageName}&page=${page}&key=28317427-cd386f88f666cbda8176ce58f&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(data => {
        setImages(prev => {
          return { ...data, hits: [...prev.hits, ...data.hits] };
        });
        // console.log(data);
      })
      .catch(error => {
        setStatus(STATUS.Error);
      })
      .finally(() => setIsLoadMore(false));
  }, [imageName, page]);

  if (status === STATUS.Idle) {
    return <h1 className="Title">Enter the name in the search</h1>;
  }

  if (status === STATUS.Loading) {
    return <Loader />;
  }

  if (status === STATUS.Error) {
    return toast.error('Something went wrong!');
  }

  if (!images?.hits?.length) {
    return <h2 className="Title">There is no image with that name</h2>;
  }

  if (status === STATUS.Success) {
    return (
      <>
        <ul className="ImageGallery">
          {images &&
            images.hits.map(({ id, webformatURL, largeImageURL, tags }) => (
              <li
                key={id}
                className="ImageGalleryItem"
                onClick={() => handleImageURL({ largeImageURL, tags })}
              >
                <img
                  className="ImageGalleryItem-image"
                  src={webformatURL}
                  alt={tags}
                />
              </li>
            ))}
        </ul>

        {images.totalHits >= 12 * page && (
          <div className="ButtonItem">
            {isLoadMore ? (
              <Loader />
            ) : (
              <button type="button" onClick={handleLoadMore} className="Button">
                Load more
              </button>
            )}
          </div>
        )}
      </>
    );
  }
};

ImageGallery.propTotype = {
  imageName: PropTypes.string.isRequired,
  handleImageURL: PropTypes.func.isRequired,
};
