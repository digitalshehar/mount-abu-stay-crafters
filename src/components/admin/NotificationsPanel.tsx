import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, MessageSquare, Calendar, AlertCircle, Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const notifications = [
  {
    id: 1,
    type: "alert",
    title: "Low inventory alert",
    message: "Some hotel rooms are running low on availability for next week",
    time: "10 minutes ago",
    read: false,
  },
  {
    id: 2,
    type: "message",
    title: "New customer inquiry",
    message: "John Doe has sent a message about booking details",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    type: "system",
    title: "System update completed",
    message: "The website has been updated to the latest version",
    time: "2 hours ago",
    read: true,
  },
  {
    id: 4,
    type: "alert",
    title: "Payment processing error",
    message: "There was an issue processing the latest transaction",
    time: "Yesterday",
    read: true,
  },
  {
    id: 5,
    type: "message",
    title: "Feedback received",
    message: "A customer has left a 5-star review for their stay",
    time: "2 days ago",
    read: true,
  },
];

const NotificationsPanel = () => {
  const [userNotifications, setUserNotifications] = useState(notifications);
  
  const markAllAsRead = () => {
    setUserNotifications(
      userNotifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const markAsRead = (id: number) => {
    setUserNotifications(
      userNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-4 w-4" />;
      case "alert":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const unreadCount = userNotifications.filter((n) => !n.read).length;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Notifications</CardTitle>
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
            Mark all as read
          </Button>
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary ml-2 text-xs text-white">
            {unreadCount}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4 max-h-[300px] overflow-y-auto">
            {userNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 border rounded-md ${
                  !notification.read ? "bg-muted/50" : ""
                }`}
              >
                <div className="flex items-start">
                  <div className={`p-2 rounded-full mr-3 ${
                    notification.type === 'alert' ? 'bg-red-100' : 
                    notification.type === 'message' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{notification.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 text-xs"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="h-3 w-3 mr-1" />
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="unread">
            {userNotifications.filter(n => !n.read).length > 0 ? (
              <div className="space-y-4 max-h-[300px] overflow-y-auto">
                {userNotifications
                  .filter((n) => !n.read)
                  .map((notification) => (
                    // Similar notification display as above
                    <div key={notification.id} className="p-3 border rounded-md bg-muted/50">
                      {/* Keep the same structure as above */}
                      <div className="flex items-start">
                        <div className={`p-2 rounded-full mr-3 ${
                          notification.type === 'alert' ? 'bg-red-100' : 
                          notification.type === 'message' ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 text-xs"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="h-3 w-3 mr-1" />
                              Mark as read
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                No unread notifications
              </div>
            )}
          </TabsContent>
          <TabsContent value="alerts">
            {userNotifications.filter(n => n.type === 'alert').length > 0 ? (
              <div className="space-y-4 max-h-[300px] overflow-y-auto">
                {userNotifications
                  .filter((n) => n.type === 'alert')
                  .map((notification) => (
                    // Similar notification display as above
                    <div
                      key={notification.id}
                      className={`p-3 border rounded-md ${
                        !notification.read ? "bg-muted/50" : ""
                      }`}
                    >
                      {/* Keep the same structure as above */}
                      <div className="flex items-start">
                        <div className="p-2 rounded-full mr-3 bg-red-100">
                          <AlertCircle className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 text-xs"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check className="h-3 w-3 mr-1" />
                                Mark as read
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                No alert notifications
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">View All Notifications</Button>
      </CardFooter>
    </Card>
  );
};

export default NotificationsPanel;
