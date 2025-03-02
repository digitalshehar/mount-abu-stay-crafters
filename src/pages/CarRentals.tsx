
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Calendar, MapPin, ChevronDown, Filter, Car } from "lucide-react";
import { Link } from "react-router-dom";

const CarRentals = () => {
  const cars = [
    {
      id: 1,
      name: "Toyota Innova",
      type: "SUV",
      capacity: 7,
      transmission: "Automatic",
      price: 2500,
      image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=1740&ixlib=rb-4.0.3"
    },
    {
      id: 2,
      name: "Honda City",
      type: "Sedan",
      capacity: 5,
      transmission: "Manual",
      price: 1800,
      image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=1664&ixlib=rb-4.0.3"
    },
    {
      id: 3,
      name: "Maruti Swift",
      type: "Hatchback",
      capacity: 5,
      transmission: "Manual",
      price: 1200,
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1742&ixlib=rb-4.0.3"
    },
    {
      id: 4,
      name: "Mahindra Thar",
      type: "SUV",
      capacity: 4,
      transmission: "Manual",
      price: 3500,
      image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=1740&ixlib=rb-4.0.3"
    },
  ];

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-stone-100">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="title-medium mb-4">Car Rentals in Mount Abu</h1>
              <p className="subtitle mb-8">
                Explore the scenic beauty of Mount Abu with our comfortable and reliable car rental service
              </p>

              {/* Search Form */}
              <div className="bg-white rounded-xl shadow-md p-6 mt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="relative">
                    <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-stone-400" />
                    <input
                      type="text"
                      placeholder="Pickup location"
                      className="w-full pl-12 pr-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-3.5 h-5 w-5 text-stone-400" />
                    <input
                      type="text"
                      placeholder="Pickup — Dropoff date"
                      className="w-full pl-12 pr-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <button className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg shadow transition-all flex items-center justify-center">
                    Search Cars
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Car Listings */}
        <section className="py-16">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Filters */}
              <div className="w-full md:w-1/4 bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Filters</h3>
                  <Filter size={20} />
                </div>
                
                {/* Car Type */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3">Car Type</h4>
                  <div className="space-y-2">
                    {['SUV', 'Sedan', 'Hatchback', 'Luxury'].map((type) => (
                      <label key={type} className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Transmission */}
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

                {/* Price Range */}
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

                <button className="w-full bg-secondary hover:bg-secondary/80 text-primary font-medium py-2 px-4 rounded-lg transition-all">
                  Apply Filters
                </button>
              </div>

              {/* Car List */}
              <div className="w-full md:w-3/4">
                <div className="flex justify-between items-center mb-6">
                  <p className="text-stone-500">Showing {cars.length} cars</p>
                  <div className="flex items-center">
                    <span className="mr-2">Sort by:</span>
                    <button className="flex items-center text-stone-700 hover:text-primary transition-colors">
                      Price - Low to High
                      <ChevronDown size={16} className="ml-1" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cars.map((car) => (
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
                  ))}
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
