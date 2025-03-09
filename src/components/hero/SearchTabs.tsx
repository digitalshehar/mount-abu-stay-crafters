
import { useState } from "react";

interface SearchTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SearchTabs = ({ activeTab, setActiveTab }: SearchTabsProps) => {
  const tabs = [
    { id: "hotels", label: "Hotels" },
    { id: "cars", label: "Car Rentals" },
    { id: "bikes", label: "Bike Rentals" },
    { id: "activities", label: "Activities" },
  ];

  return (
    <div className="flex overflow-x-auto scrollbar-hide border-b space-x-1 md:space-x-4 mb-4 md:mb-6 pb-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`pb-2 px-3 md:px-4 whitespace-nowrap font-medium transition-colors ${
            activeTab === tab.id
              ? "text-primary border-b-2 border-primary"
              : "text-stone-500 hover:text-stone-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default SearchTabs;
