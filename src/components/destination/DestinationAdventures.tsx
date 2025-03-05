
import React from "react";
import { Link } from "react-router-dom";
import { Clock, Star } from "lucide-react";
import { Adventure } from "@/integrations/supabase/custom-types";

interface DestinationAdventuresProps {
  adventures: Adventure[];
  destinationName: string;
}

const DestinationAdventures: React.FC<DestinationAdventuresProps> = ({ adventures, destinationName }) => {
  if (!adventures.length) return null;
  
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-display font-semibold mb-6">Explore Adventures in {destinationName}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {adventures.map((adventure) => (
          <Link 
            key={adventure.id} 
            to={`/adventure/${adventure.slug}`}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex"
          >
            <div className="w-1/3 h-auto overflow-hidden">
              <img 
                src={adventure.image} 
                alt={adventure.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-2/3 p-4">
              <h3 className="font-semibold mb-1 line-clamp-1">{adventure.name}</h3>
              <div className="flex items-center text-sm mb-1">
                <Clock className="w-3 h-3 mr-1 text-stone-500" />
                <span className="text-stone-500">{adventure.duration}</span>
              </div>
              <div className="flex items-center text-sm mb-2">
                <Star className="w-3 h-3 mr-1 text-yellow-500" />
                <span>{adventure.rating}</span>
                <span className="text-xs text-stone-500 ml-1">({adventure.reviewCount} reviews)</span>
              </div>
              <div className="font-semibold text-primary">₹{adventure.price.toLocaleString()}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DestinationAdventures;
