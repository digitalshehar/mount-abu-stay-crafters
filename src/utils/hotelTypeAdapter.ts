
import { Hotel as AdminHotel } from '@/components/admin/hotels/types';
import { Hotel as IntegrationHotel } from '@/integrations/supabase/custom-types';
import { Hotel as AppHotel } from '@/types';

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
 * Normalizes various hotel types to the app Hotel type
 */
export const normalizeToAppHotel = (
  hotel: AdminHotel | IntegrationHotel | any
): AppHotel => {
  // Handle AdminHotel type
  if ('pricePerNight' in hotel) {
    return {
      id: hotel.id,
      name: hotel.name,
      slug: hotel.slug,
      location: hotel.location,
      description: hotel.description,
      pricePerNight: hotel.pricePerNight,
      stars: hotel.stars,
      rating: hotel.rating,
      reviewCount: hotel.reviewCount,
      image: hotel.image,
      amenities: hotel.amenities,
      featured: hotel.featured,
      status: hotel.status,
      rooms: hotel.rooms || [],
      gallery: hotel.gallery,
      categories: hotel.categories,
      latitude: hotel.latitude,
      longitude: hotel.longitude
    };
  }
  
  // Handle IntegrationHotel type
  if ('price_per_night' in hotel) {
    return {
      id: hotel.id,
      name: hotel.name,
      slug: hotel.slug,
      location: hotel.location,
      description: hotel.description,
      pricePerNight: hotel.price_per_night,
      stars: hotel.stars,
      rating: hotel.rating,
      reviewCount: hotel.review_count,
      image: hotel.image,
      amenities: hotel.amenities,
      featured: hotel.featured,
      status: hotel.status,
      rooms: [],
      gallery: hotel.gallery,
      categories: hotel.categories,
      latitude: hotel.latitude,
      longitude: hotel.longitude
    };
  }
  
  // Generic fallback
  return {
    id: hotel.id,
    name: hotel.name,
    slug: hotel.slug || '',
    location: hotel.location || '',
    image: hotel.image,
    pricePerNight: hotel.pricePerNight || hotel.price_per_night || hotel.price || 0,
    status: hotel.status || 'active',
    stars: hotel.stars || 0,
    amenities: hotel.amenities || [],
    description: hotel.description || ''
  };
};

/**
 * Batch normalize hotels
 */
export const normalizeHotels = (hotels: any[]): AppHotel[] => {
  if (!Array.isArray(hotels)) {
    console.warn('normalizeHotels received non-array input:', hotels);
    return [];
  }
  return hotels.map(hotel => normalizeToAppHotel(hotel));
};

/**
 * Converts integration hotel type to admin hotel type
 */
export const convertIntegrationToAdminHotels = (
  integrationHotels: IntegrationHotel[]
): AdminHotel[] => {
  return integrationHotels.map((hotel) => ({
    id: typeof hotel.id === 'string' ? parseInt(hotel.id, 10) : hotel.id,
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
