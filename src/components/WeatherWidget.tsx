
import React, { useEffect, useState } from 'react';
import { Cloud, CloudRain, CloudSnow, Sun, Wind } from 'lucide-react';
import { Card, CardContent } from './ui/card';

interface WeatherWidgetProps {
  location: string;
  latitude?: number;
  longitude?: number;
}

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: React.ReactNode;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ location }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This would normally fetch from a real weather API
    // For demo purposes, we'll use mocked data
    const fetchWeather = () => {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        const conditions = ['sunny', 'cloudy', 'rainy', 'snowy', 'windy'];
        const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
        const randomTemp = Math.floor(Math.random() * 30) + 5; // 5 to 35°C
        
        const weatherIcons = {
          sunny: <Sun className="h-6 w-6 text-amber-500" />,
          cloudy: <Cloud className="h-6 w-6 text-gray-400" />,
          rainy: <CloudRain className="h-6 w-6 text-blue-400" />,
          snowy: <CloudSnow className="h-6 w-6 text-blue-200" />,
          windy: <Wind className="h-6 w-6 text-gray-500" />
        };
        
        setWeather({
          temperature: randomTemp,
          condition: randomCondition,
          humidity: Math.floor(Math.random() * 60) + 30, // 30% to 90%
          windSpeed: Math.floor(Math.random() * 30) + 5, // 5 to 35 km/h
          icon: weatherIcons[randomCondition as keyof typeof weatherIcons]
        });
        
        setLoading(false);
      }, 1000);
    };
    
    fetchWeather();
  }, [location]);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-gray-200 h-10 w-10"></div>
            <div className="flex-1 space-y-3 py-1">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!weather) {
    return null;
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-sm">{location}</h3>
            <div className="flex items-center mt-1">
              <span className="text-2xl font-bold">{weather.temperature}°C</span>
              <span className="ml-2 text-sm capitalize text-gray-600">{weather.condition}</span>
            </div>
          </div>
          <div className="bg-blue-50 p-2 rounded-full">
            {weather.icon}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-4 text-sm text-gray-600">
          <div>
            <p className="text-xs">Humidity</p>
            <p className="font-medium">{weather.humidity}%</p>
          </div>
          <div>
            <p className="text-xs">Wind</p>
            <p className="font-medium">{weather.windSpeed} km/h</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
