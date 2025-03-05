
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
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="title-medium mb-4">Car Rentals in Mount Abu</h1>
          <p className="subtitle mb-8">
            Explore the scenic beauty of Mount Abu with our comfortable and reliable car rental service
          </p>

          <div className="bg-white rounded-xl shadow-md p-6 mt-8">
            <CarSearchForm 
              searchValues={searchValues} 
              setSearchValues={setSearchValues} 
              onSubmit={onSubmit} 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarHero;
