
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { NewHotel } from "@/components/admin/hotels/types";
import { useToast } from "@/hooks/use-toast";

export const useHotelCreate = (fetchHotels: () => Promise<void>) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Function to add a new hotel
  const handleAddHotel = async (newHotel: NewHotel) => {
    setIsSubmitting(true);
    try {
      const slug = newHotel.name.toLowerCase().replace(/\s+/g, "-");

      const hotelData = {
        name: newHotel.name,
        slug: slug,
        location: newHotel.location,
        stars: newHotel.stars,
        price_per_night: newHotel.pricePerNight,
        image: newHotel.image,
        description: newHotel.description,
        amenities: newHotel.amenities,
        featured: newHotel.featured,
        gallery: Array.isArray(newHotel.gallery) ? newHotel.gallery : [],
        categories: newHotel.categories,
        status: "active" as const
      };

      const { data, error } = await supabase
        .from("hotels")
        .insert(hotelData)
        .select();

      if (error) {
        console.error("Error adding hotel:", error);
        toast({
          variant: "destructive",
          title: "Failed to Add Hotel",
          description: "There was an error adding the hotel.",
        });
        return false;
      }

      const hotelId = data?.[0]?.id;

      // Add rooms
      if (hotelId && newHotel.rooms && newHotel.rooms.length > 0) {
        const roomsPromises = newHotel.rooms.map(room => {
          return supabase.from("rooms").insert({
            hotel_id: hotelId,
            type: room.type,
            capacity: room.capacity,
            price: room.price,
            count: room.count,
            images: room.images || []
          });
        });

        await Promise.all(roomsPromises);
      }

      // Add seasonal pricing
      if (hotelId && newHotel.seasonalPricing && newHotel.seasonalPricing.length > 0) {
        const seasonalPricingPromises = newHotel.seasonalPricing.map(pricing => {
          return supabase.from("seasonal_pricing").insert({
            hotel_id: hotelId,
            name: pricing.name,
            start_date: pricing.startDate,
            end_date: pricing.endDate,
            price_multiplier: pricing.priceMultiplier
          });
        });

        await Promise.all(seasonalPricingPromises);
      }

      await fetchHotels();
      return true;
    } catch (error) {
      console.error("Error adding hotel:", error);
      toast({
        variant: "destructive",
        title: "Failed to Add Hotel",
        description: "There was an error adding the hotel.",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleAddHotel,
    isSubmitting
  };
};
