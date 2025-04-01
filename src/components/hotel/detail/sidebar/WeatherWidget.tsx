
import React, { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, Wind } from 'lucide-react';

interface WeatherWidgetProps {
  location: string;
  longitude: number;
  latitude: number;
}

interface WeatherData {
  temp: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'windy';
  humidity: number;
  wind: number;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ 
  location,
  longitude,
  latitude
}) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, we would fetch actual weather data using the coordinates
    // For now, we'll simulate a weather API call with mock data
    const fetchWeatherData = async () => {
      setLoading(true);
      
      // Simulate API delay
      setTimeout(() => {
        // Mock weather data
        const mockWeather: WeatherData = {
          temp: Math.floor(Math.random() * 15) + 20, // Random temp between 20-35°C
          condition: ['sunny', 'cloudy', 'rainy', 'snowy', 'windy'][Math.floor(Math.random() * 5)] as any,
          humidity: Math.floor(Math.random() * 40) + 40, // Random humidity between 40-80%
          wind: Math.floor(Math.random() * 20) + 5 // Random wind between 5-25 km/h
        };
        
        setWeather(mockWeather);
        setLoading(false);
      }, 1000);
    };
    
    if (location) {
      fetchWeatherData();
    }
  }, [location, latitude, longitude]);
  
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="h-8 w-8 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="h-8 w-8 text-gray-500" />;
      case 'rainy':
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      case 'snowy':
        return <CloudSnow className="h-8 w-8 text-blue-200" />;
      case 'windy':
        return <Wind className="h-8 w-8 text-blue-300" />;
      default:
        return <Sun className="h-8 w-8 text-yellow-500" />;
    }
  };
  
  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-stone-200 p-4">
        <h3 className="font-semibold mb-3">Weather</h3>
        <div className="animate-pulse flex items-center justify-between">
          <div className="h-10 w-10 bg-stone-200 rounded-full"></div>
          <div className="h-6 w-16 bg-stone-200 rounded"></div>
        </div>
        <div className="animate-pulse mt-4">
          <div className="h-3 w-full bg-stone-200 rounded mb-2"></div>
          <div className="h-3 w-3/4 bg-stone-200 rounded"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg border border-stone-200 p-4">
      <h3 className="font-semibold mb-3">Current Weather</h3>
      {weather && (
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {getWeatherIcon(weather.condition)}
              <div className="ml-3">
                <span className="text-2xl font-bold">{weather.temp}°C</span>
                <p className="text-sm capitalize text-stone-500">{weather.condition}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-stone-500">Humidity: {weather.humidity}%</p>
              <p className="text-xs text-stone-500">Wind: {weather.wind} km/h</p>
            </div>
          </div>
          <p className="text-xs mt-3 text-stone-500">*Data for {location}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
