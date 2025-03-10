
import { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { Notification } from "@/context/NotificationContext";

// Sample notifications for testing
const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "Welcome to Mount Abu Dashboard",
    message: "Explore the dashboard to manage your hotel and adventure listings.",
    type: "system",
    read: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "New Booking Request",
    message: "You have received a new booking request for Hotel Shikhar.",
    type: "alert",
    read: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "3",
    title: "System Maintenance",
    message: "Scheduled maintenance will be performed on June 15, 2023.",
    type: "info",
    read: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    const count = notifications.filter(notification => !notification.read).length;
    setUnreadCount(count);
  }, [notifications]);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  }, []);

  const deleteNotification = useCallback((id: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== id)
    );
  }, []);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => {
    const newNotification: Notification = {
      id: uuidv4(),
      ...notification,
      read: false,
      createdAt: new Date().toISOString(),
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  }, []);

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    addNotification,
  };
};
