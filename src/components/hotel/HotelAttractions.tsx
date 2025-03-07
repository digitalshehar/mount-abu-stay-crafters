
import React from "react";

interface Attraction {
  name: string;
  distance: string;
  description: string;
}

interface HotelAttractionsProps {
  attractions: Attraction[];
}

const HotelAttractions = ({ attractions }: HotelAttractionsProps) => {
  return (
    <div>
      <h2 className="text-2xl font-display font-semibold mb-6">Nearby Attractions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {attractions.map((attraction, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-stone-100">
            <div className="flex justify-between mb-2">
              <h3 className="font-semibold">{attraction.name}</h3>
              <span className="text-sm bg-stone-100 px-2 py-1 rounded">{attraction.distance}</span>
            </div>
            <p className="text-stone-600 text-sm">{attraction.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelAttractions;
