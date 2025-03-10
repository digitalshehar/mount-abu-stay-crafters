
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hotel, CreditCard, Users, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface BookingStats {
  totalBookings: number;
  totalRevenue: number;
  activeUsers: number;
  popularDestination: string;
  bookingGrowth: number;
  revenueGrowth: number;
  userGrowth: number;
  popularDestinationPercentage: number;
}

const DashboardStats = () => {
  const [stats, setStats] = useState<BookingStats>({
    totalBookings: 0,
    totalRevenue: 0,
    activeUsers: 0,
    popularDestination: "Loading...",
    bookingGrowth: 0,
    revenueGrowth: 0,
    userGrowth: 0,
    popularDestinationPercentage: 0
  });

  useEffect(() => {
    // Fetch booking stats from Supabase
    const fetchBookingStats = async () => {
      try {
        console.log("Fetching booking stats...");
        
        // Fetch hotels with bookings data
        const { data: hotels, error: hotelsError } = await supabase
          .from('hotels')
          .select('id, name, review_count, price_per_night');
          
        if (hotelsError) throw hotelsError;
        
        // Fetch users count
        const { count: userCount, error: userError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
          
        if (userError) throw userError;
        
        // Calculate booking stats
        if (hotels && hotels.length > 0) {
          const totalBookings = hotels.reduce((acc, hotel) => acc + (hotel.review_count || 0), 0);
          const totalRevenue = hotels.reduce((acc, hotel) => 
            acc + ((hotel.price_per_night || 0) * (hotel.review_count || 0)), 0);
            
          // Find most popular hotel
          let popularHotel = hotels[0];
          for (const hotel of hotels) {
            if ((hotel.review_count || 0) > (popularHotel.review_count || 0)) {
              popularHotel = hotel;
            }
          }
          
          // Update stats with real data
          setStats({
            totalBookings,
            totalRevenue,
            activeUsers: userCount || 0,
            popularDestination: popularHotel.name || "Nakki Lake",
            bookingGrowth: 20.1, // placeholder
            revenueGrowth: 15.3, // placeholder
            userGrowth: 10.5, // placeholder
            popularDestinationPercentage: totalBookings > 0 
              ? Math.round(((popularHotel.review_count || 0) / totalBookings) * 100) 
              : 0
          });
        }
      } catch (error) {
        console.error("Error fetching booking stats:", error);
      }
    };

    fetchBookingStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
          <Hotel className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalBookings}</div>
          <p className="text-xs text-muted-foreground">+{stats.bookingGrowth}% from last month</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ₹{stats.totalRevenue.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-muted-foreground">+{stats.revenueGrowth}% from last month</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeUsers}</div>
          <p className="text-xs text-muted-foreground">+{stats.userGrowth}% from last month</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Popular Destination</CardTitle>
          <MapPin className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.popularDestination}</div>
          <p className="text-xs text-muted-foreground">{stats.popularDestinationPercentage}% of all bookings</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
