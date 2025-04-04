
import React from 'react';
import { Bed, Car, Bike, Compass, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  bookingTypes?: Array<{id: string, label: string, badge?: string}>;
}

const SearchTabs: React.FC<SearchTabsProps> = ({ activeTab, setActiveTab, bookingTypes }) => {
  // If bookingTypes are provided, use them; otherwise, use the default tabs
  if (bookingTypes) {
    return (
      <div className="flex overflow-x-auto space-x-1 pb-2 -mx-1 px-1">
        {bookingTypes.map((type) => {
          // Define icon mapping
          const iconMap: Record<string, React.ReactNode> = {
            hotels: <Bed className="h-4 w-4 mr-2" />,
            homes: <Home className="h-4 w-4 mr-2" />,
            activities: <Compass className="h-4 w-4 mr-2" />,
            cars: <Car className="h-4 w-4 mr-2" />,
            bikes: <Bike className="h-4 w-4 mr-2" />
          };
          
          return (
            <button
              key={type.id}
              onClick={() => setActiveTab(type.id)}
              className={cn(
                "flex items-center justify-center whitespace-nowrap px-4 py-2 text-sm font-medium rounded-lg flex-1 transition-colors relative",
                activeTab === type.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {iconMap[type.id] || null}
              {type.label}
              {type.badge && (
                <span className={cn(
                  "absolute -top-2 -right-2 text-[10px] font-bold px-1.5 py-0.5 rounded",
                  type.badge === "New!" ? "bg-red-500 text-white" : "bg-amber-100 text-amber-800"
                )}>
                  {type.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }
  
  // Default tabs if no bookingTypes provided
  const tabs = [
    { id: 'hotels', label: 'Hotels', icon: Bed },
    { id: 'cars', label: 'Cars', icon: Car },
    { id: 'bikes', label: 'Bikes', icon: Bike },
    { id: 'activities', label: 'Activities', icon: Compass },
  ];

  return (
    <div className="flex overflow-x-auto space-x-1 pb-2 -mx-1 px-1">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center justify-center whitespace-nowrap px-4 py-2 text-sm font-medium rounded-lg flex-1 transition-colors",
              activeTab === tab.id
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4 mr-2" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default SearchTabs;
