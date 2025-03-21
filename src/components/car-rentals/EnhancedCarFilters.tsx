
import React from "react";
import { Filter, Car, Sliders, Check } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface EnhancedCarFiltersProps {
  searchValues: {
    location: string;
    dates: string;
    type: string;
    priceRange: [number, number];
    transmission: string;
    seatingCapacity: number;
  };
  setSearchValues: React.Dispatch<React.SetStateAction<{
    location: string;
    dates: string;
    type: string;
    priceRange: [number, number];
    transmission: string;
    seatingCapacity: number;
  }>>;
  onSubmit: (e: React.FormEvent) => void;
  resetFilters: () => void;
}

const EnhancedCarFilters = ({ 
  searchValues, 
  setSearchValues, 
  onSubmit,
  resetFilters 
}: EnhancedCarFiltersProps) => {
  
  const carTypes = ['SUV', 'Sedan', 'Hatchback', 'Luxury'];
  const transmissionTypes = ['Automatic', 'Manual'];
  const capacityOptions = [2, 4, 5, 7, 8];
  
  const handlePriceChange = (value: number[]) => {
    setSearchValues({
      ...searchValues,
      priceRange: [value[0], value[1]] as [number, number]
    });
  };

  const handleTypeChange = (type: string) => {
    setSearchValues({
      ...searchValues,
      type: searchValues.type === type.toLowerCase() ? "" : type.toLowerCase()
    });
  };

  const handleTransmissionChange = (transmission: string) => {
    setSearchValues({
      ...searchValues,
      transmission: searchValues.transmission === transmission.toLowerCase() ? "" : transmission.toLowerCase()
    });
  };

  const handleCapacityChange = (capacity: number) => {
    setSearchValues({
      ...searchValues,
      seatingCapacity: searchValues.seatingCapacity === capacity ? 0 : capacity
    });
  };

  return (
    <div className="w-full md:w-1/4 bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">Filters</h3>
        <Filter size={20} />
      </div>
      
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Car Type</h4>
        <div className="space-y-2">
          {carTypes.map((type) => (
            <button
              key={type}
              className={`flex items-center justify-between w-full px-3 py-2 rounded-md transition-colors ${
                searchValues.type.toLowerCase() === type.toLowerCase()
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "hover:bg-stone-50"
              }`}
              onClick={() => handleTypeChange(type)}
            >
              <span className="flex items-center">
                <Car size={16} className="mr-2" />
                {type}
              </span>
              {searchValues.type.toLowerCase() === type.toLowerCase() && (
                <Check size={16} className="text-primary" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Transmission</h4>
        <div className="space-y-2">
          {transmissionTypes.map((transmission) => (
            <button
              key={transmission}
              className={`flex items-center justify-between w-full px-3 py-2 rounded-md transition-colors ${
                searchValues.transmission.toLowerCase() === transmission.toLowerCase()
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "hover:bg-stone-50"
              }`}
              onClick={() => handleTransmissionChange(transmission)}
            >
              <span>{transmission}</span>
              {searchValues.transmission.toLowerCase() === transmission.toLowerCase() && (
                <Check size={16} className="text-primary" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Seating Capacity</h4>
        <div className="space-y-2">
          {capacityOptions.map((capacity) => (
            <button
              key={capacity}
              className={`flex items-center justify-between w-full px-3 py-2 rounded-md transition-colors ${
                searchValues.seatingCapacity === capacity
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "hover:bg-stone-50"
              }`}
              onClick={() => handleCapacityChange(capacity)}
            >
              <span>{capacity} {capacity === 1 ? 'Person' : 'People'}</span>
              {searchValues.seatingCapacity === capacity && (
                <Check size={16} className="text-primary" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Price Range</h4>
        <Slider
          defaultValue={[searchValues.priceRange[0], searchValues.priceRange[1]]}
          max={5000}
          min={500}
          step={500}
          onValueChange={handlePriceChange}
          className="mb-6"
        />
        <div className="flex justify-between text-sm text-stone-500">
          <span>₹{searchValues.priceRange[0]}</span>
          <span>₹{searchValues.priceRange[1]}</span>
        </div>
      </div>

      <div className="space-y-3">
        <button 
          onClick={onSubmit}
          className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg transition-all flex items-center justify-center"
        >
          <Sliders size={16} className="mr-2" />
          Apply Filters
        </button>
        
        <button 
          onClick={resetFilters}
          className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium py-2 px-4 rounded-lg transition-all"
        >
          Reset All
        </button>
      </div>
    </div>
  );
};

export default EnhancedCarFilters;
