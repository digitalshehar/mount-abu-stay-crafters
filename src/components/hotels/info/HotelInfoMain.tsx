
import React from "react";

const HotelInfoMain = () => {
  return (
    <div className="mt-12 bg-white rounded-xl p-8 shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Discover Mount Abu's Finest Hotels</h2>
      <div className="prose max-w-none text-stone-600">
        <p>
          Mount Abu, Rajasthan's only hill station, is a serene retreat nestled in the Aravalli Range. 
          Known for its stunning landscapes, sacred temples, and pleasant climate, Mount Abu offers the 
          perfect escape from the desert heat of Rajasthan.
        </p>
        
        <h3 className="text-xl font-medium mt-6 mb-3">Choosing the Perfect Accommodation</h3>
        <p>
          Whether you're planning a family vacation, a romantic getaway, or a spiritual retreat, Mount Abu 
          has accommodations to suit every need and budget. From luxury resorts overlooking Nakki Lake to 
          budget-friendly guesthouses in the town center, you'll find the perfect place to stay.
        </p>
        
        <h3 className="text-xl font-medium mt-6 mb-3">Best Areas to Stay</h3>
        <p>
          The most popular areas to stay in Mount Abu include:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>
            <span className="font-medium">Nakki Lake Area</span> - The heart of Mount Abu, offering stunning 
            lake views and easy access to boat rides, shopping, and restaurants.
          </li>
          <li>
            <span className="font-medium">Sunset Point Road</span> - Perfect for those seeking peaceful surroundings 
            and spectacular sunset views.
          </li>
          <li>
            <span className="font-medium">Near Dilwara Temples</span> - Ideal for spiritual seekers wanting easy 
            access to these magnificent Jain temples.
          </li>
        </ul>
        
        <h3 className="text-xl font-medium mt-6 mb-3">When to Visit</h3>
        <p>
          The best time to visit Mount Abu is from October to March when the weather is pleasant and perfect for 
          sightseeing. Summer (April to June) can be warm but still cooler than the plains below. Monsoon season 
          (July to September) transforms the landscape into a lush green paradise, though some outdoor activities 
          may be limited.
        </p>
        
        <h3 className="text-xl font-medium mt-6 mb-3">Popular Attractions Near Hotels</h3>
        <p>
          Most hotels in Mount Abu provide easy access to popular attractions including:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Nakki Lake - A sacred lake with boating facilities</li>
          <li>Dilwara Temples - Exquisite Jain temples known for incredible marble carvings</li>
          <li>Sunset Point - Offering breathtaking views of the sunset</li>
          <li>Guru Shikhar - The highest peak in the Aravalli Range</li>
          <li>Trevor's Tank - A delight for nature and wildlife enthusiasts</li>
          <li>Mount Abu Wildlife Sanctuary - Home to diverse flora and fauna</li>
        </ul>
        
        <p className="mt-6">
          Browse our carefully selected hotels and find your perfect stay in Mount Abu. Filter by amenities, 
          price range, or star rating to customize your search based on your preferences and budget.
        </p>
      </div>
    </div>
  );
};

export default HotelInfoMain;
