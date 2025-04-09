
export interface Room {
  id?: number;
  type: string;
  price: number;
  capacity: number;
  count: number;
  images?: string[];
  hotel_id?: number;
  description?: string;
  amenities?: string[];
}

export interface Hotel {
  id: number;
  name: string;
  slug: string;
  location: string;
  stars: number;
  pricePerNight: number;
  price?: number;
  image: string;
  status: 'active' | 'inactive' | string;
  description: string;
  amenities: string[];
  reviewCount: number;
  rating: number;
  featured: boolean;
  rooms: Room[];
  categories: string[];
  gallery?: string[];
  latitude?: number;
  longitude?: number;
}
