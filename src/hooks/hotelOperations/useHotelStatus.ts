
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useHotelStatus = (fetchHotels: () => Promise<void>) => {
  const { toast } = useToast();

  // Function to toggle the status of a hotel
  const handleToggleStatus = async (id: number, currentStatus: string) => {
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";

      const { error } = await supabase
        .from("hotels")
        .update({ status: newStatus as "active" | "inactive" })
        .eq("id", id);

      if (error) {
        console.error("Error toggling hotel status:", error);
        toast({
          variant: "destructive",
          title: "Failed to Toggle Status",
          description: "There was an error toggling the hotel status.",
        });
        return;
      }

      await fetchHotels();
      toast({
        title: "Hotel Status Updated",
        description: "The hotel status has been updated successfully.",
      });
    } catch (error) {
      console.error("Error toggling hotel status:", error);
      toast({
        variant: "destructive",
        title: "Failed to Toggle Status",
        description: "There was an error toggling the hotel status.",
      });
    }
  };

  // Function to toggle the featured status of a hotel
  const handleToggleFeatured = async (id: number, currentValue: boolean) => {
    try {
      const { error } = await supabase
        .from("hotels")
        .update({ featured: !currentValue })
        .eq("id", id);

      if (error) {
        console.error("Error toggling hotel featured status:", error);
        toast({
          variant: "destructive",
          title: "Failed to Toggle Featured",
          description: "There was an error toggling the hotel featured status.",
        });
        return;
      }

      await fetchHotels();
      toast({
        title: "Hotel Featured Status Updated",
        description: "The hotel featured status has been updated successfully.",
      });
    } catch (error) {
      console.error("Error toggling hotel featured status:", error);
      toast({
        variant: "destructive",
        title: "Failed to Toggle Featured",
        description: "There was an error toggling the hotel featured status.",
      });
    }
  };

  return {
    handleToggleStatus,
    handleToggleFeatured
  };
};
