
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { NewHotel } from "@/components/admin/hotels/types";
import { useToast } from "@/hooks/use-toast";
import { addHotel, addRooms } from "@/services/hotelManagement/baseHotelService";

export const useHotelCreate = (fetchHotels: () => Promise<void>) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Function to add a new hotel
  const handleAddHotel = async (newHotel: NewHotel) => {
    setIsSubmitting(true);
    try {
      // Use the service function to add the hotel
      const hotelId = await addHotel(newHotel);

      if (!hotelId) {
        throw new Error("Failed to get hotel ID after creation");
      }

      // Add rooms
      if (newHotel.rooms && newHotel.rooms.length > 0) {
        await addRooms(hotelId, newHotel.rooms);
      }

      // Add seasonal pricing
      if (newHotel.seasonalPricing && newHotel.seasonalPricing.length > 0) {
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
      toast({
        title: "Hotel Added",
        description: `${newHotel.name} has been added successfully.`,
      });
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
