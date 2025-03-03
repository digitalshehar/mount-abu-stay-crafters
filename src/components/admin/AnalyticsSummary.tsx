
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Eye, CreditCard, Clock, ArrowDown } from "lucide-react";

const metricData = [
  {
    title: "Total Page Views",
    value: "24.5K",
    change: "+12.5%",
    icon: Eye,
    trend: "up",
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    change: "+0.5%",
    icon: TrendingUp,
    trend: "up",
  },
  {
    title: "Average Session",
    value: "2m 45s",
    change: "+0.3%",
    icon: Clock,
    trend: "up",
  },
  {
    title: "Bounce Rate",
    value: "42.2%",
    change: "-2.1%",
    icon: ArrowDown,
    trend: "down",
  },
];

const AnalyticsSummary = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metricData.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className={`text-xs ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {metric.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AnalyticsSummary;
