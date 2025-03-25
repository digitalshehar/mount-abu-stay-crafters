
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Fuel, Users, MapPin, Star, Filter, Search } from "lucide-react";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BikeCard = ({ name, image, price, category, rating, location, fuelType, seats }) => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
    <div className="relative">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-48 object-cover"
      />
      <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 text-xs font-medium flex items-center">
        <Star className="h-3 w-3 text-yellow-500 mr-1" />
        {rating}
      </div>
    </div>
    <div className="p-6">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold">{name}</h3>
        <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
          {category}
        </span>
      </div>
      
      <div className="flex items-center text-sm text-stone-500 mb-4">
        <MapPin className="h-4 w-4 mr-1" />
        <span>{location}</span>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="flex items-center text-xs text-stone-600">
          <Fuel className="h-3 w-3 mr-1" />
          {fuelType}
        </div>
        <div className="flex items-center text-xs text-stone-600">
          <Users className="h-3 w-3 mr-1" />
          {seats} seater
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <span className="text-lg font-semibold">₹{price}</span>
          <span className="text-xs text-stone-500">/day</span>
        </div>
        <Button size="sm">Book Now</Button>
      </div>
    </div>
  </div>
);

const BikeRentals = () => {
  const bikes = [
    {
      name: "Royal Enfield Classic 350",
      image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      price: "800",
      category: "Cruiser",
      rating: "4.8",
      location: "Mount Abu Main Market",
      fuelType: "Petrol",
      seats: "2"
    },
    {
      name: "Honda Activa 6G",
      image: "https://images.unsplash.com/photo-1622185135505-2d795003994a?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      price: "400",
      category: "Scooter",
      rating: "4.6",
      location: "Nakki Lake Road",
      fuelType: "Petrol",
      seats: "2"
    },
    {
      name: "Bajaj Pulsar NS200",
      image: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      price: "700",
      category: "Sports",
      rating: "4.7",
      location: "Sunset Point Road",
      fuelType: "Petrol",
      seats: "2"
    },
    {
      name: "TVS Jupiter",
      image: "https://images.unsplash.com/photo-1611516331462-3cda9c0d9ede?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      price: "450",
      category: "Scooter",
      rating: "4.5",
      location: "Mount Abu Bus Stand",
      fuelType: "Petrol",
      seats: "2"
    },
    {
      name: "Yamaha FZ V3",
      image: "https://images.unsplash.com/photo-1580310614729-ccd69652491d?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      price: "650",
      category: "Sports",
      rating: "4.6",
      location: "Dilwara Temple Road",
      fuelType: "Petrol",
      seats: "2"
    },
    {
      name: "Royal Enfield Himalayan",
      image: "https://images.unsplash.com/photo-1662287841939-31f140fe8d48?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      price: "900",
      category: "Adventure",
      rating: "4.9",
      location: "Guru Shikhar Road",
      fuelType: "Petrol",
      seats: "2"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Mount Abu Bike Rentals | Explore on Two Wheels" 
        description="Rent bikes in Mount Abu at affordable rates. Choose from a variety of motorcycles and scooters to explore the beautiful hill station."
      />
      <Header />
      
      <main className="flex-1 bg-stone-50">
        <div className="container-custom py-12 md:py-16">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">Bike Rentals in Mount Abu</h1>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto">
              Explore the scenic beauty of Mount Abu on two wheels. Find the perfect bike or scooter for your adventure.
            </p>
          </div>
          
          {/* Search and filter section */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-4 w-4 text-stone-400" />
                </div>
                <input 
                  type="text" 
                  placeholder="Pick-up location" 
                  className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-4 w-4 text-stone-400" />
                </div>
                <input 
                  type="text" 
                  placeholder="Rental dates" 
                  className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <Button className="flex items-center justify-center gap-2">
                <Search className="h-4 w-4" />
                Search Bikes
              </Button>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <span className="text-sm font-medium text-stone-500">Quick filters:</span>
              {['All Bikes', 'Scooter', 'Cruiser', 'Sports', 'Adventure'].map((filter) => (
                <Button 
                  key={filter} 
                  variant={filter === 'All Bikes' ? "default" : "outline"}
                  size="sm"
                  className="text-xs rounded-full"
                >
                  {filter}
                </Button>
              ))}
              
              <Button variant="ghost" size="sm" className="ml-auto flex items-center text-xs">
                <Filter className="h-3 w-3 mr-1" />
                More Filters
              </Button>
            </div>
          </div>
          
          {/* Bike listings */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bikes.map((bike, index) => (
              <BikeCard key={index} {...bike} />
            ))}
          </div>
          
          {/* Information section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Rental Requirements</h3>
              <ul className="space-y-2 text-stone-600">
                <li>• Valid driving license</li>
                <li>• ID proof (Aadhar/PAN/Passport)</li>
                <li>• Security deposit (refundable)</li>
                <li>• Minimum age: 18 years</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Rental Includes</h3>
              <ul className="space-y-2 text-stone-600">
                <li>• Helmet for rider and pillion</li>
                <li>• Basic insurance coverage</li>
                <li>• Roadside assistance</li>
                <li>• Unlimited kilometers</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Popular Routes</h3>
              <ul className="space-y-2 text-stone-600">
                <li>• Mount Abu to Guru Shikhar</li>
                <li>• Mount Abu to Achalgarh Fort</li>
                <li>• Nakki Lake Circuit</li>
                <li>• Wildlife Sanctuary Route</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BikeRentals;
