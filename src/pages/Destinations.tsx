
import React from "react";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Destinations data
const destinations = [
  {
    id: 1,
    name: "Nakki Lake",
    description: "A beautiful scenic lake in the heart of Mount Abu, perfect for boating and relaxation.",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&auto=format&fit=crop",
    activities: ["Boating", "Picnic", "Photography"],
    location: "Central Mount Abu",
    slug: "nakki-lake"
  },
  {
    id: 2,
    name: "Dilwara Temples",
    description: "Exquisitely carved Jain temples built between the 11th and 13th centuries, known for their stunning marble work.",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&auto=format&fit=crop",
    activities: ["Temple Visit", "Architecture Tour", "Cultural Experience"],
    location: "2.5 km from Mount Abu",
    slug: "dilwara-temples"
  },
  {
    id: 3,
    name: "Sunset Point",
    description: "A perfect spot to witness breathtaking sunsets over the Aravalli hills and valleys.",
    image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&auto=format&fit=crop",
    activities: ["Sunset Viewing", "Photography", "Nature Walk"],
    location: "3 km from Mount Abu town center",
    slug: "sunset-point"
  },
  {
    id: 4,
    name: "Guru Shikhar",
    description: "The highest peak in the Aravalli Range, offering panoramic views of Mount Abu and surrounding regions.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop",
    activities: ["Trekking", "Hiking", "Wildlife Spotting"],
    location: "15 km from Mount Abu",
    slug: "guru-shikhar"
  },
  {
    id: 5,
    name: "Wildlife Sanctuary",
    description: "A rich biodiversity hub with leopards, sambar deer, wild boars, and over 250 species of birds.",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&auto=format&fit=crop",
    activities: ["Jungle Safari", "Bird Watching", "Nature Trail"],
    location: "5 km from Mount Abu",
    slug: "wildlife-sanctuary"
  },
  {
    id: 6,
    name: "Achalgarh Fort",
    description: "An ancient fort built by the Paramara dynasty, featuring historic temples and stunning architecture.",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&auto=format&fit=crop",
    activities: ["Historical Tour", "Photography", "Temple Visit"],
    location: "11 km from Mount Abu",
    slug: "achalgarh-fort"
  },
  {
    id: 7,
    name: "Honeymoon Point",
    description: "Also known as Anadra Point, offering spectacular views and a peaceful atmosphere.",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&auto=format&fit=crop",
    activities: ["Scenic Views", "Photography", "Relaxation"],
    location: "2.5 km from Mount Abu town center",
    slug: "honeymoon-point"
  },
  {
    id: 8,
    name: "Toad Rock",
    description: "A rock formation resembling a toad, perched on a hill near Nakki Lake.",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&auto=format&fit=crop",
    activities: ["Rock Climbing", "Photography", "Hiking"],
    location: "Near Nakki Lake",
    slug: "toad-rock"
  },
];

const DestinationCard = ({ destination }) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <CardContent className="p-6">
        <div className="flex items-center text-stone-500 text-sm mb-2">
          <MapPin className="h-4 w-4 mr-1" /> {destination.location}
        </div>
        <h3 className="text-xl font-display font-semibold mb-2">{destination.name}</h3>
        <p className="text-stone-600 text-sm mb-4 line-clamp-3">
          {destination.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {destination.activities.map((activity, index) => (
            <span
              key={index}
              className="text-xs bg-stone-100 text-stone-800 px-2 py-1 rounded-full"
            >
              {activity}
            </span>
          ))}
        </div>
        <div className="flex space-x-2">
          <Link to={`/destination/${destination.slug}`} className="flex-1">
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>
          <Link to={`/adventures?location=${encodeURIComponent(destination.name)}`} className="flex-1">
            <Button className="w-full gap-1">
              Explore <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

const Destinations = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-28 pb-16">
        <div className="container-custom">
          <div className="flex flex-col space-y-10">
            {/* Hero section */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary to-primary/80 mb-10">
              <div className="absolute inset-0 opacity-20">
                <img
                  src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1200&auto=format&fit=crop"
                  alt="Mount Abu Landscapes"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative py-16 px-8 text-white text-center max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
                  Discover Mount Abu's Top Destinations
                </h1>
                <p className="text-lg md:text-xl opacity-90 mb-6">
                  Explore the most beautiful and serene places in the only hill station of Rajasthan
                </p>
                <Link to="/adventures">
                  <Button className="bg-white text-primary hover:bg-white/90">
                    Book an Adventure
                  </Button>
                </Link>
              </div>
            </div>

            {/* Main content */}
            <div>
              <h2 className="text-2xl font-display font-bold mb-2">
                Popular Destinations
              </h2>
              <p className="text-stone-600 mb-6">
                Discover the most beautiful and unique places in Mount Abu
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {destinations.map((destination) => (
                  <DestinationCard key={destination.id} destination={destination} />
                ))}
              </div>
            </div>

            {/* Info box */}
            <div className="bg-stone-50 border border-stone-100 rounded-xl p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-3">About Mount Abu</h3>
              <p className="text-stone-600 mb-4">
                Mount Abu is the only hill station in Rajasthan, located in the Aravalli Range. It's known for its stunning views, rich flora and fauna, and historical significance. The region is home to diverse wildlife, beautiful lakes, and ancient temples, making it a perfect destination for nature lovers and cultural enthusiasts alike.
              </p>
              <p className="text-stone-600">
                The best time to visit is between October and March when the weather is pleasant and ideal for sightseeing and outdoor activities.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Destinations;
