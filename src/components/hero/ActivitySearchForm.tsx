
import { MapPin, Calendar } from "lucide-react";

interface ActivitySearchFormProps {
  search: {
    location: string;
    date: string;
    type: string;
  };
  setSearch: (search: {
    location: string;
    date: string;
    type: string;
  }) => void;
}

const ActivitySearchForm = ({ search, setSearch }: ActivitySearchFormProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div className="relative">
        <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-stone-400" />
        <input
          type="text"
          placeholder="Location"
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          value={search.location}
          onChange={(e) => setSearch({ ...search, location: e.target.value })}
        />
      </div>
      <div className="relative">
        <Calendar className="absolute left-4 top-3.5 h-5 w-5 text-stone-400" />
        <input
          type="text"
          placeholder="Date"
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          value={search.date}
          onChange={(e) => setSearch({ ...search, date: e.target.value })}
        />
      </div>
      <div className="relative">
        <select
          className="w-full pl-4 pr-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
          value={search.type}
          onChange={(e) => setSearch({ ...search, type: e.target.value })}
        >
          <option value="">Activity Type</option>
          <option value="trekking">Trekking</option>
          <option value="sightseeing">Sightseeing</option>
          <option value="camping">Camping</option>
          <option value="yoga">Yoga Retreat</option>
        </select>
      </div>
    </div>
  );
};

export default ActivitySearchForm;
