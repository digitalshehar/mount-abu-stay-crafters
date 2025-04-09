
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  ReferenceLine 
} from 'recharts';
import { format, addDays, addMonths } from 'date-fns';
import { Hotel } from '@/types';

interface PriceHistoryTabProps {
  hotel: Hotel;
}

const PriceHistoryTab: React.FC<PriceHistoryTabProps> = ({ hotel }) => {
  const [timeRange, setTimeRange] = useState<'1m' | '3m' | '6m'>('3m');
  
  // Generate sample price history data
  const generatePriceData = () => {
    const priceData = [];
    const basePrice = hotel.pricePerNight || hotel.price || 5000;
    const today = new Date();
    
    const daysToGenerate = timeRange === '1m' ? 30 : timeRange === '3m' ? 90 : 180;
    
    for (let i = 0; i < daysToGenerate; i++) {
      const date = addDays(today, i);
      
      // Add seasonal variations
      let seasonalFactor = 1.0;
      const month = date.getMonth();
      
      // Peak season - December to February (winter)
      if (month >= 11 || month <= 1) {
        seasonalFactor = 1.3;
      } 
      // Moderate season - September to November (fall) & March to May (spring)
      else if ((month >= 8 && month <= 10) || (month >= 2 && month <= 4)) {
        seasonalFactor = 1.1;
      }
      // Low season - June to August (summer)
      else {
        seasonalFactor = 0.9;
      }
      
      // Add weekend premium
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const weekendFactor = isWeekend ? 1.2 : 1.0;
      
      // Add some randomness (+/- 10%)
      const randomFactor = 0.9 + (Math.random() * 0.2);
      
      // Calculate final price
      const price = Math.round(basePrice * seasonalFactor * weekendFactor * randomFactor);
      
      priceData.push({
        date: format(date, 'MMM dd'),
        fullDate: format(date, 'PP'),
        price,
        day: format(date, 'EEEE')
      });
    }
    
    return priceData;
  };
  
  const priceData = generatePriceData();
  
  // Calculate average, min, max prices
  const prices = priceData.map(item => item.price);
  const avgPrice = Math.round(prices.reduce((sum, price) => sum + price, 0) / prices.length);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  
  // Calculate best time to book
  const belowAveragePrices = priceData.filter(item => item.price < avgPrice);
  const bestTimeToBook = belowAveragePrices.length > 0 
    ? `${belowAveragePrices[0].date} - ${belowAveragePrices[Math.min(6, belowAveragePrices.length - 1)].date}`
    : 'Prices are currently at peak, consider booking later';
  
  const currentPrice = hotel.pricePerNight || hotel.price || 5000;
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Price Trends for {hotel.name}</CardTitle>
          <CardDescription>
            Historical and forecasted prices to help you find the best time to book
          </CardDescription>
          
          <Tabs defaultValue={timeRange} onValueChange={(value) => setTimeRange(value as '1m' | '3m' | '6m')}>
            <TabsList>
              <TabsTrigger value="1m">1 Month</TabsTrigger>
              <TabsTrigger value="3m">3 Months</TabsTrigger>
              <TabsTrigger value="6m">6 Months</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="py-4">
                <div className="text-xs text-gray-500 mb-1">Current Price</div>
                <div className="text-2xl font-bold">₹{currentPrice}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="py-4">
                <div className="text-xs text-gray-500 mb-1">Price Range</div>
                <div className="text-2xl font-bold">₹{minPrice} - ₹{maxPrice}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="py-4">
                <div className="text-xs text-gray-500 mb-1">Average Price</div>
                <div className="text-2xl font-bold">₹{avgPrice}</div>
              </CardContent>
            </Card>
          </div>
          
          <div className="h-[300px] mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  domain={[Math.floor(minPrice * 0.9), Math.ceil(maxPrice * 1.1)]}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `₹${value}`}
                />
                <RechartsTooltip 
                  formatter={(value) => [`₹${value}`, 'Price']}
                  labelFormatter={(label, payload) => {
                    if (payload && payload.length > 0) {
                      return `${payload[0].payload.fullDate} (${payload[0].payload.day})`;
                    }
                    return label;
                  }}
                />
                <ReferenceLine 
                  y={currentPrice} 
                  stroke="#2563eb" 
                  strokeDasharray="3 3" 
                  label={{ 
                    value: 'Current', 
                    position: 'right', 
                    fill: '#2563eb', 
                    fontSize: 12 
                  }} 
                />
                <ReferenceLine 
                  y={avgPrice} 
                  stroke="#64748b" 
                  strokeDasharray="3 3" 
                  label={{ 
                    value: 'Average', 
                    position: 'right', 
                    fill: '#64748b', 
                    fontSize: 12 
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <Card className="mt-6 bg-amber-50 border-amber-200">
            <CardContent className="py-4">
              <div className="flex items-start">
                <div>
                  <h3 className="font-medium text-amber-800">Best time to book</h3>
                  <p className="text-sm text-amber-700 mt-1">
                    {bestTimeToBook}
                  </p>
                  <p className="text-xs text-amber-600 mt-2">
                    Booking {currentPrice > avgPrice ? 'now will cost more than average' : 'now could save you money'}.
                    {currentPrice > avgPrice 
                      ? ` You could save up to ₹${currentPrice - minPrice} by booking during lower-priced periods.` 
                      : ` Current price is ${Math.round(((avgPrice - currentPrice) / avgPrice) * 100)}% below average.`}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default PriceHistoryTab;
