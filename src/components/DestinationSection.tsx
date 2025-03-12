
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Destination {
  id: number;
  title: string;
  description: string;
  image: string;
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
  const { data: destinations, isLoading } = useQuery({
    queryKey: ['destinations'],
    queryFn: async () => {
      // In a real implementation, we'd fetch destinations from Supabase
      // For now, we'll use static data that simulates what we'd get from the DB
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return [
        {
          id: 1,
          title: "Nakki Lake",
          description: "Explore hotels around the beautiful Nakki Lake, the heart of Mount Abu.",
          image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
          slug: "nakki-lake",
          properties: 15
        },
        {
          id: 2,
          title: "Guru Shikhar",
          description: "Stay near the highest peak of the Aravalli Range for breathtaking views.",
          image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
          slug: "guru-shikhar",
          properties: 8
        },
        {
          id: 3,
          title: "Dilwara Temples",
          description: "Find accommodation near the famous Jain temples of Mount Abu.",
          image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
          slug: "dilwara-temples",
          properties: 12
        },
        {
          id: 4,
          title: "Wildlife Sanctuary",
          description: "Stay close to nature at Mount Abu Wildlife Sanctuary.",
          image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
          slug: "wildlife-sanctuary",
          properties: 6
        }
      ];
    },
    staleTime: 1000 * 60 * 30, // 30 minutes
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div className="max-w-2xl">
              <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded w-40 animate-pulse mt-6 md:mt-0"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-[400px] bg-gray-200 rounded-xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

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
          {destinations?.map((destination) => (
            <DestinationCard 
              key={destination.id}
              image={destination.image}
              title={destination.title}
              description={destination.description}
              properties={destination.properties}
              link={`/hotels?location=${destination.slug}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationSection;
