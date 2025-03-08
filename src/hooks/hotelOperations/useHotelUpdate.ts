
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { NewHotel } from "@/components/admin/hotels/types";
import { useToast } from "@/hooks/use-toast";

export const useHotelUpdate = (fetchHotels: () => Promise<void>) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Function to handle editing an existing hotel
  const handleEditHotel = async (hotelId: number, hotel: NewHotel) => {
    setIsSubmitting(true);
    try {
      const slug = hotel.name.toLowerCase().replace(/\s+/g, "-");

      const hotelData = {
        name: hotel.name,
        slug: slug,
        location: hotel.location,
        stars: hotel.stars,
        price_per_night: hotel.pricePerNight,
        image: hotel.image,
        description: hotel.description,
        amenities: hotel.amenities,
        featured: hotel.featured,
        gallery: Array.isArray(hotel.gallery) ? hotel.gallery : [],
        categories: hotel.categories,
      };

      const { error } = await supabase
        .from("hotels")
        .update(hotelData)
        .eq("id", hotelId);

      if (error) {
        console.error("Error updating hotel:", error);
        toast({
          variant: "destructive",
          title: "Failed to Update Hotel",
          description: "There was an error updating the hotel.",
        });
        return false;
      }

      // Update rooms
      // First delete existing rooms
      await supabase
        .from("rooms")
        .delete()
        .eq("hotel_id", hotelId);

      // Then add the new/updated rooms
      const roomsPromises = hotel.rooms.map(room => {
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

      // Update seasonal pricing
      // First delete existing seasonal pricing
      await supabase
        .from("seasonal_pricing")
        .delete()
        .eq("hotel_id", hotelId);

      // Then add the new/updated seasonal pricing
      if (hotel.seasonalPricing && hotel.seasonalPricing.length > 0) {
        const seasonalPricingPromises = hotel.seasonalPricing.map(pricing => {
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

      return true;
    } catch (error) {
      console.error("Error updating hotel:", error);
      toast({
        variant: "destructive",
        title: "Failed to Update Hotel",
        description: "There was an error updating the hotel.",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleEditHotel,
    isSubmitting
  };
};
