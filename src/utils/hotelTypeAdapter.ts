
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
    gallery: hotel.gallery || [],
    amenities: hotel.amenities || [],
    latitude: hotel.latitude || 24.5927,
    longitude: hotel.longitude || 72.7156,
    featured: hotel.featured || false,
    created_at: hotel.createdAt || new Date().toISOString(),
    updated_at: hotel.updatedAt || new Date().toISOString()
  };
};

export const convertAdminToIntegrationHotels = (hotels: AdminHotel[]): Hotel[] => {
  return hotels.map(adminToIntegrationHotel);
};
