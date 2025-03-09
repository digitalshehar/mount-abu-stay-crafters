
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import 'swiper/css';
import 'swiper/css/navigation';

interface Hotel {
  id: number;
  name: string;
  image: string;
  location: string;
  price: number;
  stars: number;
  slug: string;
}

interface SimilarHotelsProps {
  currentHotelId: number;
  currentHotelCategory?: string;
  currentHotelStars?: number;
  currentHotelLocation?: string;
}

const SimilarHotels: React.FC<SimilarHotelsProps> = ({
  currentHotelId,
  currentHotelCategory,
  currentHotelStars,
  currentHotelLocation
}) => {
  const [similarHotels, setSimilarHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Mock data for similar hotels - in real app, you'd fetch these from API
  const mockSimilarHotels = [
    {
      id: 101,
      name: "Royal Palace Hotel",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3",
      location: "Mount Abu, Rajasthan",
      price: 4200,
      stars: 4,
      slug: "royal-palace-hotel"
    },
    {
      id: 102,
      name: "Grand Sunset Resort",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3",
      location: "Mount Abu, Rajasthan",
      price: 3800,
      stars: 4,
      slug: "grand-sunset-resort"
    },
    {
      id: 103,
      name: "Mountain View Inn",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3",
      location: "Mount Abu, Rajasthan",
      price: 5100,
      stars: 5,
      slug: "mountain-view-inn"
    },
    {
      id: 104,
      name: "Lakeside Retreat",
      image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3",
      location: "Mount Abu, Rajasthan",
      price: 3500,
      stars: 3,
      slug: "lakeside-retreat"
    }
  ];
  
  useEffect(() => {
    // Simulate API call to fetch similar hotels
    setLoading(true);
    setTimeout(() => {
      // Filter out the current hotel
      const filtered = mockSimilarHotels.filter(hotel => hotel.id !== currentHotelId);
      setSimilarHotels(filtered);
      setLoading(false);
    }, 1000);
  }, [currentHotelId]);
  
  if (loading) {
    return (
      <div className="p-4 bg-white rounded-lg border shadow-sm">
        <h3 className="font-semibold mb-4">Similar Hotels You Might Like</h3>
        <div className="space-y-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-stone-100 animate-pulse rounded-md"></div>
          ))}
        </div>
      </div>
    );
  }
  
  if (!similarHotels.length) {
    return null;
  }
  
  return (
    <div className="p-4 bg-white rounded-lg border shadow-sm">
      <h3 className="font-semibold mb-4">Similar Hotels You Might Like</h3>
      
      <div className="rounded-lg overflow-hidden">
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={1}
          navigation
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          className="pb-8"
        >
          {similarHotels.map(hotel => (
            <SwiperSlide key={hotel.id}>
              <Link 
                to={`/hotel/${hotel.slug}`} 
                className="group block bg-white overflow-hidden rounded-lg border hover:shadow-md transition-all duration-300"
              >
                <div className="relative h-32 overflow-hidden">
                  <img 
                    src={hotel.image} 
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-semibold px-1.5 py-0.5 rounded flex items-center">
                    {hotel.stars} <Star className="h-3 w-3 ml-0.5 fill-current" />
                  </div>
                </div>
                
                <div className="p-3">
                  <h4 className="font-medium text-sm line-clamp-1">{hotel.name}</h4>
                  <div className="flex items-center text-stone-500 text-xs mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span className="truncate">{hotel.location}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-sm font-semibold text-blue-600">
                      ₹{hotel.price}
                      <span className="text-xs font-normal text-stone-500">/night</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 p-0 text-xs text-blue-600 hover:text-blue-700"
                    >
                      View
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SimilarHotels;
