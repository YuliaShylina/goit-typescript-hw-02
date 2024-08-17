import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Loader from "../Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import css from "./App.module.css";
import { Image } from "./App.types";

async function fetchImages(
  query: string,
  page: number = 1
): Promise<AxiosResponse<{ results: Image[]; total_pages: number }>> {
  try {
    const response = await axios.get<{ results: Image[]; total_pages: number }>(
      "https://api.unsplash.com/search/photos",
      {
        params: {
          query,
          page,
          orientation: "landscape",
        },
        headers: {
          Authorization:
            "Client-ID 0_AFKIC7n8Biaq3smPYYlHvD42TlmEKWIm1fLg0y8sI",
        },
      }
    );
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error fetching images: ${error.message}`);
    } else {
      throw new Error(`Error fetching images: Unknown error`);
    }
  }
}

function App() {
  const [query, setQuery] = useState<string>("");
  const [images, setImages] = useState<Image[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  useEffect(() => {
    if (!query) return;

    setIsLoading(true);
    fetchImages(query, page)
      .then(({ data }) => {
        setImages((prevImages) => [...prevImages, ...data.results]);
        setTotalPages(data.total_pages);
        if (!data.results.length) {
          toast.error(`No results found for '${query}'`);
        }
      })
      .catch(() => {
        toast.error("Error! Try reloading the page, please");
      })
      .finally(() => setIsLoading(false));
  }, [query, page]);

  const handleSearch = (query: string) => {
    if (!query) {
      toast.error("Please, enter the word");
      return;
    }
    setQuery(query);
    setImages([]);
    setTotalPages(0);
    setPage(1);
    setHasSearched(true);
  };

  const openImageModal = (image: Image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const loadMoreImages = () => setPage((prevPage) => prevPage + 1);
  const shouldShowLoadMore = () => images.length !== 0 && page < totalPages;

  return (
    <div className={css.container}>
      <SearchBar handleSearch={handleSearch} />
      <Toaster position="top-right" />
      <ImageGallery
        images={images}
        onImgClick={openImageModal}
        hasSearched={hasSearched}
      />
      {isLoading && <Loader />}
      {!isLoading && shouldShowLoadMore() && (
        <LoadMoreBtn onLoadMore={loadMoreImages} />
      )}
      {selectedImage && (
        <ImageModal
          isOpen={isModalOpen}
          onRequestClose={closeImageModal}
          image={selectedImage}
        />
      )}
    </div>
  );
}

export default App;
