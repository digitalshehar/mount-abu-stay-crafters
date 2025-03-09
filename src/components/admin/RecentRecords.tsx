
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Booking {
  name: string;
  hotel: string;
  date: string;
}

interface Hotel {
  name: string;
  bookings: number;
}

interface Activity {
  name: string;
  date: string;
  participants: number;
}

const RecentRecords = () => {
  const [recentBookings, setRecentBookings] = useState<Booking[]>([
    { name: "John Doe", hotel: "Hilltop Luxury Resort", date: "Yesterday" },
    { name: "Jane Smith", hotel: "Palace Heritage Hotel", date: "2 days ago" },
    { name: "Robert Brown", hotel: "Mountain View Cottages", date: "3 days ago" },
  ]);

  const [topHotels, setTopHotels] = useState<Hotel[]>([
    { name: "Hilltop Luxury Resort", bookings: 45 },
    { name: "Palace Heritage Hotel", bookings: 32 },
    { name: "Green Valley Resort", bookings: 28 },
  ]);

  useEffect(() => {
    // Fetch top hotels from Supabase
    const fetchTopHotels = async () => {
      try {
        const { data, error } = await supabase
          .from('hotels')
          .select('name, review_count')
          .order('review_count', { ascending: false })
          .limit(3);

        if (error) throw error;

        if (data && data.length > 0) {
          const formattedHotels = data.map(hotel => ({
            name: hotel.name,
            bookings: hotel.review_count || 0
          }));
          
          setTopHotels(formattedHotels);
        }
      } catch (error) {
        console.error("Error fetching top hotels:", error);
      }
    };

    fetchTopHotels();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentBookings.map((booking, index) => (
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
            {topHotels.map((hotel, index) => (
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
