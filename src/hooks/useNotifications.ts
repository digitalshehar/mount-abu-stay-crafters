
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  type: string;
}

interface NotificationOptions {
  type: 'system' | 'alert' | 'update' | 'message';
  title: string;
  message: string;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  // Initialize with some demo notifications
  useEffect(() => {
    const demoNotifications: Notification[] = [
      {
        id: uuidv4(),
        title: 'New Booking',
        message: 'A new booking has been made for Hotel Grand.',
        read: false,
        createdAt: new Date().toISOString(),
        type: 'system'
      },
      {
        id: uuidv4(),
        title: 'Website Traffic',
        message: 'Website traffic increased by 25% this week.',
        read: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        type: 'update'
      },
      {
        id: uuidv4(),
        title: 'System Update',
        message: 'The system will undergo maintenance in 24 hours.',
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
        type: 'alert'
      }
    ];
    setNotifications(demoNotifications);
    updateUnreadCount(demoNotifications);
  }, []);

  const updateUnreadCount = (notifs: Notification[]) => {
    const count = notifs.filter(n => !n.read).length;
    setUnreadCount(count);
  };

  const markAsRead = (id: string) => {
    const updated = notifications.map(notification => 
      notification.id === id 
        ? { ...notification, read: true } 
        : notification
    );
    setNotifications(updated);
    updateUnreadCount(updated);
  };

  const markAllAsRead = () => {
    const updated = notifications.map(notification => ({ 
      ...notification, 
      read: true 
    }));
    setNotifications(updated);
    updateUnreadCount(updated);
  };

  const addNotification = (options: NotificationOptions) => {
    const newNotification: Notification = {
      id: uuidv4(),
      title: options.title,
      message: options.message,
      read: false,
      createdAt: new Date().toISOString(),
      type: options.type
    };
    
    const updated = [newNotification, ...notifications];
    setNotifications(updated);
    updateUnreadCount(updated);
    
    return newNotification;
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    addNotification
  };
};
