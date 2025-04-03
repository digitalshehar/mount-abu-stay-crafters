
import React from "react";
import { ArrowRight, Clock, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const FeaturedAdventures = () => {
  const navigate = useNavigate();
  
  const adventures = [
    {
      id: 1,
      name: "Trekking to Guru Shikhar",
      location: "Guru Shikhar",
      duration: "4 hours",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=1080",
      price: 1299,
      rating: 4.8,
      reviews: 156
    },
    {
      id: 2,
      name: "Wildlife Safari at Trevor's Tank",
      location: "Trevor's Tank",
      duration: "3 hours",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=1080",
      price: 999,
      rating: 4.6,
      reviews: 128
    },
    {
      id: 3,
      name: "Sunrise Camping at Sunset Point",
      location: "Sunset Point",
      duration: "12 hours",
      image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&q=80&w=1080",
      price: 2499,
      rating: 4.9,
      reviews: 87
    },
    {
      id: 4,
      name: "Boating at Nakki Lake",
      location: "Nakki Lake",
      duration: "2 hours",
      image: "https://images.unsplash.com/photo-1520942702018-0862200e6873?auto=format&fit=crop&q=80&w=1080",
      price: 599,
      rating: 4.5,
      reviews: 203
    }
  ];
  
  return (
    <section className="py-10 md:py-16">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Featured Adventures</h2>
            <p className="text-muted-foreground mt-2">Explore exciting activities and experiences</p>
          </div>
          <Button 
            variant="outline" 
            className="hidden md:flex items-center gap-2"
            onClick={() => navigate("/adventures")}
          >
            View All <ArrowRight size={16} />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {adventures.map(adventure => (
            <div 
              key={adventure.id}
              className="group bg-white border border-stone-200 rounded-xl overflow-hidden transition-all hover:shadow-md"
              onClick={() => navigate(`/adventure/${adventure.id}`)}
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded-md text-xs font-medium z-10">
                  ₹{adventure.price}
                </div>
                <img 
                  src={adventure.image} 
                  alt={adventure.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                  {adventure.name}
                </h3>
                <div className="flex items-center mt-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="ml-1 text-sm text-muted-foreground">{adventure.location}</span>
                </div>
                <div className="flex items-center mt-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="ml-1 text-sm text-muted-foreground">{adventure.duration}</span>
                </div>
                <div className="flex items-center mt-2 justify-between">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <span className="ml-1 text-sm font-medium">{adventure.rating}</span>
                    <span className="mx-1 text-muted-foreground text-xs">•</span>
                    <span className="text-sm text-muted-foreground">{adventure.reviews} reviews</span>
                  </div>
                </div>
                <div className="mt-3">
                  <Button size="sm" className="w-full text-xs">
                    Book Now
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
            onClick={() => navigate("/adventures")}
          >
            View All Adventures <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedAdventures;
