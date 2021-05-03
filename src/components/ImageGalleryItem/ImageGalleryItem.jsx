import React from "react";

const ImageGalleryItem = ({ src, alt, largeImageURL, onThumbClick }) => {
  return (
    <li className="ImageGalleryItem">
      <img
        src={src}
        alt={alt}
        className="ImageGalleryItem-image"
        data-largeimageurl={largeImageURL}
        onClick={onThumbClick}
      />
    </li>
  );
};

export default ImageGalleryItem;
