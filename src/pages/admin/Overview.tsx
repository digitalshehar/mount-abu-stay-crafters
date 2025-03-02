
import React from "react";
import { BarChart, Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Hotel, 
  FileText, 
  Car, 
  Bike, 
  Map, 
  Users, 
  TrendingUp,
  Calendar
} from "lucide-react";

const AdminOverview = () => {
  // In a real app, these would come from an API or database
  const stats = [
    { 
      title: "Total Hotels", 
      value: 24, 
      change: "+2", 
      icon: Hotel, 
      color: "bg-blue-500" 
    },
    { 
      title: "Blog Articles", 
      value: 35, 
      change: "+5", 
      icon: FileText, 
      color: "bg-emerald-500" 
    },
    { 
      title: "Car Bookings", 
      value: 128, 
      change: "+12", 
      icon: Car, 
      color: "bg-orange-500" 
    },
    { 
      title: "Bike Rentals", 
      value: 86, 
      change: "+7", 
      icon: Bike, 
      color: "bg-purple-500" 
    },
    { 
      title: "Adventure Bookings", 
      value: 95, 
      change: "+15", 
      icon: Map, 
      color: "bg-red-500" 
    },
    { 
      title: "Users", 
      value: 1240, 
      change: "+32", 
      icon: Users, 
      color: "bg-indigo-500" 
    },
  ];

  const recentBookings = [
    { id: 1, type: "Hotel", name: "Sunset Resort", customer: "Rahul Sharma", date: "2023-09-24", status: "Confirmed" },
    { id: 2, type: "Car", name: "SUV Toyota Innova", customer: "Priya Singh", date: "2023-09-23", status: "Pending" },
    { id: 3, type: "Bike", name: "Royal Enfield", customer: "Amit Kumar", date: "2023-09-22", status: "Confirmed" },
    { id: 4, type: "Adventure", name: "Sunset Trekking", customer: "Sneha Patel", date: "2023-09-22", status: "Confirmed" },
    { id: 5, type: "Hotel", name: "Hillview Hotel", customer: "Vikram Joshi", date: "2023-09-21", status: "Cancelled" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <div className="flex items-center gap-2 text-sm text-stone-600">
          <Calendar size={16} />
          <span>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-sm hover:shadow transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-stone-500">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp size={14} className="text-emerald-500" />
                    <span className="text-xs font-medium text-emerald-500">{stat.change} this week</span>
                  </div>
                </div>
                <div className={`${stat.color} text-white p-3 rounded-full`}>
                  <stat.icon size={20} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs text-stone-500 border-b">
                    <th className="pb-2 font-medium">Type</th>
                    <th className="pb-2 font-medium">Name</th>
                    <th className="pb-2 font-medium">Customer</th>
                    <th className="pb-2 font-medium">Date</th>
                    <th className="pb-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-stone-100 hover:bg-stone-50">
                      <td className="py-3 pr-4 text-sm">{booking.type}</td>
                      <td className="py-3 pr-4 text-sm font-medium">{booking.name}</td>
                      <td className="py-3 pr-4 text-sm">{booking.customer}</td>
                      <td className="py-3 pr-4 text-sm">{booking.date}</td>
                      <td className="py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 
                          booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[260px] flex items-center justify-center border rounded-md bg-stone-50">
              <p className="text-stone-500">Revenue chart will be displayed here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;
