
import { useState, useEffect } from 'react';

export type LocationParam = string | { 
  location: string; 
  latitude?: number; 
  longitude?: number; 
};

interface WeatherData {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  high: number;
  low: number;
  location: string;
  icon?: string;
}

export const useWeather = (locationParam: LocationParam) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // In a real app, we would fetch actual weather data here
        // For demo purposes, we'll simulate a weather API response with mock data
        
        // Extract location details
        let locationName = typeof locationParam === 'string' 
          ? locationParam 
          : locationParam.location;
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock weather data
        const mockWeatherData: WeatherData = {
          temperature: 24 + Math.floor(Math.random() * 8),
          description: "Partly cloudy",
          humidity: 45 + Math.floor(Math.random() * 30),
          windSpeed: 5 + Math.floor(Math.random() * 10),
          high: 28 + Math.floor(Math.random() * 5),
          low: 18 + Math.floor(Math.random() * 5),
          location: locationName,
        };
        
        setWeather(mockWeatherData);
      } catch (err: any) {
        console.error('Error fetching weather data:', err);
        setError(err.message || 'Failed to fetch weather data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [locationParam]);

  return { weather, isLoading, error };
};
