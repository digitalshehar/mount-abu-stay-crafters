
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import BikeHero from "../components/bike-rentals/BikeHero";
import BikeFilters from "../components/bike-rentals/BikeFilters";
import BikeList from "../components/bike-rentals/BikeList";
import { supabase } from "@/integrations/supabase/client";
import { BikeRental } from "@/integrations/supabase/custom-types";

const BikeRentals = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const searchParams = new URLSearchParams(location.search);

  const [searchValues, setSearchValues] = useState({
    location: searchParams.get("location") || "",
    dates: searchParams.get("dates") || "",
    type: searchParams.get("type") || ""
  });

  const [isLoading, setIsLoading] = useState(true);
  const [bikes, setBikes] = useState<BikeRental[]>([]);

  useEffect(() => {
    // Update search values when URL changes
    const params = new URLSearchParams(location.search);
    setSearchValues({
      location: params.get("location") || "",
      dates: params.get("dates") || "",
      type: params.get("type") || ""
    });
    
    // Show toast for search results if parameters exist
    if (params.toString()) {
      toast({
        title: "Search Applied",
        description: "Showing search results based on your criteria",
      });
    }
    
    fetchBikes();
  }, [location.search, toast]);

  const fetchBikes = async () => {
    setIsLoading(true);
    try {
      let query = supabase.from("bike_rentals").select("*");
      
      // Apply type filter if provided
      if (searchValues.type && searchValues.type.trim() !== "") {
        query = query.ilike("type", `%${searchValues.type}%`);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      setBikes(data as BikeRental[]);
    } catch (error) {
      console.error("Error fetching bikes:", error);
      toast({
        title: "Error",
        description: "Failed to load bikes",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchValues.location) params.append("location", searchValues.location);
    if (searchValues.dates) params.append("dates", searchValues.dates);
    if (searchValues.type) params.append("type", searchValues.type);
    
    // Navigate with new search params
    navigate(`${location.pathname}?${params.toString()}`);
    
    // Show success toast
    toast({
      title: "Search Updated",
      description: "Showing updated search results",
    });
  };

  const handleClearSearch = () => {
    setSearchValues({ location: "", dates: "", type: "" });
    navigate(location.pathname);
    
    toast({
      title: "Search Cleared",
      description: "Showing all available bikes",
    });
  };

  // Filter bikes based on search values
  const filteredBikes = bikes.filter(bike => {
    // If no search parameters, show all bikes
    if (!searchValues.location && !searchValues.dates && !searchValues.type) {
      return true;
    }

    // Initialize as true and then apply filters
    let matches = true;
    
    // Filter by location if provided (case insensitive partial match)
    if (searchValues.location && searchValues.location.trim() !== "") {
      // Since we don't have actual location data for each bike in this demo, 
      // we'll just check if any bike is available in the searched location
      matches = true; // Simplified for demo
    }
    
    // Filter by type if provided (case insensitive)
    if (searchValues.type && searchValues.type.trim() !== "") {
      matches = matches && bike.type.toLowerCase().includes(searchValues.type.toLowerCase());
    }
    
    return matches;
  });

  return (
    <>
      <Header />
      <main>
        <BikeHero 
          searchValues={searchValues} 
          setSearchValues={setSearchValues} 
          onSubmit={handleSearchFormSubmit} 
        />

        <section className="py-16">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row gap-8">
              <BikeFilters
                searchValues={searchValues}
                setSearchValues={setSearchValues}
                onApplyFilters={handleSearchFormSubmit}
              />
              
              <BikeList 
                bikes={filteredBikes} 
                isLoading={isLoading} 
                clearSearch={handleClearSearch} 
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BikeRentals;
