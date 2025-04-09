
// Hotel Types
export interface Hotel {
  id: string | number;
  name: string;
  slug: string;
  location: string;
  description?: string;
  price?: number;
  pricePerNight?: number;
  stars?: number;
  rating?: number;
  reviewCount?: number;
  image: string;
  images?: string[];
  gallery?: string[];
  amenities?: string[];
  rooms?: Room[];
  latitude?: number;
  longitude?: number;
  featured?: boolean;
  status?: "active" | "inactive";
  contactInfo?: ContactInfo;
  checkInTime?: string;
  checkOutTime?: string;
  landmarks?: Landmarks;
}

// Define required properties for ContactInfo and Landmarks
export interface ContactInfo {
  phone: string;
  email?: string;
  website?: string;
}

export interface Landmarks {
  airport: string;
  busStation?: string;
  cityCenter?: string;
}

// Review Types
export interface Review {
  id?: string | number;
  name: string;
  rating: number;
  date?: string;
  comment: string;
}

// Room Types
export interface Room {
  type: string;
  price: number;
  capacity: number;
  description?: string;
  images?: string[];
  count?: number;
}

// Booking Types
export interface Booking {
  id?: string | number;
  hotel_id: string | number;
  hotel_name: string;
  room_type: string;
  check_in_date: string;
  check_out_date: string;
  guest_name: string;
  guest_email: string;
  guest_phone?: string;
  number_of_guests: number;
  total_price: number;
  booking_status: string;
  payment_status: string;
  booking_reference?: string;
}

// Attractions Types
export interface Attraction {
  name: string;
  distance: string;
  description: string;
  image?: string;
  rating?: number;
}
