
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, ChevronRight, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { EarlyHotel } from "@/components/admin/hotels/types/earlyHotel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
          .limit(4);

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

  if (loading) {
    return (
      <div className="container-custom py-16">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
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
    <div className="bg-stone-50 py-16">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hotels.map((hotel) => (
            <div 
              key={hotel.id} 
              className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:-translate-y-1 cursor-pointer"
              onClick={() => navigate(`/early-hotel/${hotel.id}`)}
            >
              <div className="relative h-48">
                <img 
                  src={hotel.image} 
                  alt={hotel.name} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded text-xs font-medium flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  Pay Hourly
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{hotel.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{hotel.location}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-amber-500">
                    {Array.from({ length: hotel.stars }).map((_, i) => (
                      <span key={i} className="text-xs">★</span>
                    ))}
                  </div>
                  <p className="text-primary font-semibold">₹{hotel.hourly_rate}/hr</p>
                </div>
                <p className="text-xs text-gray-500 mt-2">Min {hotel.min_hours}hrs • Max {hotel.max_hours}hrs</p>
              </div>
            </div>
          ))}
        </div>

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
