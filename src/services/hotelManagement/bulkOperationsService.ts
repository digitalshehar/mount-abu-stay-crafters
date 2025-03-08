
import { supabase } from "@/integrations/supabase/client";

// Bulk delete hotels
export const bulkDeleteHotels = async (hotelIds: number[]) => {
  // First delete seasonal pricing for all hotels
  await supabase.rpc('bulk_delete_seasonal_pricing', {
    p_hotel_ids: hotelIds
  });
  
  // Delete rooms for all hotels
  await supabase
    .from("rooms")
    .delete()
    .in("hotel_id", hotelIds);
  
  // Delete the hotels
  return supabase
    .from("hotels")
    .delete()
    .in("id", hotelIds);
};

// Bulk toggle hotel status
export const bulkToggleStatus = async (hotelIds: number[]) => {
  // Get current statuses
  const { data: hotels } = await supabase
    .from("hotels")
    .select("id, status")
    .in("id", hotelIds);
  
  // Group by current status
  const activeIds = hotels?.filter(h => h.status === "active").map(h => h.id) || [];
  const inactiveIds = hotels?.filter(h => h.status === "inactive").map(h => h.id) || [];
  
  // Update active to inactive
  if (activeIds.length > 0) {
    await supabase
      .from("hotels")
      .update({ status: "inactive" })
      .in("id", activeIds);
  }
  
  // Update inactive to active
  if (inactiveIds.length > 0) {
    await supabase
      .from("hotels")
      .update({ status: "active" })
      .in("id", inactiveIds);
  }
  
  return true;
};

// Bulk toggle featured status
export const bulkToggleFeatured = async (hotelIds: number[]) => {
  // Get current featured status
  const { data: hotels } = await supabase
    .from("hotels")
    .select("id, featured")
    .in("id", hotelIds);
  
  // Group by current featured status
  const featuredIds = hotels?.filter(h => h.featured).map(h => h.id) || [];
  const unfeaturedIds = hotels?.filter(h => !h.featured).map(h => h.id) || [];
  
  // Update featured to unfeatured
  if (featuredIds.length > 0) {
    await supabase
      .from("hotels")
      .update({ featured: false })
      .in("id", featuredIds);
  }
  
  // Update unfeatured to featured
  if (unfeaturedIds.length > 0) {
    await supabase
      .from("hotels")
      .update({ featured: true })
      .in("id", unfeaturedIds);
  }
  
  return true;
};
