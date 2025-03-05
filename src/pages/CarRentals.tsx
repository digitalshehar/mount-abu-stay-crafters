
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Calendar, MapPin, ChevronDown, Filter, Car } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CarRental } from "@/integrations/supabase/custom-types";

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
        <section className="relative py-20 bg-stone-100">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="title-medium mb-4">Car Rentals in Mount Abu</h1>
              <p className="subtitle mb-8">
                Explore the scenic beauty of Mount Abu with our comfortable and reliable car rental service
              </p>

              <div className="bg-white rounded-xl shadow-md p-6 mt-8">
                <form onSubmit={handleSearchFormSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="relative">
                    <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-stone-400" />
                    <input
                      type="text"
                      placeholder="Pickup location"
                      className="w-full pl-12 pr-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={searchValues.location}
                      onChange={(e) => setSearchValues({...searchValues, location: e.target.value})}
                    />
                  </div>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-3.5 h-5 w-5 text-stone-400" />
                    <input
                      type="text"
                      placeholder="Pickup — Dropoff date"
                      className="w-full pl-12 pr-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={searchValues.dates}
                      onChange={(e) => setSearchValues({...searchValues, dates: e.target.value})}
                    />
                  </div>
                  <button 
                    type="submit"
                    className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg shadow transition-all flex items-center justify-center"
                  >
                    Search Cars
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/4 bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Filters</h3>
                  <Filter size={20} />
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3">Car Type</h4>
                  <div className="space-y-2">
                    {['SUV', 'Sedan', 'Hatchback', 'Luxury'].map((type) => (
                      <label key={type} className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="mr-2" 
                          checked={searchValues.type.toLowerCase() === type.toLowerCase()}
                          onChange={() => {
                            setSearchValues({
                              ...searchValues, 
                              type: searchValues.type.toLowerCase() === type.toLowerCase() ? "" : type.toLowerCase()
                            });
                          }}
                        />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3">Transmission</h4>
                  <div className="space-y-2">
                    {['Automatic', 'Manual'].map((transmission) => (
                      <label key={transmission} className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>{transmission}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3">Price Range</h4>
                  <input
                    type="range"
                    min="500"
                    max="5000"
                    step="500"
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-stone-500 mt-2">
                    <span>₹500</span>
                    <span>₹5000</span>
                  </div>
                </div>

                <button 
                  onClick={handleSearchFormSubmit}
                  className="w-full bg-secondary hover:bg-secondary/80 text-primary font-medium py-2 px-4 rounded-lg transition-all"
                >
                  Apply Filters
                </button>
              </div>

              <div className="w-full md:w-3/4">
                <div className="flex justify-between items-center mb-6">
                  <p className="text-stone-500">
                    {isLoading ? (
                      "Loading cars..."
                    ) : (
                      `Showing ${filteredCars.length} cars`
                    )}
                  </p>
                  <div className="flex items-center">
                    <span className="mr-2">Sort by:</span>
                    <button className="flex items-center text-stone-700 hover:text-primary transition-colors">
                      Price - Low to High
                      <ChevronDown size={16} className="ml-1" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {isLoading ? (
                    // Show loading state
                    Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
                        <div className="h-48 bg-stone-200"></div>
                        <div className="p-6 space-y-3">
                          <div className="h-6 bg-stone-200 rounded w-2/3"></div>
                          <div className="h-4 bg-stone-200 rounded w-1/2"></div>
                          <div className="h-10 bg-stone-200 rounded w-full mt-4"></div>
                        </div>
                      </div>
                    ))
                  ) : filteredCars.length > 0 ? (
                    filteredCars.map((car) => (
                      <div key={car.id} className="bg-white rounded-xl shadow-sm overflow-hidden card-hover">
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
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-10">
                      <p className="text-lg text-stone-500">No cars found matching your search criteria.</p>
                      <button 
                        onClick={() => {
                          setSearchValues({ location: "", dates: "", type: "" });
                          navigate(location.pathname);
                        }}
                        className="mt-4 bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-all"
                      >
                        Clear Search
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CarRentals;
