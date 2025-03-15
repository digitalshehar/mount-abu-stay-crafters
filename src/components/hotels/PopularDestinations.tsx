
import React from 'react';
import { Link } from 'react-router-dom';

// Sample data for popular destinations
const destinations = [
  {
    id: 1,
    name: 'Nakki Lake Area',
    image: '/images/nakki-lake.jpg',
    hotelCount: 24,
    description: 'Central location with scenic views'
  },
  {
    id: 2,
    name: 'Sunset Point',
    image: '/images/sunset-point.jpg',
    hotelCount: 16,
    description: 'Breathtaking sunset views and peaceful surroundings'
  },
  {
    id: 3,
    name: 'Guru Shikhar Road',
    image: '/images/guru-shikhar.jpg',
    hotelCount: 12,
    description: 'Close to Mount Abu\'s highest peak'
  },
  {
    id: 4,
    name: 'City Center',
    image: '/images/city-center.jpg',
    hotelCount: 18,
    description: 'Convenient access to markets and restaurants'
  }
];

const PopularDestinations: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {destinations.map((destination) => (
        <Link 
          to={`/hotels?location=${encodeURIComponent(destination.name)}`} 
          key={destination.id}
          className="group relative h-64 rounded-lg overflow-hidden shadow-md"
        >
          <img 
            src={destination.image} 
            alt={destination.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <h3 className="text-xl font-semibold mb-1">{destination.name}</h3>
              <p className="text-sm text-white/80 mb-2">{destination.description}</p>
              <span className="text-sm bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                {destination.hotelCount} hotels
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PopularDestinations;
