
import { useState, useEffect } from "react";
import { Adventure, Destination } from "@/integrations/supabase/custom-types";
import { supabase } from "@/integrations/supabase/client";

export const useDestinationDetails = (destinationSlug?: string) => {
  const [destination, setDestination] = useState<Destination | null>(null);
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (destinationSlug) {
      fetchDestinationDetails();
    }
  }, [destinationSlug]);

  const fetchDestinationDetails = async () => {
    try {
      setLoading(true);
      
      // Fetch destination by slug from Supabase
      const { data: destinationData, error: destinationError } = await supabase
        .from('destinations')
        .select('*')
        .eq('slug', destinationSlug)
        .single();
      
      if (destinationError) throw destinationError;
      
      if (!destinationData) {
        setDestination(null);
        setLoading(false);
        return;
      }
      
      const destination: Destination = {
        id: destinationData.id,
        name: destinationData.name,
        description: destinationData.description,
        image: destinationData.image,
        activities: destinationData.activities || [],
        location: destinationData.location,
        slug: destinationData.slug,
        bestTimeToVisit: destinationData.best_time_to_visit || "October to March",
        highlights: destinationData.highlights || [
          "Sunset Point",
          "Nakki Lake",
          "Dilwara Jain Temples",
          "Wildlife Sanctuary",
          "Achalgarh Fort"
        ]
      };
      
      setDestination(destination);
      
      // Fetch related adventures for this destination
      const { data: adventureData, error: adventureError } = await supabase
        .from('adventures')
        .select('*')
        .eq('location', destinationData.name)
        .limit(6);
      
      if (adventureError) throw adventureError;
      
      // Transform the adventure data
      const adventures: Adventure[] = adventureData.map(item => ({
        id: item.id,
        name: item.name,
        type: item.type,
        duration: item.duration,
        difficulty: item.difficulty,
        rating: parseFloat(item.rating?.toString() || "0"),
        reviewCount: item.review_count || 0,
        price: parseFloat(item.price.toString()),
        image: item.image,
        location: item.location || "Mount Abu",
        status: item.status as 'active' | 'inactive',
        bookings: item.bookings || 0,
        slug: item.slug || ""
      }));
      
      setAdventures(adventures);
    } catch (error) {
      console.error("Error fetching destination details:", error);
    } finally {
      setLoading(false);
    }
  };

  return { destination, adventures, loading };
};
