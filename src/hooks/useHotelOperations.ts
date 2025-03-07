
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Hotel, NewHotel } from "@/components/admin/hotels/types";
import * as hotelService from "@/services/hotelService";

export const useHotelOperations = (fetchHotels: () => Promise<void>) => {
  const [selectedHotelId, setSelectedHotelId] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddHotel = async (newHotel: NewHotel) => {
    try {
      // Add the hotel and get the new ID
      const hotelId = await hotelService.addHotel(newHotel);
      
      if (hotelId) {
        // Add rooms
        await hotelService.addRooms(hotelId, newHotel.rooms);
        
        // Add seasonal pricing if any
        if (newHotel.seasonalPricing?.length) {
          await hotelService.addSeasonalPricing(hotelId, newHotel.seasonalPricing);
        }
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
      await hotelService.deleteHotel(selectedHotelId);

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
      await hotelService.updateHotelStatus(id, currentStatus);
      const newStatus = currentStatus === "active" ? "inactive" : "active";

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
      await hotelService.updateHotelFeatured(id, currentValue);

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
  
  const handleBulkAction = async (actionType: string, hotelIds: number[]) => {
    if (!hotelIds.length) return;
    
    try {
      switch (actionType) {
        case 'delete':
          await hotelService.bulkDeleteHotels(hotelIds);
          
          toast({
            title: "Hotels deleted",
            description: `${hotelIds.length} hotels have been deleted`,
          });
          break;
          
        case 'toggleStatus':
          await hotelService.bulkToggleStatus(hotelIds);
          
          toast({
            title: "Hotels updated",
            description: `Status changed for ${hotelIds.length} hotels`,
          });
          break;
          
        case 'toggleFeatured':
          await hotelService.bulkToggleFeatured(hotelIds);
          
          toast({
            title: "Hotels updated",
            description: `Featured status changed for ${hotelIds.length} hotels`,
          });
          break;
      }
      
      fetchHotels();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: `Error performing ${actionType}`,
        description: error.message,
      });
    }
  };
  
  const handleCloneHotel = async (hotel: Hotel) => {
    try {
      await hotelService.cloneHotel(hotel);
      
      toast({
        title: "Hotel cloned",
        description: `${hotel.name} has been successfully cloned`,
      });
      
      fetchHotels();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error cloning hotel",
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
    handleToggleFeatured,
    handleBulkAction,
    handleCloneHotel
  };
};
