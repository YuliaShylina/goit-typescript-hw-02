import axios, { AxiosResponse } from "axios";

interface Image {
  id: string;
  description: string | null;
  alt_description: string | null;
  urls: {
    regular: string;
    full: string;
    small: string;
  };
  user: {
    name: string;
    profile_image: {
      small: string;
    };
  };
}

interface ApiResponse {
  results: Image[];
  total: number;
  total_pages: number;
}

export default async function fetchImages(
  query: string,
  page: number = 1
): Promise<AxiosResponse<ApiResponse>> {
  try {
    const response = await axios.get<ApiResponse>(
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
