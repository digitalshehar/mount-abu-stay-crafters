
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Hotel } from "@/components/admin/hotels/types";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface FeaturedHotelsSectionProps {
  hotels?: Hotel[];
  compareList?: number[];
  onAddToCompare?: (hotelId: number) => void;
  onRemoveFromCompare?: (hotelId: number) => void;
  isInCompare?: (hotelId: number) => boolean;
}

const FeaturedHotelsSection = ({ 
  hotels: propHotels,
  compareList = [],
  onAddToCompare = () => {},
  onRemoveFromCompare = () => {},
  isInCompare = () => false
}: FeaturedHotelsSectionProps) => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(propHotels ? false : true);

  useEffect(() => {
    if (propHotels) {
      setHotels(propHotels);
      return;
    }

    // Fetch featured hotels
    const fetchFeaturedHotels = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("hotels")
          .select("*")
          .eq("featured", true)
          .eq("status", "active")
          .order("price_per_night", { ascending: false })
          .limit(4);

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
        console.error("Error fetching featured hotels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedHotels();
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
      <h2 className="text-xl font-semibold mb-4">Featured Hotels</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hotels.map((hotel) => (
          <div 
            key={hotel.id} 
            className="bg-white rounded-lg shadow-sm border border-stone-100 overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow"
          >
            <img 
              src={hotel.image} 
              alt={hotel.name} 
              className="w-full md:w-40 h-40 object-cover"
            />
            <div className="p-4 flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">
                    <Link to={`/hotel/${hotel.slug}`} className="hover:text-primary transition-colors">
                      {hotel.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-stone-500">{hotel.location}</p>
                </div>
                {hotel.rating > 0 && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    {hotel.rating.toFixed(1)}★
                  </span>
                )}
              </div>
              <p className="text-sm mt-2 line-clamp-2">{hotel.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="font-semibold">₹{hotel.pricePerNight}/night</span>
                <Link to={`/hotel/${hotel.slug}`} className="text-blue-600 text-sm hover:underline">
                  View Details
                </Link>
              </div>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedHotelsSection;
