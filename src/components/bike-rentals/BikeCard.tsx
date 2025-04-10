
import React from "react";
import { Link } from "react-router-dom";
import { BikeRental } from "@/integrations/supabase/custom-types";

interface BikeCardProps {
  bike: BikeRental;
}

const BikeCard = ({ bike }: BikeCardProps) => {
  // Create slug from bike name if not already present
  const slug = bike.slug || bike.name.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden card-hover">
      <div className="relative h-48">
        <img
          src={bike.image}
          alt={bike.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-display font-bold text-xl mb-1">{bike.name}</h3>
            <p className="text-sm text-stone-500 mb-2">{bike.type} • {bike.engine}</p>
          </div>
          <div className="text-right">
            <p className="text-primary font-bold text-xl">₹{bike.price}</p>
            <p className="text-xs text-stone-500">per day</p>
          </div>
        </div>
        
        <Link
          to={`/rentals/bike/${bike.id}`}
          className="block w-full bg-primary hover:bg-primary/90 text-white text-center font-medium py-2 px-4 rounded-lg shadow-sm transition-all mt-6"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default BikeCard;
