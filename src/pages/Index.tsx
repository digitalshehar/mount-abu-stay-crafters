
import { useEffect } from "react";
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

const Index = () => {
  // Sample featured hotels data
  const featuredHotels = [
    {
      id: 1,
      name: "Hilltop Luxury Resort",
      slug: "hilltop-luxury-resort",
      image: "https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      price: 5800,
      location: "Near Nakki Lake",
      rating: 4.8,
      reviewCount: 312,
      amenities: ["Wifi", "Breakfast", "Swimming Pool", "Spa"],
      featured: true,
    },
    {
      id: 2,
      name: "Palace Heritage Hotel",
      slug: "palace-heritage-hotel",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      price: 7200,
      location: "Central Mount Abu",
      rating: 4.9,
      reviewCount: 245,
      amenities: ["Wifi", "Breakfast", "Restaurant", "Gym"],
    },
    {
      id: 3,
      name: "Green Valley Resort",
      slug: "green-valley-resort",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      price: 4300,
      location: "Near Wildlife Sanctuary",
      rating: 4.6,
      reviewCount: 187,
      amenities: ["Wifi", "Parking", "Restaurant", "Garden"],
    },
  ];

  useEffect(() => {
    document.title = "HotelInMountAbu - Find the Perfect Stay in Mount Abu";
  }, []);

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
            {featuredHotels.map((hotel) => (
              <HotelCard key={hotel.id} {...hotel} />
            ))}
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
