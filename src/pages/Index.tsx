
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import DestinationSection from "@/components/DestinationSection";
import FeatureSection from "@/components/FeatureSection";
import TestimonialSection from "@/components/TestimonialSection";
import PersonalizedRecommendations from "@/components/PersonalizedRecommendations";
import FeaturedHotelsSection from "@/components/hotels/content/FeaturedHotelsSection";
import RegularHotelsSection from "@/components/hotels/content/RegularHotelsSection";
import { supabase } from "@/integrations/supabase/client";
import { Hotel } from "@/integrations/supabase/custom-types";

const Index = () => {
  const [featuredHotels, setFeaturedHotels] = useState<Hotel[]>([]);
  const [regularHotels, setRegularHotels] = useState<Hotel[]>([]);

  const { isLoading } = useQuery({
    queryKey: ["hotels-homepage"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("hotels")
          .select("*")
          .eq("status", "active");
        
        if (error) throw error;
        
        // Process the data
        if (data) {
          const featured = data.filter(hotel => hotel.featured);
          const regular = data.filter(hotel => !hotel.featured);
          
          setFeaturedHotels(featured);
          setRegularHotels(regular);
        }
        
        return data;
      } catch (error: any) {
        console.error("Error fetching hotels:", error.message);
        toast.error("Failed to load hotels");
        return [];
      }
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        
        <div className="container mx-auto px-4 py-12">
          <FeaturedHotelsSection 
            title="Featured Hotels"
            subtitle="Handpicked accommodations for your perfect stay"
            hotels={featuredHotels}
          />
          
          <div className="mt-12">
            <RegularHotelsSection 
              title="Popular Hotels"
              subtitle="Loved by travelers across the country"
              hotels={regularHotels}
              limit={6}
            />
          </div>
        </div>
        
        <DestinationSection />
        <FeatureSection />
        <TestimonialSection />
        <PersonalizedRecommendations />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
