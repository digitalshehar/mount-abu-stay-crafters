
import React from "react";
import { MapPin, Calendar, Users } from "lucide-react";

interface HotelSearchFormProps {
  search: { location: string; dates: string; guests: string };
  setSearch: React.Dispatch<React.SetStateAction<{ location: string; dates: string; guests: string }>>;
  stayType?: string;
}

const HotelSearchForm: React.FC<HotelSearchFormProps> = ({ search, setSearch, stayType = "overnight" }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearch(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
      {/* Location input */}
      <div className="relative">
        <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-stone-400" />
        <input
          type="text"
          name="location"
          value={search.location}
          onChange={handleChange}
          placeholder="Enter a destination or property"
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
      
      {/* Dates input */}
      <div className="relative">
        <Calendar className="absolute left-4 top-3.5 h-5 w-5 text-stone-400" />
        <input
          type="text"
          name="dates"
          value={search.dates}
          onChange={handleChange}
          placeholder={stayType === "dayUse" ? "Select date (same day checkout)" : "Check-in — Check-out"}
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
      
      {/* Guests input */}
      <div className="relative">
        <Users className="absolute left-4 top-3.5 h-5 w-5 text-stone-400" />
        <select
          name="guests"
          value={search.guests}
          onChange={handleChange}
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
        >
          <option value="">2 adults, 1 room</option>
          <option value="1-1">1 adult, 1 room</option>
          <option value="2-1">2 adults, 1 room</option>
          <option value="2-2">2 adults, 2 rooms</option>
          <option value="3-1">3 adults, 1 room</option>
          <option value="4-1">4 adults, 1 room</option>
          <option value="4-2">4 adults, 2 rooms</option>
        </select>
      </div>
    </div>
  );
};

export default HotelSearchForm;
