
import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock, Award, Star, ChevronRight } from "lucide-react";
import { Adventure } from "@/integrations/supabase/custom-types";

interface AdventureHeroProps {
  adventure: Adventure;
}

const AdventureHero: React.FC<AdventureHeroProps> = ({ adventure }) => {
  return (
    <div className="relative h-[60vh] overflow-hidden">
      <img 
        src={adventure.image} 
        alt={adventure.name} 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 flex items-end">
        <div className="container-custom pb-12">
          <div className="flex items-center text-white text-sm mb-2">
            <Link to="/" className="hover:underline">Home</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link to="/adventures" className="hover:underline">Adventures</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span>{adventure.name}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-3">{adventure.name}</h1>
          <div className="flex flex-wrap items-center text-white gap-4">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{adventure.location}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{adventure.duration}</span>
            </div>
            <div className="flex items-center">
              <Award className="w-4 h-4 mr-1" />
              <span>{adventure.difficulty}</span>
            </div>
            <div className="flex items-center bg-white/20 px-2 py-1 rounded">
              <Star className="w-4 h-4 text-yellow-500 mr-1" />
              <span>{adventure.rating}</span>
              <span className="text-sm ml-1">({adventure.reviewCount} reviews)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdventureHero;
