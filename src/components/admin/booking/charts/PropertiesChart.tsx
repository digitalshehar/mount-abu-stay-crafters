
import React from 'react';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CHART_COLORS } from './ChartColors';

interface PropertiesChartProps {
  data: Array<{name: string, value: number}>;
}

const PropertiesChart: React.FC<PropertiesChartProps> = ({ data }) => {
  return (
    <>
      <CardHeader>
        <CardTitle>Top Properties by Bookings</CardTitle>
        <CardDescription>Most booked properties</CardDescription>
      </CardHeader>
      <CardContent className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 100,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" width={80} />
            <Tooltip />
            <Bar dataKey="value" fill={CHART_COLORS.accent} name="Bookings" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </>
  );
};

export default PropertiesChart;
