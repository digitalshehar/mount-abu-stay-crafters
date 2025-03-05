
import React from "react";
import { Link } from "react-router-dom";
import { Clock, Star } from "lucide-react";
import { Adventure } from "@/integrations/supabase/custom-types";

interface RelatedAdventuresProps {
  adventures: Adventure[];
}

const RelatedAdventures: React.FC<RelatedAdventuresProps> = ({ adventures }) => {
  if (!adventures.length) return null;
  
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-display font-semibold mb-6">Similar Adventures</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {adventures.map((adventure) => (
          <Link 
            key={adventure.id} 
            to={`/adventure/${adventure.slug}`}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={adventure.image} 
                alt={adventure.name} 
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1 line-clamp-1">{adventure.name}</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm">
                  <Clock className="w-3 h-3 mr-1 text-stone-500" />
                  <span className="text-stone-500">{adventure.duration}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Star className="w-3 h-3 mr-1 text-yellow-500" />
                  <span>{adventure.rating}</span>
                </div>
              </div>
              <div className="mt-2 font-semibold text-primary">₹{adventure.price.toLocaleString()}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedAdventures;
