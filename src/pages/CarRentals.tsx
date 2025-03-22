
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CarHero from "@/components/car-rentals/CarHero";
import CarList from "@/components/car-rentals/CarList";
import CarFilters from "@/components/car-rentals/CarFilters";
import { Helmet } from "react-helmet-async";
import { cn } from "@/lib/utils";

const CarRentals = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [activeSort, setActiveSort] = useState("recommended");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };
  
  const clearFilters = () => {
    setActiveFilters([]);
  };

  return (
    <>
      <Helmet>
        <title>Car Rentals in Mount Abu | Explore in Comfort</title>
        <meta name="description" content="Rent a car and explore Mount Abu at your own pace. Choose from a range of vehicles from economy to luxury cars at competitive prices." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-stone-50">
        <Header />
        
        <main className="flex-grow">
          <CarHero />
          
          <div className="container-custom py-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Sidebar Filter (Desktop) */}
              <div className="hidden lg:block lg:col-span-1">
                <CarFilters 
                  activeFilters={activeFilters}
                  toggleFilter={toggleFilter}
                  clearFilters={clearFilters}
                />
              </div>
              
              {/* Mobile Filter Backdrop */}
              {isMobileFilterOpen && (
                <div 
                  className="fixed inset-0 bg-black/30 z-40 lg:hidden"
                  onClick={() => setIsMobileFilterOpen(false)}
                ></div>
              )}
              
              {/* Mobile Filter Sidebar */}
              <div className={cn(
                "fixed inset-y-0 left-0 z-50 w-full max-w-xs bg-white p-6 overflow-y-auto lg:hidden transform transition-transform",
                isMobileFilterOpen ? "translate-x-0" : "-translate-x-full"
              )}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Filters</h2>
                  <button 
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="text-stone-500 hover:text-stone-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <CarFilters 
                  activeFilters={activeFilters}
                  toggleFilter={toggleFilter}
                  clearFilters={clearFilters}
                />
              </div>
              
              {/* Car List */}
              <div className="lg:col-span-3">
                <div className="mb-4 flex items-center justify-between">
                  <h1 className="text-2xl font-display font-bold">Car Rentals in Mount Abu</h1>
                  
                  <div className="flex items-center gap-3">
                    {/* Filter button (Mobile) */}
                    <button 
                      onClick={() => setIsMobileFilterOpen(true)}
                      className="flex items-center gap-2 px-3 py-2 bg-white border border-stone-300 rounded-lg text-sm font-medium lg:hidden"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                      </svg>
                      Filters
                      {activeFilters.length > 0 && (
                        <span className="inline-flex items-center justify-center w-5 h-5 ml-1 text-xs bg-primary text-white rounded-full">
                          {activeFilters.length}
                        </span>
                      )}
                    </button>
                    
                    {/* Sort dropdown */}
                    <select
                      value={activeSort}
                      onChange={(e) => setActiveSort(e.target.value)}
                      className="px-3 py-2 bg-white border border-stone-300 rounded-lg text-sm font-medium appearance-none cursor-pointer pr-8 relative"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: "right 0.5rem center", backgroundRepeat: "no-repeat", backgroundSize: "1.5em 1.5em" }}
                    >
                      <option value="recommended">Recommended</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                  </div>
                </div>
                
                <CarList activeFilters={activeFilters} activeSort={activeSort} />
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default CarRentals;
