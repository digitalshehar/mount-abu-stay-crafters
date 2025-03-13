
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Hotel } from '@/components/admin/hotels/types';
import HotelCard from '@/components/HotelCard';

interface RegularHotelsSectionProps {
  title?: string;
  subtitle?: string;
  compareList?: number[];
  onAddToCompare?: (hotelId: number) => void;
  onRemoveFromCompare?: (hotelId: number) => void;
  isInCompare?: (hotelId: number) => boolean;
  limit?: number;
  excludeFeatured?: boolean;
}

const RegularHotelsSection: React.FC<RegularHotelsSectionProps> = ({
  title = "Popular Hotels in Mount Abu",
  subtitle = "Explore the most sought-after hotels offering exceptional value and comfort for your Mount Abu stay.",
  compareList = [],
  onAddToCompare,
  onRemoveFromCompare,
  isInCompare = () => false,
  limit = 6,
  excludeFeatured = true
}) => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      setIsLoading(true);
      try {
        let query = supabase
          .from('hotels')
          .select('*')
          .eq('status', 'active')
          .order('rating', { ascending: false });
          
        if (excludeFeatured) {
          query = query.eq('featured', false);
        }
        
        const { data, error } = await query.limit(limit);

        if (error) throw error;

        if (data) {
          // Transform data to match the Hotel type
          const mappedHotels: Hotel[] = data.map((item: any) => ({
            id: item.id,
            name: item.name,
            slug: item.slug,
            location: item.location,
            stars: item.stars,
            pricePerNight: item.price_per_night,
            image: item.image,
            status: item.status as "active" | "inactive",
            description: item.description || "",
            amenities: item.amenities || [],
            featured: item.featured || false,
            reviewCount: item.review_count || 0,
            rating: item.rating || 0,
            gallery: Array.isArray(item.gallery) ? item.gallery : [],
            categories: item.categories || [],
            rooms: [], // Initializing as empty array
            seasonalPricing: []
          }));

          setHotels(mappedHotels);
        }
      } catch (error) {
        console.error('Error fetching hotels:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHotels();
  }, [limit, excludeFeatured]);

  if (isLoading) {
    return (
      <div className="py-12 sm:py-16">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-8 md:mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-3 md:mb-6">{title}</h2>
              <p className="text-sm md:text-base text-muted-foreground">{subtitle}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-lg border border-stone-200 bg-white shadow-sm p-6 animate-pulse">
                <div className="w-full h-48 bg-stone-200 rounded-md mb-4"></div>
                <div className="h-6 bg-stone-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-stone-200 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-stone-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-stone-200 rounded w-full mb-2"></div>
                <div className="h-10 bg-stone-200 rounded w-full mt-4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (hotels.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-3 md:mb-6">{title}</h2>
            <p className="text-sm md:text-base text-muted-foreground">{subtitle}</p>
          </div>
          <Link
            to="/hotels"
            className="mt-4 md:mt-0 px-4 py-2 border border-primary text-primary font-medium rounded-lg hover:bg-primary hover:text-white transition-colors text-sm"
          >
            Browse All Hotels
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {hotels.map((hotel) => (
            <HotelCard 
              key={hotel.id} 
              {...hotel}
              inCompareList={isInCompare(hotel.id)}
              onAddToCompare={onAddToCompare ? () => onAddToCompare(hotel.id) : undefined}
              onRemoveFromCompare={onRemoveFromCompare ? () => onRemoveFromCompare(hotel.id) : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RegularHotelsSection;
