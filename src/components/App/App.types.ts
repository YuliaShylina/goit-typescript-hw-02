export interface Image {
  id: string;
  urls: {
    regular: string;
    full: string;
    small: string;
  };
  alt_description?: string;
  likes: number;
  created_at: string;
  description?: string;
}

export interface ApiResponse {
  results: Image[];
  total: number;
  total_pages: number;
}
