
import { Hotel as AdminHotel } from '@/components/admin/hotels/types';
import { Hotel as IntegrationHotel } from '@/integrations/supabase/custom-types';

/**
 * Converts an IntegrationHotel to AdminHotel format
 */
export const integrationToAdminHotel = (hotel: IntegrationHotel): AdminHotel => {
  return {
    id: hotel.id,
    name: hotel.name,
    slug: hotel.slug,
    location: hotel.location,
    stars: hotel.stars,
    pricePerNight: hotel.price_per_night,
    image: hotel.image,
    status: hotel.status || 'active',
    description: hotel.description || '',
    amenities: hotel.amenities || [],
    reviewCount: hotel.review_count || 0,
    rating: hotel.rating || 0,
    featured: hotel.featured || false,
    rooms: hotel.rooms || [],
    categories: [],
    gallery: [],
    latitude: hotel.latitude,
    longitude: hotel.longitude
  };
};

/**
 * Converts an AdminHotel to IntegrationHotel format
 */
export const adminToIntegrationHotel = (hotel: AdminHotel): IntegrationHotel => {
  return {
    id: hotel.id,
    name: hotel.name,
    slug: hotel.slug,
    location: hotel.location,
    stars: hotel.stars,
    price_per_night: hotel.pricePerNight,
    image: hotel.image,
    status: hotel.status as 'active' | 'inactive',
    description: hotel.description,
    amenities: hotel.amenities,
    review_count: hotel.reviewCount,
    rating: hotel.rating,
    featured: hotel.featured,
    rooms: hotel.rooms,
    latitude: hotel.latitude,
    longitude: hotel.longitude
  };
};

/**
 * Converts an array of IntegrationHotels to AdminHotels
 */
export const convertIntegrationToAdminHotels = (hotels: IntegrationHotel[]): AdminHotel[] => {
  return hotels.map(integrationToAdminHotel);
};

/**
 * Converts an array of AdminHotels to IntegrationHotels
 */
export const convertAdminToIntegrationHotels = (hotels: AdminHotel[]): IntegrationHotel[] => {
  return hotels.map(adminToIntegrationHotel);
};
