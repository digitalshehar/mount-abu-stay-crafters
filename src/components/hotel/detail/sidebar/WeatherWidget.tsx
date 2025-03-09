
import React from 'react';
import { Separator } from "@/components/ui/separator";

const WeatherWidget: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-stone-200 p-6 shadow-sm">
      <h3 className="font-semibold text-lg mb-4">Current Weather</h3>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-semibold">26°C</p>
          <p className="text-sm text-stone-500">Partly Cloudy</p>
        </div>
        <div className="text-yellow-500">
          ☀️
        </div>
      </div>
      <Separator className="my-3" />
      <div className="flex justify-between items-center text-sm">
        <div className="text-center">
          <p className="font-medium">Fri</p>
          <p>25°C</p>
        </div>
        <div className="text-center">
          <p className="font-medium">Sat</p>
          <p>27°C</p>
        </div>
        <div className="text-center">
          <p className="font-medium">Sun</p>
          <p>24°C</p>
        </div>
        <div className="text-center">
          <p className="font-medium">Mon</p>
          <p>25°C</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
