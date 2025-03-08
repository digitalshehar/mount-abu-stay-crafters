
import React from "react";
import HotelInfoMain from "./HotelInfoMain";
import HotelFaq from "./HotelFaq";
import HotelRegionInfo from "./HotelRegionInfo";
import HotelInfoSection from "./HotelInfoSection";

// Add popular travel seasons component
const TravelSeasons = () => {
  return (
    <div className="bg-white p-6 rounded-lg border border-stone-200 mt-6">
      <h3 className="font-medium text-lg mb-4">Mount Abu Travel Seasons</h3>
      
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 bg-green-50 p-4 rounded-lg border border-green-100">
            <h4 className="font-medium text-green-800 mb-2">Peak Season</h4>
            <p className="text-sm text-green-700">October to March</p>
            <ul className="mt-2 text-sm text-green-700 space-y-1">
              <li>• Pleasant weather (12°C-25°C)</li>
              <li>• Higher hotel rates</li>
              <li>• Popular for winter holidays</li>
              <li>• Advance booking recommended</li>
            </ul>
          </div>
          
          <div className="flex-1 bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h4 className="font-medium text-blue-800 mb-2">Monsoon Season</h4>
            <p className="text-sm text-blue-700">July to September</p>
            <ul className="mt-2 text-sm text-blue-700 space-y-1">
              <li>• Lush green landscapes</li>
              <li>• Occasional rain showers</li>
              <li>• Lower hotel rates</li>
              <li>• Less crowded attractions</li>
            </ul>
          </div>
          
          <div className="flex-1 bg-orange-50 p-4 rounded-lg border border-orange-100">
            <h4 className="font-medium text-orange-800 mb-2">Summer Season</h4>
            <p className="text-sm text-orange-700">April to June</p>
            <ul className="mt-2 text-sm text-orange-700 space-y-1">
              <li>• Warmer days (23°C-35°C)</li>
              <li>• Moderate hotel rates</li>
              <li>• Popular for summer vacations</li>
              <li>• Evening activities recommended</li>
            </ul>
          </div>
        </div>
        
        <p className="text-sm text-stone-600">
          Mount Abu is a year-round destination, but the best time to visit depends on your preferences for weather and crowd levels. Peak season offers the most pleasant climate but comes with higher prices and more tourists.
        </p>
      </div>
    </div>
  );
};

const HotelInfoSections = () => {
  return (
    <>
      <HotelInfoMain />
      
      <HotelInfoSection title="Best Time to Visit Mount Abu">
        <TravelSeasons />
      </HotelInfoSection>
      
      <HotelRegionInfo />
      <HotelFaq />
    </>
  );
};

export default HotelInfoSections;
