
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Hotel } from "@/components/admin/hotels/types";

export const useHotelClone = (fetchHotels: () => Promise<void>) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Function to clone a hotel
  const handleCloneHotel = async (hotel: Hotel) => {
    setIsSubmitting(true);
    try {
      // Prepare the data for cloning
      const newHotelData = {
        name: `${hotel.name} (Clone)`,
        slug: `${hotel.slug}-clone`,
        location: hotel.location,
        stars: hotel.stars,
        price_per_night: hotel.pricePerNight,
        image: hotel.image,
        description: hotel.description || "",
        amenities: hotel.amenities || [],
        featured: hotel.featured || false,
        gallery: hotel.gallery || [],
        categories: hotel.categories || [],
        status: hotel.status
      };

      // Insert the cloned hotel
      const { data, error } = await supabase
        .from("hotels")
        .insert(newHotelData)
        .select();

      if (error) {
        console.error("Error cloning hotel:", error);
        toast({
          variant: "destructive",
          title: "Failed to Clone Hotel",
          description: "There was an error cloning the hotel.",
        });
        return;
      }

      const newHotelId = data?.[0]?.id;

      // Clone the rooms
      if (hotel.rooms && hotel.rooms.length > 0) {
        const newRooms = hotel.rooms.map(room => ({
          hotel_id: newHotelId,
          type: room.type,
          capacity: room.capacity,
          price: room.price,
          count: room.count,
          images: room.images || []
        }));

        const { error: roomsError } = await supabase
          .from("rooms")
          .insert(newRooms);

        if (roomsError) {
          console.error("Error cloning hotel rooms:", roomsError);
          toast({
            variant: "destructive",
            title: "Failed to Clone Hotel Rooms",
            description: "There was an error cloning the hotel rooms.",
          });
          return;
        }
      }

      // Clone the seasonal pricing
      const { data: seasonalPricing, error: seasonalPricingError } = await supabase
        .from("seasonal_pricing")
        .select('*')
        .eq('hotel_id', hotel.id);

      if (seasonalPricingError) {
        console.error("Error fetching seasonal pricing:", seasonalPricingError);
        toast({
          variant: "destructive",
          title: "Failed to Fetch Seasonal Pricing",
          description: "There was an error fetching the seasonal pricing.",
        });
        return;
      }

      if (seasonalPricing && seasonalPricing.length > 0) {
        const newSeasonalPricing = seasonalPricing.map(pricing => ({
          hotel_id: newHotelId,
          name: pricing.name,
          start_date: pricing.start_date,
          end_date: pricing.end_date,
          price_multiplier: pricing.price_multiplier
        }));

        const { error: newSeasonalPricingError } = await supabase
          .from("seasonal_pricing")
          .insert(newSeasonalPricing);

        if (newSeasonalPricingError) {
          console.error("Error cloning seasonal pricing:", newSeasonalPricingError);
          toast({
            variant: "destructive",
            title: "Failed to Clone Seasonal Pricing",
            description: "There was an error cloning the seasonal pricing.",
          });
          return;
        }
      }

      await fetchHotels();
      toast({
        title: "Hotel Cloned",
        description: "The hotel has been cloned successfully.",
      });
    } catch (error) {
      console.error("Error cloning hotel:", error);
      toast({
        variant: "destructive",
        title: "Failed to Clone Hotel",
        description: "There was an error cloning the hotel.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleCloneHotel,
    isSubmitting
  };
};
