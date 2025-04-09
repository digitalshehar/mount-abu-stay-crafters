
import React from 'react';
import { Hotel } from '@/types';
import HotelListHeader from './content/HotelListHeader';

export interface HotelListViewProps {
  hotels: Hotel[];
  isLoading: boolean;
  sortBy: string;
  onSortChange: (value: string) => void;
  hasError?: boolean;
  compareList?: number[];
  onAddToCompare?: (id: number) => void;
  onRemoveFromCompare?: (id: number) => void;
  isInCompare?: (id: number) => boolean;
}

const HotelListView: React.FC<HotelListViewProps> = ({
  hotels,
  isLoading,
  sortBy,
  onSortChange,
  hasError = false,
  compareList = [],
  onAddToCompare = () => {},
  onRemoveFromCompare = () => {},
  isInCompare = () => false,
}) => {
  // Open filters function (will dispatch a custom event for mobile view)
  const openFilters = () => {
    document.dispatchEvent(new CustomEvent('open-hotel-filters'));
  };

  if (hasError) {
    return (
      <div className="p-8 text-center">
        <h3 className="text-lg font-semibold mb-2">Error loading hotels</h3>
        <p className="text-gray-600">
          There was a problem loading the hotels. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <HotelListHeader
        count={hotels.length}
        sortBy={sortBy}
        onSortChange={onSortChange}
        viewMode="list"
        onViewModeChange={() => {}}
        onOpenFilters={openFilters}
        isLoading={isLoading}
      />

      <div className="space-y-4">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm h-48 animate-pulse"
              />
            ))}
          </div>
        ) : hotels.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2">No hotels found</h3>
            <p className="text-gray-600">
              Try adjusting your filters to see more results
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {hotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white rounded-lg shadow-sm p-4 flex flex-col sm:flex-row gap-4"
              >
                <div className="w-full sm:w-1/3">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                </div>
                <div className="w-full sm:w-2/3 flex flex-col">
                  <h3 className="text-lg font-semibold">{hotel.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{hotel.location}</p>
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i < (hotel.stars || 0)
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-2">
                      ({hotel.rating || 0})
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {hotel.description ||
                      "Experience comfort and luxury at this amazing property."}
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-green-600">
                        ₹{hotel.pricePerNight || 0}
                      </span>
                      <span className="text-sm text-gray-500">/night</span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          if (isInCompare(hotel.id as number)) {
                            onRemoveFromCompare(hotel.id as number);
                          } else {
                            onAddToCompare(hotel.id as number);
                          }
                        }}
                        className={`px-3 py-1 text-sm rounded-md ${
                          isInCompare(hotel.id as number)
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {isInCompare(hotel.id as number) ? "Remove" : "Compare"}
                      </button>
                      <a
                        href={`/hotel/${hotel.slug}`}
                        className="px-3 py-1 text-sm bg-primary text-white rounded-md"
                      >
                        View Deal
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelListView;
