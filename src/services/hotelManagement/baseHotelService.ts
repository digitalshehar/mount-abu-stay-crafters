
import { supabase } from "@/integrations/supabase/client";
import { NewHotel, Room } from "@/components/admin/hotels/types";

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

// Update an existing hotel
export const updateHotel = async (hotelId: number, hotel: NewHotel) => {
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

  if (error) throw error;
  return true;
};

// Add rooms for a hotel
export const addRooms = async (hotelId: number, rooms: NewHotel['rooms']) => {
  const roomsPromises = rooms.map(room => {
    return supabase.from("rooms").insert({
      hotel_id: hotelId,
      type: room.type,
      capacity: room.capacity,
      price: room.price,
      count: room.count,
      images: room.images || []
    });
  });
  
  return Promise.all(roomsPromises);
};

// Update rooms for a hotel
export const updateRooms = async (hotelId: number, rooms: NewHotel['rooms']) => {
  // First delete existing rooms
  await supabase
    .from("rooms")
    .delete()
    .eq("hotel_id", hotelId);
    
  // Then add the new/updated rooms
  return addRooms(hotelId, rooms);
};

// Delete a hotel and all associated data
export const deleteHotel = async (hotelId: number) => {
  // Delete seasonal pricing
  await supabase.rpc('bulk_delete_seasonal_pricing', {
    p_hotel_ids: [hotelId]
  });

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
