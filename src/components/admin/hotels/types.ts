
// Types for the hotel management components
export interface Hotel {
  id: number;
  name: string;
  slug: string;
  location: string;
  stars: number;
  pricePerNight: number;
  image: string;
  status: 'active' | 'inactive';
  description: string;
  amenities: string[];
  rooms: Room[];
  featured: boolean;
  reviewCount: number;
  rating: number;
  gallery?: string[];
}

export interface Room {
  type: string;
  capacity: number;
  price: number;
  count: number;
}

export interface NewHotel {
  name: string;
  location: string;
  stars: number;
  pricePerNight: number;
  image: string;
  description: string;
  amenities: string[];
  rooms: Room[];
  featured: boolean;
  gallery: string[];
}

export interface FilterOptions {
  priceRange: [number, number];
  starRating: number[];
  amenities: string[];
  maxPrice: number;
}
