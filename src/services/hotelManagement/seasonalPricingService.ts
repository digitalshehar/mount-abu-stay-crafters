
import { supabase } from "@/integrations/supabase/client";
import { SeasonalPrice } from "@/components/admin/hotels/types";

// Add seasonal pricing for a hotel
export const addSeasonalPricing = async (hotelId: number, seasonalPricing: SeasonalPrice[]) => {
  if (!seasonalPricing?.length) return;
  
  const seasonalPricingPromises = seasonalPricing.map(season => {
    return supabase
      .from("seasonal_pricing")
      .insert({
        hotel_id: hotelId,
        name: season.name,
        start_date: season.startDate,
        end_date: season.endDate,
        price_multiplier: season.priceMultiplier
      });
  });
  
  return Promise.all(seasonalPricingPromises);
};

// Get seasonal pricing for a hotel
export const getSeasonalPricing = async (hotelId: number) => {
  const { data, error } = await supabase
    .from("seasonal_pricing")
    .select("*")
    .eq("hotel_id", hotelId);
    
  if (error) throw error;
  return data;
};

// Update seasonal pricing
export const updateSeasonalPricing = async (id: number, updates: Partial<SeasonalPrice>) => {
  const { data, error } = await supabase
    .from("seasonal_pricing")
    .update(updates)
    .eq("id", id)
    .select();
    
  if (error) throw error;
  return data;
};

// Delete seasonal pricing
export const deleteSeasonalPricing = async (id: number) => {
  const { error } = await supabase
    .from("seasonal_pricing")
    .delete()
    .eq("id", id);
    
  if (error) throw error;
  return true;
};
