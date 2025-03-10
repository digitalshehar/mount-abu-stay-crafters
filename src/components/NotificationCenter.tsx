
import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { useNotifications } from '@/context/NotificationContext';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const NotificationCenter = () => {
  const { notifications, markAsRead, clearNotifications, unreadCount } = useNotifications();
  const [open, setOpen] = useState(false);

  const handleMarkAllAsRead = () => {
    notifications.forEach((notification) => {
      if (!notification.read) {
        markAsRead(notification.id);
      }
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <span className="h-2 w-2 rounded-full bg-green-500"></span>;
      case 'warning':
        return <span className="h-2 w-2 rounded-full bg-yellow-500"></span>;
      case 'error':
        return <span className="h-2 w-2 rounded-full bg-red-500"></span>;
      default:
        return <span className="h-2 w-2 rounded-full bg-blue-500"></span>;
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost" className="relative">
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Notifications</h3>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleMarkAllAsRead}
              className="text-xs"
            >
              Mark all as read
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearNotifications}
              className="text-xs"
            >
              Clear all
            </Button>
          </div>
        </div>
        <Separator className="my-2" />
        {notifications.length === 0 ? (
          <div className="py-4 text-center text-sm text-muted-foreground">
            No notifications
          </div>
        ) : (
          <ScrollArea className="h-80">
            <div className="space-y-2">
              {notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-3 rounded-md ${notification.read ? 'bg-background' : 'bg-muted'}`}
                >
                  <div className="flex gap-2 items-start">
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{notification.message}</p>
                      <Button
                        variant="link"
                        size="sm"
                        className="p-0 h-auto text-xs opacity-70"
                        onClick={() => markAsRead(notification.id)}
                      >
                        {notification.read ? 'Read' : 'Mark as read'}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
