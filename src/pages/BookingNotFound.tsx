
import React, { useEffect } from "react";
import NotFoundComponent from "@/components/NotFound";
import SEO from "@/components/SEO";

const BookingNotFound = () => {
  useEffect(() => {
    // Set document title
    document.title = "Booking Not Found | Mount Abu";
  }, []);

  return (
    <>
      <SEO
        title="Booking Not Found | Mount Abu"
        description="The booking you're looking for doesn't exist or has expired. Please check your booking reference and try again."
      />
      <NotFoundComponent
        title="Booking Not Found"
        message="The booking you're looking for doesn't exist or has expired. Please check your booking reference and try again."
        type="booking"
        image="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3"
        backButtonLabel="Back to My Bookings"
        homeButtonLabel="Make New Booking"
      />
    </>
  );
};

export default BookingNotFound;
