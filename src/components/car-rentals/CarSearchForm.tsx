
import React from "react";
import { MapPin, Calendar, Car } from "lucide-react";

interface CarSearchFormProps {
  searchValues: {
    location: string;
    dates: string;
    type: string;
    priceRange?: [number, number];
    transmission?: string;
    seatingCapacity?: number;
  };
  setSearchValues: React.Dispatch<React.SetStateAction<any>>;
  onSubmit: (e: React.FormEvent) => void;
}

const CarSearchForm = ({ searchValues, setSearchValues, onSubmit }: CarSearchFormProps) => {
  const carTypes = [
    { value: "", label: "Car Type" },
    { value: "suv", label: "SUV" },
    { value: "sedan", label: "Sedan" },
    { value: "hatchback", label: "Hatchback" },
    { value: "luxury", label: "Luxury" }
  ];

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
      <div className="relative">
        <Car className="absolute left-4 top-3.5 h-5 w-5 text-stone-400" />
        <select
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
          value={searchValues.type}
          onChange={(e) => setSearchValues({...searchValues, type: e.target.value})}
          aria-label="Car type"
        >
          {carTypes.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default CarSearchForm;
