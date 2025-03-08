
import { supabase } from "@/integrations/supabase/client";

// Bulk delete hotels
export const bulkDeleteHotels = async (hotelIds: number[]) => {
  // First delete all related data using an RPC function
  await supabase.rpc('bulk_delete_hotel_related_data', {
    p_hotel_ids: hotelIds
  } as any); // Using type assertion to bypass TypeScript's strict typing
  
  // Then delete the hotels themselves
  return supabase
    .from("hotels")
    .delete()
    .in("id", hotelIds);
};

// Bulk toggle status
export const bulkToggleStatus = async (hotelIds: number[]) => {
  // We need to first get the current status of each hotel
  const { data: hotels } = await supabase
    .from("hotels")
    .select("id, status")
    .in("id", hotelIds);
  
  if (!hotels || !hotels.length) return;
  
  // Prepare the updates (toggle each hotel's status)
  const updates = hotels.map(hotel => {
    return supabase
      .from("hotels")
      .update({ status: hotel.status === "active" ? "inactive" : "active" })
      .eq("id", hotel.id);
  });
  
  return Promise.all(updates);
};

// Bulk toggle featured
export const bulkToggleFeatured = async (hotelIds: number[]) => {
  // Get current featured status for each hotel
  const { data: hotels } = await supabase
    .from("hotels")
    .select("id, featured")
    .in("id", hotelIds);
  
  if (!hotels || !hotels.length) return;
  
  // Prepare updates (toggle each hotel's featured status)
  const updates = hotels.map(hotel => {
    return supabase
      .from("hotels")
      .update({ featured: !hotel.featured })
      .eq("id", hotel.id);
  });
  
  return Promise.all(updates);
};
