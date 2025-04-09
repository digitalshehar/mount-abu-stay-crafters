
import { Hotel as AdminHotel } from '@/components/admin/hotels/types';
import { Hotel } from '@/types';
import { Hotel as IntegrationHotel } from '@/integrations/supabase/custom-types';

/**
 * Converts Supabase integration hotel records to the Admin Hotel type
 */
export function convertIntegrationToAdminHotels(hotels: IntegrationHotel[]): AdminHotel[] {
  if (!hotels || !Array.isArray(hotels)) return [];
  
  return hotels.map(hotel => ({
    id: hotel.id,
    name: hotel.name,
    slug: hotel.slug,
    location: hotel.location,
    stars: hotel.stars,
    status: hotel.status as any,
    pricePerNight: hotel.price_per_night,
    description: hotel.description || '',
    image: hotel.image,
    amenities: hotel.amenities || [],
    rating: hotel.rating || 0,
    reviewCount: hotel.review_count || 0,
    featured: hotel.featured || false,
    latitude: hotel.latitude || 0,
    longitude: hotel.longitude || 0,
    gallery: hotel.gallery || [],
    categories: hotel.categories || [],
  }));
}

/**
 * Converts Admin Hotel type to Supabase integration hotel records
 */
export function adminToIntegrationHotel(hotel: AdminHotel): IntegrationHotel {
  return {
    id: hotel.id,
    name: hotel.name,
    slug: hotel.slug || '',
    location: hotel.location || '',
    stars: hotel.stars || 0,
    status: hotel.status || 'active',
    price_per_night: hotel.pricePerNight || 0,
    description: hotel.description || '',
    image: hotel.image || '',
    amenities: hotel.amenities || [],
    rating: hotel.rating || 0,
    review_count: hotel.reviewCount || 0,
    featured: hotel.featured || false,
    latitude: hotel.latitude || 0,
    longitude: hotel.longitude || 0,
    gallery: hotel.gallery || [],
    categories: hotel.categories || [],
  };
}

/**
 * Normalize hotel objects from various sources to a standard format
 */
export function normalizeHotels(hotels: any[]): Hotel[] {
  if (!hotels || !Array.isArray(hotels)) return [];
  
  return hotels.map(hotel => ({
    id: hotel.id,
    name: hotel.name,
    slug: hotel.slug || '',
    location: hotel.location,
    stars: hotel.stars || 0,
    pricePerNight: hotel.pricePerNight || hotel.price_per_night || 0,
    description: hotel.description || '',
    image: hotel.image || '',
    amenities: hotel.amenities || [],
    rating: hotel.rating || 0,
    reviewCount: hotel.reviewCount || hotel.review_count || 0,
    featured: hotel.featured || false,
    status: hotel.status || 'active',
    gallery: hotel.gallery || [],
  }));
}
