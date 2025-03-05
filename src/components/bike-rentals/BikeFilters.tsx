
import React from "react";
import { Filter } from "lucide-react";

interface BikeFiltersProps {
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
  onApplyFilters: (e: React.FormEvent) => void;
}

const BikeFilters = ({ searchValues, setSearchValues, onApplyFilters }: BikeFiltersProps) => {
  return (
    <div className="w-full md:w-1/4 bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Filters</h3>
        <Filter size={20} />
      </div>
      
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Bike Type</h4>
        <div className="space-y-2">
          {['Scooter', 'Sports', 'Cruiser', 'Standard'].map((type) => (
            <label key={type} className="flex items-center">
              <input 
                type="checkbox" 
                className="mr-2" 
                checked={searchValues.type.toLowerCase() === type.toLowerCase()}
                onChange={() => {
                  setSearchValues({
                    ...searchValues, 
                    type: searchValues.type.toLowerCase() === type.toLowerCase() ? "" : type
                  });
                }}
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Engine Capacity</h4>
        <div className="space-y-2">
          {['100-125cc', '125-150cc', '150-200cc', '200cc+'].map((capacity) => (
            <label key={capacity} className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>{capacity}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Price Range</h4>
        <input
          type="range"
          min="200"
          max="2000"
          step="200"
          className="w-full"
        />
        <div className="flex justify-between text-sm text-stone-500 mt-2">
          <span>₹200</span>
          <span>₹2000</span>
        </div>
      </div>

      <button 
        onClick={onApplyFilters}
        className="w-full bg-secondary hover:bg-secondary/80 text-primary font-medium py-2 px-4 rounded-lg transition-all"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default BikeFilters;
