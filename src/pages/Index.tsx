
import { useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import FeatureSection from "../components/FeatureSection";
import DestinationSection from "../components/DestinationSection";
import TestimonialSection from "../components/TestimonialSection";
import Footer from "../components/Footer";
import WeatherWidget from "../components/WeatherWidget";
import TravelGuide from "../components/TravelGuide";
import EventsCalendar from "../components/EventsCalendar";
import PersonalizedRecommendations from "../components/PersonalizedRecommendations";
import { Link } from "react-router-dom";
import FeaturedHotelsSection from "../components/hotels/content/FeaturedHotelsSection";
import RegularHotelsSection from "../components/hotels/content/RegularHotelsSection";

const Index = () => {
  useEffect(() => {
    document.title = "HotelInMountAbu - Find the Perfect Stay in Mount Abu";
  }, []);

  return (
    <div className="min-h-screen bg-white w-full">
      <Header />
      <Hero />

      {/* Weather & Travel Guide Section */}
      <section className="py-8 sm:py-10 bg-stone-50 w-full">
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

      {/* Featured Hotels Section */}
      <FeaturedHotelsSection />

      {/* Regular Hotels Section */}
      <RegularHotelsSection 
        limit={3}
        title="Budget-Friendly Options"
        subtitle="Comfortable and affordable accommodations perfect for travelers watching their budget."
      />

      <FeatureSection />
      <DestinationSection />

      {/* Events & Recommendations Section */}
      <section className="py-10 sm:py-16 bg-stone-50 w-full">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <EventsCalendar />
            <PersonalizedRecommendations />
          </div>
        </div>
      </section>

      <TestimonialSection />

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 relative w-full">
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
