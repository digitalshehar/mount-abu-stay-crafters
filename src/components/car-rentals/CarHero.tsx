
import React from "react";
import CarSearchForm from "./CarSearchForm";

interface CarHeroProps {
  searchValues: {
    location: string;
    dates: string;
    type: string;
  };
  setSearchValues: React.Dispatch<React.SetStateAction<{
    location: string;
    dates: string;
    type: string;
  }>>;
  onSubmit: (e: React.FormEvent) => void;
}

const CarHero = ({ searchValues, setSearchValues, onSubmit }: CarHeroProps) => {
  return (
    <section className="relative py-20 bg-stone-100">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-stone-200 to-stone-100"></div>
      <div className="absolute inset-0 z-0 opacity-20" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-display font-bold mb-4 text-stone-800">Car Rentals in Mount Abu</h1>
          <p className="text-xl text-stone-600 mb-8">
            Explore the scenic beauty of Mount Abu with our comfortable and reliable car rental service
          </p>

          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-md p-6 mt-8">
            <CarSearchForm 
              search={searchValues}
              setSearch={setSearchValues}
            />
            <button 
              onClick={onSubmit}
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-lg shadow-sm transition-all mt-4"
            >
              Search Cars
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarHero;
