
import { supabase } from "@/integrations/supabase/client";
import { NewHotel } from "@/components/admin/hotels/types";

// Add a new hotel
export const addHotel = async (newHotel: NewHotel) => {
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

  if (error) throw error;
  return data?.[0]?.id;
};

// Add rooms for a hotel
export const addRooms = async (hotelId: number, rooms: NewHotel['rooms']) => {
  const roomsPromises = rooms.map(room => {
    return supabase.from("rooms").insert({
      hotel_id: hotelId,
      type: room.type,
      capacity: room.capacity,
      price: room.price,
      count: room.count
    });
  });
  
  return Promise.all(roomsPromises);
};

// Delete a hotel and all associated data
export const deleteHotel = async (hotelId: number) => {
  // Delete seasonal pricing
  await supabase.rpc('delete_seasonal_pricing_by_hotel', {
    p_hotel_id: hotelId
  } as any); // Use type assertion to bypass type checking for RPC parameters

  // Delete rooms
  await supabase
    .from("rooms")
    .delete()
    .eq("hotel_id", hotelId);

  // Delete hotel
  return supabase
    .from("hotels")
    .delete()
    .eq("id", hotelId);
};

// Update hotel status
export const updateHotelStatus = async (id: number, currentStatus: string) => {
  const newStatus = currentStatus === "active" ? "inactive" : "active";

  return supabase
    .from("hotels")
    .update({ status: newStatus as "active" | "inactive" })
    .eq("id", id);
};

// Update hotel featured status
export const updateHotelFeatured = async (id: number, currentValue: boolean) => {
  return supabase
    .from("hotels")
    .update({ featured: !currentValue })
    .eq("id", id);
};
