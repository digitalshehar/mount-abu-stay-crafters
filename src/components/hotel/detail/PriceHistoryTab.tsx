
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertTriangle } from 'lucide-react';

interface PriceHistoryTabProps {
  hotel: any;
}

const PriceHistoryTab: React.FC<PriceHistoryTabProps> = ({ hotel }) => {
  // Sample price history data (in a real app, this would come from an API)
  const priceData = [
    { month: 'Jan', price: Math.round(hotel?.price * 0.9) || 3500 },
    { month: 'Feb', price: Math.round(hotel?.price * 0.85) || 3400 },
    { month: 'Mar', price: Math.round(hotel?.price * 0.95) || 3700 },
    { month: 'Apr', price: Math.round(hotel?.price * 1.15) || 4200 },
    { month: 'May', price: Math.round(hotel?.price * 1.25) || 4500 },
    { month: 'Jun', price: Math.round(hotel?.price * 1.1) || 4000 },
    { month: 'Jul', price: Math.round(hotel?.price * 1.2) || 4300 },
    { month: 'Aug', price: Math.round(hotel?.price * 1.15) || 4200 },
    { month: 'Sep', price: Math.round(hotel?.price * 0.9) || 3600 },
    { month: 'Oct', price: Math.round(hotel?.price) || 3800 },
    { month: 'Nov', price: Math.round(hotel?.price * 0.9) || 3500 },
    { month: 'Dec', price: Math.round(hotel?.price * 1.3) || 4800 },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
          <div>
            <h3 className="font-medium text-amber-800">Price Fluctuation Information</h3>
            <p className="text-sm text-amber-700">
              Hotel prices may vary based on season, availability, and demand. This chart shows historical prices to help you plan your stay.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Price History for {hotel?.name}</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={priceData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${value}`, 'Price']} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#10b981" 
                activeDot={{ r: 8 }} 
                name="Price per night (₹)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          * Prices shown are estimated averages based on historical data and may not reflect current rates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg border shadow-sm text-center">
          <p className="text-sm text-gray-500">Lowest Price (12 months)</p>
          <p className="text-2xl font-bold text-green-600">₹{Math.min(...priceData.map(item => item.price))}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-sm text-center">
          <p className="text-sm text-gray-500">Average Price</p>
          <p className="text-2xl font-bold text-blue-600">
            ₹{Math.round(priceData.reduce((sum, item) => sum + item.price, 0) / priceData.length)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-sm text-center">
          <p className="text-sm text-gray-500">Highest Price (12 months)</p>
          <p className="text-2xl font-bold text-red-600">₹{Math.max(...priceData.map(item => item.price))}</p>
        </div>
      </div>
    </div>
  );
};

export default PriceHistoryTab;
