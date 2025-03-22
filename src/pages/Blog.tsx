
import React from "react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import NotFoundComponent from "@/components/NotFound";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Blog = () => {
  return (
    <>
      <SEO 
        title="Mount Abu Travel Blog | Stories & Tips" 
        description="Read the latest travel stories, tips, and insights about Mount Abu. Discover hidden gems and expert advice for your perfect trip."
      />
      <Header />
      <NotFoundComponent
        title="Coming Soon: Travel Blog"
        message="Our travel experts are preparing amazing stories, tips, and guides about Mount Abu. Check back soon for insightful content to plan your perfect trip!"
        type="default"
        image="https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3"
        backButtonLabel="Go Back"
        homeButtonLabel="Back to Homepage"
      />
      <Footer />
    </>
  );
};

export default Blog;
