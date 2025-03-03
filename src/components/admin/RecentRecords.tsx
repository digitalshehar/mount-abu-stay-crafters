
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users } from "lucide-react";

const RecentRecords = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "John Doe", hotel: "Hilltop Luxury Resort", date: "Yesterday" },
              { name: "Jane Smith", hotel: "Palace Heritage Hotel", date: "2 days ago" },
              { name: "Robert Brown", hotel: "Mountain View Cottages", date: "3 days ago" },
            ].map((booking, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">{booking.name}</p>
                  <p className="text-xs text-muted-foreground">{booking.hotel}</p>
                </div>
                <div className="text-xs text-muted-foreground">{booking.date}</div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <button className="text-primary text-sm">View all</button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Top Hotels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Hilltop Luxury Resort", bookings: 45 },
              { name: "Palace Heritage Hotel", bookings: 32 },
              { name: "Green Valley Resort", bookings: 28 },
            ].map((hotel, index) => (
              <div key={index} className="flex justify-between items-center">
                <p className="text-sm font-medium">{hotel.name}</p>
                <p className="text-xs text-muted-foreground">{hotel.bookings} bookings</p>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <button className="text-primary text-sm">View all</button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Nakki Lake Trek", date: "Aug 15", participants: 12 },
              { name: "Wildlife Safari", date: "Aug 18", participants: 8 },
              { name: "Sunset Point Tour", date: "Aug 20", participants: 15 },
            ].map((activity, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">{activity.name}</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">{activity.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">{activity.participants}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <button className="text-primary text-sm">View all</button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RecentRecords;
