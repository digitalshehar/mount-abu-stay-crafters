
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CarRental } from "@/integrations/supabase/custom-types";
import CarHero from "../components/car-rentals/CarHero";
import CarFilters from "../components/car-rentals/CarFilters";
import CarList from "../components/car-rentals/CarList";

const CarRentals = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const searchParams = new URLSearchParams(location.search);

  const [searchValues, setSearchValues] = useState({
    location: searchParams.get("location") || "",
    dates: searchParams.get("dates") || "",
    type: searchParams.get("type") || ""
  });
  
  const [cars, setCars] = useState<CarRental[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
  }, [location.search, toast]);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('car_rentals')
        .select('*')
        .eq('status', 'available');
      
      if (error) throw error;
      
      if (data) {
        setCars(data as CarRental[]);
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
      toast({
        title: "Error fetching cars",
        description: "There was a problem loading the car data.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCars = cars.filter(car => {
    // If no search parameters, show all cars
    if (!searchValues.location && !searchValues.dates && !searchValues.type) {
      return true;
    }

    // Initialize as true and then apply filters
    let matches = true;
    
    // Filter by location if provided (case insensitive partial match)
    if (searchValues.location && searchValues.location.trim() !== "") {
      // Since we don't have actual location data for each car in this demo, 
      // we'll just check if any car is available in the searched location
      // In a real app, you would check car.location against searchValues.location
      matches = true; // Simplified for demo
    }
    
    // Filter by type if provided (exact match, case insensitive)
    if (searchValues.type && searchValues.type.trim() !== "") {
      matches = matches && car.type.toLowerCase() === searchValues.type.toLowerCase();
    }
    
    return matches;
  });

  const handleSearchFormSubmit = (e) => {
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
      description: "Showing all available cars",
    });
  };

  return (
    <>
      <Header />
      <main>
        <CarHero 
          searchValues={searchValues} 
          setSearchValues={setSearchValues} 
          onSubmit={handleSearchFormSubmit} 
        />

        <section className="py-16">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row gap-8">
              <CarFilters 
                searchValues={searchValues} 
                setSearchValues={setSearchValues} 
                onSubmit={handleSearchFormSubmit} 
              />

              <CarList 
                cars={filteredCars} 
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

export default CarRentals;
