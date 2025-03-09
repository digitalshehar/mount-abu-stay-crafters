
import { MapPin } from "lucide-react";

interface HotelDistanceProps {
  location: string;
  attractions?: Array<{name: string, distance: string}>;
}

const HotelDistance: React.FC<HotelDistanceProps> = ({ location, attractions = [] }) => {
  const defaultAttractions = [
    { name: "Nakki Lake", distance: "1.2 km" },
    { name: "Sunset Point", distance: "2.5 km" },
    { name: "Dilwara Temples", distance: "3.8 km" }
  ];

  const displayAttractions = attractions.length > 0 ? attractions : defaultAttractions;

  return (
    <div className="mt-2">
      <div className="flex items-center text-stone-500 text-xs sm:text-sm mb-1.5">
        <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-primary" /> {location}
      </div>
      <div className="text-xs text-stone-400">
        Near: {displayAttractions.map((attraction, index) => (
          <span key={attraction.name}>
            {attraction.name} ({attraction.distance})
            {index < displayAttractions.length - 1 && ", "}
          </span>
        ))}
      </div>
    </div>
  );
};

export default HotelDistance;
