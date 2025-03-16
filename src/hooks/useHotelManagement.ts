
import { useState } from "react";
import { useHotels } from "@/hooks/useHotels";
import { useHotelOperations } from "@/hooks/useHotelOperations";
import { useNewHotel } from "@/hooks/useNewHotel";
import { useHotelDialogManagement } from "@/hooks/useHotelDialogManagement";
import { useAuth } from "@/context/AuthContext";
import { useUserManagement } from "@/hooks/useUserManagement";
import { useNotifications } from "@/hooks/useNotifications";
import { useFavorites } from "@/hooks/useFavorites";
import { useToast } from "@/hooks/use-toast";

export const useHotelManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isMobileView, setIsMobileView] = useState(false);
  
  // Custom hooks to manage different aspects of the page
  const hotelsHook = useHotels();
  
  const {
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    handleAddHotel,
    handleEditHotel,
    handleDeleteHotel,
    confirmDelete,
    handleToggleStatus,
    handleToggleFeatured,
    handleBulkAction,
    handleCloneHotel
  } = useHotelOperations(hotelsHook.fetchHotels);

  const newHotelHook = useNewHotel();

  // Use our new custom hook for dialog management
  const dialogManagement = useHotelDialogManagement(
    hotelsHook.hotels, 
    newHotelHook.setNewHotel, 
    newHotelHook.resetNewHotel
  );

  const {
    users,
    canManageRoles,
    fetchUsers
  } = useUserManagement(user?.id);

  // Add notifications hook
  const notifications = useNotifications();

  // Add favorites hook
  const { favorites } = useFavorites(user);

  const onAddHotel = async () => {
    const success = await handleAddHotel(newHotelHook.newHotel);
    if (success) {
      newHotelHook.resetNewHotel();
      dialogManagement.setIsAddHotelOpen(false);
      // Add notification for new hotel
      notifications.addNotification({
        type: 'system',
        title: 'Hotel Added',
        message: `New hotel "${newHotelHook.newHotel.name}" has been successfully added.`
      });
      toast({
        title: "Hotel Added",
        description: `${newHotelHook.newHotel.name} has been added successfully.`,
      });
    }
  };

  const onEditHotel = async () => {
    if (!dialogManagement.selectedHotelId) return;
    
    try {
      const success = await handleEditHotel(dialogManagement.selectedHotelId, newHotelHook.newHotel);
      if (success) {
        dialogManagement.closeEditHotel();
        
        notifications.addNotification({
          type: 'system',
          title: 'Hotel Updated',
          message: `Hotel "${newHotelHook.newHotel.name}" has been successfully updated.`
        });
        
        toast({
          title: "Hotel Updated",
          description: `${newHotelHook.newHotel.name} has been updated successfully.`,
        });
        
        hotelsHook.fetchHotels();
      }
    } catch (error) {
      console.error("Error updating hotel:", error);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "There was an error updating the hotel.",
      });
    }
  };

  return {
    user,
    isMobileView,
    setIsMobileView,
    hotels: hotelsHook,
    operations: {
      isDeleteDialogOpen,
      setIsDeleteDialogOpen,
      handleAddHotel,
      handleEditHotel,
      handleDeleteHotel,
      confirmDelete,
      handleToggleStatus,
      handleToggleFeatured,
      handleBulkAction,
      handleCloneHotel,
      onAddHotel,
      onEditHotel
    },
    newHotel: newHotelHook,
    dialogs: dialogManagement,
    users: {
      users,
      canManageRoles,
      fetchUsers
    },
    notifications,
    favorites
  };
};
