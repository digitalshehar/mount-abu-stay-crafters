
import React from "react";
import { Bell, Check, X, Info, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Notification } from "@/hooks/useNotifications";
import { formatDistanceToNow } from "date-fns";

interface NotificationsPanelProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
}

interface NotificationItemProps {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: "system" | "alert" | "info";
  onMarkAsRead: (id: string) => void;
}

const NotificationIcon = ({ type }: { type: "system" | "alert" | "info" }) => {
  switch (type) {
    case "alert":
      return <AlertTriangle className="h-5 w-5 text-destructive" />;
    case "info":
      return <Info className="h-5 w-5 text-blue-500" />;
    default:
      return <Bell className="h-5 w-5 text-primary" />;
  }
};

const NotificationItem = ({
  id,
  title,
  message,
  timestamp,
  read,
  type,
  onMarkAsRead,
}: NotificationItemProps) => {
  return (
    <div className={`p-3 ${read ? "bg-white" : "bg-stone-50"} hover:bg-stone-100 transition-colors`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          <NotificationIcon type={type} />
        </div>
        <div className="flex-grow">
          <h4 className="font-medium text-sm">{title}</h4>
          <p className="text-stone-600 text-sm mt-1">{message}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-stone-500">
              {formatDistanceToNow(timestamp, { addSuffix: true })}
            </span>
            {!read && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 px-2 text-xs" 
                onClick={() => onMarkAsRead(id)}
              >
                Mark as read
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const EmptyNotifications = () => {
  return (
    <div className="py-8 text-center">
      <Bell className="h-8 w-8 text-stone-300 mx-auto mb-3" />
      <h4 className="text-stone-500 font-medium">No notifications</h4>
      <p className="text-stone-400 text-sm mt-1">You're all caught up!</p>
    </div>
  );
};

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ 
  notifications, 
  onMarkAsRead, 
  onMarkAllAsRead 
}) => {
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-stone-200 max-h-[80vh] flex flex-col">
      <div className="p-3 flex items-center justify-between bg-white border-b">
        <div>
          <h3 className="font-semibold">Notifications</h3>
          <p className="text-stone-500 text-xs">
            {unreadCount > 0 
              ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` 
              : 'No new notifications'}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 text-xs"
            onClick={onMarkAllAsRead}
          >
            <Check className="h-3 w-3 mr-1" />
            Mark all as read
          </Button>
        )}
      </div>
      
      <ScrollArea className="flex-grow max-h-[400px]">
        {notifications.length > 0 ? (
          <div className="divide-y divide-stone-100">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                id={notification.id}
                title={notification.title}
                message={notification.message}
                timestamp={notification.timestamp}
                read={notification.read}
                type={notification.type}
                onMarkAsRead={onMarkAsRead}
              />
            ))}
          </div>
        ) : (
          <EmptyNotifications />
        )}
      </ScrollArea>
      
      <div className="p-2 border-t bg-stone-50">
        <Button variant="ghost" size="sm" className="w-full text-stone-600 text-sm">
          View all notifications
        </Button>
      </div>
    </div>
  );
};

export default NotificationsPanel;
