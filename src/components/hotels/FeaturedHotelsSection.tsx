
import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Sample data for featured hotels
const featuredHotels = [
  {
    id: 1,
    name: 'Hotel Hilltop Palace',
    slug: 'hotel-hilltop-palace',
    image: '/images/hotel1.jpg',
    location: 'Nakki Lake Area',
    stars: 4,
    price: 6500,
    description: 'Luxury hotel with panoramic views of Nakki Lake',
    discount: 15
  },
  {
    id: 2,
    name: 'Mount Abu Resort & Spa',
    slug: 'mount-abu-resort-spa',
    image: '/images/hotel2.jpg',
    location: 'Sunset Point Road',
    stars: 5,
    price: 9800,
    description: 'Premium resort with modern amenities and spa services',
    discount: 0
  },
  {
    id: 3,
    name: 'Valley View Hotel',
    slug: 'valley-view-hotel',
    image: '/images/hotel3.jpg',
    location: 'Guru Shikhar Drive',
    stars: 3,
    price: 4200,
    description: 'Comfortable stay with beautiful valley views',
    discount: 10
  },
  {
    id: 4,
    name: 'Heritage Grand Hotel',
    slug: 'heritage-grand-hotel',
    image: '/images/hotel4.jpg',
    location: 'Old City Center',
    stars: 4,
    price: 7500,
    description: 'Historic property with classic Rajasthani architecture',
    discount: 0
  }
];

const FeaturedHotelsSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {featuredHotels.map((hotel) => (
        <Link 
          to={`/hotels/${hotel.slug}`} 
          key={hotel.id}
          className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="relative h-48 overflow-hidden">
            <img 
              src={hotel.image} 
              alt={hotel.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {hotel.discount > 0 && (
              <Badge className="absolute top-2 right-2 bg-red-500">
                {hotel.discount}% OFF
              </Badge>
            )}
          </div>
          
          <div className="p-4">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-lg mb-1 group-hover:text-blue-600 transition-colors">
                {hotel.name}
              </h3>
              <div className="flex">
                {[...Array(hotel.stars)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            
            <p className="text-sm text-stone-500 mb-2">{hotel.location}</p>
            <p className="text-sm text-stone-600 mb-3 line-clamp-2">{hotel.description}</p>
            
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-stone-500">Starting from</p>
                <p className="text-lg font-bold text-blue-600">
                  ₹{hotel.price}
                  <span className="text-xs font-normal text-stone-500">/night</span>
                </p>
              </div>
              <span className="text-sm text-blue-600 font-medium">View Details</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FeaturedHotelsSection;
