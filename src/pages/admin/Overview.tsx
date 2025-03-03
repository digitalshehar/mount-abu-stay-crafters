
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Calendar, CreditCard, Hotel, MapPin, TrendingUp, Users } from "lucide-react";
import AnalyticsSummary from "@/components/admin/AnalyticsSummary";
import NotificationsPanel from "@/components/admin/NotificationsPanel";
import QuickActions from "@/components/admin/QuickActions";
import ActivityLog from "@/components/admin/ActivityLog";
import TaskManager from "@/components/admin/TaskManager";
import SiteMonitoring from "@/components/admin/SiteMonitoring";
import SeoAnalytics from "@/components/admin/SeoAnalytics";

const data = [
  { name: "Jan", bookings: 65 },
  { name: "Feb", bookings: 59 },
  { name: "Mar", bookings: 80 },
  { name: "Apr", bookings: 81 },
  { name: "May", bookings: 56 },
  { name: "Jun", bookings: 55 },
  { name: "Jul", bookings: 40 },
];

const revenueData = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 8000 },
  { name: "May", revenue: 5500 },
  { name: "Jun", revenue: 6000 },
  { name: "Jul", revenue: 7000 },
];

const AdminOverview = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Hotel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">435</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹3,45,678</div>
            <p className="text-xs text-muted-foreground">+15.3% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">892</div>
            <p className="text-xs text-muted-foreground">+10.5% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Popular Destination</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Nakki Lake</div>
            <p className="text-xs text-muted-foreground">30% of all bookings</p>
          </CardContent>
        </Card>
      </div>
      
      {/* New Analytics Summary Component */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Website Analytics</h2>
        <AnalyticsSummary />
      </div>
      
      {/* Quick Actions Component */}
      <div className="mb-6">
        <QuickActions />
      </div>

      {/* Two Column Layout for Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Booking Overview</CardTitle>
            <CardDescription>Number of bookings per month</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="bookings" fill="#6366F1" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
            <CardDescription>Revenue generated per month</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#6366F1" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* SEO Analytics */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">SEO Performance</h2>
        <SeoAnalytics />
      </div>

      {/* Three Column Layout for Different Components */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="space-y-6">
          <NotificationsPanel />
        </div>
        
        <div className="space-y-6">
          <TaskManager />
        </div>
        
        <div className="space-y-6">
          <SiteMonitoring />
          <ActivityLog />
        </div>
      </div>
      
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
    </div>
  );
};

export default AdminOverview;
