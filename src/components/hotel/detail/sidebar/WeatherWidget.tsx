
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Cloud, Droplets, Wind, Thermometer } from 'lucide-react';
import { useWeather } from '@/hooks/useWeather';
import { Skeleton } from '@/components/ui/skeleton';

interface WeatherWidgetProps {
  location?: {
    location: string;
    latitude: number;
    longitude: number;
  };
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ location }) => {
  const { weather, isLoading, error } = useWeather(location || "Mount Abu");

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="space-y-3">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-8 w-3/4" />
            <div className="grid grid-cols-2 gap-2">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !weather) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="text-sm text-muted-foreground">
            Weather information unavailable
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-4">
        <h4 className="text-sm font-medium mb-1">Current Weather</h4>
        <div className="flex justify-between items-center mb-3">
          <div>
            <div className="text-2xl font-bold">{weather.temperature}°C</div>
            <div className="text-xs text-muted-foreground">{weather.location}</div>
          </div>
          <div className="p-2 bg-sky-100 dark:bg-sky-900/20 rounded-full">
            <Cloud className="h-6 w-6 text-sky-600 dark:text-sky-400" />
          </div>
        </div>
        <div className="text-sm mb-3">{weather.description}</div>
        
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center">
            <Droplets className="h-3 w-3 mr-1 text-blue-500" />
            <span>Humidity: {weather.humidity}%</span>
          </div>
          <div className="flex items-center">
            <Wind className="h-3 w-3 mr-1 text-gray-500" />
            <span>Wind: {weather.windSpeed} km/h</span>
          </div>
          <div className="flex items-center">
            <Thermometer className="h-3 w-3 mr-1 text-orange-500" />
            <span>High: {weather.high}°C</span>
          </div>
          <div className="flex items-center">
            <Thermometer className="h-3 w-3 mr-1 text-cyan-500" />
            <span>Low: {weather.low}°C</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
