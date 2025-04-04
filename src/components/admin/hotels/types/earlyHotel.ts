
export interface EarlyHotel {
  id: number;
  name: string;
  location: string;
  image: string;
  stars: number;
  hourly_rate: number;
  min_hours: number;
  max_hours: number;
  description: string;
  amenities: string[];
  status: 'active' | 'inactive';
  featured: boolean;
}

export interface EarlyHotelFormData {
  name: string;
  location: string;
  image: string;
  stars: number;
  hourly_rate: number;
  min_hours: number;
  max_hours: number;
  description: string;
  amenities: string[];
  featured: boolean;
  status?: 'active' | 'inactive';
}
