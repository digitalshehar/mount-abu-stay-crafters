
import { useState, useEffect } from "react";
import { Adventure } from "@/integrations/supabase/custom-types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const useAdventureDetails = (adventureSlug?: string) => {
  const [adventure, setAdventure] = useState<Adventure | null>(null);
  const [relatedAdventures, setRelatedAdventures] = useState<Adventure[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (adventureSlug) {
      fetchAdventureDetails();
    }
  }, [adventureSlug]);

  const fetchAdventureDetails = async () => {
    try {
      setLoading(true);
      
      // Fetch adventure by slug
      const { data: adventureData, error: adventureError } = await supabase
        .from('adventures')
        .select('*')
        .eq('slug', adventureSlug)
        .single();
      
      if (adventureError) throw adventureError;
      
      if (!adventureData) {
        setAdventure(null);
        setLoading(false);
        return;
      }
      
      // Transform data to match our Adventure interface
      const adventure: Adventure = {
        id: adventureData.id,
        name: adventureData.name,
        type: adventureData.type,
        duration: adventureData.duration,
        difficulty: adventureData.difficulty,
        price: parseFloat(adventureData.price.toString()),
        image: adventureData.image,
        bookings: adventureData.bookings || 0,
        rating: parseFloat(adventureData.rating?.toString() || "0"),
        status: adventureData.status as 'active' | 'inactive',
        description: adventureData.description || "",
        slug: adventureData.slug || "",
        location: adventureData.location || "Mount Abu",
        meetingPoint: adventureData.meeting_point || "Central Tourist Office",
        cancellationPolicy: adventureData.cancellation_policy || "Free cancellation up to 24 hours before the experience",
        maxGroupSize: adventureData.max_group_size || 12,
        minAge: adventureData.min_age || 10,
        includes: adventureData.includes || [
          "Professional guide",
          "Safety equipment",
          "Water bottle",
          "Snacks",
          "Photos of your experience"
        ],
        timeline: adventureData.timeline || [
          "8:00 AM - Meet at the starting point",
          "8:30 AM - Safety briefing and equipment check",
          "9:00 AM - Begin the adventure",
          "12:00 PM - Lunch break with stunning views",
          "3:00 PM - Return to meeting point"
        ],
        requirements: adventureData.requirements || [
          "Moderate fitness level",
          "Comfortable clothing and hiking shoes",
          "Sunscreen and hat",
          "Small backpack for personal items"
        ],
        reviewCount: adventureData.review_count || 0
      };
      
      setAdventure(adventure);
      
      // Fetch related adventures of the same type
      const { data: relatedData, error: relatedError } = await supabase
        .from('adventures')
        .select('*')
        .eq('type', adventureData.type)
        .neq('id', adventureData.id)
        .limit(3);
      
      if (relatedError) throw relatedError;
      
      // Transform related adventures data
      const relatedAdventures: Adventure[] = relatedData.map(item => ({
        id: item.id,
        name: item.name,
        type: item.type,
        duration: item.duration,
        difficulty: item.difficulty,
        price: parseFloat(item.price.toString()),
        image: item.image,
        bookings: item.bookings || 0,
        rating: parseFloat(item.rating?.toString() || "0"),
        status: item.status as 'active' | 'inactive',
        description: item.description || "",
        slug: item.slug || "",
        location: item.location || "Mount Abu",
        reviewCount: item.review_count || 0
      }));
      
      setRelatedAdventures(relatedAdventures);
    } catch (error) {
      console.error("Error fetching adventure details:", error);
      toast({
        title: "Error",
        description: "There was a problem loading the adventure details.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return { adventure, relatedAdventures, loading };
};
