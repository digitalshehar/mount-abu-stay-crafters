
import React from "react";
import { Filter } from "lucide-react";

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
  return (
    <div className="w-full md:w-1/4 bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Filters</h3>
        <Filter size={20} />
      </div>
      
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Car Type</h4>
        <div className="space-y-2">
          {['SUV', 'Sedan', 'Hatchback', 'Luxury'].map((type) => (
            <label key={type} className="flex items-center">
              <input 
                type="checkbox" 
                className="mr-2" 
                checked={searchValues.type.toLowerCase() === type.toLowerCase()}
                onChange={() => {
                  setSearchValues({
                    ...searchValues, 
                    type: searchValues.type.toLowerCase() === type.toLowerCase() ? "" : type.toLowerCase()
                  });
                }}
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Transmission</h4>
        <div className="space-y-2">
          {['Automatic', 'Manual'].map((transmission) => (
            <label key={transmission} className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>{transmission}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Price Range</h4>
        <input
          type="range"
          min="500"
          max="5000"
          step="500"
          className="w-full"
        />
        <div className="flex justify-between text-sm text-stone-500 mt-2">
          <span>₹500</span>
          <span>₹5000</span>
        </div>
      </div>

      <button 
        onClick={onSubmit}
        className="w-full bg-secondary hover:bg-secondary/80 text-primary font-medium py-2 px-4 rounded-lg transition-all"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default CarFilters;
