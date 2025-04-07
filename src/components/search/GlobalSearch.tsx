
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  CommandDialog, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from "@/components/ui/command";
import { Search, Hotel, Map, Car, Bike, Mountain, Home, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { 
  Hotel as HotelType, 
  Destination, 
  Adventure, 
  BikeRental, 
  CarRental 
} from "@/integrations/supabase/custom-types";

type SearchResult = {
  id: number;
  name: string;
  type: "hotel" | "home" | "destination" | "adventure" | "bike" | "car";
  slug?: string;
  location?: string;
  image?: string;
}

interface GlobalSearchProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export function GlobalSearch({ open = false, setOpen }: GlobalSearchProps) {
  const [isOpen, setIsOpen] = useState(open);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Update internal state when props change
  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  // Set up keyboard shortcut (Ctrl+K) to open search
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
        if (setOpen) setOpen(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setOpen]);

  // Handle dialog open state change
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (setOpen) setOpen(open);
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case "hotel":
        return <Hotel className="mr-2 h-4 w-4" />;
      case "home":
        return <Home className="mr-2 h-4 w-4" />;
      case "destination":
        return <Map className="mr-2 h-4 w-4" />;
      case "adventure":
        return <Mountain className="mr-2 h-4 w-4" />;
      case "bike":
        return <Bike className="mr-2 h-4 w-4" />;
      case "car":
        return <Car className="mr-2 h-4 w-4" />;
      default:
        return <Search className="mr-2 h-4 w-4" />;
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (query.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    try {
      // Search hotels
      const { data: hotels } = await supabase
        .from("hotels")
        .select("id, name, slug, location, image")
        .ilike("name", `%${query}%`)
        .order("name")
        .limit(5);

      // Search apartments/homes (hotels with apartment category)
      const { data: homes } = await supabase
        .from("hotels")
        .select("id, name, slug, location, image")
        .contains('categories', ['apartment'])
        .ilike("name", `%${query}%`)
        .order("name")
        .limit(5);

      // Search destinations
      const { data: destinations } = await supabase
        .from("destinations")
        .select("id, name, slug, location, image")
        .ilike("name", `%${query}%`)
        .order("name")
        .limit(5);

      // Search adventures
      const { data: adventures } = await supabase
        .from("adventures")
        .select("id, name, slug, location, image")
        .ilike("name", `%${query}%`)
        .order("name")
        .limit(5);

      // Search bike rentals
      const { data: bikes } = await supabase
        .from("bike_rentals")
        .select("id, name, image")
        .ilike("name", `%${query}%`)
        .order("name")
        .limit(5);

      // Search car rentals
      const { data: cars } = await supabase
        .from("car_rentals")
        .select("id, name, image")
        .ilike("name", `%${query}%`)
        .order("name")
        .limit(5);

      // Combine results
      const combinedResults: SearchResult[] = [
        ...(hotels || []).map(hotel => ({ ...hotel, type: "hotel" as const })),
        ...(homes || []).map(home => ({ ...home, type: "home" as const })),
        ...(destinations || []).map(dest => ({ ...dest, type: "destination" as const })),
        ...(adventures || []).map(adv => ({ ...adv, type: "adventure" as const })),
        ...(bikes || []).map(bike => ({ ...bike, type: "bike" as const })),
        ...(cars || []).map(car => ({ ...car, type: "car" as const }))
      ];

      setResults(combinedResults);
    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (result: SearchResult) => {
    setIsOpen(false);
    if (setOpen) setOpen(false);
    
    switch (result.type) {
      case "hotel":
        navigate(`/hotel/${result.slug || result.id}`);
        break;
      case "home":
        navigate(`/hotels?type=apartment&search=${encodeURIComponent(result.name)}`);
        break;
      case "destination":
        navigate(`/destination/${result.slug || result.id}`);
        break;
      case "adventure":
        navigate(`/adventure/${result.slug || result.id}`);
        break;
      case "bike":
        navigate(`/bike-rentals?search=${encodeURIComponent(result.name)}`);
        break;
      case "car":
        navigate(`/rentals/car?search=${encodeURIComponent(result.name)}`);
        break;
    }
  };

  const getGroupLabel = (type: string) => {
    switch (type) {
      case "hotel":
        return "Hotels";
      case "home":
        return "Homes & Apartments";
      case "destination":
        return "Destinations";
      case "adventure":
        return "Activities";
      case "bike":
        return "Bike Rentals";
      case "car":
        return "Car Rentals";
      default:
        return "Results";
    }
  };

  // Group results by type
  const groupedResults = results.reduce<Record<string, SearchResult[]>>((acc, result) => {
    if (!acc[result.type]) {
      acc[result.type] = [];
    }
    acc[result.type].push(result);
    return acc;
  }, {});

  return (
    <CommandDialog open={isOpen} onOpenChange={handleOpenChange}>
      <CommandInput 
        placeholder="Search hotels, homes, activities..." 
        value={searchQuery}
        onValueChange={handleSearch}
      />
      <CommandList>
        <CommandEmpty>
          {isLoading ? (
            <div className="p-4 text-center text-sm">
              Searching...
            </div>
          ) : (
            <div className="p-4 text-center text-sm">
              No results found.
            </div>
          )}
        </CommandEmpty>
        
        {Object.entries(groupedResults).map(([type, items]) => (
          <CommandGroup key={type} heading={getGroupLabel(type)}>
            {items.map((result) => (
              <CommandItem
                key={`${result.type}-${result.id}`}
                onSelect={() => handleSelect(result)}
                className="flex items-center"
              >
                {getIconForType(result.type)}
                <div>
                  <div>{result.name}</div>
                  {result.location && (
                    <div className="text-xs text-muted-foreground">{result.location}</div>
                  )}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
