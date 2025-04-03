
import React from "react";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PopularHotels = () => {
  const navigate = useNavigate();
  
  const hotels = [
    {
      id: 1,
      name: "Palace Heights Resort",
      location: "Near Nakki Lake",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1080",
      price: 5999,
      rating: 4.7,
      reviews: 245
    },
    {
      id: 2,
      name: "Green Valley Hotel",
      location: "Sunset Road",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=1080",
      price: 4500,
      rating: 4.5,
      reviews: 186
    },
    {
      id: 3,
      name: "Mountain View Inn",
      location: "Guru Shikhar Road",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1080",
      price: 3999,
      rating: 4.6,
      reviews: 205
    },
    {
      id: 4,
      name: "Sunset Retreat",
      location: "Abu Road",
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&q=80&w=1080",
      price: 6599,
      rating: 4.8,
      reviews: 312
    }
  ];
  
  return (
    <section className="py-10 md:py-16 bg-stone-50">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Popular Hotels</h2>
            <p className="text-muted-foreground mt-2">Top-rated accommodations loved by travelers</p>
          </div>
          <Button 
            variant="outline" 
            className="hidden md:flex items-center gap-2"
            onClick={() => navigate("/hotels?sort=popular")}
          >
            View All <ArrowRight size={16} />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hotels.map(hotel => (
            <div 
              key={hotel.id}
              className="group bg-white border border-stone-200 rounded-xl overflow-hidden transition-all hover:shadow-md"
              onClick={() => navigate(`/hotel/${hotel.id}`)}
            >
              <div className="relative h-48 overflow-hidden">
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
            onClick={() => navigate("/hotels?sort=popular")}
          >
            View All Hotels <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularHotels;
