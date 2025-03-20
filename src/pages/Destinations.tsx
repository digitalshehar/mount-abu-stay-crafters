
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Calendar, Star, Search, ChevronDown, Filter } from "lucide-react";
import { Link } from "react-router-dom";

const Destinations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  
  const destinations = [
    {
      id: 1,
      name: "Nakki Lake",
      description: "A sacred lake surrounded by hills, offering boating and panoramic views.",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      rating: 4.8,
      reviewCount: 352,
      category: "natural",
      activities: ["Boating", "Photography", "Nature Walk"],
      bestTimeToVisit: "October to March"
    },
    {
      id: 2,
      name: "Dilwara Temples",
      description: "Exquisitely carved Jain temples known for their architectural brilliance.",
      image: "https://images.unsplash.com/photo-1613563696494-3c70c0b8d580?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      rating: 4.9,
      reviewCount: 423,
      category: "religious",
      activities: ["Historical Tour", "Architecture", "Photography"],
      bestTimeToVisit: "October to March"
    },
    {
      id: 3,
      name: "Sunset Point",
      description: "Scenic viewpoint offering breathtaking views of the sunset over the valley.",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      rating: 4.7,
      reviewCount: 287,
      category: "natural",
      activities: ["Sunset Viewing", "Photography", "Trekking"],
      bestTimeToVisit: "October to June"
    },
    {
      id: 4,
      name: "Mount Abu Wildlife Sanctuary",
      description: "Home to diverse flora and fauna with well-marked nature trails.",
      image: "https://images.unsplash.com/photo-1561040594-a1b8785b8d1e?auto=format&fit=crop&q=80&w=1548&ixlib=rb-4.0.3",
      rating: 4.5,
      reviewCount: 186,
      category: "natural",
      activities: ["Wildlife Safari", "Bird Watching", "Nature Photography"],
      bestTimeToVisit: "March to June"
    },
    {
      id: 5,
      name: "Achalgarh Fort",
      description: "Ancient fort complex with historic temples and panoramic views.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3",
      rating: 4.6,
      reviewCount: 214,
      category: "historical",
      activities: ["Historical Tour", "Photography", "Trekking"],
      bestTimeToVisit: "October to March"
    },
    {
      id: 6,
      name: "Guru Shikhar",
      description: "The highest peak in the Aravalli Range, offering spectacular views.",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      rating: 4.7,
      reviewCount: 246,
      category: "natural",
      activities: ["Trekking", "Photography", "Nature Walk"],
      bestTimeToVisit: "October to March"
    }
  ];

  const filteredDestinations = destinations.filter(destination => {
    // Apply search filter
    if (searchQuery && !destination.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !destination.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply category filter
    if (activeFilter !== "all" && destination.category !== activeFilter) {
      return false;
    }
    
    return true;
  });

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="absolute inset-0 opacity-20 bg-pattern-dots"></div>
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Discover Mount Abu
              </h1>
              <p className="text-lg md:text-xl mb-8 text-blue-100">
                Explore the enchanting destinations of Rajasthan's only hill station
              </p>

              <div className="max-w-md mx-auto relative">
                <input
                  type="text"
                  placeholder="Search destinations..."
                  className="w-full pl-4 pr-12 py-3 rounded-lg text-stone-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="absolute right-4 top-3">
                  <Search className="h-5 w-5 text-stone-400" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Destinations Section */}
        <section className="py-16">
          <div className="container-custom">
            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {['all', 'natural', 'religious', 'historical', 'cultural'].map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === category 
                      ? 'bg-primary text-white' 
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                  onClick={() => setActiveFilter(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            {/* Destinations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDestinations.length > 0 ? (
                filteredDestinations.map((destination) => (
                  <Link 
                    to={`/destinations/${destination.id}`} 
                    key={destination.id}
                    className="bg-white rounded-xl shadow-sm overflow-hidden card-hover"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium flex items-center gap-1">
                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                        <span>{destination.rating}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display font-bold text-xl mb-2">{destination.name}</h3>
                      <p className="text-stone-600 text-sm mb-4 line-clamp-2">{destination.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {destination.activities.slice(0, 3).map((activity, idx) => (
                          <span 
                            key={idx} 
                            className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full"
                          >
                            {activity}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-stone-500">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          <span>Best time: {destination.bestTimeToVisit}</span>
                        </div>
                        <span>{destination.reviewCount} reviews</span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-3 py-12 text-center">
                  <p className="text-lg text-stone-500 mb-4">No destinations found matching your search criteria.</p>
                  <button 
                    onClick={() => {
                      setSearchQuery("");
                      setActiveFilter("all");
                    }}
                    className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-all"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-stone-100">
          <div className="container-custom">
            <div className="bg-white rounded-2xl shadow overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="p-8 lg:p-12">
                  <h2 className="text-2xl lg:text-3xl font-bold mb-4">Plan Your Perfect Mount Abu Trip</h2>
                  <p className="text-stone-600 mb-6">
                    Discover the beauty of Mount Abu with our curated travel guides and personalized recommendations.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      to="/hotels"
                      className="bg-primary text-white px-6 py-3 rounded-lg shadow hover:bg-primary/90 transition-colors"
                    >
                      Find Hotels
                    </Link>
                    <Link
                      to="/adventures"
                      className="bg-white border border-stone-200 text-stone-800 px-6 py-3 rounded-lg hover:bg-stone-50 transition-colors"
                    >
                      Explore Adventures
                    </Link>
                  </div>
                </div>
                <div className="hidden lg:block relative h-full">
                  <img
                    src="https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=1574&ixlib=rb-4.0.3"
                    alt="Mount Abu Adventure"
                    className="w-full h-80 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Destinations;
