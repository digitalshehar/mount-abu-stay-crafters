
import React from "react";
import { Bus, Car, Train, Plane } from "lucide-react";

export interface TransportOption {
  type: "airport" | "bus" | "train" | "taxi";
  name: string;
  distance: string;
  travelTime: string;
}

export interface TransportOptionsProps {
  options?: TransportOption[];
  hotelName?: string;
  location?: string;
}

const TransportOptions = ({ options = [], hotelName, location }: TransportOptionsProps) => {
  // Default options if none provided
  const transportOptions = options.length > 0 ? options : [
    {
      type: "airport",
      name: "Maharana Pratap Airport (UDR)",
      distance: "175 km",
      travelTime: "3.5 hours by car"
    },
    {
      type: "train",
      name: "Abu Road Railway Station",
      distance: "28 km",
      travelTime: "40 minutes by car"
    },
    {
      type: "bus",
      name: "Mount Abu Bus Stand",
      distance: "3 km",
      travelTime: "10 minutes by car"
    },
    {
      type: "taxi",
      name: "Taxi Services",
      distance: "Available at hotel",
      travelTime: "On request"
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "airport":
        return <Plane className="h-5 w-5 text-blue-500" />;
      case "train":
        return <Train className="h-5 w-5 text-green-500" />;
      case "bus":
        return <Bus className="h-5 w-5 text-amber-500" />;
      case "taxi":
        return <Car className="h-5 w-5 text-stone-500" />;
      default:
        return <Car className="h-5 w-5 text-stone-500" />;
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-display font-semibold mb-6">Transportation Options</h2>
      {(hotelName && location) && (
        <p className="mb-4 text-stone-600">
          How to reach {hotelName} in {location}:
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {transportOptions.map((option, index) => (
          <div key={index} className="flex items-start gap-4 bg-white p-5 rounded-lg shadow-sm border border-stone-100">
            <div className="mt-1">
              {getIcon(option.type)}
            </div>
            <div>
              <h3 className="font-semibold">{option.name}</h3>
              <p className="text-sm text-stone-600 mt-1">Distance: {option.distance}</p>
              <p className="text-sm text-stone-600">Travel Time: {option.travelTime}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransportOptions;
