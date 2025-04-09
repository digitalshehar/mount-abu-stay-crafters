
import React from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout";
import Hero from "@/components/hero/Hero";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import PopularHotels from "@/components/home/PopularHotels";
import HarleyHotels from "@/components/home/HarleyHotels";
import FeaturedAdventures from "@/components/home/FeaturedAdventures";
import CarouselSection from "@/components/home/CarouselSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import Newsletter from "@/components/home/Newsletter";
import EarlyHotels from "@/components/home/EarlyHotels";

const Index: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Mount Abu Travel Guide - Find Best Hotels, Activities & Rentals</title>
        <meta
          name="description"
          content="Discover the best of Mount Abu with our comprehensive travel guide. Find hotels, adventures, car rentals, and more for your perfect getaway."
        />
      </Helmet>

      <Layout>
        <Hero />
        <FeaturedDestinations />
        <HarleyHotels />
        <EarlyHotels />
        <PopularHotels />
        <CarouselSection />
        <FeaturedAdventures />
        <TestimonialsSection />
        <Newsletter />
      </Layout>
    </>
  );
};

export default Index;
