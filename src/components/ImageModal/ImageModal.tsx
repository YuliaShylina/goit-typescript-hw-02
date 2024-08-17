import React from "react";
import ReactModal from "react-modal";
import { format } from "date-fns";
import css from "./ImageModal.module.css";

interface Image {
  urls: {
    regular: string;
  };
  alt_description?: string;
  likes: number;
  created_at: string;
  description?: string;
}

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  image: Image | null;
}

ReactModal.setAppElement("#root");

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onRequestClose,
  image,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      closeTimeoutMS={200}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      overlayClassName={css.overlay}
      className={css.modal}
    >
      {image && (
        <div className={css.content} onClick={(e) => e.stopPropagation()}>
          <img
            src={image.urls.regular}
            alt={image.alt_description || "No description"}
            className={css.modalImage}
          />
          <div className={css.info}>
            <p>Likes: {image.likes}</p>
            <p>Created at: {format(new Date(image.created_at), "Pp")}</p>
            {image.description && <p>Description: {image.description}</p>}
          </div>
          <button onClick={onRequestClose} className={css.closeBtn}></button>
        </div>
      )}
    </ReactModal>
  );
};

export default ImageModal;
