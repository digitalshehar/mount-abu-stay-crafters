
import React from "react";
import { Search, Hotel, Map, Car, Bike, Mountain, Home, Clock } from "lucide-react";
import { SearchResultType } from "./types";

interface SearchResultIconProps {
  type: SearchResultType;
  className?: string;
}

const SearchResultIcon: React.FC<SearchResultIconProps> = ({ type, className = "mr-2 h-4 w-4" }) => {
  switch (type) {
    case "hotel":
      return <Hotel className={className} />;
    case "home":
      return <Home className={className} />;
    case "destination":
      return <Map className={className} />;
    case "adventure":
      return <Mountain className={className} />;
    case "bike":
      return <Bike className={className} />;
    case "car":
      return <Car className={className} />;
    case "early-hotel":
      return <Clock className={className} />;
    default:
      return <Search className={className} />;
  }
};

export default SearchResultIcon;
