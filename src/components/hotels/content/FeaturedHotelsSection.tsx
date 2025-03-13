
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Hotel } from '@/components/admin/hotels/types';
import HotelCard from '@/components/HotelCard';

interface FeaturedHotelsSectionProps {
  title?: string;
  subtitle?: string;
  compareList?: number[];
  onAddToCompare?: (hotelId: number) => void;
  onRemoveFromCompare?: (hotelId: number) => void;
  isInCompare?: (hotelId: number) => boolean;
  limit?: number;
  hotels?: Hotel[]; // Added to support direct hotel data passing
}

const FeaturedHotelsSection: React.FC<FeaturedHotelsSectionProps> = ({
  title = "Featured Hotels in Mount Abu",
  subtitle = "Discover our handpicked selection of the finest accommodations in Mount Abu, offering comfort, luxury, and unforgettable experiences.",
  compareList = [],
  onAddToCompare,
  onRemoveFromCompare,
  isInCompare = () => false,
  limit = 3,
  hotels: directHotels // Renamed to avoid conflict with state variable
}) => {
  const [featuredHotels, setFeaturedHotels] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(directHotels ? false : true);

  useEffect(() => {
    // If hotels are directly provided, use them instead of fetching
    if (directHotels) {
      setFeaturedHotels(directHotels);
      setIsLoading(false);
      return;
    }

    const fetchFeaturedHotels = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('hotels')
          .select('*')
          .eq('featured', true)
          .order('rating', { ascending: false })
          .limit(limit);

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

          setFeaturedHotels(mappedHotels);
        }
      } catch (error) {
        console.error('Error fetching featured hotels:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedHotels();
  }, [limit, directHotels]);

  if (isLoading) {
    return (
      <div className="py-12 sm:py-16 md:py-20">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-8 md:mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-3 md:mb-6">{title}</h2>
              <p className="text-sm md:text-base text-muted-foreground">{subtitle}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[...Array(3)].map((_, i) => (
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

  // If there are no hotels to display, return null
  if (featuredHotels.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 md:py-20">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-3 md:mb-6">{title}</h2>
            <p className="text-sm md:text-base text-muted-foreground">{subtitle}</p>
          </div>
          <Link
            to="/hotels"
            className="mt-4 md:mt-0 px-4 py-2 sm:px-5 sm:py-3 border border-primary text-primary font-medium rounded-lg hover:bg-primary hover:text-white transition-colors text-sm sm:text-base"
          >
            View All Hotels
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {featuredHotels.map((hotel) => (
            <HotelCard 
              key={hotel.id} 
              id={hotel.id}
              name={hotel.name}
              slug={hotel.slug}
              location={hotel.location}
              rating={hotel.rating}
              reviewCount={hotel.reviewCount}
              image={hotel.image}
              featured={hotel.featured}
              amenities={hotel.amenities}
              pricePerNight={hotel.pricePerNight}
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

export default FeaturedHotelsSection;
