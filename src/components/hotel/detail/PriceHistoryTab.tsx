
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Hotel } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { CalendarDays, TrendingDown, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/utils/hotel';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

interface PriceHistoryTabProps {
  hotel: Hotel;
}

// Generate mock seasonal prices for the hotel
const generateSeasonalPrices = (basePrice: number) => {
  const today = new Date();
  const data = [];
  
  // Generate prices for 12 months - 6 months past, current month, 5 months future
  for (let i = -6; i <= 5; i++) {
    const date = new Date();
    date.setMonth(today.getMonth() + i);
    
    const monthName = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    
    // Apply seasonal variance
    const month = date.getMonth();
    
    // Peak season: December to February (winter)
    // High season: September to November & March to May
    // Low season: June to August (summer)
    let factor = 1.0;
    let season = '';
    
    if (month === 11 || month === 0 || month === 1) {
      factor = 1.3;
      season = 'Peak';
    } else if ((month >= 8 && month <= 10) || (month >= 2 && month <= 4)) {
      factor = 1.1; 
      season = 'High';
    } else {
      factor = 0.9;
      season = 'Low';
    }
    
    // Add some random variation
    const randomFactor = 0.9 + Math.random() * 0.2;
    const price = Math.round(basePrice * factor * randomFactor);
    
    // Weekend price adjustment
    const weekendPrice = Math.round(price * 1.2);
    
    data.push({
      month: `${monthName} ${year}`,
      price,
      weekendPrice,
      season,
      future: i > 0
    });
  }
  
  return data;
};

const PriceHistoryTab: React.FC<PriceHistoryTabProps> = ({ hotel }) => {
  const [priceHistory, setPriceHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState('');
  
  useEffect(() => {
    if (hotel) {
      // In a real app, you would fetch price history from an API
      // For this example, we'll generate mock data
      const basePrice = hotel.pricePerNight || hotel.price || 3000;
      const priceData = generateSeasonalPrices(basePrice);
      
      // Current month
      const today = new Date();
      setCurrentMonth(`${today.toLocaleString('default', { month: 'short' })} ${today.getFullYear()}`);
      
      // Simulate loading delay
      setTimeout(() => {
        setPriceHistory(priceData);
        setLoading(false);
      }, 1000);
    }
  }, [hotel]);
  
  // Calculate average price
  const averagePrice = priceHistory.length > 0
    ? Math.round(priceHistory.reduce((sum, item) => sum + item.price, 0) / priceHistory.length)
    : 0;
  
  // Find min and max prices
  const minPrice = priceHistory.length > 0
    ? Math.min(...priceHistory.map(item => item.price))
    : 0;
    
  const maxPrice = priceHistory.length > 0
    ? Math.max(...priceHistory.map(item => item.price))
    : 0;
  
  // Find best time to book (lowest future price)
  const bestTimeToBook = priceHistory
    .filter(item => item.future)
    .sort((a, b) => a.price - b.price)[0];

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-[300px] w-full" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Price History</CardTitle>
              <CardDescription>
                Historical and predicted pricing for {hotel.name}
              </CardDescription>
            </div>
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
              <CalendarDays className="h-3 w-3 mr-1" />
              12 Month View
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={priceHistory}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [`₹${value}`, 'Price']}
                  labelFormatter={(label) => `${label}`}
                />
                <ReferenceLine
                  x={currentMonth}
                  stroke="#888"
                  strokeDasharray="3 3"
                  label={{ value: 'Today', position: 'top' }}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#8884d8"
                  name="Weekday Price"
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="weekendPrice"
                  stroke="#82ca9d"
                  name="Weekend Price"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">{formatPrice(averagePrice)}</span>
              <Badge className="bg-gray-100 text-gray-800">Per night</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Price Range</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center">
                  <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-gray-500">Min</span>
                </div>
                <span className="text-lg font-medium">{formatPrice(minPrice)}</span>
              </div>
              
              <span className="text-gray-300">|</span>
              
              <div>
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-sm text-gray-500">Max</span>
                </div>
                <span className="text-lg font-medium">{formatPrice(maxPrice)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {bestTimeToBook && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Best Time to Book</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <span className="text-lg font-medium">{bestTimeToBook.month}</span>
                <div className="flex items-center mt-1">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                    {bestTimeToBook.season} Season
                  </span>
                  <span className="text-sm text-gray-500 ml-2">
                    {formatPrice(bestTimeToBook.price)} per night
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Seasonal Pricing Guide</CardTitle>
          <CardDescription>
            Understand how prices vary throughout the year
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start p-3 border rounded-lg bg-red-50 border-red-100">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                <TrendingUp className="h-4 w-4 text-red-500" />
              </div>
              <div>
                <h3 className="font-medium">Peak Season (December - February)</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Highest prices due to winter season and holiday demand. Book at least 3 months in advance for best rates.
                </p>
              </div>
            </div>
            
            <div className="flex items-start p-3 border rounded-lg bg-yellow-50 border-yellow-100">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                <TrendingUp className="h-4 w-4 text-yellow-500" />
              </div>
              <div>
                <h3 className="font-medium">High Season (Sep-Nov & Mar-May)</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Moderate to high prices during spring and fall. Pleasant weather attracts more tourists. Book 1-2 months ahead.
                </p>
              </div>
            </div>
            
            <div className="flex items-start p-3 border rounded-lg bg-green-50 border-green-100">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <TrendingDown className="h-4 w-4 text-green-500" />
              </div>
              <div>
                <h3 className="font-medium">Low Season (June - August)</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Lowest prices during summer. Hot weather means fewer tourists. Great deals available, even for last-minute bookings.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <Button variant="outline" className="w-full">
              Set Price Alerts
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PriceHistoryTab;
