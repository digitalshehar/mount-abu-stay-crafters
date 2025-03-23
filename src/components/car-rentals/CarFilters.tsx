
import React from "react";
import { CheckIcon } from "lucide-react";

interface CarFiltersProps {
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

const CarFilters = ({ searchValues, setSearchValues, onSubmit }: CarFiltersProps) => {
  // Car types for filtering
  const carTypes = [
    { id: "suv", label: "SUV" },
    { id: "sedan", label: "Sedan" },
    { id: "hatchback", label: "Hatchback" },
    { id: "luxury", label: "Luxury" },
    { id: "compact", label: "Compact" },
  ];

  // Price ranges for filtering
  const priceRanges = [
    { id: "budget", label: "Budget (₹1000-₹2000)" },
    { id: "mid-range", label: "Mid-Range (₹2000-₹4000)" },
    { id: "premium", label: "Premium (₹4000+)" }
  ];

  const handleTypeChange = (type: string) => {
    setSearchValues({...searchValues, type});
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Filter Cars</h2>
      
      {/* Car Type Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-3">Car Type</h3>
        <div className="space-y-2">
          {carTypes.map(type => (
            <label key={type.id} className="flex items-center cursor-pointer">
              <div className={`w-5 h-5 rounded flex items-center justify-center mr-3 ${
                searchValues.type === type.id ? "bg-primary text-white" : "border border-stone-300"
              }`}>
                {searchValues.type === type.id && <CheckIcon className="w-3.5 h-3.5" />}
              </div>
              <span className="text-sm">{type.label}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Price Range Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-3">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map(range => (
            <label key={range.id} className="flex items-center cursor-pointer">
              <div className="w-5 h-5 rounded border border-stone-300 mr-3"></div>
              <span className="text-sm">{range.label}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Apply Filters Button */}
      <button 
        onClick={(e) => onSubmit(e as React.FormEvent)}
        className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2.5 rounded-lg shadow-sm transition-all"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default CarFilters;
