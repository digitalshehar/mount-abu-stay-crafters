
import React from "react";
import { Link } from "react-router-dom";
import { MapPin, ChevronRight } from "lucide-react";
import { Destination } from "@/integrations/supabase/custom-types";

interface DestinationHeroProps {
  destination: Destination;
}

const DestinationHero: React.FC<DestinationHeroProps> = ({ destination }) => {
  return (
    <div className="relative h-[60vh] overflow-hidden">
      <img 
        src={destination.image} 
        alt={destination.name} 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 flex items-end">
        <div className="container-custom pb-12">
          <div className="flex items-center text-white text-sm mb-2">
            <Link to="/" className="hover:underline">Home</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link to="/destinations" className="hover:underline">Destinations</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span>{destination.name}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-3">{destination.name}</h1>
          <div className="flex flex-wrap items-center text-white gap-4">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{destination.location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationHero;
