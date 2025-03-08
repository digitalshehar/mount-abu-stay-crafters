
import { useState } from "react";
import { useHotelDelete } from "./hotelOperations/useHotelDelete";
import { useHotelStatus } from "./hotelOperations/useHotelStatus";
import { useHotelBulkActions } from "./hotelOperations/useHotelBulkActions";
import { useHotelClone } from "./hotelOperations/useHotelClone";
import { useHotelCreate } from "./hotelOperations/useHotelCreate";
import { useHotelUpdate } from "./hotelOperations/useHotelUpdate";
import { Hotel, NewHotel } from "@/components/admin/hotels/types";

export const useHotelOperations = (fetchHotels: () => Promise<void>) => {
  const { 
    isDeleteDialogOpen, 
    setIsDeleteDialogOpen, 
    handleDeleteHotel, 
    confirmDelete 
  } = useHotelDelete(fetchHotels);
  
  const { 
    handleToggleStatus, 
    handleToggleFeatured 
  } = useHotelStatus(fetchHotels);
  
  const { 
    handleBulkAction 
  } = useHotelBulkActions(fetchHotels);
  
  const { 
    handleCloneHotel, 
    isSubmitting: isCloneSubmitting 
  } = useHotelClone(fetchHotels);
  
  const { 
    handleAddHotel, 
    isSubmitting: isAddSubmitting 
  } = useHotelCreate(fetchHotels);
  
  const { 
    handleEditHotel, 
    isSubmitting: isEditSubmitting 
  } = useHotelUpdate(fetchHotels);

  const isSubmitting = isCloneSubmitting || isAddSubmitting || isEditSubmitting;

  return {
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
    isSubmitting
  };
};
