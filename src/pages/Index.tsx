
import { useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import FeatureSection from "../components/FeatureSection";
import DestinationSection from "../components/DestinationSection";
import TestimonialSection from "../components/TestimonialSection";
import Footer from "../components/Footer";
import HotelCard from "../components/HotelCard";
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
    {
      id: 4,
      name: "Mountain View Cottages",
      slug: "mountain-view-cottages",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      price: 3500,
      location: "Sunset Point",
      rating: 4.5,
      reviewCount: 156,
      amenities: ["Wifi", "Breakfast", "TV", "Bathroom"],
    },
    {
      id: 5,
      name: "Lakeside Retreat",
      slug: "lakeside-retreat",
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      price: 4800,
      location: "Nakki Lake",
      rating: 4.7,
      reviewCount: 203,
      amenities: ["Wifi", "Breakfast", "TV", "Lake View"],
    },
  ];

  useEffect(() => {
    document.title = "HotelInMountAbu - Find the Perfect Stay in Mount Abu";
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />

      {/* Featured Hotels */}
      <section className="py-20">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div className="max-w-2xl">
              <h2 className="title-medium mb-6">Featured Hotels in Mount Abu</h2>
              <p className="subtitle">
                Discover our handpicked selection of the finest accommodations in Mount Abu, offering
                comfort, luxury, and unforgettable experiences.
              </p>
            </div>
            <Link
              to="/hotels"
              className="mt-6 md:mt-0 px-5 py-3 border border-primary text-primary font-medium rounded-lg hover:bg-primary hover:text-white transition-colors"
            >
              View All Hotels
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredHotels.map((hotel) => (
              <HotelCard key={hotel.id} {...hotel} />
            ))}
          </div>
        </div>
      </section>

      <FeatureSection />
      <DestinationSection />
      <TestimonialSection />

      {/* CTA Section */}
      <section className="py-24 relative">
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
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Ready for an Unforgettable Mount Abu Experience?
            </h2>
            <p className="text-xl text-white/90 mb-10">
              Book your perfect getaway today and create memories that will last a lifetime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/hotels"
                className="px-8 py-4 bg-white text-primary font-medium rounded-lg shadow-lg hover:bg-stone-100 transition-colors"
              >
                Find Hotels
              </Link>
              <Link
                to="/adventures"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
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
