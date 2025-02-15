export interface ProductData {
    imageSrc: string;
    category: string;
    title: string;
    subtitle: string;
    productId: string;
  }
  
  export interface ExploreState {
    loading: boolean;
    error: string | null;
    apps: ProductData[];
    games: ProductData[];
    movies: ProductData[];
    courses: ProductData[];
    services: ProductData[];
    aiProducts: ProductData[];
  }