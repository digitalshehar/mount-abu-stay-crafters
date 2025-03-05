
import React from "react";
import { MapPin, Calendar } from "lucide-react";

interface BikeSearchFormProps {
  searchValues: {
    location: string;
    dates: string;
    type: string;
  };
  setSearchValues: React.Dispatch<React.SetStateAction<{
    location: string;
    dates: string;
    type: string;
  }>>;
  onSubmit: (e: React.FormEvent) => void;
}

const BikeSearchForm = ({ searchValues, setSearchValues, onSubmit }: BikeSearchFormProps) => {
  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div className="relative">
        <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-stone-400" />
        <input
          type="text"
          placeholder="Pickup location"
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          value={searchValues.location}
          onChange={(e) => setSearchValues({...searchValues, location: e.target.value})}
        />
      </div>
      <div className="relative">
        <Calendar className="absolute left-4 top-3.5 h-5 w-5 text-stone-400" />
        <input
          type="text"
          placeholder="Pickup — Dropoff date"
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          value={searchValues.dates}
          onChange={(e) => setSearchValues({...searchValues, dates: e.target.value})}
        />
      </div>
      <button 
        type="submit"
        className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg shadow transition-all flex items-center justify-center"
      >
        Search Bikes
      </button>
    </form>
  );
};

export default BikeSearchForm;
