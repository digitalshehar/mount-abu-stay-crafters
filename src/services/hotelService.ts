
import { supabase } from "@/integrations/supabase/client";
import { Hotel, NewHotel, SeasonalPrice } from "@/components/admin/hotels/types";

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
    gallery: newHotel.gallery,
    categories: newHotel.categories,
    status: "active",
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

// Add seasonal pricing for a hotel
export const addSeasonalPricing = async (hotelId: number, seasonalPricing: SeasonalPrice[]) => {
  if (!seasonalPricing?.length) return;
  
  const seasonalPricingPromises = seasonalPricing.map(season => {
    return supabase.rpc('insert_seasonal_pricing', {
      p_hotel_id: hotelId,
      p_name: season.name,
      p_start_date: season.startDate,
      p_end_date: season.endDate,
      p_price_multiplier: season.priceMultiplier
    });
  });
  
  return Promise.all(seasonalPricingPromises);
};

// Delete a hotel and all associated data
export const deleteHotel = async (hotelId: number) => {
  // Delete seasonal pricing
  await supabase.rpc('delete_seasonal_pricing_by_hotel', {
    p_hotel_id: hotelId
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
    .update({ status: newStatus })
    .eq("id", id);
};

// Update hotel featured status
export const updateHotelFeatured = async (id: number, currentValue: boolean) => {
  return supabase
    .from("hotels")
    .update({ featured: !currentValue })
    .eq("id", id);
};

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
      status: "inactive", // Default to inactive for review
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

// Perform bulk delete operation
export const bulkDeleteHotels = async (hotelIds: number[]) => {
  // First delete associated rooms and seasonal pricing for all hotels
  for (const id of hotelIds) {
    await supabase.rpc('delete_seasonal_pricing_by_hotel', {
      p_hotel_id: id
    });
      
    await supabase
      .from("rooms")
      .delete()
      .eq("hotel_id", id);
  }
  
  // Then delete the hotels
  return supabase
    .from("hotels")
    .delete()
    .in("id", hotelIds);
};

// Perform bulk status toggle operation
export const bulkToggleStatus = async (hotelIds: number[]) => {
  // Get current statuses
  const { data } = await supabase
    .from("hotels")
    .select("id, status")
    .in("id", hotelIds);
    
  if (!data) return;
  
  // Update each hotel with the opposite status
  const updatePromises = data.map(hotel => {
    const newStatus = hotel.status === "active" ? "inactive" : "active";
    return supabase
      .from("hotels")
      .update({ status: newStatus })
      .eq("id", hotel.id);
  });
  
  return Promise.all(updatePromises);
};

// Perform bulk featured toggle operation
export const bulkToggleFeatured = async (hotelIds: number[]) => {
  // Get current featured statuses
  const { data } = await supabase
    .from("hotels")
    .select("id, featured")
    .in("id", hotelIds);
    
  if (!data) return;
  
  // Update each hotel with the opposite featured status
  const updatePromises = data.map(hotel => {
    return supabase
      .from("hotels")
      .update({ featured: !hotel.featured })
      .eq("id", hotel.id);
  });
  
  return Promise.all(updatePromises);
};
