
import React from "react";
import { Info } from "lucide-react";

const HotelInfoBanner = () => {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 flex items-start">
      <Info className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
      <div>
        <h3 className="font-medium text-blue-700 mb-1">About Mount Abu Hotels</h3>
        <p className="text-sm text-blue-600">
          Mount Abu offers a range of accommodations from luxurious resorts to budget-friendly hotels. 
          Most hotels are located near Nakki Lake and offer beautiful views of the surrounding Aravalli Hills.
          The high season runs from October to March with peak rates, while the monsoon season (July-September) 
          offers lush landscapes at lower prices.
        </p>
      </div>
    </div>
  );
};

export default HotelInfoBanner;
