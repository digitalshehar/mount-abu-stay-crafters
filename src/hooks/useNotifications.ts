
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface Notification {
  id: number;
  type: 'alert' | 'message' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Mock data for now - in a real app, these would come from an API/database
  useEffect(() => {
    // Simulating fetching notifications
    const mockNotifications: Notification[] = [
      {
        id: 1,
        type: 'alert',
        title: 'Low inventory alert',
        message: 'Some hotel rooms are running low on availability for next week',
        time: '10 minutes ago',
        read: false,
      },
      {
        id: 2,
        type: 'message',
        title: 'New customer inquiry',
        message: 'John Doe has sent a message about booking details',
        time: '1 hour ago',
        read: false,
      },
      {
        id: 3,
        type: 'system',
        title: 'System update completed',
        message: 'The website has been updated to the latest version',
        time: '2 hours ago',
        read: true,
      },
      {
        id: 4,
        type: 'alert',
        title: 'Payment processing error',
        message: 'There was an issue processing the latest transaction',
        time: 'Yesterday',
        read: true,
      },
      {
        id: 5,
        type: 'message',
        title: 'Feedback received',
        message: 'A customer has left a 5-star review for their stay',
        time: '2 days ago',
        read: true,
      },
    ];
    
    setNotifications(mockNotifications);
  }, []);

  // Update unread count whenever notifications change
  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [notifications]);

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'time' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now(),
      time: 'Just now',
      read: false,
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Also show a toast for immediate visibility
    toast(notification.title, {
      description: notification.message,
    });
    
    return newNotification.id;
  };

  const dismissNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    addNotification,
    dismissNotification
  };
};
