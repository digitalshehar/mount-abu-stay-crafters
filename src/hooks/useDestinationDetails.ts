
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Destination, Adventure } from "@/integrations/supabase/custom-types";

export const useDestinationDetails = (destinationSlug: string | undefined) => {
  const [destination, setDestination] = useState<Destination | null>(null);
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDestinationData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!destinationSlug) {
          setError("Destination slug is missing");
          setLoading(false);
          return;
        }
        
        const { data: destinationData, error: destinationError } = await supabase
          .from("destinations")
          .select("*")
          .eq("slug", destinationSlug)
          .single();
        
        if (destinationError) {
          console.error("Error fetching destination:", destinationError);
          setError(destinationError.message || "Failed to fetch destination data");
          setLoading(false);
          return;
        }
        
        if (!destinationData) {
          setError("Destination not found");
          setLoading(false);
          return;
        }
        
        const formattedDestination: Destination = {
          id: destinationData.id,
          name: destinationData.name,
          description: destinationData.description,
          image: destinationData.image,
          activities: destinationData.activities || [],
          location: destinationData.location,
          slug: destinationData.slug,
          bestTimeToVisit: destinationData.best_time_to_visit || "All year round",
          highlights: destinationData.highlights || [],
          status: 'active' // Adding default status for destination
        };
        
        setDestination(formattedDestination);
        
        // Fetch adventures for this destination
        const { data: adventuresData, error: adventuresError } = await supabase
          .from("adventures")
          .select("*")
          .eq("location", destinationData.location)
          .order("id", { ascending: false });
        
        if (adventuresError) {
          console.error("Error fetching adventures:", adventuresError);
        } else if (adventuresData) {
          const formattedAdventures: Adventure[] = adventuresData.map(adventure => ({
            id: adventure.id,
            name: adventure.name,
            type: adventure.type,
            duration: adventure.duration,
            difficulty: adventure.difficulty,
            rating: adventure.rating || 4.5,
            review_count: adventure.review_count || 12,
            reviewCount: adventure.review_count || 12,
            price: adventure.price,
            image: adventure.image,
            location: adventure.location,
            status: adventure.status as 'active' | 'inactive',
            bookings: adventure.bookings || 0,
            slug: adventure.slug || adventure.name.toLowerCase().replace(/\s+/g, '-'),
            description: adventure.description || ''
          }));
          
          setAdventures(formattedAdventures);
        }
      } catch (error: any) {
        console.error("Error in fetching destination data:", error);
        setError(error.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (destinationSlug) {
      fetchDestinationData();
    }
  }, [destinationSlug]);

  return {
    destination,
    adventures,
    loading,
    error
  };
};
