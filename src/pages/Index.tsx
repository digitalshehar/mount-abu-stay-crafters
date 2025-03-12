
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "../components/Header";
import Hero from "../components/Hero";
import FeatureSection from "../components/FeatureSection";
import DestinationSection from "../components/DestinationSection";
import TestimonialSection from "../components/TestimonialSection";
import Footer from "../components/Footer";
import HotelCard from "../components/HotelCard";
import WeatherWidget from "../components/WeatherWidget";
import TravelGuide from "../components/TravelGuide";
import EventsCalendar from "../components/EventsCalendar";
import PersonalizedRecommendations from "../components/PersonalizedRecommendations";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [featuredHotels, setFeaturedHotels] = useState([]);
  
  // Fetch featured hotels from supabase
  const { data: hotels, isLoading } = useQuery({
    queryKey: ['featuredHotels'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hotels')
        .select('*')
        .eq('featured', true)
        .limit(3);
        
      if (error) {
        console.error("Error fetching featured hotels:", error);
        throw error;
      }
      
      return data || [];
    }
  });

  useEffect(() => {
    document.title = "HotelInMountAbu - Find the Perfect Stay in Mount Abu";
    
    if (hotels && hotels.length > 0) {
      setFeaturedHotels(hotels);
    }
  }, [hotels]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />

      {/* Weather & Travel Guide Section */}
      <section className="py-8 sm:py-10 bg-stone-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <div>
              <WeatherWidget />
            </div>
            <div className="lg:col-span-2">
              <TravelGuide />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12">
            <div className="max-w-2xl">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-3 md:mb-6">Featured Hotels in Mount Abu</h2>
              <p className="text-sm md:text-base text-muted-foreground">
                Discover our handpicked selection of the finest accommodations in Mount Abu, offering
                comfort, luxury, and unforgettable experiences.
              </p>
            </div>
            <Link
              to="/hotels"
              className="mt-4 md:mt-0 px-4 py-2 sm:px-5 sm:py-3 border border-primary text-primary font-medium rounded-lg hover:bg-primary hover:text-white transition-colors text-sm sm:text-base"
            >
              View All Hotels
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {isLoading ? (
              // Show skeleton loaders while fetching
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="rounded-lg border border-gray-200 overflow-hidden">
                  <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  </div>
                </div>
              ))
            ) : featuredHotels.length > 0 ? (
              featuredHotels.map((hotel) => (
                <HotelCard 
                  key={hotel.id}
                  id={hotel.id}
                  name={hotel.name}
                  slug={hotel.slug || `hotel-${hotel.id}`}
                  image={hotel.image}
                  price={hotel.price_per_night || hotel.price || 0}
                  location={hotel.location}
                  rating={hotel.rating || 4.5}
                  reviewCount={hotel.review_count || 0}
                  amenities={hotel.amenities || []}
                  featured={hotel.featured}
                />
              ))
            ) : (
              // Fallback if no featured hotels found
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-500">No featured hotels available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <FeatureSection />
      <DestinationSection />

      {/* Events & Recommendations Section */}
      <section className="py-10 sm:py-16 bg-stone-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <EventsCalendar />
            <PersonalizedRecommendations />
          </div>
        </div>
      </section>

      <TestimonialSection />

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary/60 z-10" />
          <img
            src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3"
            alt="Mount Abu landscape"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-custom relative z-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4 sm:mb-6">
              Ready for an Unforgettable Mount Abu Experience?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-10">
              Book your perfect getaway today and create memories that will last a lifetime.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                to="/hotels"
                className="px-6 py-3 sm:px-8 sm:py-4 bg-white text-primary font-medium rounded-lg shadow-lg hover:bg-stone-100 transition-colors text-sm sm:text-base"
              >
                Find Hotels
              </Link>
              <Link
                to="/adventures"
                className="px-6 py-3 sm:px-8 sm:py-4 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors text-sm sm:text-base"
              >
                Explore Adventures
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
