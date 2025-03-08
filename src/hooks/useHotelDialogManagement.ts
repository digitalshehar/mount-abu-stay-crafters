
import { useState, useEffect } from "react";
import { Hotel, NewHotel } from "@/components/admin/hotels/types";

export const useHotelDialogManagement = (hotels: Hotel[], setNewHotel: (hotel: NewHotel) => void, resetNewHotel: () => void) => {
  const [isAddHotelOpen, setIsAddHotelOpen] = useState(false);
  const [isEditHotelOpen, setIsEditHotelOpen] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [isAuditLogOpen, setIsAuditLogOpen] = useState(false);
  const [isVersionHistoryOpen, setIsVersionHistoryOpen] = useState(false);
  const [isUserRolePanelOpen, setIsUserRolePanelOpen] = useState(false);
  const [selectedHotelId, setSelectedHotelId] = useState<number | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  // Set selected hotel when selectedHotelId changes
  useEffect(() => {
    if (selectedHotelId) {
      const hotel = hotels.find(h => h.id === selectedHotelId);
      if (hotel) {
        setSelectedHotel(hotel);
        // Convert the hotel to a format the form can handle
        setNewHotel({
          name: hotel.name,
          location: hotel.location,
          stars: hotel.stars,
          pricePerNight: hotel.pricePerNight,
          image: hotel.image,
          description: hotel.description || "",
          amenities: hotel.amenities || [],
          rooms: hotel.rooms || [],
          featured: hotel.featured || false,
          gallery: hotel.gallery || [],
          categories: hotel.categories || [],
          seasonalPricing: hotel.seasonalPricing || []
        });
      }
    }
  }, [selectedHotelId, hotels, setNewHotel]);

  const handleOpenEditHotel = (hotelId: number) => {
    setSelectedHotelId(hotelId);
    setIsEditHotelOpen(true);
  };

  const handleOpenAuditLog = (hotelId?: number) => {
    setSelectedHotelId(hotelId || null);
    setIsAuditLogOpen(true);
  };

  const handleOpenVersionHistory = (hotelId: number) => {
    setSelectedHotelId(hotelId);
    setIsVersionHistoryOpen(true);
  };

  const closeEditHotel = () => {
    setIsEditHotelOpen(false);
    resetNewHotel();
    setSelectedHotelId(null);
  };

  return {
    isAddHotelOpen,
    setIsAddHotelOpen,
    isEditHotelOpen,
    setIsEditHotelOpen,
    isFilterPanelOpen,
    setIsFilterPanelOpen,
    isAuditLogOpen,
    setIsAuditLogOpen,
    isVersionHistoryOpen,
    setIsVersionHistoryOpen,
    isUserRolePanelOpen,
    setIsUserRolePanelOpen,
    selectedHotelId,
    setSelectedHotelId,
    selectedHotel,
    handleOpenEditHotel,
    handleOpenAuditLog,
    handleOpenVersionHistory,
    closeEditHotel
  };
};
