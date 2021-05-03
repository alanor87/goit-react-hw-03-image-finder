import React from "react";
import ImageGalleryItem from "../ImageGalleryItem";
import PropTypes from "prop-types";

class ImageGallery extends React.Component {
  render() {
    const { images, onThumbClick, children } = this.props;
    return (
      <ul className="ImageGallery">
        {images.map((imageObj) => {
            return (
              <ImageGalleryItem
                key={imageObj.id}
                largeImageURL={imageObj.largeImageURL}
                src={imageObj.webformatURL}
                alt={imageObj.tags}
                onThumbClick={onThumbClick}
              />
            );
          })}
        {children}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onThumbClick: PropTypes.func.isRequired,
};
export default ImageGallery;
