
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
    totalBookings: 435,
    totalRevenue: 345678,
    activeUsers: 892,
    popularDestination: "Nakki Lake",
    bookingGrowth: 20.1,
    revenueGrowth: 15.3,
    userGrowth: 10.5,
    popularDestinationPercentage: 30
  });

  useEffect(() => {
    // Fetch booking stats from Supabase
    const fetchBookingStats = async () => {
      try {
        // Fetch hotels with bookings data
        const { data: hotels, error } = await supabase
          .from('hotels')
          .select('name, review_count')
          .order('review_count', { ascending: false });

        if (error) throw error;

        // Calculate some stats - in a real app you'd have a bookings table
        if (hotels && hotels.length > 0) {
          const totalBookings = hotels.reduce((acc, hotel) => acc + (hotel.review_count || 0), 0);
          const popularHotel = hotels[0];
          
          if (totalBookings > 0) {
            setStats(prevStats => ({
              ...prevStats,
              totalBookings,
              popularDestination: popularHotel.name || "Nakki Lake",
              popularDestinationPercentage: Math.round((popularHotel.review_count || 0) / totalBookings * 100)
            }));
          }
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
