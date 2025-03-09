
import React from "react";
import HotelCard from "@/components/HotelCard";
import { Button } from "@/components/ui/button";
import { SortAsc, SortDesc } from "lucide-react";

interface RegularHotelsSectionProps {
  hotels: any[];
}

const RegularHotelsSection = ({ hotels }: RegularHotelsSectionProps) => {
  const [sortBy, setSortBy] = React.useState<"price" | "rating">("price");
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");

  const handleSort = (type: "price" | "rating") => {
    if (sortBy === type) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(type);
      setSortOrder("asc");
    }
  };

  const sortedHotels = [...hotels].sort((a, b) => {
    const aValue = sortBy === "price" ? a.price_per_night : a.rating || 0;
    const bValue = sortBy === "price" ? b.price_per_night : b.rating || 0;
    
    return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
  });

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">All Properties</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-stone-500 mr-2">Sort by:</span>
          <Button 
            variant={sortBy === "price" ? "secondary" : "outline"} 
            size="sm"
            onClick={() => handleSort("price")}
            className="flex items-center gap-1 text-xs"
          >
            Price
            {sortBy === "price" && (
              sortOrder === "asc" ? <SortAsc size={14} /> : <SortDesc size={14} />
            )}
          </Button>
          <Button 
            variant={sortBy === "rating" ? "secondary" : "outline"} 
            size="sm"
            onClick={() => handleSort("rating")}
            className="flex items-center gap-1 text-xs"
          >
            Rating
            {sortBy === "rating" && (
              sortOrder === "asc" ? <SortAsc size={14} /> : <SortDesc size={14} />
            )}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedHotels.map((hotel) => (
          <HotelCard
            key={hotel.id}
            id={hotel.id}
            name={hotel.name}
            image={hotel.image}
            price={hotel.price_per_night}
            location={hotel.location}
            rating={hotel.rating || 0}
            reviewCount={hotel.review_count || 0}
            amenities={hotel.amenities || []}
            featured={false}
            slug={hotel.slug}
          />
        ))}
      </div>
    </>
  );
};

export default RegularHotelsSection;
