
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useHotelDelete = (fetchHotels: () => Promise<void>) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [hotelToDelete, setHotelToDelete] = useState<number | null>(null);
  const { toast } = useToast();

  // Function to handle deleting a hotel
  const handleDeleteHotel = (id: number) => {
    setHotelToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  // Function to confirm the deletion of a hotel
  const confirmDelete = async () => {
    if (!hotelToDelete) return;

    try {
      // Delete seasonal pricing
      await supabase.rpc('bulk_delete_seasonal_pricing', {
        p_hotel_ids: [hotelToDelete]
      });

      // Delete rooms
      await supabase
        .from("rooms")
        .delete()
        .eq("hotel_id", hotelToDelete);

      // Delete hotel
      const { error } = await supabase
        .from("hotels")
        .delete()
        .eq("id", hotelToDelete);

      if (error) {
        console.error("Error deleting hotel:", error);
        toast({
          variant: "destructive",
          title: "Failed to Delete Hotel",
          description: "There was an error deleting the hotel.",
        });
        return;
      }

      await fetchHotels();
      toast({
        title: "Hotel Deleted",
        description: "The hotel has been deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting hotel:", error);
      toast({
        variant: "destructive",
        title: "Failed to Delete Hotel",
        description: "There was an error deleting the hotel.",
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setHotelToDelete(null);
    }
  };

  return {
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    handleDeleteHotel,
    confirmDelete
  };
};
