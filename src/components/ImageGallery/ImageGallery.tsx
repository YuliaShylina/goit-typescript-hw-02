import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { Image } from "../App/App.types";

interface ImageGalleryProps {
  images: Image[];
  onImgClick: (image: Image) => void;
  hasSearched: boolean;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onImgClick,
  hasSearched,
}) => {
  if (hasSearched && images.length === 0) {
    return <p>No images found.</p>;
  }

  return (
    <ul className={css.list}>
      {images.map((item) => (
        <li key={item.id} className={css.item}>
          <ImageCard
            src={item.urls.small}
            alt={item.alt_description || "No description"}
            className={css.card}
            onClick={() => onImgClick(item)}
            likes={item.likes}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
