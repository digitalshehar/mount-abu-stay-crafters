
import React, { useEffect } from "react";
import NotFoundComponent from "@/components/NotFound";
import SEO from "@/components/SEO";

const DestinationNotFound = () => {
  useEffect(() => {
    // Set document title
    document.title = "Destination Not Found | Mount Abu";
  }, []);

  return (
    <>
      <SEO
        title="Destination Not Found | Mount Abu"
        description="The destination you're looking for doesn't exist or has been moved. Explore other beautiful places in Mount Abu."
      />
      <NotFoundComponent
        title="Destination Not Found"
        message="The destination you're looking for doesn't exist or has been moved."
        type="destination"
        image="https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3"
        backButtonLabel="Back to Destinations"
        homeButtonLabel="Explore Mount Abu"
      />
    </>
  );
};

export default DestinationNotFound;
