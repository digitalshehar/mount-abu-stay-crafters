
import React from "react";
import { useWeather } from "@/hooks/useWeather";
import WeatherWidgetExtended from "@/components/WeatherWidgetExtended";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const WeatherWidgetCard = () => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Current Weather</CardTitle>
      </CardHeader>
      <CardContent>
        <WeatherWidgetExtended city="Mount Abu" />
      </CardContent>
    </Card>
  );
};

export default WeatherWidgetCard;
