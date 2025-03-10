import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useBookings } from "@/hooks/useBookings";
import { format, formatDistanceToNow } from "date-fns";

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
  const { recentBookings, loading: bookingsLoading } = useBookings();
  const [topHotels, setTopHotels] = useState<Hotel[]>([]);
  const [loadingHotels, setLoadingHotels] = useState(true);

  useEffect(() => {
    // Fetch top hotels from Supabase
    const fetchTopHotels = async () => {
      try {
        setLoadingHotels(true);
        
        // Using a simple select query
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
      } finally {
        setLoadingHotels(false);
      }
    };

    fetchTopHotels();
  }, []);

  // Format date as "Yesterday", "2 days ago", etc.
  const formatBookingDate = (dateString: string) => {
    if (!dateString) return "Unknown";
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bookingsLoading ? (
              <p className="text-sm text-muted-foreground">Loading bookings...</p>
            ) : recentBookings.length > 0 ? (
              recentBookings.map((booking, index) => (
                <div key={booking.id || index} className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">{booking.guest_name}</p>
                    <p className="text-xs text-muted-foreground">{booking.hotel_name || 'Unknown Hotel'}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatBookingDate(booking.created_at)}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No bookings found</p>
            )}
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
            {loadingHotels ? (
              <p className="text-sm text-muted-foreground">Loading hotels...</p>
            ) : topHotels.length > 0 ? (
              topHotels.map((hotel, index) => (
                <div key={index} className="flex justify-between items-center">
                  <p className="text-sm font-medium">{hotel.name}</p>
                  <p className="text-xs text-muted-foreground">{hotel.bookings} bookings</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No hotel data available</p>
            )}
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
