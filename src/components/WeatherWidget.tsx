
import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, Snowflake, Wind } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  forecast: {
    day: string;
    temperature: number;
    condition: string;
    icon: string;
  }[];
}

// Mock weather data for Mount Abu
const mockWeatherData: WeatherData = {
  location: 'Mount Abu, Rajasthan',
  temperature: 24,
  condition: 'Sunny',
  icon: 'sun',
  humidity: 45,
  windSpeed: 10,
  forecast: [
    { day: 'Mon', temperature: 24, condition: 'Sunny', icon: 'sun' },
    { day: 'Tue', temperature: 23, condition: 'Partly Cloudy', icon: 'cloud' },
    { day: 'Wed', temperature: 22, condition: 'Cloudy', icon: 'cloud' },
    { day: 'Thu', temperature: 20, condition: 'Rain', icon: 'rain' },
    { day: 'Fri', temperature: 22, condition: 'Partly Cloudy', icon: 'cloud' },
  ],
};

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, this would be an API call to a weather service
    // For this demo, we'll use the mock data after a short delay
    const timer = setTimeout(() => {
      setWeather(mockWeatherData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const renderWeatherIcon = (icon: string) => {
    switch (icon) {
      case 'sun':
        return <Sun className="w-6 h-6 text-yellow-400" />;
      case 'cloud':
        return <Cloud className="w-6 h-6 text-gray-400" />;
      case 'rain':
        return <CloudRain className="w-6 h-6 text-blue-400" />;
      case 'snow':
        return <Snowflake className="w-6 h-6 text-blue-200" />;
      default:
        return <Wind className="w-6 h-6 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <Skeleton className="h-6 w-40 mb-4" />
          <div className="flex items-center gap-4 mb-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-8 w-28" />
          </div>
          <div className="flex gap-2 justify-between">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-20 w-12" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!weather) return null;

  return (
    <Card className="overflow-hidden bg-white/80 backdrop-blur-sm shadow-sm">
      <CardContent className="p-4">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Current Weather</h3>
        <div className="flex items-center mb-4">
          <div className="mr-4">{renderWeatherIcon(weather.icon)}</div>
          <div>
            <div className="text-2xl font-bold">{weather.temperature}°C</div>
            <div className="text-sm text-gray-500">{weather.location}</div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div className="text-xs text-gray-500">
            Humidity: {weather.humidity}%
          </div>
          <div className="text-xs text-gray-500">
            Wind: {weather.windSpeed} km/h
          </div>
        </div>
        
        <h4 className="text-xs font-medium text-gray-500 mb-2">5-Day Forecast</h4>
        <div className="flex justify-between">
          {weather.forecast.map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-xs font-medium">{day.day}</span>
              <div className="my-1">{renderWeatherIcon(day.icon)}</div>
              <span className="text-xs">{day.temperature}°C</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
