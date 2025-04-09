
import React from "react";
import { 
  Cloud, CloudSun, Sun, CloudRain, Umbrella, 
  Wind, Droplets, Thermometer, ArrowUp, ArrowDown 
} from "lucide-react";
import { useWeather } from "@/hooks/useWeather";
import { Skeleton } from "@/components/ui/skeleton";

interface WeatherWidgetProps {
  city?: string;
  className?: string;
  compact?: boolean;
}

const WeatherWidgetExtended = ({ 
  city = "Mount Abu", 
  className = "",
  compact = false
}: WeatherWidgetProps) => {
  const { weather, isLoading, error } = useWeather(city);

  const getWeatherIcon = (iconCode?: string) => {
    switch (iconCode) {
      case "sun":
        return <Sun className="h-8 w-8 text-amber-500" />;
      case "cloud-sun":
        return <CloudSun className="h-8 w-8 text-amber-400" />;
      case "cloud":
        return <Cloud className="h-8 w-8 text-gray-400" />;
      case "cloud-rain":
        return <CloudRain className="h-8 w-8 text-blue-400" />;
      default:
        return <Sun className="h-8 w-8 text-amber-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className={`bg-white rounded-xl shadow-sm p-4 ${className}`}>
        <div className="animate-pulse">
          <Skeleton className="h-6 w-40 mb-2" />
          <div className="flex justify-between">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
          <Skeleton className="h-4 w-32 mt-2" />
          <div className="flex justify-between mt-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className={`bg-white rounded-xl shadow-sm p-4 ${className}`}>
        <p className="text-red-500">Unable to load weather data</p>
      </div>
    );
  }

  if (compact) {
    return (
      <div className={`bg-white/90 backdrop-blur-sm rounded-lg shadow-sm p-3 ${className}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">{weather.location}</h3>
            <p className="text-2xl font-semibold">{weather.temperature}°C</p>
          </div>
          {getWeatherIcon(weather.icon)}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{weather.location} Weather</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold">{weather.temperature}°C</p>
            <p className="text-stone-500">{weather.description}</p>
          </div>
          {getWeatherIcon(weather.icon)}
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="flex items-center text-sm text-stone-600">
            <Thermometer className="h-4 w-4 mr-1 text-stone-400" />
            <span>Feels like {weather.feelsLike || weather.temperature}°C</span>
          </div>
          <div className="flex items-center text-sm text-stone-600">
            <Wind className="h-4 w-4 mr-1 text-stone-400" />
            <span>{weather.windSpeed} km/h</span>
          </div>
          <div className="flex items-center text-sm text-stone-600">
            <Droplets className="h-4 w-4 mr-1 text-stone-400" />
            <span>Humidity {weather.humidity}%</span>
          </div>
          <div className="flex items-center text-sm text-stone-600">
            <Umbrella className="h-4 w-4 mr-1 text-stone-400" />
            <span>0% Chance of rain</span>
          </div>
        </div>
        
        <div className="flex justify-between mt-3 pt-3 border-t text-sm">
          <div className="flex items-center">
            <ArrowUp className="h-3 w-3 mr-1 text-red-500" />
            <span>High: {weather.high}°C</span>
          </div>
          <div className="flex items-center">
            <ArrowDown className="h-3 w-3 mr-1 text-blue-500" />
            <span>Low: {weather.low}°C</span>
          </div>
        </div>
      </div>
      <div className="bg-stone-50 px-4 py-2 text-xs text-stone-500">
        Last updated: {weather.lastUpdated || "Just now"}
      </div>
    </div>
  );
};

export default WeatherWidgetExtended;
