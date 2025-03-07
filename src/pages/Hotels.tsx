import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { 
  Search, 
  MapPin, 
  Star, 
  SlidersHorizontal, 
  X,
  Info 
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
import { Badge } from "@/components/ui/badge";

const Hotels = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([1000, 15000]);
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [activeFilterCount, setActiveFilterCount] = useState(0);

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

  useEffect(() => {
    let count = 0;
    if (searchQuery) count++;
    if (selectedStars.length > 0) count++;
    if (selectedAmenities.length > 0) count++;
    if (priceRange[0] !== 1000 || priceRange[1] !== 15000) count++;
    setActiveFilterCount(count);
  }, [searchQuery, selectedStars, selectedAmenities, priceRange]);

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

  const commonAmenities = [
    "Wifi",
    "Breakfast",
    "TV",
    "Bathroom",
    "Parking",
    "Pool",
    "Air Conditioning",
    "Restaurant",
    "Gym",
    "Spa",
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

  const hotelListingSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": filteredHotels?.map((hotel, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Hotel",
        "name": hotel.name,
        "url": `${window.location.origin}/hotel/${hotel.slug}`,
        "image": hotel.image,
        "description": hotel.description || `A ${hotel.stars}-star hotel in ${hotel.location}, Mount Abu`,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": hotel.location,
          "addressRegion": "Rajasthan",
          "addressCountry": "IN"
        },
        "priceRange": `₹${hotel.price_per_night} - ₹${hotel.price_per_night * 2}`,
        "starRating": {
          "@type": "Rating",
          "ratingValue": hotel.stars
        }
      }
    })) || []
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

              {activeFilterCount > 0 && (
                <div className="bg-stone-50 p-4 rounded-lg flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-stone-600">Active filters:</span>
                  
                  {searchQuery && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      Search: {searchQuery}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                    </Badge>
                  )}
                  
                  {selectedStars.length > 0 && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      Stars: {selectedStars.sort().join(", ")}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedStars([])} />
                    </Badge>
                  )}
                  
                  {selectedAmenities.length > 0 && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      Amenities: {selectedAmenities.length}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedAmenities([])} />
                    </Badge>
                  )}
                  
                  {(priceRange[0] !== 1000 || priceRange[1] !== 15000) && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      Price: ₹{priceRange[0]} - ₹{priceRange[1]}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setPriceRange([1000, 15000])} />
                    </Badge>
                  )}
                  
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="ml-auto">
                    Clear all filters
                  </Button>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
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

                <div className="lg:col-span-3">
                  <div className="lg:hidden mb-4">
                    <Button
                      onClick={() => setIsFilterOpen(!isFilterOpen)}
                      variant="outline"
                      className="w-full gap-2"
                    >
                      <SlidersHorizontal size={16} />
                      Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                    </Button>

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

                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 flex items-start">
                    <Info className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-blue-700 mb-1">About Mount Abu Hotels</h3>
                      <p className="text-sm text-blue-600">
                        Mount Abu offers a range of accommodations from luxurious resorts to budget-friendly hotels. 
                        Most hotels are located near Nakki Lake and offer beautiful views of the surrounding Aravalli Hills.
                        The high season runs from October to March with peak rates, while the monsoon season (July-September) 
                        offers lush landscapes at lower prices.
                      </p>
                    </div>
                  </div>

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
                    <>
                      <p className="text-stone-600 mb-6">
                        Showing {filteredHotels.length} {filteredHotels.length === 1 ? 'hotel' : 'hotels'} {activeFilterCount > 0 ? 'matching your filters' : 'in Mount Abu'}
                      </p>
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
                    </>
                  ) : (
                    <div className="bg-white rounded-xl p-8 text-center shadow-sm">
                      <h3 className="text-xl font-semibold mb-2">No hotels found</h3>
                      <p className="text-stone-600 mb-4">
                        Try adjusting your filters or search criteria.
                      </p>
                      <Button onClick={clearFilters}>Clear Filters</Button>
                    </div>
                  )}
                  
                  <div className="mt-12 bg-white rounded-xl p-8 shadow-sm">
                    <h2 className="text-2xl font-semibold mb-4">Discover Mount Abu's Finest Hotels</h2>
                    <div className="prose max-w-none text-stone-600">
                      <p>
                        Mount Abu, Rajasthan's only hill station, is a serene retreat nestled in the Aravalli Range. 
                        Known for its stunning landscapes, sacred temples, and pleasant climate, Mount Abu offers the 
                        perfect escape from the desert heat of Rajasthan.
                      </p>
                      
                      <h3 className="text-xl font-medium mt-6 mb-3">Choosing the Perfect Accommodation</h3>
                      <p>
                        Whether you're planning a family vacation, a romantic getaway, or a spiritual retreat, Mount Abu 
                        has accommodations to suit every need and budget. From luxury resorts overlooking Nakki Lake to 
                        budget-friendly guesthouses in the town center, you'll find the perfect place to stay.
                      </p>
                      
                      <h3 className="text-xl font-medium mt-6 mb-3">Best Areas to Stay</h3>
                      <p>
                        The most popular areas to stay in Mount Abu include:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 mt-3">
                        <li>
                          <span className="font-medium">Nakki Lake Area</span> - The heart of Mount Abu, offering stunning 
                          lake views and easy access to boat rides, shopping, and restaurants.
                        </li>
                        <li>
                          <span className="font-medium">Sunset Point Road</span> - Perfect for those seeking peaceful surroundings 
                          and spectacular sunset views.
                        </li>
                        <li>
                          <span className="font-medium">Near Dilwara Temples</span> - Ideal for spiritual seekers wanting easy 
                          access to these magnificent Jain temples.
                        </li>
                      </ul>
                      
                      <h3 className="text-xl font-medium mt-6 mb-3">When to Visit</h3>
                      <p>
                        The best time to visit Mount Abu is from October to March when the weather is pleasant and perfect for 
                        sightseeing. Summer (April to June) can be warm but still cooler than the plains below. Monsoon season 
                        (July to September) transforms the landscape into a lush green paradise, though some outdoor activities 
                        may be limited.
                      </p>
                      
                      <h3 className="text-xl font-medium mt-6 mb-3">Popular Attractions Near Hotels</h3>
                      <p>
                        Most hotels in Mount Abu provide easy access to popular attractions including:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 mt-3">
                        <li>Nakki Lake - A sacred lake with boating facilities</li>
                        <li>Dilwara Temples - Exquisite Jain temples known for incredible marble carvings</li>
                        <li>Sunset Point - Offering breathtaking views of the sunset</li>
                        <li>Guru Shikhar - The highest peak in the Aravalli Range</li>
                        <li>Trevor's Tank - A delight for nature and wildlife enthusiasts</li>
                        <li>Mount Abu Wildlife Sanctuary - Home to diverse flora and fauna</li>
                      </ul>
                      
                      <p className="mt-6">
                        Browse our carefully selected hotels and find your perfect stay in Mount Abu. Filter by amenities, 
                        price range, or star rating to customize your search based on your preferences and budget.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-8 bg-white rounded-xl p-8 shadow-sm">
                    <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions About Mount Abu Hotels</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-lg mb-2">What is the average price of hotels in Mount Abu?</h3>
                        <p className="text-stone-600">
                          Hotel prices in Mount Abu vary by season. Budget accommodations start from ₹1,000 per night, mid-range 
                          hotels range from ₹2,500 to ₹5,000, while luxury resorts can cost ₹7,000 and above per night.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-lg mb-2">Which hotels in Mount Abu offer the best views?</h3>
                        <p className="text-stone-600">
                          Hotels around Nakki Lake and those located at higher elevations typically offer the best views 
                          of the surrounding landscapes. Many luxury hotels feature rooms with private balconies overlooking 
                          the Aravalli hills or the lake.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-lg mb-2">Is it necessary to book hotels in advance?</h3>
                        <p className="text-stone-600">
                          It's highly recommended to book in advance, especially during peak tourist seasons (October to March and 
                          during holidays). Last-minute bookings may result in higher prices or limited availability.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-lg mb-2">Do Mount Abu hotels provide transportation to local attractions?</h3>
                        <p className="text-stone-600">
                          Many hotels offer transportation services to popular attractions, either included in the package or for 
                          an additional fee. Some luxury hotels provide complimentary shuttle services to nearby points of interest.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-lg mb-2">Are there any eco-friendly or sustainable hotels in Mount Abu?</h3>
                        <p className="text-stone-600">
                          Yes, several hotels in Mount Abu have adopted eco-friendly practices, such as solar power, water 
                          conservation, and waste management. Look for properties that mention sustainability initiatives in 
                          their descriptions.
                        </p>
                      </div>
                    </div>
                  </div>
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
