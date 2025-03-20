
import React from "react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import NotFoundComponent from "@/components/NotFound";

const CarRentals = () => {
  return (
    <>
      <SEO 
        title="Mount Abu Car Rentals | Self-Drive & Chauffeur Options" 
        description="Rent cars in Mount Abu for comfortable travel. Choose from economy, luxury, and family vehicles with self-drive or chauffeur options."
      />
      <NotFoundComponent
        title="Coming Soon: Car Rentals"
        message="We're currently setting up our car rental services for Mount Abu visitors. Please check back soon to book comfortable vehicles for your journey!"
        type="default"
        image="https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3"
        backButtonLabel="Go Back"
        homeButtonLabel="Back to Homepage"
      />
    </>
  );
};

export default CarRentals;
