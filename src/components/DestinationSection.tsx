
import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

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

const DestinationSection = () => {
  // Real Mount Abu destinations
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
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-stone-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4">
            Popular Destinations in Mount Abu
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Explore Mount Abu's most cherished attractions, from serene lakes and ancient temples to breathtaking viewpoints and natural wonders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination) => (
            <Link
              key={destination.id}
              to={`/destinations/${destination.slug}`}
              className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-[250px] object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />
              
              <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                <h3 className="text-white font-display font-semibold text-xl mb-1">
                  {destination.name}
                </h3>
                <p className="text-white/90 text-sm mb-3 line-clamp-2">
                  {destination.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-xs">
                    {destination.distance}
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                    {destination.activities} {destination.activities === 1 ? 'Activity' : 'Activities'}
                  </span>
                </div>
              </div>
              
              <div className="absolute top-4 right-4 z-20 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="h-4 w-4 text-white" />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/destinations"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-lg shadow hover:bg-primary/90 transition-colors"
          >
            <span>Explore All Destinations</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DestinationSection;
