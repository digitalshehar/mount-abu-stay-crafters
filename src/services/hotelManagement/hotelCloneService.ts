
import { supabase } from "@/integrations/supabase/client";
import { Hotel } from "@/components/admin/hotels/types";
import { addRooms } from "./baseHotelService";
import { addSeasonalPricing } from "./seasonalPricingService";

// Clone a hotel
export const cloneHotel = async (hotel: Hotel) => {
  // Create a new name with (Copy) appended
  const newName = `${hotel.name} (Copy)`;
  const newSlug = `${hotel.slug}-copy-${Date.now().toString().slice(-4)}`;
  
  // Clone the hotel data
  const { data, error } = await supabase
    .from("hotels")
    .insert({
      name: newName,
      slug: newSlug,
      location: hotel.location,
      stars: hotel.stars,
      price_per_night: hotel.pricePerNight,
      image: hotel.image,
      description: hotel.description,
      amenities: hotel.amenities,
      featured: false, // Default to not featured for cloned hotels
      status: "inactive" as "active" | "inactive", // Default to inactive for review
      categories: hotel.categories || [],
      gallery: hotel.gallery || []
    })
    .select();
    
  if (error) throw error;
  
  if (!data?.[0]?.id) throw new Error("Failed to clone hotel");
  
  const newHotelId = data[0].id;
  
  // Clone the rooms if any
  if (hotel.rooms?.length) {
    await addRooms(newHotelId, hotel.rooms);
  }
  
  // Clone seasonal pricing if any
  if (hotel.seasonalPricing?.length) {
    await addSeasonalPricing(newHotelId, hotel.seasonalPricing);
  }
  
  return newHotelId;
};
