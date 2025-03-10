
import React, { useState, useEffect } from 'react';
import { Bell, Check, Trash2, X } from 'lucide-react';
import { 
  Sheet,
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Notification } from '@/context/NotificationContext';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface NotificationsPanelProps {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification?: (id: string) => void;
}

const NotificationType = {
  system: {
    color: "bg-blue-500",
    icon: Bell,
  },
  alert: {
    color: "bg-red-500",
    icon: Bell,
  },
  info: {
    color: "bg-green-500",
    icon: Bell,
  },
};

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({
  notifications,
  unreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
}) => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  
  const filteredNotifications = filter === "all" 
    ? notifications 
    : notifications.filter(n => !n.read);
  
  useEffect(() => {
    // When the panel closes, we can optionally auto-mark as read
    if (!open && unreadCount > 0) {
      // Uncomment the next line to auto-mark all as read when panel closes
      // markAllAsRead();
    }
  }, [open, unreadCount, markAllAsRead]);
  
  const handleMarkAllRead = () => {
    markAllAsRead();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {unreadCount} unread
              </Badge>
            )}
          </SheetTitle>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              disabled={unreadCount === 0}
              onClick={handleMarkAllRead}
            >
              <Check className="mr-2 h-3 w-3" />
              Mark all read
            </Button>
          </div>
        </SheetHeader>
        
        <div className="flex justify-between my-4">
          <Button 
            variant={filter === "all" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter("all")}
            className="w-full mr-2"
          >
            All
          </Button>
          <Button 
            variant={filter === "unread" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter("unread")}
            className="w-full ml-2"
          >
            Unread
          </Button>
        </div>
        
        <ScrollArea className="h-[calc(100vh-150px)] mt-4 pr-4">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              {filter === "all" ? "No notifications" : "No unread notifications"}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotifications.map((notification) => {
                // Ensure notification type is one of the allowed types
                const type = notification.type && 
                  (notification.type === "system" || 
                   notification.type === "alert" || 
                   notification.type === "info") 
                  ? notification.type 
                  : "system";
                
                const { icon: Icon, color } = NotificationType[type];
                const formattedDate = notification.createdAt 
                  ? format(new Date(notification.createdAt), 'MMM d, h:mm a')
                  : '';
              
                return (
                  <div 
                    key={notification.id} 
                    className={cn(
                      "p-4 rounded-lg border",
                      notification.read ? "bg-background" : "bg-muted"
                    )}
                  >
                    <div className="flex items-start">
                      <div className={cn("p-2 rounded-full mr-4", color)}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-sm">
                            {notification.title}
                          </h4>
                          <div className="flex items-center space-x-1">
                            {!notification.read && (
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-6 w-6" 
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check className="h-3 w-3" />
                              </Button>
                            )}
                            {deleteNotification && (
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-6 w-6 text-destructive"
                                onClick={() => deleteNotification(notification.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-sm mt-1 text-muted-foreground">
                          {notification.message}
                        </p>
                        
                        <div className="flex justify-between mt-2">
                          <span className="text-xs text-muted-foreground">
                            {formattedDate}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationsPanel;
