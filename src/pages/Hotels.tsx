
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchForm from "../components/SearchForm";
import HotelCard from "../components/HotelCard";
import { Map, List, SlidersHorizontal, X } from "lucide-react";

const Hotels = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  // Sample hotels data
  const hotels = [
    {
      id: 1,
      name: "Hilltop Luxury Resort",
      image: "https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      price: 5800,
      location: "Near Nakki Lake",
      rating: 4.8,
      reviewCount: 312,
      amenities: ["Wifi", "Breakfast", "Swimming Pool", "Spa"],
    },
    {
      id: 2,
      name: "Palace Heritage Hotel",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      price: 7200,
      location: "Central Mount Abu",
      rating: 4.9,
      reviewCount: 245,
      amenities: ["Wifi", "Breakfast", "Restaurant", "Gym"],
    },
    {
      id: 3,
      name: "Green Valley Resort",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      price: 4300,
      location: "Near Wildlife Sanctuary",
      rating: 4.6,
      reviewCount: 187,
      amenities: ["Wifi", "Parking", "Restaurant", "Garden"],
    },
    {
      id: 4,
      name: "Mountain View Cottages",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      price: 3500,
      location: "Sunset Point",
      rating: 4.5,
      reviewCount: 156,
      amenities: ["Wifi", "Breakfast", "TV", "Bathroom"],
    },
    {
      id: 5,
      name: "Lakeside Retreat",
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      price: 4800,
      location: "Nakki Lake",
      rating: 4.7,
      reviewCount: 203,
      amenities: ["Wifi", "Breakfast", "TV", "Lake View"],
    },
    {
      id: 6,
      name: "Budget Inn Mount Abu",
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      price: 2500,
      location: "City Center",
      rating: 4.2,
      reviewCount: 103,
      amenities: ["Wifi", "TV", "Restaurant"],
    },
    {
      id: 7,
      name: "Royal Palace Hotel",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      price: 6900,
      location: "Dilwara Road",
      rating: 4.8,
      reviewCount: 276,
      amenities: ["Wifi", "Breakfast", "Swimming Pool", "Gym", "Spa"],
    },
    {
      id: 8,
      name: "Forest Lodge",
      image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      price: 3800,
      location: "Wildlife Sanctuary",
      rating: 4.4,
      reviewCount: 127,
      amenities: ["Wifi", "Breakfast", "Parking", "Nature Trails"],
    },
  ];

  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((item) => item !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  useEffect(() => {
    document.title = "Hotels in Mount Abu - Find Your Perfect Stay";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      <main className="pt-24 pb-16">
        {/* Page Header */}
        <div className="bg-white py-10 border-b border-stone-200">
          <div className="container-custom">
            <h1 className="title-medium mb-4">Hotels in Mount Abu</h1>
            <p className="subtitle max-w-3xl">
              Discover the perfect accommodation for your stay in Mount Abu. From luxury resorts to
              budget-friendly options, we have something for everyone.
            </p>
          </div>
        </div>

        <div className="container-custom mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters - Desktop */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h3 className="font-display font-semibold text-lg mb-6">Filters</h3>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium text-stone-800 mb-4">Price Range</h4>
                  <div className="px-2">
                    <div className="flex justify-between text-sm text-stone-500 mb-2">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="500"
                      className="w-full"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    />
                  </div>
                </div>

                {/* Star Rating */}
                <div className="mb-6">
                  <h4 className="font-medium text-stone-800 mb-4">Star Rating</h4>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <label
                        key={rating}
                        className="flex items-center space-x-3 cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="rating"
                          className="form-radio h-4 w-4 text-primary"
                          checked={selectedRating === rating}
                          onChange={() => setSelectedRating(rating)}
                        />
                        <div className="flex text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < rating ? "text-yellow-500" : "text-stone-300"}>
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-stone-600 group-hover:text-stone-900">
                          {rating} {rating === 1 ? "star" : "stars"}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-6">
                  <h4 className="font-medium text-stone-800 mb-4">Amenities</h4>
                  <div className="space-y-2">
                    {["Wifi", "Breakfast", "Swimming Pool", "Parking", "Restaurant", "Spa", "Gym", "Pet Friendly"].map(
                      (amenity) => (
                        <label
                          key={amenity}
                          className="flex items-center space-x-3 cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-primary rounded"
                            checked={selectedAmenities.includes(amenity)}
                            onChange={() => toggleAmenity(amenity)}
                          />
                          <span className="text-sm text-stone-600 group-hover:text-stone-900">
                            {amenity}
                          </span>
                        </label>
                      )
                    )}
                  </div>
                </div>

                {/* Reset Filters */}
                <button
                  className="w-full py-2 border border-stone-300 rounded-lg text-stone-600 text-sm font-medium hover:bg-stone-50 transition-colors"
                  onClick={() => {
                    setPriceRange([0, 10000]);
                    setSelectedAmenities([]);
                    setSelectedRating(null);
                  }}
                >
                  Reset Filters
                </button>
              </div>
            </div>

            {/* Mobile Filters Button */}
            <div className="lg:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30">
              <button
                onClick={() => setShowMobileFilters(true)}
                className="bg-primary text-white px-6 py-3 rounded-full shadow-lg flex items-center"
              >
                <SlidersHorizontal className="h-5 w-5 mr-2" />
                Filters
              </button>
            </div>

            {/* Mobile Filters Sidebar */}
            {showMobileFilters && (
              <div className="fixed inset-0 bg-black/50 z-40 lg:hidden flex items-end">
                <div className="bg-white w-full h-[85vh] rounded-t-3xl p-6 overflow-y-auto animate-slide-in-right">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-display font-semibold text-lg">Filters</h3>
                    <button
                      onClick={() => setShowMobileFilters(false)}
                      className="text-stone-500"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Price Range */}
                  <div className="mb-8">
                    <h4 className="font-medium text-stone-800 mb-4">Price Range</h4>
                    <div className="px-2">
                      <div className="flex justify-between text-sm text-stone-500 mb-2">
                        <span>₹{priceRange[0]}</span>
                        <span>₹{priceRange[1]}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="10000"
                        step="500"
                        className="w-full"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      />
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div className="mb-8">
                    <h4 className="font-medium text-stone-800 mb-4">Star Rating</h4>
                    <div className="space-y-3">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <label
                          key={rating}
                          className="flex items-center space-x-3 cursor-pointer group"
                        >
                          <input
                            type="radio"
                            name="mobile-rating"
                            className="form-radio h-5 w-5 text-primary"
                            checked={selectedRating === rating}
                            onChange={() => setSelectedRating(rating)}
                          />
                          <div className="flex text-yellow-500 text-lg">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < rating ? "text-yellow-500" : "text-stone-300"}>
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="text-stone-600 group-hover:text-stone-900">
                            {rating} {rating === 1 ? "star" : "stars"}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="mb-8">
                    <h4 className="font-medium text-stone-800 mb-4">Amenities</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {["Wifi", "Breakfast", "Swimming Pool", "Parking", "Restaurant", "Spa", "Gym", "Pet Friendly"].map(
                        (amenity) => (
                          <label
                            key={amenity}
                            className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                              selectedAmenities.includes(amenity)
                                ? "border-primary/30 bg-primary/5"
                                : "border-stone-200 hover:border-stone-300"
                            }`}
                          >
                            <input
                              type="checkbox"
                              className="sr-only"
                              checked={selectedAmenities.includes(amenity)}
                              onChange={() => toggleAmenity(amenity)}
                            />
                            <span className={selectedAmenities.includes(amenity) ? "text-primary" : ""}>
                              {amenity}
                            </span>
                          </label>
                        )
                      )}
                    </div>
                  </div>

                  {/* Apply / Reset Buttons */}
                  <div className="flex gap-4">
                    <button
                      className="flex-1 py-3 border border-stone-300 rounded-lg text-stone-600 font-medium hover:bg-stone-50 transition-colors"
                      onClick={() => {
                        setPriceRange([0, 10000]);
                        setSelectedAmenities([]);
                        setSelectedRating(null);
                      }}
                    >
                      Reset
                    </button>
                    <button
                      className="flex-1 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                      onClick={() => setShowMobileFilters(false)}
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Search Form */}
              <SearchForm className="mb-8" compact />

              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-stone-500">
                    <span className="font-medium text-stone-800">{hotels.length}</span> hotels found
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-stone-500 mr-2 hidden sm:inline">View:</span>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded ${
                      viewMode === "grid"
                        ? "bg-primary text-white"
                        : "bg-white text-stone-500 hover:bg-stone-100"
                    }`}
                    aria-label="Grid view"
                  >
                    <Map className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded ${
                      viewMode === "list"
                        ? "bg-primary text-white"
                        : "bg-white text-stone-500 hover:bg-stone-100"
                    }`}
                    aria-label="List view"
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Hotels Grid */}
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-6"
                }
              >
                {hotels.map((hotel) => (
                  <HotelCard
                    key={hotel.id}
                    {...hotel}
                    featured={viewMode === "list"}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Hotels;
