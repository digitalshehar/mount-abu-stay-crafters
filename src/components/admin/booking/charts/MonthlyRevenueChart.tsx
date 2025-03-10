
import React from 'react';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CHART_COLORS } from './ChartColors';

interface MonthlyRevenueChartProps {
  data: Array<{month: string, revenue: number}>;
}

const MonthlyRevenueChart: React.FC<MonthlyRevenueChartProps> = ({ data }) => {
  return (
    <>
      <CardHeader>
        <CardTitle>Monthly Revenue Trend</CardTitle>
        <CardDescription>Revenue generated over time</CardDescription>
      </CardHeader>
      <CardContent className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 60,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" angle={-45} textAnchor="end" height={60} />
            <YAxis
              tickFormatter={(value) => `₹${value.toLocaleString('en-IN')}`}
            />
            <Tooltip formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Revenue']} />
            <Bar dataKey="revenue" fill={CHART_COLORS.primary} name="Revenue" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </>
  );
};

export default MonthlyRevenueChart;
