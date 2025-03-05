
import React from "react";
import { Link } from "react-router-dom";
import { Car } from "lucide-react";
import { CarRental } from "@/integrations/supabase/custom-types";

interface CarCardProps {
  car: CarRental;
}

const CarCard = ({ car }: CarCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden card-hover">
      <div className="relative h-48">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-display font-bold text-xl mb-1">{car.name}</h3>
            <p className="text-sm text-stone-500 mb-2">{car.type} • {car.transmission}</p>
          </div>
          <div className="text-right">
            <p className="text-primary font-bold text-xl">₹{car.price}</p>
            <p className="text-xs text-stone-500">per day</p>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-stone-500 mt-4 mb-6">
          <Car size={16} className="mr-1" />
          <span className="mr-3">{car.capacity} Seats</span>
        </div>
        
        <Link
          to={`/rentals/car/${car.id}`}
          className="block w-full bg-primary hover:bg-primary/90 text-white text-center font-medium py-2 px-4 rounded-lg shadow-sm transition-all"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
