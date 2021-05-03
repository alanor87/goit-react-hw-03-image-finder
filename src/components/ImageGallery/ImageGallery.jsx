import React from "react";
import ImageGalleryItem from "../ImageGalleryItem";

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

export default ImageGallery;
