
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { CarRental } from "@/integrations/supabase/custom-types";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CarHero from "@/components/car-rentals/CarHero";
import CarList from "@/components/car-rentals/CarList";
import EnhancedCarFilters from "@/components/car-rentals/EnhancedCarFilters";
import WeatherWidgetExtended from "@/components/WeatherWidgetExtended";
import SEO from "@/components/SEO";

const CarRentals = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [cars, setCars] = useState<CarRental[]>([]);
  const [filteredCars, setFilteredCars] = useState<CarRental[]>([]);
  
  // Search form state with enhanced filters
  const [searchValues, setSearchValues] = useState({
    location: "",
    dates: "",
    type: "",
    priceRange: [500, 5000] as [number, number],
    transmission: "",
    seatingCapacity: 0
  });

  // Parse URL query params on initial load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchValues({
      location: params.get("location") || "",
      dates: params.get("dates") || "",
      type: params.get("type") || "",
      priceRange: [
        parseInt(params.get("minPrice") || "500"), 
        parseInt(params.get("maxPrice") || "5000")
      ] as [number, number],
      transmission: params.get("transmission") || "",
      seatingCapacity: parseInt(params.get("capacity") || "0")
    });
  }, [location.search]);

  // Fetch cars data
  useEffect(() => {
    const fetchCars = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('car_rentals')
          .select('*')
          .eq('status', 'available');
        
        if (error) throw error;
        
        if (data) {
          const formattedCars: CarRental[] = data.map(car => ({
            id: car.id,
            name: car.name,
            type: car.type,
            capacity: car.capacity,
            transmission: car.transmission,
            price: parseFloat(car.price.toString()),
            image: car.image,
            bookings: car.bookings || 0,
            status: car.status as 'available' | 'booked' | 'maintenance',
            description: car.description
          }));
          
          setCars(formattedCars);
          setFilteredCars(formattedCars);
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
        toast({
          title: "Error",
          description: "Could not load car rentals. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, [toast]);

  // Filter cars based on search values
  useEffect(() => {
    if (cars.length > 0) {
      let filtered = [...cars];
      
      // Filter by car type
      if (searchValues.type) {
        filtered = filtered.filter(car => 
          car.type.toLowerCase() === searchValues.type.toLowerCase()
        );
      }
      
      // Filter by transmission
      if (searchValues.transmission) {
        filtered = filtered.filter(car => 
          car.transmission.toLowerCase() === searchValues.transmission.toLowerCase()
        );
      }
      
      // Filter by seating capacity
      if (searchValues.seatingCapacity > 0) {
        filtered = filtered.filter(car => car.capacity === searchValues.seatingCapacity);
      }
      
      // Filter by price range
      filtered = filtered.filter(car => 
        car.price >= searchValues.priceRange[0] && car.price <= searchValues.priceRange[1]
      );
      
      setFilteredCars(filtered);
    }
  }, [searchValues, cars]);

  // Handle form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create URL with search params
    const params = new URLSearchParams();
    if (searchValues.location) params.append("location", searchValues.location);
    if (searchValues.dates) params.append("dates", searchValues.dates);
    if (searchValues.type) params.append("type", searchValues.type);
    if (searchValues.transmission) params.append("transmission", searchValues.transmission);
    if (searchValues.seatingCapacity > 0) params.append("capacity", searchValues.seatingCapacity.toString());
    params.append("minPrice", searchValues.priceRange[0].toString());
    params.append("maxPrice", searchValues.priceRange[1].toString());
    
    // Navigate to same page with search params
    navigate(`?${params.toString()}`);
    
    // Show toast notification
    toast({
      title: "Search Applied",
      description: "Filtering car results based on your search criteria."
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchValues({
      location: "",
      dates: "",
      type: "",
      priceRange: [500, 5000] as [number, number],
      transmission: "",
      seatingCapacity: 0
    });
    navigate("/rentals/car");
    
    toast({
      title: "Filters Reset",
      description: "All search filters have been cleared."
    });
  };

  return (
    <>
      <SEO 
        title="Mount Abu Car Rentals | Self-Drive & Chauffeur Options" 
        description="Rent cars in Mount Abu for comfortable travel. Choose from economy, luxury, and family vehicles with self-drive or chauffeur options."
      />
      <Header />
      
      <main className="w-full bg-stone-50">
        <CarHero 
          searchValues={searchValues} 
          setSearchValues={setSearchValues} 
          onSubmit={handleSearch} 
        />
        
        <section className="py-12">
          <div className="container-custom">
            <div className="mb-8">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <h2 className="text-xl font-bold">Current Weather in Mount Abu</h2>
                <p className="text-stone-500">Plan your trip with the latest weather conditions</p>
              </div>
              <div className="mt-4">
                <WeatherWidgetExtended />
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8">
              <EnhancedCarFilters 
                searchValues={searchValues} 
                setSearchValues={setSearchValues} 
                onSubmit={handleSearch}
                resetFilters={resetFilters}
              />
              
              <CarList 
                cars={filteredCars} 
                isLoading={isLoading} 
                clearSearch={resetFilters} 
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
