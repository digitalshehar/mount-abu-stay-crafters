
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Hotel } from "@/components/admin/hotels/types";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { formatCurrency } from "@/utils/hotel";

interface RegularHotelsSectionProps {
  hotels?: Hotel[];
  compareList?: number[];
  onAddToCompare?: (hotelId: number) => void;
  onRemoveFromCompare?: (hotelId: number) => void;
  isInCompare?: (hotelId: number) => boolean;
  title?: string;
}

const RegularHotelsSection = ({ 
  hotels: propHotels,
  compareList = [],
  onAddToCompare = () => {},
  onRemoveFromCompare = () => {},
  isInCompare = () => false,
  title = "Hotels in Mount Abu"
}: RegularHotelsSectionProps) => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(propHotels ? false : true);

  useEffect(() => {
    if (propHotels) {
      setHotels(propHotels);
      return;
    }

    // Fetch regular hotels (non-featured or limited number)
    const fetchRegularHotels = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("hotels")
          .select("*")
          .eq("status", "active")
          .order("rating", { ascending: false })
          .limit(6);

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
          }));

          setHotels(mappedHotels);
        }
      } catch (error) {
        console.error("Error fetching regular hotels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegularHotels();
  }, [propHotels]);

  if (loading) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (hotels.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="bg-white rounded-lg shadow-sm border border-stone-100 overflow-hidden group hover:shadow-md transition-shadow">
            <Link to={`/hotel/${hotel.slug}`} className="block">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={hotel.image} 
                  alt={hotel.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {hotel.stars > 0 && (
                  <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                    {Array(hotel.stars).fill('★').join('')}
                  </div>
                )}
              </div>
            </Link>
            <div className="p-4">
              <Link to={`/hotel/${hotel.slug}`} className="block">
                <h3 className="font-semibold group-hover:text-primary transition-colors">{hotel.name}</h3>
                <p className="text-sm text-stone-500">{hotel.location}</p>
              </Link>
              
              {hotel.amenities && hotel.amenities.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {hotel.amenities.slice(0, 3).map((amenity, index) => (
                    <span key={index} className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                      {amenity}
                    </span>
                  ))}
                  {hotel.amenities.length > 3 && (
                    <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                      +{hotel.amenities.length - 3}
                    </span>
                  )}
                </div>
              )}
              
              <div className="mt-4 flex justify-between items-center">
                <span className="font-semibold">{formatCurrency(hotel.pricePerNight)}/night</span>
                {hotel.rating > 0 && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {hotel.rating.toFixed(1)}★ ({hotel.reviewCount})
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegularHotelsSection;
