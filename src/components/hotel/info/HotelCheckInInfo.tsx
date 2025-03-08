
import React from "react";
import { Clock } from "lucide-react";

const HotelCheckInInfo = () => {
  return (
    <div className="bg-stone-50 p-4 rounded-lg border border-stone-100">
      <div className="flex items-center mb-3">
        <Clock className="h-5 w-5 text-primary mr-2" />
        <h3 className="font-medium">Check-in & Check-out</h3>
      </div>
      <div className="space-y-2 text-stone-600 text-sm">
        <div className="flex justify-between">
          <span>Check-in:</span>
          <span className="font-medium">2:00 PM - 10:00 PM</span>
        </div>
        <div className="flex justify-between">
          <span>Check-out:</span>
          <span className="font-medium">Until 12:00 PM</span>
        </div>
        <div className="flex justify-between">
          <span>Reception:</span>
          <span className="font-medium">24/7</span>
        </div>
      </div>
    </div>
  );
};

export default HotelCheckInInfo;
