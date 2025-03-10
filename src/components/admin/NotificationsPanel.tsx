
import React, { useState, useEffect } from 'react';
import { Bell, Check, Trash2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Notification } from '@/context/NotificationContext';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface NotificationsPanelProps {
  notifications: Notification[];
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
  markAsRead,
  markAllAsRead,
  deleteNotification,
}) => {
  const [filter, setFilter] = useState<"all" | "unread">("all");
  
  const filteredNotifications = filter === "all" 
    ? notifications 
    : notifications.filter(n => !n.read);
  
  const handleMarkAllRead = () => {
    markAllAsRead();
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg border border-stone-200 overflow-hidden">
      <div className="p-4 border-b border-stone-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <h3 className="font-medium">Notifications</h3>
            {filteredNotifications.length > 0 && (
              <Badge variant="secondary">
                {filteredNotifications.filter(n => !n.read).length} unread
              </Badge>
            )}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            disabled={filteredNotifications.filter(n => !n.read).length === 0}
            onClick={handleMarkAllRead}
          >
            <Check className="mr-2 h-3 w-3" />
            Mark all read
          </Button>
        </div>
        
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
      </div>
      
      <ScrollArea className="h-[400px]">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            {filter === "all" ? "No notifications" : "No unread notifications"}
          </div>
        ) : (
          <div className="p-2 space-y-2">
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
    </div>
  );
};

export default NotificationsPanel;
