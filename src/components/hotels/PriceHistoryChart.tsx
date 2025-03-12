
import React, { useState } from 'react';
import { Calendar, Info } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Tooltip as UITooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';

// Sample data for the price history
// In a real app, this would come from an API
const generatePriceData = (basePrice: number, months = 12) => {
  const data = [];
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  // Generate price fluctuations for each month
  for (let i = 0; i < months; i++) {
    const month = (currentMonth + i) % 12;
    const year = currentYear + Math.floor((currentMonth + i) / 12);
    
    // Create seasonal variations
    let seasonalFactor = 1.0;
    
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
    
    // Add some randomness (+/- 10%)
    const randomFactor = 0.9 + (Math.random() * 0.2);
    const price = Math.round(basePrice * seasonalFactor * randomFactor);
    
    const date = new Date(year, month, 15);
    data.push({
      date: date.toISOString(),
      name: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      price: price,
    });
  }
  
  return data;
};

interface PriceHistoryChartProps {
  hotelName: string;
  currentPrice: number;
  location?: string;
}

const PriceHistoryChart: React.FC<PriceHistoryChartProps> = ({ 
  hotelName, 
  currentPrice,
  location
}) => {
  const [timeRange, setTimeRange] = useState<'3m' | '6m' | '1y'>('6m');
  
  // Generate sample price data
  const fullYearData = generatePriceData(currentPrice);
  
  // Filter data based on selected time range
  const filteredData = fullYearData.slice(
    0,
    timeRange === '3m' ? 3 : timeRange === '6m' ? 6 : 12
  );
  
  // Find the minimum and maximum prices
  const minPrice = Math.min(...filteredData.map(item => item.price));
  const maxPrice = Math.max(...filteredData.map(item => item.price));
  const avgPrice = Math.round(
    filteredData.reduce((sum, item) => sum + item.price, 0) / filteredData.length
  );
  
  // Format price for display
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">Price History for {hotelName}</CardTitle>
            <CardDescription>
              {location ? `${location} - ` : ''}Historical price trends to help you decide when to book
            </CardDescription>
          </div>
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p className="max-w-[200px] text-xs">
                  Price history helps you see seasonal trends and find the best time to book.
                  Lower prices typically indicate off-season periods.
                </p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        </div>
        
        <Tabs 
          defaultValue="6m" 
          className="mt-3" 
          value={timeRange}
          onValueChange={(value) => setTimeRange(value as '3m' | '6m' | '1y')}
        >
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="3m">3 Months</TabsTrigger>
              <TabsTrigger value="6m">6 Months</TabsTrigger>
              <TabsTrigger value="1y">1 Year</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-gray-500 mr-1" />
              <span className="text-xs text-gray-500">
                Updated {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </Tabs>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-blue-50 p-3 rounded-md">
            <p className="text-xs text-blue-600 font-medium">Current Price</p>
            <p className="text-lg font-bold">{formatPrice(currentPrice)}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-xs text-gray-600 font-medium">Average Price</p>
            <p className="text-lg font-bold">{formatPrice(avgPrice)}</p>
            <p className="text-xs text-gray-500">
              {currentPrice > avgPrice 
                ? `${Math.round((currentPrice/avgPrice - 1) * 100)}% above average` 
                : `${Math.round((1 - currentPrice/avgPrice) * 100)}% below average`}
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-xs text-gray-600 font-medium">Price Range</p>
            <p className="text-lg font-bold">
              {formatPrice(minPrice)} - {formatPrice(maxPrice)}
            </p>
          </div>
        </div>
        
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={filteredData}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                domain={[Math.floor(minPrice * 0.8), Math.ceil(maxPrice * 1.1)]}
                tickFormatter={(value) => `₹${value}`}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value) => [`${formatPrice(value as number)}`, 'Price']}
                labelFormatter={(label) => `${label}`}
              />
              <ReferenceLine 
                y={currentPrice} 
                stroke="#1d4ed8" 
                strokeDasharray="3 3" 
                label={{ 
                  value: 'Current', 
                  position: 'insideBottomLeft', 
                  fill: '#1d4ed8', 
                  fontSize: 12 
                }} 
              />
              <ReferenceLine 
                y={avgPrice} 
                stroke="#64748b" 
                strokeDasharray="3 3" 
                label={{ 
                  value: 'Average', 
                  position: 'insideTopLeft', 
                  fill: '#64748b', 
                  fontSize: 12 
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#2563eb" 
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 p-3 bg-amber-50 rounded-md text-sm text-amber-800">
          <p className="font-medium">Best time to book</p>
          <p className="text-xs mt-1">
            Prices tend to be lower during {timeRange === '3m' ? 'the next few months' : 'off-peak seasons'}. 
            Consider booking during {filteredData.filter(item => item.price <= avgPrice)
              .map(item => item.name).slice(0, 2).join(' or ')} for the best rates.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceHistoryChart;
