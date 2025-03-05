// Custom type definitions for our database
export interface CarRental {
  id: number;
  name: string;
  type: string;
  capacity: number;
  transmission: string;
  price: number;
  image: string;
  bookings: number;
  status: 'available' | 'booked' | 'maintenance';
  description?: string;
  created_at?: string;
}

export interface BikeRental {
  id: number;
  name: string;
  type: string;
  engine: string;
  price: number;
  image: string;
  bookings: number;
  status: 'available' | 'booked' | 'maintenance';
  description?: string;
  created_at?: string;
}

export interface Adventure {
  id: number;
  name: string;
  description?: string;
  type: string;
  duration: string;
  difficulty: string;
  price: number;
  image: string;
  bookings: number;
  rating: number;
  status: 'active' | 'inactive';
  slug?: string;
  location?: string;
  meetingPoint?: string;
  cancellationPolicy?: string;
  maxGroupSize?: number;
  minAge?: number;
  includes?: string[];
  timeline?: string[];
  requirements?: string[];
  reviewCount?: number;
  created_at?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  date: string;
  image: string;
  content: string;
  status: 'published' | 'draft';
  created_at?: string;
  slug?: string;
}

export interface Hotel {
  id: number;
  name: string;
  slug: string; 
  location: string;
  stars: number;
  price_per_night: number;
  image: string;
  status: 'active' | 'inactive';
  description?: string;
  amenities?: string[];
  review_count?: number;
  rating?: number;
  featured?: boolean;
  rooms?: Room[];
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
}

export interface Destination {
  id: number;
  name: string;
  description: string;
  image: string;
  activities: string[];
  location: string;
  slug?: string;
  bestTimeToVisit?: string;
  highlights?: string[];
}
