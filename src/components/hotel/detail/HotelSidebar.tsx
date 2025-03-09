
import React from "react";
import PriceOverview from "./sidebar/PriceOverview";
import PriceMatchGuarantee from "./sidebar/PriceMatchGuarantee";
import ContactLocation from "./sidebar/ContactLocation";
import QuickActions from "./sidebar/QuickActions";
import WeatherWidget from "./sidebar/WeatherWidget";
import UpcomingEvents from "./sidebar/UpcomingEvents";

interface HotelSidebarProps {
  hotel: any;
  onSelectRooms: () => void;
}

const HotelSidebar = ({ hotel, onSelectRooms }: HotelSidebarProps) => {
  return (
    <div className="sticky top-24 space-y-6">
      <PriceOverview hotel={hotel} onSelectRooms={onSelectRooms} />
      <PriceMatchGuarantee />
      <ContactLocation hotel={hotel} />
      <QuickActions hotel={hotel} onSelectRooms={onSelectRooms} />
      <WeatherWidget />
      <UpcomingEvents hotel={hotel} />
    </div>
  );
};

export default HotelSidebar;
