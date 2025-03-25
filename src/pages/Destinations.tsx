
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

interface Destination {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  distance: string;
  activities: number;
  popular: boolean;
}

const Destinations = () => {
  // Mount Abu destinations data
  const destinations: Destination[] = [
    {
      id: 1,
      name: "Nakki Lake",
      slug: "nakki-lake",
      description: "The sacred lake in the heart of Mount Abu, known for boating and surrounding scenic beauty.",
      image: "https://images.unsplash.com/photo-1601794590530-93b57767e259?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      distance: "0.8 km from city center",
      activities: 5,
      popular: true
    },
    {
      id: 2,
      name: "Dilwara Temples",
      slug: "dilwara-temples",
      description: "Exquisite Jain temples renowned worldwide for their extraordinary marble carvings dating back to 11th century.",
      image: "https://images.unsplash.com/photo-1585468274952-66591eb14165?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      distance: "2.5 km from city center",
      activities: 3,
      popular: true
    },
    {
      id: 3,
      name: "Sunset Point",
      slug: "sunset-point",
      description: "A popular viewpoint offering breathtaking panoramic views of the sunset over the Aravalli range.",
      image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      distance: "3.2 km from city center",
      activities: 4,
      popular: true
    },
    {
      id: 4,
      name: "Mount Abu Wildlife Sanctuary",
      slug: "wildlife-sanctuary",
      description: "Home to diverse flora and fauna including leopards, sambhar deer, and over 250 species of birds.",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      distance: "4.6 km from city center",
      activities: 8,
      popular: true
    },
    {
      id: 5,
      name: "Guru Shikhar",
      slug: "guru-shikhar",
      description: "The highest peak of the Aravalli Range at 1,722 meters, offering spectacular views of Mount Abu and surrounding regions.",
      image: "https://images.unsplash.com/photo-1519583272095-6433daf26b6e?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      distance: "12 km from city center",
      activities: 6,
      popular: true
    },
    {
      id: 6,
      name: "Achalgarh Fort",
      slug: "achalgarh-fort",
      description: "Ancient fort built by the Paramara dynasty, featuring stunning temples and historic architecture.",
      image: "https://images.unsplash.com/photo-1517091622280-58f22c8dd039?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      distance: "11 km from city center",
      activities: 5,
      popular: true
    },
    {
      id: 7,
      name: "Honeymoon Point",
      slug: "honeymoon-point",
      description: "Also known as Andra Point, a romantic spot offering breathtaking views of the verdant valleys and hills.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      distance: "2.8 km from city center",
      activities: 2,
      popular: false
    },
    {
      id: 8,
      name: "Adhar Devi Temple",
      slug: "adhar-devi-temple",
      description: "Ancient cave temple dedicated to Goddess Durga, accessed by climbing 365 steps carved into the mountain.",
      image: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      distance: "3.5 km from city center",
      activities: 2,
      popular: false
    },
    {
      id: 9,
      name: "Trevor's Tank",
      slug: "trevors-tank",
      description: "A man-made crocodile breeding site surrounded by dense forests, perfect for birdwatching and nature walks.",
      image: "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      distance: "5 km from city center",
      activities: 3,
      popular: false
    }
  ];

  // Filter state
  const [filter, setFilter] = useState<"all" | "popular">("all");
  const filteredDestinations = filter === "all" 
    ? destinations 
    : destinations.filter(d => d.popular);

  return (
    <>
      <SEO 
        title="Mount Abu Destinations | Discover Beautiful Places" 
        description="Explore the best destinations and attractions in Mount Abu. Find hidden gems, popular spots, and natural beauty."
      />
      <div className="min-h-screen bg-stone-50 flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative h-[50vh] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3"
              alt="Mount Abu Destinations" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 flex items-end">
              <div className="container-custom pb-12">
                <div className="flex items-center text-white text-sm mb-2">
                  <Link to="/" className="hover:underline">Home</Link>
                  <ChevronRight className="h-4 w-4 mx-1" />
                  <span>Destinations</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-3">
                  Explore Mount Abu Destinations
                </h1>
                <p className="text-white/90 text-lg max-w-2xl">
                  Discover the beauty, culture, and natural wonders of Rajasthan's only hill station
                </p>
              </div>
            </div>
          </section>
          
          {/* Destinations List */}
          <section className="py-16">
            <div className="container-custom">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-display font-bold">
                  Discover Scenic Destinations
                </h2>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setFilter("all")}
                    className={`px-4 py-2 rounded-lg ${filter === "all" 
                      ? "bg-primary text-white" 
                      : "bg-white border border-stone-200 text-stone-700"}`}
                  >
                    All
                  </button>
                  <button 
                    onClick={() => setFilter("popular")}
                    className={`px-4 py-2 rounded-lg ${filter === "popular" 
                      ? "bg-primary text-white" 
                      : "bg-white border border-stone-200 text-stone-700"}`}
                  >
                    Popular
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDestinations.map((destination) => (
                  <Link
                    key={destination.id}
                    to={`/destination/${destination.slug}`}
                    className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder.svg";
                        }}
                      />
                    </div>
                    
                    <div className="p-5">
                      <h3 className="font-display font-semibold text-xl mb-2">
                        {destination.name}
                      </h3>
                      <p className="text-stone-600 text-sm mb-4 line-clamp-2">
                        {destination.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-stone-500 text-sm">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{destination.distance}</span>
                        </div>
                        <span className="bg-stone-100 text-stone-600 text-xs px-2 py-1 rounded-full">
                          {destination.activities} {destination.activities === 1 ? 'Activity' : 'Activities'}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              {filteredDestinations.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-stone-600 text-lg">No destinations found.</p>
                </div>
              )}
            </div>
          </section>
          
          {/* Info Section */}
          <section className="py-16 bg-stone-100">
            <div className="container-custom">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                <h2 className="text-2xl font-display font-semibold mb-4">About Mount Abu Destinations</h2>
                <p className="text-stone-600 mb-4">
                  Mount Abu, Rajasthan's only hill station, is nestled in the Aravalli Range and is home to numerous 
                  stunning destinations. From the sacred Nakki Lake at its heart to the exquisite Dilwara Temples with 
                  their remarkable marble carvings, Mount Abu offers diverse experiences.
                </p>
                <p className="text-stone-600 mb-4">
                  Visitors can enjoy panoramic views from Sunset Point, explore the rich biodiversity at the Wildlife Sanctuary, 
                  or climb to Guru Shikhar, the highest peak in the range. The region's unique combination of natural beauty, spiritual 
                  significance, and architectural splendor makes it an ideal getaway for all types of travelers.
                </p>
                <div className="bg-stone-50 p-4 rounded-lg mt-4">
                  <h3 className="font-medium mb-2">Best Time to Visit</h3>
                  <p className="text-stone-600">
                    The ideal time to explore Mount Abu destinations is from October to March when the weather is pleasant. 
                    Summer (April to June) is warm but still bearable compared to the rest of Rajasthan, while the monsoon season 
                    (July to September) adds a lush green charm to the landscapes but may experience occasional heavy rainfall.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Destinations;
