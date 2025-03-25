
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

export interface BikeRental {
  id: number;
  name: string;
  slug: string;
  image: string;
  price_per_day: number;
  model: string;
  brand: string;
  engine?: string;
  mileage?: string;
  status: string; // Changed from enum to string to match database
  description?: string;
  category?: string;
  features?: string[];
  rating?: number;
  review_count?: number;
  location?: string;
  // Additional properties used in UI components
  type?: string;
  price?: number;
  bookings?: number;
}

export interface CarRental {
  id: number;
  name: string;
  slug: string;
  image: string;
  price_per_day: number;
  model: string;
  brand: string;
  seats?: number;
  transmission?: string;
  fuel_type?: string;
  status: string; // Changed from enum to string to match database
  description?: string;
  category?: string;
  features?: string[];
  rating?: number;
  review_count?: number;
  location?: string;
  // Additional properties used in UI components
  type?: string;
  capacity?: number;
  price?: number;
  bookings?: number;
}

export interface Adventure {
  id: number;
  name: string;
  slug: string;
  image: string;
  price: number;
  duration: string;
  location: string;
  description?: string;
  inclusions?: string[];
  requirements?: string[];
  status: string; // Changed from enum to string to match database
  rating?: number;
  review_count?: number;
  reviewCount?: number; // Alternative property used in components
  featured?: boolean;
  difficulty?: string; // Changed from enum to string to match database
  categories?: string[];
  max_people?: number;
  itinerary?: any[];
  type?: string;
  bookings?: number;
  // Additional properties used in components
  includes?: string[];
  timeline?: string[];
  meetingPoint?: string;
  maxGroupSize?: number;
  minAge?: number;
  cancellationPolicy?: string;
}

export interface Destination {
  id: number;
  name: string;
  slug: string;
  image: string;
  description?: string;
  location?: string;
  status: string;
  featured?: boolean;
  highlights?: string[];
  activities?: string[];
  gallery?: string[];
  meta_title?: string;
  meta_description?: string;
  bestTimeToVisit?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  author_id?: number;
  author_name?: string;
  author?: string;
  published_at?: string;
  status: string;
  categories?: string[];
  tags?: string[];
  meta_title?: string;
  meta_description?: string;
  category?: string;
  date?: string;
  image?: string;
}
