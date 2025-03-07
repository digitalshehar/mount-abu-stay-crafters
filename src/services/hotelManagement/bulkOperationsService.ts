import { supabase } from "@/integrations/supabase/client";

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
