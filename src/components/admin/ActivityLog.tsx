
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Edit, Trash, Plus, Users } from "lucide-react";

const activities = [
  {
    action: "Created new hotel listing",
    user: "Admin",
    time: "10 minutes ago",
    icon: Plus,
  },
  {
    action: "Updated website settings",
    user: "Admin",
    time: "1 hour ago",
    icon: Edit,
  },
  {
    action: "Deleted old blog post",
    user: "Admin",
    time: "3 hours ago",
    icon: Trash,
  },
  {
    action: "Added new user account",
    user: "Admin",
    time: "Yesterday",
    icon: Users,
  },
  {
    action: "Updated booking system",
    user: "Admin",
    time: "2 days ago",
    icon: Calendar,
  },
];

const ActivityLog = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="bg-muted p-2 rounded-full">
                <activity.icon className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium text-sm">{activity.action}</p>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <span>{activity.user}</span>
                  <span className="mx-1">•</span>
                  <span>{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityLog;
