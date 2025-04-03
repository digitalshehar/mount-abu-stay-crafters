
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeaturedDestinations = () => {
  const destinations = [
    {
      id: 1,
      name: "Nakki Lake",
      image: "https://images.unsplash.com/photo-1571536802807-30aa78285af4?auto=format&fit=crop&q=80&w=1000",
      description: "A beautiful sacred lake with boating facilities",
    },
    {
      id: 2,
      name: "Guru Shikhar",
      image: "https://images.unsplash.com/photo-1518002054494-3d661c1c3ead?auto=format&fit=crop&q=80&w=1000",
      description: "The highest peak of the Aravalli Range",
    },
    {
      id: 3,
      name: "Dilwara Temples",
      image: "https://images.unsplash.com/photo-1524492514790-8c53378dcfe5?auto=format&fit=crop&q=80&w=1000",
      description: "Exquisite Jain temples known for marble work",
    },
    {
      id: 4,
      name: "Sunset Point",
      image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?auto=format&fit=crop&q=80&w=1000",
      description: "Spectacular views of the sunset",
    }
  ];

  return (
    <section className="py-16">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Featured Destinations</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl">Explore the most beautiful and popular attractions in Mount Abu</p>
          </div>
          <Button 
            variant="outline" 
            className="hidden md:flex items-center gap-2 mt-4 md:mt-0"
          >
            View All Destinations <ArrowRight size={16} />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination) => (
            <div 
              key={destination.id}
              className="group bg-white border border-stone-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {destination.name}
                </h3>
                <p className="text-muted-foreground text-sm mt-1">{destination.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 flex justify-center md:hidden">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
          >
            View All Destinations <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
