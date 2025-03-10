
import React from 'react';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { PIE_COLORS } from './ChartColors';

interface StatusDistributionChartProps {
  data: Array<{name: string, value: number}>;
  title: string;
  description: string;
}

const StatusDistributionChart: React.FC<StatusDistributionChartProps> = ({ 
  data, 
  title, 
  description 
}) => {
  return (
    <>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#4f46e5"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip formatter={(value) => [`${value} bookings`, 'Count']} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </>
  );
};

export default StatusDistributionChart;
