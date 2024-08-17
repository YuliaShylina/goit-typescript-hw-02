// import Modal from "react-modal";
// import css from "./ImageModal.module.css";

// ReactModal.setAppElement("#root");

// interface ImageModalProps {
//   isOpen: boolean;
//   closeModal: () => void;
//   imageUrl: string;
//   altDescription: string;
// }

// export default function ImageModal({
//   isOpen,
//   closeModal,
//   imageUrl,
//   altDescription,
// }: ImageModalProps) {
//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={closeModal}
//       className={css.content}
//       overlayClassName={css.overlay}
//       contentLabel="Image Modal"
//       shouldCloseOnEsc={true}
//       shouldCloseOnOverlayClick={true}
//     >
//       <img src={imageUrl} alt={altDescription} className={css.image} />
//     </Modal>
//   );
// }
import React from "react";
import ReactModal from "react-modal";
import { format } from "date-fns";
import css from "./ImageModal.module.css";

// Використовуйте той самий тип Image
import { Image } from "../App/App.types";

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  image: Image | null; // Переконайтесь, що тип правильний
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
