
import React from "react";
import NotFoundComponent from "@/components/NotFound";

const HotelNotFound = () => {
  return (
    <NotFoundComponent
      title="Hotel Not Found"
      message="The hotel you're looking for doesn't exist or has been removed from our listings."
      type="hotel"
      image="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3"
      backButtonLabel="Back to Search"
      homeButtonLabel="Browse All Hotels"
    />
  );
};

export default HotelNotFound;
