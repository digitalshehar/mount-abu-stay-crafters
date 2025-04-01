
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bed, Coffee, AlertCircle, Star, MapPin, Bus, Shield, ChartLine } from 'lucide-react';

interface HotelTabNavigationProps {
  activeTab: string;
  onChange: (value: string) => void;
}

const HotelTabNavigation: React.FC<HotelTabNavigationProps> = ({ activeTab, onChange }) => {
  const tabs = [
    { id: 'rooms', label: 'Rooms', icon: <Bed className="h-4 w-4 mr-2" /> },
    { id: 'amenities', label: 'Amenities', icon: <Coffee className="h-4 w-4 mr-2" /> },
    { id: 'policies', label: 'Policies', icon: <AlertCircle className="h-4 w-4 mr-2" /> },
    { id: 'reviews', label: 'Reviews', icon: <Star className="h-4 w-4 mr-2" /> },
    { id: 'attractions', label: 'Attractions', icon: <MapPin className="h-4 w-4 mr-2" /> },
    { id: 'transport', label: 'Transport', icon: <Bus className="h-4 w-4 mr-2" /> },
    { id: 'safety', label: 'Safety', icon: <Shield className="h-4 w-4 mr-2" /> },
    { id: 'price-history', label: 'Price History', icon: <ChartLine className="h-4 w-4 mr-2" /> },
  ];

  return (
    <TabsList className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 w-full bg-muted mb-6">
      {tabs.map((tab) => (
        <TabsTrigger 
          key={tab.id} 
          value={tab.id}
          className={`flex items-center`}
          onClick={() => onChange(tab.id)}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default HotelTabNavigation;
