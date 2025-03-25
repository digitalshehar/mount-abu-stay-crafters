import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Calendar, MapPin, ChevronDown, Filter, Star } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Adventures = () => {
  const location = useLocation();
  const { toast } = useToast();
  const searchParams = new URLSearchParams(location.search);

  const [searchValues, setSearchValues] = useState({
    location: searchParams.get("location") || "",
    date: searchParams.get("date") || "",
    type: searchParams.get("type") || ""
  });

  useEffect(() => {
    if (searchParams.toString()) {
      toast({
        title: "Search Applied",
        description: "Showing search results based on your criteria",
      });
    }
  }, []);

  const activities = [
    {
      id: 1,
      name: "Sunset Point Trekking",
      type: "Trekking",
      duration: "3 hours",
      difficulty: "Easy",
      rating: 4.8,
      reviewCount: 124,
      price: 800,
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=1574&ixlib=rb-4.0.3"
    },
    {
      id: 2,
      name: "Wildlife Safari",
      type: "Sightseeing",
      duration: "5 hours",
      difficulty: "Easy",
      rating: 4.5,
      reviewCount: 98,
      price: 1200,
      image: "https://images.unsplash.com/photo-1561040594-a1b8785b8d1e?auto=format&fit=crop&q=80&w=1548&ixlib=rb-4.0.3"
    },
    {
      id: 3,
      name: "Nakki Lake Boating",
      type: "Water Activity",
      duration: "1 hour",
      difficulty: "Easy",
      rating: 4.3,
      reviewCount: 210,
      price: 500,
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3"
    },
    {
      id: 4,
      name: "Overnight Camping Experience",
      type: "Camping",
      duration: "24 hours",
      difficulty: "Moderate",
      rating: 4.9,
      reviewCount: 76,
      price: 2500,
      image: "https://images.unsplash.com/photo-1517823382935-51bfcb0ec6bc?auto=format&fit=crop&q=80&w=1740&ixlib=rb-4.0.3"
    },
  ];

  const filteredActivities = activities.filter(activity => {
    if (!searchValues.location && !searchValues.date && !searchValues.type) {
      return true;
    }

    let matches = true;
    
    if (searchValues.type && searchValues.type !== "") {
      matches = matches && activity.type.toLowerCase() === searchValues.type.toLowerCase();
    }
    
    return matches;
  });

  const handleSearchFormSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchValues.location) params.append("location", searchValues.location);
    if (searchValues.date) params.append("date", searchValues.date);
    if (searchValues.type) params.append("type", searchValues.type);
    
    window.history.pushState({}, "", `${location.pathname}?${params.toString()}`);
    
    toast({
      title: "Search Updated",
      description: "Showing updated search results",
    });
  };

  return (
    <>
      <Header />
      <main>
        <section className="relative py-20 bg-stone-100">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="title-medium mb-4">Adventures in Mount Abu</h1>
              <p className="subtitle mb-8">
                Discover thrilling activities and unforgettable experiences in the heart of Mount Abu
              </p>

              <div className="bg-white rounded-xl shadow-md p-6 mt-8">
                <form onSubmit={handleSearchFormSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="relative">
                    <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-stone-400" />
                    <input
                      type="text"
                      placeholder="Activity location"
                      className="w-full pl-12 pr-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={searchValues.location}
                      onChange={(e) => setSearchValues({...searchValues, location: e.target.value})}
                    />
                  </div>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-3.5 h-5 w-5 text-stone-400" />
                    <input
                      type="text"
                      placeholder="Date"
                      className="w-full pl-12 pr-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={searchValues.date}
                      onChange={(e) => setSearchValues({...searchValues, date: e.target.value})}
                    />
                  </div>
                  <button 
                    type="submit"
                    className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg shadow transition-all flex items-center justify-center"
                  >
                    Search Activities
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/4 bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Filters</h3>
                  <Filter size={20} />
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3">Activity Type</h4>
                  <div className="space-y-2">
                    {['Trekking', 'Sightseeing', 'Camping', 'Water Activity', 'Yoga'].map((type) => (
                      <label key={type} className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="mr-2" 
                          checked={searchValues.type.toLowerCase() === type.toLowerCase()}
                          onChange={() => {
                            setSearchValues({
                              ...searchValues, 
                              type: searchValues.type.toLowerCase() === type.toLowerCase() ? "" : type.toLowerCase()
                            });
                          }}
                        />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3">Difficulty Level</h4>
                  <div className="space-y-2">
                    {['Easy', 'Moderate', 'Challenging'].map((level) => (
                      <label key={level} className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>{level}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3">Duration</h4>
                  <div className="space-y-2">
                    {['1-3 hours', '3-6 hours', 'Half day', 'Full day', 'Multi-day'].map((duration) => (
                      <label key={duration} className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>{duration}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3">Price Range</h4>
                  <input
                    type="range"
                    min="200"
                    max="3000"
                    step="200"
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-stone-500 mt-2">
                    <span>₹200</span>
                    <span>₹3000</span>
                  </div>
                </div>

                <button 
                  onClick={handleSearchFormSubmit}
                  className="w-full bg-secondary hover:bg-secondary/80 text-primary font-medium py-2 px-4 rounded-lg transition-all"
                >
                  Apply Filters
                </button>
              </div>

              <div className="w-full md:w-3/4">
                <div className="flex justify-between items-center mb-6">
                  <p className="text-stone-500">Showing {filteredActivities.length} activities</p>
                  <div className="flex items-center">
                    <span className="mr-2">Sort by:</span>
                    <button className="flex items-center text-stone-700 hover:text-primary transition-colors">
                      Popularity
                      <ChevronDown size={16} className="ml-1" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredActivities.length > 0 ? (
                    filteredActivities.map((activity) => (
                      <div key={activity.id} className="bg-white rounded-xl shadow-sm overflow-hidden card-hover">
                        <div className="relative h-48">
                          <img
                            src={activity.image}
                            alt={activity.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium flex items-center">
                            {activity.difficulty}
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm text-primary font-medium">{activity.type}</p>
                              <h3 className="font-display font-bold text-xl mb-1">{activity.name}</h3>
                              <p className="text-sm text-stone-500 mb-2">{activity.duration}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-primary font-bold text-xl">₹{activity.price}</p>
                              <p className="text-xs text-stone-500">per person</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center text-sm text-stone-500 mt-4 mb-6">
                            <Star size={16} className="text-yellow-500 fill-yellow-500 mr-1" />
                            <span className="mr-1">{activity.rating}</span>
                            <span className="mr-3">({activity.reviewCount} reviews)</span>
                          </div>
                          
                          <Link
                            to={`/adventures/${activity.id}`}
                            className="block w-full bg-primary hover:bg-primary/90 text-white text-center font-medium py-2 px-4 rounded-lg shadow-sm transition-all"
                          >
                            Book Now
                          </Link>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-10">
                      <p className="text-lg text-stone-500">No activities found matching your search criteria.</p>
                      <button 
                        onClick={() => {
                          setSearchValues({ location: "", date: "", type: "" });
                          window.history.pushState({}, "", location.pathname);
                        }}
                        className="mt-4 bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-all"
                      >
                        Clear Search
                      </button>
                    </div>
                  )}
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

export default Adventures;
