
import React, { useState } from 'react';
import { Bell, AlertTriangle, Info, Check, Plus, AlertCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Notification } from '@/hooks/useNotifications';
import { useNotificationsContext } from '@/context/NotificationsContext';
import { formatDistanceToNow } from 'date-fns';

const NotificationsManager = () => {
  const { 
    notifications, 
    markAsRead, 
    markAllAsRead, 
    addNotification 
  } = useNotificationsContext();
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    type: 'system' as 'system' | 'alert' | 'info'
  });
  
  const unreadNotifications = notifications.filter(notif => !notif.read);
  const readNotifications = notifications.filter(notif => notif.read);
  
  const handleAddNotification = () => {
    if (newNotification.title && newNotification.message) {
      addNotification({
        title: newNotification.title,
        message: newNotification.message,
        type: newNotification.type
      });
      
      setNewNotification({
        title: '',
        message: '',
        type: 'system'
      });
      
      setIsAddDialogOpen(false);
    }
  };
  
  const getNotificationIcon = (type: 'system' | 'alert' | 'info') => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500 dark:text-blue-400" />;
      default:
        return <Bell className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <Card className="shadow-md animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Notifications Manager</CardTitle>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Notification
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="unread" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="unread">
              Unread
              {unreadNotifications.length > 0 && (
                <Badge className="ml-2" variant="secondary">
                  {unreadNotifications.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="all">All Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="unread">
            <ScrollArea className="h-[400px] w-full">
              {unreadNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                  <Check className="h-10 w-10 mb-2" />
                  <p>All caught up! No unread notifications.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {unreadNotifications.map((notification) => (
                    <div key={notification.id} className="p-4 border rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors">
                      <div className="flex gap-3">
                        <div className="mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-medium">{notification.title}</h4>
                            <Badge variant={
                              notification.type === 'alert' ? 'destructive' : 
                              notification.type === 'info' ? 'secondary' : 'default'
                            }>
                              {notification.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                          <div className="flex justify-between items-center text-xs text-muted-foreground">
                            <span>{formatDistanceToNow(notification.timestamp, { addSuffix: true })}</span>
                            <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                              Mark as read
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
            
            {unreadNotifications.length > 0 && (
              <div className="mt-4 flex justify-end">
                <Button variant="outline" onClick={markAllAsRead}>
                  Mark all as read
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="all">
            <ScrollArea className="h-[400px] w-full">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                  <AlertCircle className="h-10 w-10 mb-2" />
                  <p>No notifications yet.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 border rounded-lg transition-colors ${
                        notification.read ? 'bg-background' : 'bg-accent/10'
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className="mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-medium">{notification.title}</h4>
                            <Badge variant={
                              notification.type === 'alert' ? 'destructive' : 
                              notification.type === 'info' ? 'secondary' : 'default'
                            }>
                              {notification.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                          <div className="flex justify-between items-center text-xs text-muted-foreground">
                            <span>{formatDistanceToNow(notification.timestamp, { addSuffix: true })}</span>
                            {!notification.read && (
                              <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                                Mark as read
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Add Notification Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Notification</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                value={newNotification.title}
                onChange={(e) => setNewNotification({...newNotification, title: e.target.value})}
                placeholder="Notification title"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea
                id="message"
                value={newNotification.message}
                onChange={(e) => setNewNotification({...newNotification, message: e.target.value})}
                placeholder="Notification message"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium">
                Type
              </label>
              <Select
                value={newNotification.type}
                onValueChange={(value: 'system' | 'alert' | 'info') => 
                  setNewNotification({...newNotification, type: value})
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="alert">Alert</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddNotification}>
              Create Notification
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default NotificationsManager;
