
import { useState } from "react";
import { Calendar, MapPin, Users, Search, SlidersHorizontal } from "lucide-react";

interface SearchFormProps {
  onSearch?: (searchParams: any) => void;
  className?: string;
  compact?: boolean;
}

const SearchForm = ({ onSearch, className = "", compact = false }: SearchFormProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [location, setLocation] = useState("");
  const [dates, setDates] = useState("");
  const [guests, setGuests] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [amenities, setAmenities] = useState<string[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({
        location,
        dates,
        guests,
        priceRange,
        amenities,
      });
    }
  };

  const toggleAmenity = (amenity: string) => {
    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter((item) => item !== amenity));
    } else {
      setAmenities([...amenities, amenity]);
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm p-4 ${className}`}>
      <form onSubmit={handleSearch}>
        <div className={`grid ${compact ? "grid-cols-1 gap-2" : "grid-cols-1 md:grid-cols-3 gap-4"}`}>
          <div className="relative">
            <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-stone-400" />
            <input
              type="text"
              placeholder="Where are you going?"
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-4 top-3.5 h-5 w-5 text-stone-400" />
            <input
              type="text"
              placeholder="Check-in — Check-out"
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={dates}
              onChange={(e) => setDates(e.target.value)}
            />
          </div>
          <div className="relative">
            <Users className="absolute left-4 top-3.5 h-5 w-5 text-stone-400" />
            <select
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            >
              <option value="">Guests & Rooms</option>
              <option value="1-1">1 Guest, 1 Room</option>
              <option value="2-1">2 Guests, 1 Room</option>
              <option value="2-2">2 Guests, 2 Rooms</option>
              <option value="3-1">3 Guests, 1 Room</option>
              <option value="4-1">4 Guests, 1 Room</option>
              <option value="4-2">4 Guests, 2 Rooms</option>
            </select>
          </div>
        </div>

        <div className={`flex ${compact ? "mt-2" : "mt-4"} items-center justify-between`}>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center text-primary text-sm font-medium"
          >
            <SlidersHorizontal className="h-4 w-4 mr-1" />
            {showFilters ? "Hide Filters" : "More Filters"}
          </button>
          <button
            type="submit"
            className={`${
              compact ? "px-4 py-2 text-sm" : "px-6 py-3"
            } bg-primary hover:bg-primary/90 text-white font-medium rounded-lg shadow transition-all flex items-center`}
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </button>
        </div>

        {showFilters && (
          <div className={`${compact ? "mt-3" : "mt-6"} pt-4 border-t border-stone-100`}>
            <h4 className="font-medium text-stone-800 mb-3">Price Range</h4>
            <div className="px-2 mb-6">
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

            <h4 className="font-medium text-stone-800 mb-3">Amenities</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-2">
              {["Wifi", "Breakfast", "Swimming Pool", "Parking", "Restaurant", "Spa", "Gym", "Pet Friendly"].map(
                (amenity) => (
                  <label
                    key={amenity}
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                      amenities.includes(amenity)
                        ? "border-primary/30 bg-primary/5"
                        : "border-stone-200 hover:border-stone-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={amenities.includes(amenity)}
                      onChange={() => toggleAmenity(amenity)}
                    />
                    <span className="text-sm">{amenity}</span>
                  </label>
                )
              )}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchForm;
