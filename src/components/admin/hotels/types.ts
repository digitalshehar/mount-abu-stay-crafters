
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
  categories: string[];
  seasonalPricing?: SeasonalPrice[];
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
  categories: string[];
  seasonalPricing: SeasonalPrice[];
}

export interface FilterOptions {
  priceRange: [number, number];
  starRating: number[];
  amenities: string[];
  maxPrice: number;
}

export interface SeasonalPrice {
  id?: number;
  hotelId?: number;
  name: string;
  startDate: string;
  endDate: string;
  priceMultiplier: number;
}

export interface BulkActionOptions {
  delete: boolean;
  toggleStatus: boolean;
  toggleFeatured: boolean;
}
