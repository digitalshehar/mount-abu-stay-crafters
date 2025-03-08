
import { useState } from "react";

export const useHotelDialogs = () => {
  const [isAddHotelOpen, setIsAddHotelOpen] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [isAuditLogOpen, setIsAuditLogOpen] = useState(false);
  const [isVersionHistoryOpen, setIsVersionHistoryOpen] = useState(false);
  const [isUserRolePanelOpen, setIsUserRolePanelOpen] = useState(false);
  const [selectedHotelId, setSelectedHotelId] = useState<number | null>(null);

  const handleOpenAuditLog = (hotelId?: number) => {
    setSelectedHotelId(hotelId || null);
    setIsAuditLogOpen(true);
  };

  const handleOpenVersionHistory = (hotelId: number) => {
    setSelectedHotelId(hotelId);
    setIsVersionHistoryOpen(true);
  };

  return {
    isAddHotelOpen,
    setIsAddHotelOpen,
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
    handleOpenAuditLog,
    handleOpenVersionHistory
  };
};
