
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, ChevronRight, Search, Star, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { EarlyHotel } from "@/components/admin/hotels/types/earlyHotel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

const EarlyHotels = () => {
  const [hotels, setHotels] = useState<EarlyHotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEarlyHotels = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("early_hotels")
          .select("*")
          .eq("status", "active")
          .eq("featured", true)
          .limit(6);

        if (error) {
          console.error("Error fetching early hotels:", error);
        } else {
          setHotels(data as EarlyHotel[]);
        }
      } catch (error) {
        console.error("Error in fetchEarlyHotels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEarlyHotels();
  }, []);

  // Handle search submit to navigate to the search page with query
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/early-hotels?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/early-hotels");
    }
  };

  const handleViewHotel = (hotelId: number) => {
    navigate(`/early-hotel/${hotelId}`);
  };

  if (loading) {
    return (
      <div className="bg-stone-50 py-16">
        <div className="container-custom">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="flex gap-4 overflow-hidden">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="min-w-[300px] w-[300px]">
                  <div className="h-40 bg-gray-200 rounded-t-lg"></div>
                  <div className="h-24 bg-gray-100 rounded-b-lg p-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (hotels.length === 0) {
    return null;
  }

  return (
    <div className="bg-stone-50 py-16">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Early Check-in Hotels</h2>
            <p className="text-gray-600">Pay by the hour, perfect for day use and short stays</p>
          </div>
          
          {/* Search form - visible on both mobile and desktop */}
          <form onSubmit={handleSearchSubmit} className="w-full md:w-auto mb-4 md:mb-0 flex">
            <Input
              type="text"
              placeholder="Search early hotels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow md:w-64"
            />
            <Button type="submit" className="ml-2">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>

        <ScrollArea className="w-full pb-4">
          <div className="flex gap-6">
            {hotels.map((hotel) => (
              <div 
                key={hotel.id} 
                className="min-w-[300px] w-[300px] bg-white rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg cursor-pointer group"
                onClick={() => handleViewHotel(hotel.id)}
              >
                <div className="relative h-48">
                  <img 
                    src={hotel.image} 
                    alt={hotel.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded text-xs font-medium flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    Pay Hourly
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1 truncate">{hotel.name}</h3>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                    <span className="truncate">{hotel.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-amber-500">
                      {Array.from({ length: hotel.stars }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-500" />
                      ))}
                    </div>
                    <p className="text-primary font-semibold">₹{hotel.hourly_rate}/hr</p>
                  </div>
                  <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
                    <span>Min {hotel.min_hours}hrs</span>
                    <span>•</span>
                    <span>Max {hotel.max_hours}hrs</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-primary p-0 h-auto text-xs hover:bg-transparent hover:text-primary/80"
                    >
                      Book now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <div className="mt-8 flex justify-center md:justify-end">
          <Button 
            variant="outline" 
            className="flex items-center"
            onClick={() => navigate("/early-hotels")}
          >
            View All Early Hotels <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EarlyHotels;
