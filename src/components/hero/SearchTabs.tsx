
import React from 'react';
import { Bed, Car, Bike, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SearchTabs: React.FC<SearchTabsProps> = ({ activeTab, setActiveTab }) => {
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
