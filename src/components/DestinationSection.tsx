
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Destination {
  id: number;
  name: string;
  description: string;
  image: string;
  activities: string[];
  location: string;
  slug: string;
  properties: number;
}

interface DestinationCardProps {
  image: string;
  title: string;
  description: string;
  properties: number;
  link: string;
}

const DestinationCard = ({ image, title, description, properties, link }: DestinationCardProps) => {
  return (
    <div className="group relative h-[400px] overflow-hidden rounded-xl">
      <div className="absolute inset-0 image-fade">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl transition-transform duration-500 transform translate-y-2 group-hover:translate-y-0">
          <h3 className="text-xl font-display font-semibold mb-2">{title}</h3>
          <p className="text-stone-600 text-sm mb-4">{description}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-stone-500">{properties} properties</span>
            <Link
              to={link}
              className="text-primary font-medium flex items-center text-sm group-hover:underline"
            >
              Explore
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const DestinationSection = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        
        // Fetch destinations from Supabase
        const { data, error } = await supabase
          .from("destinations")
          .select("*")
          .limit(4);
          
        if (error) throw error;
        
        if (data) {
          // Count hotels for each destination
          const destinationsWithProperties = await Promise.all(
            data.map(async (destination) => {
              // Get count of hotels for this destination location
              const { count, error: countError } = await supabase
                .from("hotels")
                .select("*", { count: "exact", head: true })
                .ilike("location", `%${destination.name}%`);
                
              if (countError) {
                console.error("Error counting hotels:", countError);
                return {
                  ...destination,
                  properties: 0
                };
              }
              
              return {
                ...destination,
                properties: count || 0
              };
            })
          );
          
          setDestinations(destinationsWithProperties);
        }
      } catch (error) {
        console.error("Error fetching destinations:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDestinations();
  }, []);

  // Default destinations if none from database
  const defaultDestinations = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      title: "Nakki Lake",
      description: "Explore hotels around the beautiful Nakki Lake, the heart of Mount Abu.",
      properties: 15,
      link: "/hotels?location=nakki-lake",
      slug: "nakki-lake"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      title: "Guru Shikhar",
      description: "Stay near the highest peak of the Aravalli Range for breathtaking views.",
      properties: 8,
      link: "/hotels?location=guru-shikhar",
      slug: "guru-shikhar"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      title: "Dilwara Temples",
      description: "Find accommodation near the famous Jain temples of Mount Abu.",
      properties: 12,
      link: "/hotels?location=dilwara-temples",
      slug: "dilwara-temples"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      title: "Wildlife Sanctuary",
      description: "Stay close to nature at Mount Abu Wildlife Sanctuary.",
      properties: 6,
      link: "/hotels?location=wildlife-sanctuary",
      slug: "wildlife-sanctuary"
    },
  ];

  const displayDestinations = destinations.length > 0 
    ? destinations.map(dest => ({
        id: dest.id,
        image: dest.image,
        title: dest.name,
        description: dest.description,
        properties: dest.properties,
        link: `/destination/${dest.slug}`,
        slug: dest.slug
      }))
    : defaultDestinations;

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="title-medium mb-6">Popular Destinations in Mount Abu</h2>
            <p className="subtitle">
              Discover the most sought-after locations in Mount Abu and find the perfect stay for
              your vacation.
            </p>
          </div>
          <Link
            to="/destinations"
            className="mt-6 md:mt-0 px-5 py-3 border border-primary text-primary font-medium rounded-lg hover:bg-primary hover:text-white transition-colors"
          >
            View All Destinations
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayDestinations.map((destination, index) => (
            <DestinationCard key={destination.id} {...destination} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationSection;
