
export interface Hotel {
  id: number;
  name: string;
  slug: string;
  location: string;
  stars: number;
  price_per_night: number;
  image: string;
  status: string;
  description?: string;
  amenities?: string[];
  review_count?: number;
  rating?: number;
  featured?: boolean;
  latitude?: number;
  longitude?: number;
  gallery?: string[];
  categories?: string[];
}
