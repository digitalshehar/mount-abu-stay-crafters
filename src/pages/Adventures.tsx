
import React from "react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import NotFoundComponent from "@/components/NotFound";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Adventures = () => {
  return (
    <>
      <SEO 
        title="Mount Abu Adventures | Thrilling Activities" 
        description="Discover exciting adventure activities in Mount Abu. Book trekking, hiking, watersports, and other thrilling experiences."
      />
      <Header />
      <NotFoundComponent
        title="Coming Soon: Adventures"
        message="We're working on bringing exciting adventure experiences to Mount Abu. Please check back soon to discover activities for thrill-seekers of all levels!"
        type="adventure"
        image="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3"
        backButtonLabel="Go Back"
        homeButtonLabel="Back to Homepage"
      />
      <Footer />
    </>
  );
};

export default Adventures;
