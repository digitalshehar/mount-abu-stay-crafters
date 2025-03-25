
import { Hotel as AdminHotel } from '@/components/admin/hotels/types';
import { Hotel as IntegrationHotel } from '@/integrations/supabase/custom-types';

/**
 * Converts admin hotel type to integration hotel type
 */
export const convertAdminToIntegrationHotels = (
  adminHotels: AdminHotel[]
): IntegrationHotel[] => {
  return adminHotels.map((hotel) => adminToIntegrationHotel(hotel));
};

/**
 * Converts a single admin hotel to integration hotel type
 */
export const adminToIntegrationHotel = (
  hotel: AdminHotel
): IntegrationHotel => {
  return {
    id: hotel.id,
    name: hotel.name,
    slug: hotel.slug,
    location: hotel.location,
    stars: hotel.stars,
    price_per_night: hotel.pricePerNight,
    image: hotel.image,
    status: hotel.status,
    description: hotel.description,
    amenities: hotel.amenities,
    review_count: hotel.reviewCount,
    rating: hotel.rating,
    featured: hotel.featured,
    latitude: hotel.latitude,
    longitude: hotel.longitude,
    gallery: hotel.gallery,
    categories: hotel.categories
  };
};

/**
 * Converts integration hotel type to admin hotel type
 */
export const convertIntegrationToAdminHotels = (
  integrationHotels: IntegrationHotel[]
): AdminHotel[] => {
  return integrationHotels.map((hotel) => ({
    id: hotel.id,
    name: hotel.name,
    slug: hotel.slug,
    location: hotel.location,
    stars: hotel.stars,
    pricePerNight: hotel.price_per_night,
    image: hotel.image,
    status: hotel.status === 'active' ? 'active' : 'inactive',
    description: hotel.description || '',
    amenities: hotel.amenities || [],
    reviewCount: hotel.review_count || 0,
    rating: hotel.rating || 0,
    featured: hotel.featured || false,
    rooms: [],
    gallery: hotel.gallery || [],
    categories: hotel.categories || [],
    latitude: hotel.latitude,
    longitude: hotel.longitude
  }));
};
