
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: 'system' | 'alert' | 'info';
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Initialize with some example notifications
  useEffect(() => {
    const initialNotifications: Notification[] = [
      {
        id: uuidv4(),
        title: 'New Hotel Added',
        message: 'The Grand Hotel has been successfully added to the system.',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        read: false,
        type: 'system'
      },
      {
        id: uuidv4(),
        title: 'System Maintenance',
        message: 'The system will undergo maintenance on Sunday at 2 AM.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        read: true,
        type: 'info'
      },
      {
        id: uuidv4(),
        title: 'Booking Alert',
        message: 'There are 5 pending bookings that require your attention.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        read: false,
        type: 'alert'
      }
    ];

    setNotifications(initialNotifications);
  }, []);

  // Update unread count whenever notifications change
  useEffect(() => {
    const count = notifications.filter(notification => !notification.read).length;
    setUnreadCount(count);
  }, [notifications]);

  // Mark a specific notification as read
  const markAsRead = (id: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
  };

  // Add a new notification
  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      id: uuidv4(),
      ...notification,
      timestamp: new Date(),
      read: false
    };

    setNotifications(prevNotifications => [newNotification, ...prevNotifications]);
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    addNotification
  };
};
