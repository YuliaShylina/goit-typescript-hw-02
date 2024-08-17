import React from "react";
import css from "./ImageCard.module.css";

type ImageCardProps = {
  src: string;
  alt: string;
  onClick: () => void;
  likes?: number;
  className: string;
};

const ImageCard: React.FC<ImageCardProps> = ({ src, alt, onClick, likes }) => {
  return (
    <div className={css.card}>
      <img src={src} alt={alt} className={css.img} onClick={onClick} />
    </div>
  );
};

export default ImageCard;
