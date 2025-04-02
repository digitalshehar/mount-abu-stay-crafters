
import React from 'react';
import { CloudSun, Umbrella, Thermometer } from 'lucide-react';
import { useWeather } from '@/hooks/useWeather';

interface WeatherWidgetProps {
  location?: string;
  latitude?: number;
  longitude?: number;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ 
  location = 'Mount Abu', 
  latitude = 24.5927, 
  longitude = 72.7156 
}) => {
  // Fixed: only passing location as string, matching hook param
  const { weather, isLoading, error } = useWeather(location);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-stone-200 p-4 animate-pulse">
        <div className="h-4 bg-stone-100 rounded w-1/3 mb-4"></div>
        <div className="flex justify-between items-center">
          <div className="h-8 bg-stone-100 rounded w-1/4"></div>
          <div className="h-8 bg-stone-100 rounded-full w-8"></div>
        </div>
        <div className="h-4 bg-stone-100 rounded w-1/2 mt-4"></div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="bg-white rounded-lg border border-stone-200 p-4">
        <h3 className="font-semibold mb-3">Weather</h3>
        <p className="text-sm text-stone-500">Weather information unavailable</p>
      </div>
    );
  }

  // Safely access weather data with fallbacks
  const temp = weather.temperature || 25;
  const condition = weather.description || 'Sunny';
  const humidity = weather.humidity || 50;
  const windSpeed = weather.windSpeed || 5;

  // Helper function to choose weather icon
  const getWeatherIcon = () => {
    if (condition.toLowerCase().includes('rain')) {
      return <Umbrella className="h-6 w-6 text-blue-500" />;
    } 
    return <CloudSun className="h-6 w-6 text-stone-500" />;
  };

  return (
    <div className="bg-white rounded-lg border border-stone-200 p-4">
      <h3 className="font-semibold mb-3">Weather in {location}</h3>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {getWeatherIcon()}
          <div className="ml-3">
            <p className="font-semibold text-lg">{Math.round(temp)}°C</p>
            <p className="text-xs text-stone-500">{condition}</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mt-4 text-xs text-stone-600">
        <div className="flex items-center">
          <Umbrella className="h-3 w-3 mr-1 text-blue-500" />
          <span>Humidity: {humidity}%</span>
        </div>
        <div className="flex items-center">
          <Thermometer className="h-3 w-3 mr-1 text-red-500" />
          <span>Wind: {windSpeed} km/h</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
