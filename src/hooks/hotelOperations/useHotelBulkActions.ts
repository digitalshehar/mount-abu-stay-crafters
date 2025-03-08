
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useHotelBulkActions = (fetchHotels: () => Promise<void>) => {
  const { toast } = useToast();

  // Function to handle bulk actions on selected hotels
  const handleBulkAction = async (actionType: string, hotelIds: number[]) => {
    if (hotelIds.length === 0) return;

    try {
      switch (actionType) {
        case 'delete':
          // Delete seasonal pricing
          await supabase.rpc('bulk_delete_seasonal_pricing', {
            p_hotel_ids: hotelIds
          });

          // Delete rooms
          await supabase
            .from("rooms")
            .delete()
            .in("hotel_id", hotelIds);

          // Delete hotels
          for (const id of hotelIds) {
            await supabase
              .from("hotels")
              .delete()
              .eq("id", id);
          }

          toast({
            title: "Hotels Deleted",
            description: "The selected hotels have been deleted successfully.",
          });
          break;

        case 'toggleStatus':
          // Fetch current statuses
          const { data: currentHotels, error: fetchError } = await supabase
            .from('hotels')
            .select('id, status')
            .in('id', hotelIds);

          if (fetchError) {
            console.error("Error fetching hotel statuses:", fetchError);
            toast({
              variant: "destructive",
              title: "Failed to Bulk Toggle Status",
              description: "There was an error fetching the hotel statuses.",
            });
            return;
          }

          // Update each hotel individually
          for (const hotel of currentHotels) {
            const newStatus = hotel.status === 'active' ? 'inactive' : 'active';
            await supabase
              .from('hotels')
              .update({ status: newStatus })
              .eq('id', hotel.id);
          }

          toast({
            title: "Hotel Statuses Updated",
            description: "The selected hotel statuses have been updated successfully.",
          });
          break;

        case 'toggleFeatured':
          // Fetch current featured statuses
          const { data: currentFeaturedHotels, error: fetchFeaturedError } = await supabase
            .from('hotels')
            .select('id, featured')
            .in('id', hotelIds);

          if (fetchFeaturedError) {
            console.error("Error fetching hotel featured statuses:", fetchFeaturedError);
            toast({
              variant: "destructive",
              title: "Failed to Bulk Toggle Featured",
              description: "There was an error fetching the hotel featured statuses.",
            });
            return;
          }

          // Update each hotel individually
          for (const hotel of currentFeaturedHotels) {
            await supabase
              .from('hotels')
              .update({ featured: !hotel.featured })
              .eq('id', hotel.id);
          }

          toast({
            title: "Hotel Featured Statuses Updated",
            description: "The selected hotel featured statuses have been updated successfully.",
          });
          break;

        default:
          console.warn("Unknown bulk action type:", actionType);
          return;
      }

      await fetchHotels();
    } catch (error) {
      console.error("Error performing bulk action:", error);
      toast({
        variant: "destructive",
        title: "Failed to Perform Bulk Action",
        description: "There was an error performing the bulk action.",
      });
    }
  };

  return {
    handleBulkAction
  };
};
