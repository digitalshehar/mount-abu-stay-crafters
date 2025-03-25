
import { Hotel as AdminHotel } from '@/components/admin/hotels/types';
import { Hotel } from '@/integrations/supabase/custom-types';

export const adminToIntegrationHotel = (hotel: AdminHotel): Hotel => {
  return {
    id: hotel.id,
    name: hotel.name,
    slug: hotel.slug || '',
    description: hotel.description || '',
    location: hotel.location,
    price_per_night: hotel.pricePerNight,
    stars: hotel.stars,
    rating: hotel.rating || 4.0,
    review_count: hotel.reviewCount || 0,
    image: hotel.image,
    status: 'active', // Default status
    amenities: hotel.amenities || [],
    latitude: hotel.latitude || 24.5927,
    longitude: hotel.longitude || 72.7156,
    featured: hotel.featured || false,
    // Remove gallery as it doesn't exist in the Hotel type
  };
};

export const convertAdminToIntegrationHotels = (hotels: AdminHotel[]): Hotel[] => {
  return hotels.map(adminToIntegrationHotel);
};

export const integrationToAdminHotel = (hotel: Hotel): AdminHotel => {
  return {
    id: hotel.id,
    name: hotel.name,
    slug: hotel.slug || '',
    description: hotel.description || '',
    location: hotel.location,
    pricePerNight: hotel.price_per_night,
    stars: hotel.stars,
    rating: hotel.rating || 4.0,
    reviewCount: hotel.review_count || 0,
    image: hotel.image,
    status: hotel.status || 'active',
    amenities: hotel.amenities || [],
    latitude: hotel.latitude || 24.5927,
    longitude: hotel.longitude || 72.7156,
    featured: hotel.featured || false,
    gallery: [], // Set to empty array as it's required in AdminHotel
    categories: [],
    rooms: [],
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    lastModifiedBy: '',
    lastModifiedAt: '',
  };
};

export const convertIntegrationToAdminHotels = (hotels: Hotel[]): AdminHotel[] => {
  return hotels.map(integrationToAdminHotel);
};
