
import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, CloudSun, Sun, Moon, Thermometer, Wind, Droplets } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

interface WeatherData {
  day: string;
  date: string;
  temp: number;
  condition: 'sunny' | 'cloudy' | 'partly-cloudy' | 'rainy' | 'clear-night';
  humidity: number;
  windSpeed: number;
  precipitation: number;
}

interface LocationData {
  id: string;
  name: string;
  forecast: WeatherData[];
}

const WeatherForecast = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [activeLocation, setActiveLocation] = useState('nakki-lake');

  useEffect(() => {
    // Simulate API fetch with timeout
    const timer = setTimeout(() => {
      setLocations([
        {
          id: 'nakki-lake',
          name: 'Nakki Lake',
          forecast: generateForecast(26, 'partly-cloudy')
        },
        {
          id: 'sunset-point',
          name: 'Sunset Point',
          forecast: generateForecast(24, 'sunny')
        },
        {
          id: 'dilwara-temples',
          name: 'Dilwara Temples',
          forecast: generateForecast(25, 'cloudy')
        },
        {
          id: 'guru-shikhar',
          name: 'Guru Shikhar',
          forecast: generateForecast(22, 'rainy')
        }
      ]);
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const generateForecast = (baseTemp: number, initialCondition: WeatherData['condition']): WeatherData[] => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDate = new Date();
    const conditions: WeatherData['condition'][] = ['sunny', 'cloudy', 'partly-cloudy', 'rainy', 'clear-night'];
    
    return Array.from({ length: 7 }, (_, i) => {
      const forecastDate = new Date();
      forecastDate.setDate(currentDate.getDate() + i);
      
      // Randomize weather data slightly for each day
      const tempVariation = Math.floor(Math.random() * 7) - 3; // -3 to +3 degrees
      const conditionIndex = i === 0 
        ? conditions.indexOf(initialCondition) 
        : Math.floor(Math.random() * conditions.length);
      
      return {
        day: days[forecastDate.getDay()],
        date: forecastDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        temp: baseTemp + tempVariation,
        condition: conditions[conditionIndex],
        humidity: Math.floor(Math.random() * 30) + 55, // 55-85%
        windSpeed: Math.floor(Math.random() * 15) + 5, // 5-20 km/h
        precipitation: Math.floor(Math.random() * 50) // 0-50%
      };
    });
  };

  const getWeatherIcon = (condition: WeatherData['condition']) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="h-8 w-8 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="h-8 w-8 text-gray-500" />;
      case 'partly-cloudy':
        return <CloudSun className="h-8 w-8 text-yellow-400" />;
      case 'rainy':
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      case 'clear-night':
        return <Moon className="h-8 w-8 text-indigo-400" />;
      default:
        return <Sun className="h-8 w-8 text-yellow-500" />;
    }
  };

  const currentLocation = locations.find(loc => loc.id === activeLocation);

  if (isLoading) {
    return <WeatherSkeleton />;
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle>Weather Forecast</CardTitle>
        <CardDescription>7-day forecast for Mount Abu</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeLocation} onValueChange={setActiveLocation}>
          <TabsList className="mb-4 w-full justify-start overflow-x-auto">
            {locations.map(location => (
              <TabsTrigger key={location.id} value={location.id}>
                {location.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {locations.map(location => (
            <TabsContent key={location.id} value={location.id} className="space-y-4">
              {/* Today's weather highlight */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-blue-50 dark:bg-blue-950">
                <div>
                  <h3 className="text-lg font-semibold">Today ({location.forecast[0].date})</h3>
                  <div className="flex items-center mt-1">
                    <Thermometer className="h-4 w-4 mr-1 text-red-500" />
                    <span className="text-2xl font-bold">{location.forecast[0].temp}°C</span>
                  </div>
                  <div className="flex flex-col text-sm mt-2 text-gray-600 dark:text-gray-300">
                    <div className="flex items-center">
                      <Droplets className="h-3 w-3 mr-1" />
                      <span>Humidity: {location.forecast[0].humidity}%</span>
                    </div>
                    <div className="flex items-center">
                      <Wind className="h-3 w-3 mr-1" />
                      <span>Wind: {location.forecast[0].windSpeed} km/h</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  {getWeatherIcon(location.forecast[0].condition)}
                  <span className="mt-1 text-sm capitalize">
                    {location.forecast[0].condition.replace(/-/g, ' ')}
                  </span>
                </div>
              </div>
              
              {/* 7-day forecast */}
              <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
                {location.forecast.map((day, index) => (
                  <div 
                    key={index} 
                    className={`p-2 rounded-lg text-center ${
                      index === 0 ? 'bg-blue-50 dark:bg-blue-950' : 'bg-gray-50 dark:bg-gray-800'
                    }`}
                  >
                    <p className="text-xs font-medium">{day.day}</p>
                    <p className="text-xs text-gray-500">{day.date}</p>
                    <div className="my-2 flex justify-center">
                      {getWeatherIcon(day.condition)}
                    </div>
                    <p className="text-sm font-bold">{day.temp}°C</p>
                  </div>
                ))}
              </div>
              
              <p className="text-xs text-gray-500 mt-2">
                Weather data is updated daily. Last updated: {new Date().toLocaleString()}
              </p>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

const WeatherSkeleton = () => (
  <Card className="w-full">
    <CardHeader className="pb-2">
      <Skeleton className="h-6 w-[180px]" />
      <Skeleton className="h-4 w-[220px] mt-2" />
    </CardHeader>
    <CardContent>
      <div className="flex gap-2 mb-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-24" />
        ))}
      </div>
      
      <Skeleton className="h-32 w-full mb-4" />
      
      <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-28 w-full" />
        ))}
      </div>
    </CardContent>
  </Card>
);

export default WeatherForecast;
