
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bed, 
  Coffee, 
  FileText, 
  MessageSquare, 
  Map, 
  Car, 
  Shield, 
  TrendingUp 
} from 'lucide-react';

interface HotelTabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const HotelTabNavigation: React.FC<HotelTabNavigationProps> = ({
  activeTab,
  setActiveTab
}) => {
  const tabs = [
    { id: 'rooms', label: 'Rooms', icon: <Bed className="h-4 w-4 mr-2" /> },
    { id: 'amenities', label: 'Amenities', icon: <Coffee className="h-4 w-4 mr-2" /> },
    { id: 'policies', label: 'Policies', icon: <FileText className="h-4 w-4 mr-2" /> },
    { id: 'reviews', label: 'Reviews', icon: <MessageSquare className="h-4 w-4 mr-2" /> },
    { id: 'attractions', label: 'Attractions', icon: <Map className="h-4 w-4 mr-2" /> },
    { id: 'transport', label: 'Transport', icon: <Car className="h-4 w-4 mr-2" /> },
    { id: 'safety', label: 'Safety', icon: <Shield className="h-4 w-4 mr-2" /> },
    { id: 'price-history', label: 'Price History', icon: <TrendingUp className="h-4 w-4 mr-2" /> }
  ];

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="w-full h-auto overflow-x-auto flex-wrap justify-start p-1 bg-stone-100">
        {tabs.map(tab => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className="flex items-center data-[state=active]:bg-white"
          >
            {tab.icon}
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default HotelTabNavigation;
