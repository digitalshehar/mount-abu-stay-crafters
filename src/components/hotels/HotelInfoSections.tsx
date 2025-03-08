
import React from "react";

const HotelInfoSections = () => {
  return (
    <>
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
      
      <div className="mt-8 bg-white rounded-xl p-8 shadow-sm">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions About Mount Abu Hotels</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-lg mb-2">What is the average price of hotels in Mount Abu?</h3>
            <p className="text-stone-600">
              Hotel prices in Mount Abu vary by season. Budget accommodations start from ₹1,000 per night, mid-range 
              hotels range from ₹2,500 to ₹5,000, while luxury resorts can cost ₹7,000 and above per night.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-2">Which hotels in Mount Abu offer the best views?</h3>
            <p className="text-stone-600">
              Hotels around Nakki Lake and those located at higher elevations typically offer the best views 
              of the surrounding landscapes. Many luxury hotels feature rooms with private balconies overlooking 
              the Aravalli hills or the lake.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-2">Is it necessary to book hotels in advance?</h3>
            <p className="text-stone-600">
              It's highly recommended to book in advance, especially during peak tourist seasons (October to March and 
              during holidays). Last-minute bookings may result in higher prices or limited availability.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-2">Do Mount Abu hotels provide transportation to local attractions?</h3>
            <p className="text-stone-600">
              Many hotels offer transportation services to popular attractions, either included in the package or for 
              an additional fee. Some luxury hotels provide complimentary shuttle services to nearby points of interest.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-2">Are there any eco-friendly or sustainable hotels in Mount Abu?</h3>
            <p className="text-stone-600">
              Yes, several hotels in Mount Abu have adopted eco-friendly practices, such as solar power, water 
              conservation, and waste management. Look for properties that mention sustainability initiatives in 
              their descriptions.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelInfoSections;
