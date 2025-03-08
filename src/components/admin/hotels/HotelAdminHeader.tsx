
import React from "react";
import HotelManagementHeader from "@/components/admin/hotels/HotelManagementHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Heart } from "lucide-react";
import NotificationsPanel from "@/components/admin/NotificationsPanel";
import { useAuth } from "@/context/AuthContext";
import { Notification } from "@/hooks/useNotifications";

interface HotelAdminHeaderProps {
  onAddHotel: () => void;
  onOpenAuditLog: () => void;
  onOpenUserRoles: () => void;
  canManageRoles: boolean;
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  showFavoritesOnly: boolean;
  toggleFavoritesFilter: () => void;
  favorites: any[];
}

const HotelAdminHeader: React.FC<HotelAdminHeaderProps> = ({
  onAddHotel,
  onOpenAuditLog,
  onOpenUserRoles,
  canManageRoles,
  notifications,
  unreadCount,
  markAsRead,
  markAllAsRead,
  showFavoritesOnly,
  toggleFavoritesFilter,
  favorites
}) => {
  const { user } = useAuth();
  const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] = React.useState(false);

  return (
    <div className="flex items-center justify-between mb-6">
      <HotelManagementHeader 
        onAddHotel={onAddHotel}
        onOpenAuditLog={onOpenAuditLog}
        onOpenUserRoles={onOpenUserRoles}
        canManageRoles={canManageRoles}
      />
      
      {/* Notification Bell */}
      <div className="relative flex gap-2">
        {user && favorites.length > 0 && (
          <Button 
            variant={showFavoritesOnly ? "default" : "ghost"} 
            size="icon"
            className="relative"
            onClick={toggleFavoritesFilter}
          >
            <Heart className={showFavoritesOnly ? "fill-red-500" : ""} />
            <Badge 
              variant="secondary" 
              className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs"
            >
              {favorites.filter(f => f.item_type === 'hotel').length}
            </Badge>
          </Button>
        )}
        
        <Button 
          variant="ghost" 
          size="icon"
          className="relative"
          onClick={() => setIsNotificationsPanelOpen(prev => !prev)}
        >
          <Bell />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
        
        {/* Notifications panel - shown when button is clicked */}
        {isNotificationsPanelOpen && (
          <div className="absolute top-full right-0 mt-2 w-80 md:w-96 bg-white rounded-lg shadow-lg z-50">
            <NotificationsPanel 
              notifications={notifications}
              onMarkAsRead={markAsRead}
              onMarkAllAsRead={markAllAsRead}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelAdminHeader;
