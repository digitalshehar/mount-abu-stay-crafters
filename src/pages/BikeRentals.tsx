import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Calendar, MapPin, ChevronDown, Filter } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const BikeRentals = () => {
  const location = useLocation();
  const { toast } = useToast();
  const searchParams = new URLSearchParams(location.search);

  const [searchValues, setSearchValues] = useState({
    location: searchParams.get("location") || "",
    dates: searchParams.get("dates") || "",
    type: searchParams.get("type") || ""
  });

  useEffect(() => {
    if (searchParams.toString()) {
      toast({
        title: "Search Applied",
        description: "Showing search results based on your criteria",
      });
    }
  }, []);

  const bikes = [
    {
      id: 1,
      name: "Royal Enfield Classic 350",
      type: "Cruiser",
      engine: "350cc",
      price: 1200,
      image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1740&ixlib=rb-4.0.3"
    },
    {
      id: 2,
      name: "Honda Activa",
      type: "Scooter",
      engine: "110cc",
      price: 500,
      image: "https://images.unsplash.com/photo-1625897428517-7e2062829ec9?auto=format&fit=crop&q=80&w=1587&ixlib=rb-4.0.3"
    },
    {
      id: 3,
      name: "TVS Apache RTR 160",
      type: "Sports",
      engine: "160cc",
      price: 800,
      image: "https://images.unsplash.com/photo-1614551139870-4f35052aadf5?auto=format&fit=crop&q=80&w=1528&ixlib=rb-4.0.3"
    },
    {
      id: 4,
      name: "Bajaj Pulsar NS200",
      type: "Sports",
      engine: "200cc",
      price: 1000,
      image: "https://images.unsplash.com/photo-1611241443322-b5aff8eff22d?auto=format&fit=crop&q=80&w=1740&ixlib=rb-4.0.3"
    },
  ];

  const filteredBikes = bikes.filter(bike => {
    if (!searchValues.location && !searchValues.dates && !searchValues.type) {
      return true;
    }

    let matches = true;
    
    if (searchValues.type && searchValues.type !== "") {
      matches = matches && bike.type.toLowerCase() === searchValues.type.toLowerCase();
    }
    
    return matches;
  });

  const handleSearchFormSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchValues.location) params.append("location", searchValues.location);
    if (searchValues.dates) params.append("dates", searchValues.dates);
    if (searchValues.type) params.append("type", searchValues.type);
    
    window.history.pushState({}, "", `${location.pathname}?${params.toString()}`);
    
    toast({
      title: "Search Updated",
      description: "Showing updated search results",
    });
  };

  return (
    <>
      <Header />
      <main>
        <section className="relative py-20 bg-stone-100">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="title-medium mb-4">Bike Rentals in Mount Abu</h1>
              <p className="subtitle mb-8">
                Explore Mount Abu at your own pace with our wide range of bikes and scooters
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
                    Search Bikes
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
                  <h4 className="text-sm font-medium mb-3">Bike Type</h4>
                  <div className="space-y-2">
                    {['Scooter', 'Sports', 'Cruiser', 'Standard'].map((type) => (
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
                  <h4 className="text-sm font-medium mb-3">Engine Capacity</h4>
                  <div className="space-y-2">
                    {['100-125cc', '125-150cc', '150-200cc', '200cc+'].map((capacity) => (
                      <label key={capacity} className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>{capacity}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3">Price Range</h4>
                  <input
                    type="range"
                    min="200"
                    max="2000"
                    step="200"
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-stone-500 mt-2">
                    <span>₹200</span>
                    <span>₹2000</span>
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
                  <p className="text-stone-500">Showing {filteredBikes.length} bikes</p>
                  <div className="flex items-center">
                    <span className="mr-2">Sort by:</span>
                    <button className="flex items-center text-stone-700 hover:text-primary transition-colors">
                      Price - Low to High
                      <ChevronDown size={16} className="ml-1" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredBikes.length > 0 ? (
                    filteredBikes.map((bike) => (
                      <div key={bike.id} className="bg-white rounded-xl shadow-sm overflow-hidden card-hover">
                        <div className="relative h-48">
                          <img
                            src={bike.image}
                            alt={bike.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-display font-bold text-xl mb-1">{bike.name}</h3>
                              <p className="text-sm text-stone-500 mb-2">{bike.type} • {bike.engine}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-primary font-bold text-xl">₹{bike.price}</p>
                              <p className="text-xs text-stone-500">per day</p>
                            </div>
                          </div>
                          
                          <Link
                            to={`/rentals/bike/${bike.id}`}
                            className="block w-full bg-primary hover:bg-primary/90 text-white text-center font-medium py-2 px-4 rounded-lg shadow-sm transition-all mt-6"
                          >
                            Book Now
                          </Link>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-10">
                      <p className="text-lg text-stone-500">No bikes found matching your search criteria.</p>
                      <button 
                        onClick={() => {
                          setSearchValues({ location: "", dates: "", type: "" });
                          window.history.pushState({}, "", location.pathname);
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

export default BikeRentals;
