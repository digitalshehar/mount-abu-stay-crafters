
import React from "react";
import { ChevronDown } from "lucide-react";
import BikeCard from "./BikeCard";
import { BikeRental } from "@/integrations/supabase/custom-types";

interface BikeListProps {
  bikes: BikeRental[];
  isLoading: boolean;
  clearSearch: () => void;
}

const BikeList = ({ bikes, isLoading, clearSearch }: BikeListProps) => {
  return (
    <div className="w-full md:w-3/4">
      <div className="flex justify-between items-center mb-6">
        <p className="text-stone-500">
          {isLoading ? (
            "Loading bikes..."
          ) : (
            `Showing ${bikes.length} bikes`
          )}
        </p>
        <div className="flex items-center">
          <span className="mr-2">Sort by:</span>
          <button className="flex items-center text-stone-700 hover:text-primary transition-colors">
            Price - Low to High
            <ChevronDown size={16} className="ml-1" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          // Show loading state
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
              <div className="h-48 bg-stone-200"></div>
              <div className="p-6 space-y-3">
                <div className="h-6 bg-stone-200 rounded w-2/3"></div>
                <div className="h-4 bg-stone-200 rounded w-1/2"></div>
                <div className="h-10 bg-stone-200 rounded w-full mt-4"></div>
              </div>
            </div>
          ))
        ) : bikes.length > 0 ? (
          bikes.map((bike) => (
            <BikeCard key={bike.id} bike={bike} />
          ))
        ) : (
          <div className="col-span-2 text-center py-10">
            <p className="text-lg text-stone-500">No bikes found matching your search criteria.</p>
            <button 
              onClick={clearSearch}
              className="mt-4 bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-all"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BikeList;
