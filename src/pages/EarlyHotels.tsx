
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { EarlyHotel } from "@/components/admin/hotels/types/earlyHotel";
import Layout from "@/components/layout";
import { useNavigate } from "react-router-dom";
import { Clock, MapPin, Search, Star, FilterIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const EarlyHotels = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearchTerm = searchParams.get("search") || "";
  
  const [hotels, setHotels] = useState<EarlyHotel[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<EarlyHotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [starFilter, setStarFilter] = useState<number[]>([]);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch hotels from database
  useEffect(() => {
    const fetchEarlyHotels = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("early_hotels")
          .select("*")
          .eq("status", "active");

        if (error) {
          console.error("Error fetching early hotels:", error);
        } else {
          const hotels = data as EarlyHotel[];
          setHotels(hotels);
          
          // Set initial price range based on data
          if (hotels && hotels.length > 0) {
            const rates = hotels.map(hotel => hotel.hourly_rate);
            const minRate = Math.min(...rates);
            const maxRate = Math.max(...rates);
            setPriceRange([minRate, maxRate]);
          }
          
          // Apply initial search term if provided in URL
          if (initialSearchTerm) {
            const filtered = hotels.filter(
              hotel => 
                hotel.name.toLowerCase().includes(initialSearchTerm.toLowerCase()) ||
                hotel.location.toLowerCase().includes(initialSearchTerm.toLowerCase())
            );
            setFilteredHotels(filtered);
          } else {
            setFilteredHotels(hotels);
          }
        }
      } catch (error) {
        console.error("Error in fetchEarlyHotels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEarlyHotels();
  }, [initialSearchTerm]);

  // Apply filters when any filter changes
  useEffect(() => {
    // Apply filters
    let result = hotels;

    // Search term filter
    if (searchTerm) {
      result = result.filter(
        hotel => 
          hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Star rating filter
    if (starFilter.length > 0) {
      result = result.filter(hotel => starFilter.includes(hotel.stars));
    }

    // Price range filter
    result = result.filter(
      hotel => hotel.hourly_rate >= priceRange[0] && hotel.hourly_rate <= priceRange[1]
    );

    setFilteredHotels(result);
  }, [searchTerm, starFilter, priceRange, hotels]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL query parameter
    setSearchParams(searchTerm ? { search: searchTerm } : {});
  };

  const toggleStarFilter = (stars: number) => {
    setStarFilter(prev => 
      prev.includes(stars) 
        ? prev.filter(s => s !== stars) 
        : [...prev, stars]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStarFilter([]);
    setSearchParams({});
    
    // Reset price range to min and max of all hotels
    if (hotels.length > 0) {
      const rates = hotels.map(hotel => hotel.hourly_rate);
      const minRate = Math.min(...rates);
      const maxRate = Math.max(...rates);
      setPriceRange([minRate, maxRate]);
    }
  };

  // Filter component for both desktop (inline) and mobile (sheet)
  const FiltersComponent = () => (
    <div className="space-y-6">
      {/* Price Range Filter */}
      <div>
        <h3 className="text-sm font-medium mb-3">Hourly Rate</h3>
        <div className="px-2">
          <Slider
            value={priceRange}
            min={0}
            max={2000}
            step={50}
            onValueChange={setPriceRange}
            className="mb-6"
          />
          <div className="flex justify-between text-sm">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </div>
      </div>
      
      <Separator />
      
      {/* Star Rating Filter */}
      <div>
        <h3 className="text-sm font-medium mb-3">Star Rating</h3>
        <ScrollArea className="h-[120px]">
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map(stars => (
              <label 
                key={stars}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={starFilter.includes(stars)}
                  onChange={() => toggleStarFilter(stars)}
                  className="rounded text-primary focus:ring-primary"
                />
                <div className="flex items-center">
                  {Array.from({ length: stars }).map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-4 h-4 text-amber-400 fill-amber-400" 
                    />
                  ))}
                </div>
              </label>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      {/* Clear Filters Button */}
      <div className="pt-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={clearFilters}
          className="w-full"
        >
          Clear All Filters
        </Button>
      </div>
    </div>
  );

  return (
    <Layout>
      <Helmet>
        <title>Early Check-in Hotels - Pay by Hour Accommodation</title>
        <meta 
          name="description" 
          content="Book hotels by the hour for early check-in, day use, or short stays. Flexible accommodation options starting from ₹500 per hour."
        />
      </Helmet>

      <div className="bg-primary text-white py-12">
        <div className="container-custom">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Early Check-in Hotels</h1>
            <p className="text-lg opacity-90 mb-6">
              Pay by the hour, perfect for day use and short stays without booking a full night
            </p>
            
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search by hotel name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-6 text-black rounded-lg w-full"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2">
                Search
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Mobile Filter Button */}
        <div className="flex justify-between items-center mb-4 md:hidden">
          <h2 className="text-lg font-medium">
            {filteredHotels.length} {filteredHotels.length === 1 ? 'hotel' : 'hotels'} found
          </h2>
          <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center">
                <FilterIcon className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              <FiltersComponent />
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Desktop Filters sidebar */}
          <div className="md:w-1/4 hidden md:block">
            <div className="bg-white rounded-lg shadow p-4 sticky top-24">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="text-xs text-primary hover:text-primary"
                >
                  Clear All
                </Button>
              </div>
              
              <FiltersComponent />
            </div>
          </div>
          
          {/* Hotel listing */}
          <div className="md:w-3/4">
            <div className="mb-4 hidden md:flex justify-between items-center">
              <h2 className="text-lg font-medium">
                {filteredHotels.length} {filteredHotels.length === 1 ? 'hotel' : 'hotels'} found
              </h2>
              <div className="text-sm text-gray-500">
                Sort by: <span className="font-medium">Popular</span>
              </div>
            </div>
            
            {loading ? (
              <div className="space-y-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-white rounded-lg overflow-hidden shadow-md p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="md:w-1/3 h-48 bg-gray-200 rounded"></div>
                      <div className="md:w-2/3">
                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                        <div className="h-20 bg-gray-200 rounded mb-4"></div>
                        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredHotels.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <Clock className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Hotels Found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search criteria</p>
                <Button onClick={clearFilters}>Clear All Filters</Button>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredHotels.map((hotel) => (
                  <div 
                    key={hotel.id}
                    className="bg-white rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg cursor-pointer"
                    onClick={() => navigate(`/early-hotel/${hotel.id}`)}
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 h-48 relative">
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
                      <div className="p-6 md:w-2/3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>
                            <div className="flex items-center text-gray-600 mb-2">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span className="text-sm">{hotel.location}</span>
                            </div>
                            <div className="flex items-center mb-3">
                              {Array.from({ length: hotel.stars }).map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-primary font-bold text-2xl">₹{hotel.hourly_rate}</div>
                            <div className="text-xs text-gray-500">per hour</div>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{hotel.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Min {hotel.min_hours}hrs</span> • Max {hotel.max_hours}hrs
                          </div>
                          <Button size="sm">View Details</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EarlyHotels;
