
import React from "react";
import { Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Hotel {
  id: number;
  name: string;
  slug: string;
  location: string;
  stars: number;
  pricePerNight: number;
  image: string;
  description: string;
  amenities: string[];
  reviewCount: number;
  rating: number;
}

interface HotelListViewProps {
  hotels: Hotel[];
  isLoading: boolean;
}

const HotelListView: React.FC<HotelListViewProps> = ({ hotels, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl overflow-hidden shadow-sm p-4 animate-pulse"
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3 h-48 bg-stone-200 rounded-lg"></div>
              <div className="md:w-2/3 space-y-4">
                <div className="h-6 bg-stone-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-stone-200 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-stone-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-stone-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (hotels.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2">No hotels found</h3>
        <p className="text-stone-500">
          Try adjusting your filters or search criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {hotels.map((hotel) => (
        <div
          key={hotel.id}
          className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
              <Link to={`/hotel/${hotel.slug}`}>
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </Link>
            </div>
            <div className="md:w-2/3 p-6">
              <div className="flex justify-between items-start mb-2">
                <Link to={`/hotel/${hotel.slug}`} className="hover:opacity-80 transition-opacity">
                  <h3 className="text-xl font-display font-semibold">{hotel.name}</h3>
                </Link>
                <div className="flex items-center bg-primary/5 rounded-lg px-2 py-1">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm font-medium">{hotel.rating}</span>
                  <span className="text-xs text-stone-500 ml-1">({hotel.reviewCount})</span>
                </div>
              </div>

              <div className="flex items-center text-stone-500 text-sm mb-4">
                <MapPin className="h-4 w-4 mr-1" /> {hotel.location}
              </div>

              <p className="text-stone-600 mb-4 line-clamp-2">{hotel.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {hotel.amenities.slice(0, 5).map((amenity, index) => (
                  <span
                    key={index}
                    className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded-full"
                  >
                    {amenity}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between mt-auto">
                <div>
                  <span className="text-lg font-semibold">₹{hotel.pricePerNight}</span>
                  <span className="text-stone-500 text-sm">/night</span>
                </div>
                <Link to={`/hotel/${hotel.slug}`}>
                  <Button>View Details</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HotelListView;
