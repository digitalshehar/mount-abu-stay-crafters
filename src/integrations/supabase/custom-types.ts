
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
  status: 'active' | 'inactive';
  description?: string;
  category?: string;
  features?: string[];
  rating?: number;
  review_count?: number;
  location?: string;
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
  status: 'active' | 'inactive';
  description?: string;
  category?: string;
  features?: string[];
  rating?: number;
  review_count?: number;
  location?: string;
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
  status: 'active' | 'inactive';
  rating?: number;
  review_count?: number;
  featured?: boolean;
  difficulty?: 'easy' | 'moderate' | 'challenging' | 'difficult';
  categories?: string[];
  max_people?: number;
  itinerary?: any[];
}

export interface Destination {
  id: number;
  name: string;
  slug: string;
  image: string;
  description?: string;
  location?: string;
  status: 'active' | 'inactive';
  featured?: boolean;
  highlights?: string[];
  activities?: string[];
  gallery?: string[];
  meta_title?: string;
  meta_description?: string;
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
  published_at?: string;
  status: 'draft' | 'published';
  categories?: string[];
  tags?: string[];
  meta_title?: string;
  meta_description?: string;
}
