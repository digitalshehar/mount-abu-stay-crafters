
import React from 'react';
import { Calendar, TrendingUp, ArrowRight, ChevronsUpDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/utils/hotel';

interface PriceHistoryTabProps {
  hotel: any;
}

const PriceHistoryTab: React.FC<PriceHistoryTabProps> = ({ hotel }) => {
  // Sample price history data - would come from an API in a real app
  const priceHistory = [
    { month: 'Jan', price: hotel.price * 0.9 },
    { month: 'Feb', price: hotel.price * 0.85 },
    { month: 'Mar', price: hotel.price * 0.9 },
    { month: 'Apr', price: hotel.price * 1.1 },
    { month: 'May', price: hotel.price * 1.2 },
    { month: 'Jun', price: hotel.price * 1.3 },
    { month: 'Jul', price: hotel.price * 1.35 },
    { month: 'Aug', price: hotel.price * 1.3 },
    { month: 'Sep', price: hotel.price * 1.1 },
    { month: 'Oct', price: hotel.price },
    { month: 'Nov', price: hotel.price * 0.9 },
    { month: 'Dec', price: hotel.price * 1.25 },
  ];

  const priceInsights = [
    {
      title: "Current Price",
      value: formatCurrency(hotel.price),
      status: "neutral",
      description: "Current rate for standard room"
    },
    {
      title: "Lowest Price (Year)",
      value: formatCurrency(hotel.price * 0.85),
      status: "good",
      description: "Best time to book: February"
    },
    {
      title: "Highest Price (Year)",
      value: formatCurrency(hotel.price * 1.35),
      status: "bad",
      description: "Peak season: July"
    },
    {
      title: "Average Price",
      value: formatCurrency(hotel.price * 1.1),
      status: "neutral",
      description: "Annual average"
    }
  ];

  const upcomingPrices = [
    { date: "Oct 21 - Oct 23", price: hotel.price, trend: "stable" },
    { date: "Oct 24 - Oct 26", price: hotel.price * 1.05, trend: "up" },
    { date: "Oct 27 - Oct 29", price: hotel.price * 1.15, trend: "up" },
    { date: "Oct 30 - Nov 1", price: hotel.price * 1.1, trend: "down" },
    { date: "Nov 2 - Nov 4", price: hotel.price, trend: "down" },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-red-500" />;
      case "down":
        return <TrendingUp className="h-4 w-4 text-green-500 rotate-180" />;
      default:
        return <ChevronsUpDown className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-display font-semibold">Price History</h2>
          <p className="text-muted-foreground mt-1">Track price fluctuations to book at the best time</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Set Price Alert
        </Button>
      </div>

      <Tabs defaultValue="yearly">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="yearly">Yearly</TabsTrigger>
          <TabsTrigger value="monthly">3 Months</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
        </TabsList>
        
        <TabsContent value="yearly" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={priceHistory} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={['auto', 'auto']} />
                  <Tooltip 
                    formatter={(value) => [`₹${value}`, 'Price']} 
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="monthly" className="mt-4">
          <Card>
            <CardContent className="pt-6 flex justify-center items-center h-[300px]">
              <div className="text-center text-muted-foreground">
                <Calendar className="h-10 w-10 mx-auto mb-2 opacity-40" />
                <p>3-month price data will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="weekly" className="mt-4">
          <Card>
            <CardContent className="pt-6 flex justify-center items-center h-[300px]">
              <div className="text-center text-muted-foreground">
                <Calendar className="h-10 w-10 mx-auto mb-2 opacity-40" />
                <p>Weekly price data will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Price Insights</CardTitle>
            <CardDescription>Understand price variations throughout the year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {priceInsights.map((insight, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{insight.title}</p>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </div>
                  <div className={`font-bold ${
                    insight.status === 'good' ? 'text-green-600' : 
                    insight.status === 'bad' ? 'text-red-600' : 'text-blue-600'
                  }`}>
                    {insight.value}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Upcoming Prices</CardTitle>
            <CardDescription>Projected prices for the next two weeks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingPrices.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded-md">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{formatCurrency(item.price)}</span>
                    {getTrendIcon(item.trend)}
                  </div>
                </div>
              ))}
              <div className="pt-2">
                <Button variant="ghost" className="w-full flex items-center justify-center gap-2 text-primary">
                  See Extended Forecast
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PriceHistoryTab;
