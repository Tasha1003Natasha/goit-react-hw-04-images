import { Component } from 'react';
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

export class ImageGallery extends Component {
  state = {
    images: {},
    page: 1,
    error: null,
    status: 'idle',
    isLoadMore: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.imageName !== this.props.imageName ||
      prevState.page !== this.state.page
    ) {
      const { imageName } = this.props;
      this.setState({ status: STATUS.Loading });
      fetch(
        `https://pixabay.com/api/?q=${imageName}&page=${this.state.page}&key=28317427-cd386f88f666cbda8176ce58f&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          //   return Promise.reject(
          //     new Error(`There is no image with that ${imageName}`)
          //   );
        })
        .then(data => this.setState({ images: data, status: STATUS.Success }))
        .catch(error => this.setState({ error, status: STATUS.Error }));
      // .finally(() => this.setState({ loading: false }));
    }
  }

  handleLoadMore = () => {
    // const { page } = this.state;
    // const { imageName } = this.props;

    // this.setState({ isLoadMore: true });
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    // fetch(
    //   `https://pixabay.com/api/?q=${imageName}&page=${page}&key=28317427-cd386f88f666cbda8176ce58f&image_type=photo&orientation=horizontal&per_page=12
    //   }`
    // )
    //   .then(res => res.json())
    //   .then(response => {
    //     this.setState(prevState => ({
    //       images: {
    //         ...response,
    //         data: [...prevState.images.hits, ...response.hits],
    //       },
    //     }));
    //   })
    //   .catch(() => {
    //     toast.error('Something went wrong!');
    //   })
    //   .finally(() => this.setState({ isLoadMore: false }));
  };

  render() {
    const { images, isLoadMore, status, page } = this.state;

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
                  onClick={() =>
                    this.props.handleImageURL({ largeImageURL, tags })
                  }
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
                <button
                  type="button"
                  onClick={this.handleLoadMore}
                  className="Button"
                >
                  Load more
                </button>
              )}
            </div>
          )}
        </>
      );
    }
  }
}

ImageGallery.propTotype = {
  imageName: PropTypes.string.isRequired,
  handleImageURL: PropTypes.func.isRequired,
};
