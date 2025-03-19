
import React from 'react';
import { Hotel } from '@/components/admin/hotels/types';

interface CompareHotelsWrappedProps {
  hotels: Hotel[];
  compareList: Hotel[];
  onAddToCompare: (id: number) => void;
  onRemoveFromCompare: (id: number) => void;
  onClearCompare: () => void;
}

// This is a wrapper component that handles the comparison functionality
const CompareHotelsWrapped: React.FC<CompareHotelsWrappedProps> = ({
  hotels,
  compareList,
  onAddToCompare,
  onRemoveFromCompare,
  onClearCompare
}) => {
  if (compareList.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md p-4 z-40">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h3 className="text-sm font-medium">Comparing {compareList.length} Hotels</h3>
            <button 
              onClick={onClearCompare}
              className="ml-4 text-xs text-blue-600 hover:text-blue-800"
            >
              Clear All
            </button>
          </div>
          <div className="flex space-x-4">
            {compareList.map(hotel => (
              <div key={hotel.id} className="flex items-center space-x-2">
                <img 
                  src={hotel.image} 
                  alt={hotel.name} 
                  className="w-10 h-10 object-cover rounded-md"
                />
                <div className="text-xs">
                  <div className="font-medium">{hotel.name}</div>
                  <div className="text-gray-500">₹{hotel.pricePerNight}</div>
                </div>
                <button 
                  onClick={() => onRemoveFromCompare(hotel.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareHotelsWrapped;
