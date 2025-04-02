
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  high: number;
  low: number;
  lastUpdated: string;
}

// Update to only accept a string parameter
export const useWeather = (location: string = "Mount Abu") => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Demo data for location - In a real app, you would fetch from a weather API
        const mockData: WeatherData = {
          location: location,
          temperature: 24,
          description: "Sunny with some clouds",
          icon: "cloud-sun",
          humidity: 65,
          windSpeed: 12,
          feelsLike: 26,
          high: 28,
          low: 19,
          lastUpdated: new Date().toLocaleTimeString()
        };
        
        setWeather(mockData);
      } catch (err) {
        console.error("Failed to fetch weather data:", err);
        setError("Could not load weather data. Please try again later.");
        toast({
          title: "Weather Data Error",
          description: "Failed to load weather information",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
    
    // Refresh every 30 minutes
    const intervalId = setInterval(fetchWeather, 30 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [location, toast]);

  return { weather, isLoading, error };
};
