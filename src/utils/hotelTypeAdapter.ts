
import { Hotel as AdminHotel } from '@/components/admin/hotels/types';
import { Hotel as IntegrationHotel } from '@/integrations/supabase/custom-types';

// Convert from admin hotel format to integration hotel format
export const convertAdminToIntegrationHotels = (adminHotels: AdminHotel[]): IntegrationHotel[] => {
  return adminHotels.map(hotel => ({
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
    latitude: hotel.latitude,
    longitude: hotel.longitude,
    rooms: hotel.rooms,
  }));
};

// Convert from integration hotel format to admin hotel format
export const convertIntegrationToAdminHotels = (integrationHotels: IntegrationHotel[]): AdminHotel[] => {
  return integrationHotels.map(hotel => ({
    id: hotel.id,
    name: hotel.name,
    slug: hotel.slug || hotel.name.toLowerCase().replace(/\s+/g, '-'),
    location: hotel.location,
    stars: hotel.stars,
    pricePerNight: hotel.price_per_night,
    image: hotel.image,
    status: hotel.status,
    description: hotel.description || '',
    amenities: hotel.amenities || [],
    reviewCount: hotel.review_count || 0,
    rating: hotel.rating || 0,
    featured: hotel.featured || false,
    latitude: hotel.latitude,
    longitude: hotel.longitude,
    rooms: hotel.rooms || [],
    gallery: [],
    categories: [],
    seasonalPricing: [],
  }));
};
