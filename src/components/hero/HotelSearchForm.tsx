
import { MapPin, Calendar, Users } from "lucide-react";

interface HotelSearchFormProps {
  search: {
    location: string;
    dates: string;
    guests: string;
  };
  setSearch: (search: {
    location: string;
    dates: string;
    guests: string;
  }) => void;
}

const HotelSearchForm = ({ search, setSearch }: HotelSearchFormProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div className="relative">
        <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-stone-400" />
        <input
          type="text"
          placeholder="Where are you going?"
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          value={search.location}
          onChange={(e) => setSearch({ ...search, location: e.target.value })}
        />
      </div>
      <div className="relative">
        <Calendar className="absolute left-4 top-3.5 h-5 w-5 text-stone-400" />
        <input
          type="text"
          placeholder="Check-in — Check-out"
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          value={search.dates}
          onChange={(e) => setSearch({ ...search, dates: e.target.value })}
        />
      </div>
      <div className="relative">
        <Users className="absolute left-4 top-3.5 h-5 w-5 text-stone-400" />
        <select
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
          value={search.guests}
          onChange={(e) => setSearch({ ...search, guests: e.target.value })}
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
  );
};

export default HotelSearchForm;
