
import React from "react";
import BikeSearchForm from "./BikeSearchForm";

interface BikeHeroProps {
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

const BikeHero = ({ searchValues, setSearchValues, onSubmit }: BikeHeroProps) => {
  return (
    <section className="relative py-20 bg-stone-100">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="title-medium mb-4">Bike Rentals in Mount Abu</h1>
          <p className="subtitle mb-8">
            Explore the scenic beauty of Mount Abu with our comfortable and reliable bike rental service
          </p>

          <div className="bg-white rounded-xl shadow-md p-6 mt-8">
            <BikeSearchForm 
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

export default BikeHero;
