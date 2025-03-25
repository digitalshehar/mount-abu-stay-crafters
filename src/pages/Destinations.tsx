
import React from "react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import NotFoundComponent from "@/components/NotFound";

const Destinations = () => {
  return (
    <>
      <SEO 
        title="Mount Abu Destinations | Discover Beautiful Places" 
        description="Explore the best destinations and attractions in Mount Abu. Find hidden gems, popular spots, and natural beauty."
      />
      <NotFoundComponent
        title="Coming Soon: Destinations"
        message="We're working on building an amazing destinations guide for Mount Abu. Please check back soon to discover all the beautiful places you can visit!"
        type="destination"
        image="https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3"
        backButtonLabel="Go Back"
        homeButtonLabel="Back to Homepage"
      />
    </>
  );
};

export default Destinations;
