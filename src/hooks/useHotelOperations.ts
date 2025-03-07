
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { NewHotel } from "@/components/admin/hotels/types";

export const useHotelOperations = (fetchHotels: () => Promise<void>) => {
  const [selectedHotelId, setSelectedHotelId] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddHotel = async (newHotel: NewHotel) => {
    try {
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
        status: "active",
      };

      const { data, error } = await supabase
        .from("hotels")
        .insert(hotelData)
        .select();

      if (error) throw error;

      if (data && data[0]?.id) {
        const hotelId = data[0].id;
        
        const roomsPromises = newHotel.rooms.map(room => {
          return supabase.from("rooms").insert({
            hotel_id: hotelId,
            type: room.type,
            capacity: room.capacity,
            price: room.price,
            count: room.count
          });
        });
        
        await Promise.all(roomsPromises);
      }

      toast({
        title: "Hotel added",
        description: "The hotel has been added successfully",
      });

      fetchHotels();
      return true;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error adding hotel",
        description: error.message,
      });
      return false;
    }
  };

  const handleDeleteHotel = (id: number) => {
    setSelectedHotelId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedHotelId) return;

    try {
      const { error: roomsError } = await supabase
        .from("rooms")
        .delete()
        .eq("hotel_id", selectedHotelId);

      if (roomsError) throw roomsError;

      const { error } = await supabase
        .from("hotels")
        .delete()
        .eq("id", selectedHotelId);

      if (error) throw error;

      toast({
        title: "Hotel deleted",
        description: "The hotel has been deleted successfully",
      });

      fetchHotels();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error deleting hotel",
        description: error.message,
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setSelectedHotelId(null);
    }
  };

  const handleToggleStatus = async (id: number, currentStatus: string) => {
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";

      const { error } = await supabase
        .from("hotels")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Hotel updated",
        description: `Hotel status changed to ${newStatus}`,
      });

      fetchHotels();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error updating hotel",
        description: error.message,
      });
    }
  };

  const handleToggleFeatured = async (id: number, currentValue: boolean) => {
    try {
      const { error } = await supabase
        .from("hotels")
        .update({ featured: !currentValue })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Hotel updated",
        description: currentValue 
          ? "Hotel removed from featured list" 
          : "Hotel added to featured list",
      });

      fetchHotels();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error updating hotel",
        description: error.message,
      });
    }
  };

  return {
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    selectedHotelId,
    handleAddHotel,
    handleDeleteHotel,
    confirmDelete,
    handleToggleStatus,
    handleToggleFeatured
  };
};
