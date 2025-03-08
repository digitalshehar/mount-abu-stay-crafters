
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface HotelTabNavigationProps {
  activeTab: string;
  onChange: (value: string) => void;
}

const HotelTabNavigation = ({ activeTab, onChange }: HotelTabNavigationProps) => {
  return (
    <div className="bg-white rounded-t-lg border border-b-0 border-stone-200">
      <TabsList className="w-full justify-start overflow-x-auto rounded-none bg-transparent border-b border-stone-200 p-0">
        <TabsTrigger 
          value="rooms" 
          className="rounded-none py-3 px-5 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Rooms & Rates
        </TabsTrigger>
        <TabsTrigger 
          value="facilities" 
          className="rounded-none py-3 px-5 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Facilities
        </TabsTrigger>
        <TabsTrigger 
          value="reviews" 
          className="rounded-none py-3 px-5 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Reviews
        </TabsTrigger>
        <TabsTrigger 
          value="questions" 
          className="rounded-none py-3 px-5 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Q&A
        </TabsTrigger>
        <TabsTrigger 
          value="accessibility" 
          className="rounded-none py-3 px-5 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Accessibility
        </TabsTrigger>
        <TabsTrigger 
          value="transport" 
          className="rounded-none py-3 px-5 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Transport
        </TabsTrigger>
        <TabsTrigger 
          value="events" 
          className="rounded-none py-3 px-5 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Local Events
        </TabsTrigger>
        <TabsTrigger 
          value="policies" 
          className="rounded-none py-3 px-5 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Policies
        </TabsTrigger>
        <TabsTrigger 
          value="about" 
          className="rounded-none py-3 px-5 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          About
        </TabsTrigger>
      </TabsList>
    </div>
  );
};

export default HotelTabNavigation;
