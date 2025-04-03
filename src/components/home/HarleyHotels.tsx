
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const HarleyHotels = () => {
  const navigate = useNavigate();
  
  const featuredHotels = [
    {
      id: 1,
      name: "Harley Mountain Resort",
      location: "Mount Abu, Rajasthan",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2080",
      price: 8999,
      rating: 4.8,
      reviews: 126
    },
    {
      id: 2,
      name: "Harley Lakeside Retreat",
      location: "Udaipur, Rajasthan",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=2070",
      price: 7499,
      rating: 4.6,
      reviews: 98
    },
    {
      id: 3,
      name: "Harley Luxury Spa Resort",
      location: "Jaipur, Rajasthan",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=2070",
      price: 12999,
      rating: 4.9,
      reviews: 210
    },
    {
      id: 4,
      name: "Harley Desert Oasis",
      location: "Jaisalmer, Rajasthan",
      image: "https://images.unsplash.com/photo-1561501900-3701fa6a0864?auto=format&fit=crop&q=80&w=2070",
      price: 9999,
      rating: 4.7,
      reviews: 156
    }
  ];
  
  return (
    <section className="py-10 md:py-16">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Harley Hotels</h2>
            <p className="text-muted-foreground mt-2">Exclusive luxury stays at premium destinations</p>
          </div>
          <Button 
            variant="outline" 
            className="hidden md:flex items-center gap-2"
            onClick={() => navigate("/hotels?category=harley")}
          >
            View All <ArrowRight size={16} />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredHotels.map(hotel => (
            <div 
              key={hotel.id}
              className="group bg-white border border-stone-200 rounded-xl overflow-hidden transition-all hover:shadow-md"
              onClick={() => navigate(`/hotel/harley-${hotel.id}`)}
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-md text-xs font-medium z-10">
                  Premium
                </div>
                <img 
                  src={hotel.image} 
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                  {hotel.name}
                </h3>
                <p className="text-muted-foreground text-sm mt-1">{hotel.location}</p>
                <div className="flex items-center mt-2">
                  <div className="flex items-center text-amber-500">
                    <Star className="fill-amber-500 stroke-amber-500 h-4 w-4" />
                    <span className="ml-1 text-sm font-medium">{hotel.rating}</span>
                  </div>
                  <span className="mx-1.5 text-muted-foreground text-xs">•</span>
                  <span className="text-sm text-muted-foreground">{hotel.reviews} reviews</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold">₹{hotel.price}</p>
                    <p className="text-xs text-muted-foreground">per night</p>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs">
                    View Deal
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex justify-center md:hidden">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => navigate("/hotels?category=harley")}
          >
            View All Harley Hotels <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HarleyHotels;
