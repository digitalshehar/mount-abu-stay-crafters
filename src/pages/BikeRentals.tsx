
import React from "react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import NotFoundComponent from "@/components/NotFound";

const BikeRentals = () => {
  return (
    <>
      <SEO 
        title="Mount Abu Bike Rentals | Explore on Two Wheels" 
        description="Rent bikes in Mount Abu at affordable rates. Choose from a variety of motorcycles and scooters to explore the beautiful hill station."
      />
      <NotFoundComponent
        title="Coming Soon: Bike Rentals"
        message="We're working on creating a seamless bike rental service for exploring Mount Abu. Please check back soon to discover our two-wheeled options!"
        type="default"
        image="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3"
        backButtonLabel="Go Back"
        homeButtonLabel="Back to Homepage"
      />
    </>
  );
};

export default BikeRentals;
