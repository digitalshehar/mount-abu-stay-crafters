
import React from "react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BikeRentals = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Mount Abu Bike Rentals | Explore on Two Wheels" 
        description="Rent bikes in Mount Abu at affordable rates. Choose from a variety of motorcycles and scooters to explore the beautiful hill station."
      />
      <Header />
      
      <main className="flex-1 bg-stone-50">
        <div className="container-custom py-12 md:py-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">Bike Rentals in Mount Abu</h1>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto">
              Explore the scenic beauty of Mount Abu on two wheels. We're adding exciting bike rental options soon.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold mb-4">Coming Soon: Bike Rental Service</h2>
              <p className="text-stone-600 mb-6">
                We're working on creating a seamless bike rental service for exploring Mount Abu. Our team is curating a selection of quality bikes and scooters to enhance your travel experience.
              </p>
              <div className="mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3" 
                  alt="Bike rental coming soon" 
                  className="rounded-lg mx-auto max-h-80 object-cover"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" onClick={() => window.history.back()}>
                  Go Back
                </Button>
                <Button asChild>
                  <a href="/">Back to Homepage</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BikeRentals;
