
import React from 'react';
import PriceHistoryChart from '@/components/hotels/PriceHistoryChart';

interface PriceHistoryTabProps {
  hotel: {
    name: string;
    pricePerNight: number;
    location?: string;
  };
}

const PriceHistoryTab: React.FC<PriceHistoryTabProps> = ({ hotel }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Price History</h2>
        <p className="text-gray-600 mb-6">
          Track how prices for {hotel.name} have changed over time to help you find the best time to book.
        </p>
        
        <PriceHistoryChart 
          hotelName={hotel.name}
          currentPrice={hotel.pricePerNight}
          location={hotel.location}
        />
      </div>
      
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Booking Tips</h3>
        <ul className="space-y-2 text-blue-700">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Prices in Mount Abu are typically lower during monsoon season (July-September).</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Peak tourist seasons (October-November and March-June) often see price increases.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Booking 2-3 months in advance often secures better rates.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Weekday stays are generally cheaper than weekend bookings.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PriceHistoryTab;
