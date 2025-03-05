
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { 
  Search, 
  MapPin, 
  Star, 
  SlidersHorizontal, 
  X 
} from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HotelCard from "@/components/HotelCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { supabase } from "@/integrations/supabase/client";

const Hotels = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([1000, 15000]);
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  // Fetch hotels from Supabase
  const { data: hotels, isLoading, error, refetch } = useQuery({
    queryKey: ["hotels"],
    queryFn: async () => {
      console.log("Fetching hotels from Supabase...");
      try {
        const { data, error } = await supabase
          .from("hotels")
          .select("*")
          .eq("status", "active");
        
        if (error) {
          console.error("Supabase error:", error);
          throw error;
        }
        
        console.log("Fetched hotels:", data);
        return data || [];
      } catch (error) {
        console.error("Error in fetchHotels:", error);
        throw error;
      }
    },
  });

  useEffect(() => {
    if (error) {
      console.error("Error details:", error);
      toast.error("Failed to load hotels", {
        description: "Please try again or contact support."
      });
    }
  }, [error]);

  // Filter hotels based on search and filters
  const filteredHotels = hotels?.filter((hotel) => {
    const matchesSearch =
      searchQuery === "" ||
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStars =
      selectedStars.length === 0 || selectedStars.includes(hotel.stars);

    const matchesPrice =
      hotel.price_per_night >= priceRange[0] && hotel.price_per_night <= priceRange[1];

    const matchesAmenities =
      selectedAmenities.length === 0 ||
      selectedAmenities.every((amenity) => 
        hotel.amenities && Array.isArray(hotel.amenities) && 
        hotel.amenities.some(hotelAmenity => 
          hotelAmenity.toLowerCase() === amenity.toLowerCase()
        )
      );

    return matchesSearch && matchesStars && matchesPrice && matchesAmenities;
  });

  // Common amenities
  const commonAmenities = [
    "Wifi",
    "Breakfast",
    "TV",
    "Bathroom",
    "Parking",
    "Pool",
    "Air Conditioning",
    "Restaurant",
  ];

  const handleStarFilter = (star: number) => {
    setSelectedStars((prev) =>
      prev.includes(star)
        ? prev.filter((s) => s !== star)
        : [...prev, star]
    );
  };

  const handleAmenityFilter = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(prev => {
      if (searchQuery) {
        prev.set("search", searchQuery);
      } else {
        prev.delete("search");
      }
      return prev;
    });
  };

  const clearFilters = () => {
    setPriceRange([1000, 15000]);
    setSelectedStars([]);
    setSelectedAmenities([]);
    setSearchQuery("");
    setSearchParams({});
  };

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow pt-28 pb-16">
          <div className="container-custom">
            <div className="flex flex-col space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold font-display">
                    Hotels in Mount Abu
                  </h1>
                  <p className="text-stone-600 mt-1">
                    Find your perfect accommodation for your stay in Mount Abu
                  </p>
                </div>

                <form onSubmit={handleSearch} className="flex w-full md:w-auto">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" size={18} />
                    <Input
                      placeholder="Search hotels or locations..."
                      className="pl-10 w-full md:w-64"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="ml-2">
                    Search
                  </Button>
                </form>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filters - Desktop */}
                <div className="hidden lg:block bg-white p-6 rounded-xl shadow-sm space-y-6 h-fit">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">Filters</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-stone-500 h-8 px-2"
                    >
                      Clear All
                    </Button>
                  </div>

                  <Separator />

                  {/* Price Range */}
                  <div>
                    <h4 className="font-medium mb-3">Price Range (₹)</h4>
                    <Slider
                      value={priceRange}
                      min={1000}
                      max={15000}
                      step={500}
                      onValueChange={setPriceRange}
                      className="my-6"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-sm bg-stone-100 px-2 py-1 rounded">
                        ₹{priceRange[0]}
                      </span>
                      <span className="text-sm bg-stone-100 px-2 py-1 rounded">
                        ₹{priceRange[1]}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  {/* Star Rating */}
                  <div>
                    <h4 className="font-medium mb-3">Star Rating</h4>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star} className="flex items-center space-x-2">
                          <Checkbox
                            id={`star-${star}`}
                            checked={selectedStars.includes(star)}
                            onCheckedChange={() => handleStarFilter(star)}
                          />
                          <label
                            htmlFor={`star-${star}`}
                            className="flex items-center cursor-pointer"
                          >
                            <div className="flex">
                              {Array.from({ length: star }).map((_, i) => (
                                <Star
                                  key={i}
                                  size={16}
                                  className="text-yellow-500 fill-yellow-500"
                                />
                              ))}
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Amenities */}
                  <div>
                    <h4 className="font-medium mb-3">Amenities</h4>
                    <div className="space-y-2">
                      {commonAmenities.map((amenity) => (
                        <div key={amenity} className="flex items-center space-x-2">
                          <Checkbox
                            id={`amenity-${amenity}`}
                            checked={selectedAmenities.includes(amenity)}
                            onCheckedChange={() => handleAmenityFilter(amenity)}
                          />
                          <label
                            htmlFor={`amenity-${amenity}`}
                            className="cursor-pointer"
                          >
                            {amenity}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hotel List */}
                <div className="lg:col-span-3">
                  {/* Mobile Filters Button */}
                  <div className="lg:hidden mb-4">
                    <Button
                      onClick={() => setIsFilterOpen(!isFilterOpen)}
                      variant="outline"
                      className="w-full gap-2"
                    >
                      <SlidersHorizontal size={16} />
                      Filters
                    </Button>

                    {/* Mobile Filters Panel */}
                    {isFilterOpen && (
                      <div className="fixed inset-0 bg-white z-50 p-6 overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-lg">Filters</h3>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsFilterOpen(false)}
                          >
                            <X size={20} />
                          </Button>
                        </div>

                        <Separator className="mb-6" />

                        {/* Price Range */}
                        <div className="mb-6">
                          <h4 className="font-medium mb-3">Price Range (₹)</h4>
                          <Slider
                            value={priceRange}
                            min={1000}
                            max={15000}
                            step={500}
                            onValueChange={setPriceRange}
                            className="my-6"
                          />
                          <div className="flex items-center justify-between">
                            <span className="text-sm bg-stone-100 px-2 py-1 rounded">
                              ₹{priceRange[0]}
                            </span>
                            <span className="text-sm bg-stone-100 px-2 py-1 rounded">
                              ₹{priceRange[1]}
                            </span>
                          </div>
                        </div>

                        <Separator className="mb-6" />

                        {/* Star Rating */}
                        <div className="mb-6">
                          <h4 className="font-medium mb-3">Star Rating</h4>
                          <div className="space-y-2">
                            {[5, 4, 3, 2, 1].map((star) => (
                              <div key={star} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`mobile-star-${star}`}
                                  checked={selectedStars.includes(star)}
                                  onCheckedChange={() => handleStarFilter(star)}
                                />
                                <label
                                  htmlFor={`mobile-star-${star}`}
                                  className="flex items-center cursor-pointer"
                                >
                                  <div className="flex">
                                    {Array.from({ length: star }).map((_, i) => (
                                      <Star
                                        key={i}
                                        size={16}
                                        className="text-yellow-500 fill-yellow-500"
                                      />
                                    ))}
                                  </div>
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Separator className="mb-6" />

                        {/* Amenities */}
                        <div className="mb-6">
                          <h4 className="font-medium mb-3">Amenities</h4>
                          <div className="space-y-2">
                            {commonAmenities.map((amenity) => (
                              <div key={amenity} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`mobile-amenity-${amenity}`}
                                  checked={selectedAmenities.includes(amenity)}
                                  onCheckedChange={() => handleAmenityFilter(amenity)}
                                />
                                <label
                                  htmlFor={`mobile-amenity-${amenity}`}
                                  className="cursor-pointer"
                                >
                                  {amenity}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2 mt-6">
                          <Button
                            variant="outline"
                            className="w-1/2"
                            onClick={clearFilters}
                          >
                            Clear All
                          </Button>
                          <Button
                            className="w-1/2"
                            onClick={() => setIsFilterOpen(false)}
                          >
                            Apply Filters
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Hotel Results */}
                  {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <div
                          key={index}
                          className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse"
                        >
                          <div className="h-52 bg-stone-200"></div>
                          <div className="p-6 space-y-3">
                            <div className="h-6 bg-stone-200 rounded w-3/4"></div>
                            <div className="h-4 bg-stone-200 rounded w-1/2"></div>
                            <div className="flex space-x-2">
                              {Array.from({ length: 3 }).map((_, i) => (
                                <div
                                  key={i}
                                  className="h-6 bg-stone-200 rounded w-16"
                                ></div>
                              ))}
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="h-6 bg-stone-200 rounded w-24"></div>
                              <div className="h-10 bg-stone-200 rounded w-28"></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : filteredHotels && filteredHotels.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredHotels.map((hotel) => (
                        <HotelCard
                          key={hotel.id}
                          id={hotel.id}
                          name={hotel.name}
                          image={hotel.image}
                          price={hotel.price_per_night}
                          location={hotel.location}
                          rating={hotel.rating || 0}
                          reviewCount={hotel.review_count || 0}
                          amenities={hotel.amenities || []}
                          featured={hotel.featured}
                          slug={hotel.slug}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white rounded-xl p-8 text-center shadow-sm">
                      <h3 className="text-xl font-semibold mb-2">No hotels found</h3>
                      <p className="text-stone-600 mb-4">
                        Try adjusting your filters or search criteria.
                      </p>
                      <Button onClick={clearFilters}>Clear Filters</Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Hotels;
