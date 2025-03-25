
import React, { useEffect } from "react";
import NotFoundComponent from "@/components/NotFound";
import SEO from "@/components/SEO";

const AdventureNotFound = () => {
  useEffect(() => {
    // Set document title
    document.title = "Adventure Not Found | Mount Abu";
  }, []);

  return (
    <>
      <SEO
        title="Adventure Not Found | Mount Abu"
        description="The adventure activity you're looking for doesn't exist or is no longer available. Discover other exciting experiences in Mount Abu."
      />
      <NotFoundComponent
        title="Adventure Not Found"
        message="The adventure activity you're looking for doesn't exist or is no longer available."
        type="adventure"
        image="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3"
        backButtonLabel="Back to Adventures"
        homeButtonLabel="Browse Activities"
      />
    </>
  );
};

export default AdventureNotFound;
