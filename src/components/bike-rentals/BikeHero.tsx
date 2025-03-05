
import React from "react";
import { Calendar, MapPin } from "lucide-react";

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
            Explore Mount Abu at your own pace with our wide range of bikes and scooters
          </p>

          <div className="bg-white rounded-xl shadow-md p-6 mt-8">
            <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
  );
};

export default BikeHero;
