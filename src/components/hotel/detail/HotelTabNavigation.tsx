
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bed, 
  Coffee, 
  Star, 
  MessageCircle, 
  Wheelchair, 
  Car, 
  Calendar, 
  FileText, 
  Info,
  Route
} from "lucide-react";

interface HotelTabNavigationProps {
  activeTab: string;
  onChange: (value: string) => void;
}

const HotelTabNavigation = ({ activeTab, onChange }: HotelTabNavigationProps) => {
  return (
    <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 h-auto p-0 bg-white rounded-t-lg border border-stone-200 mb-0">
      <TabsTrigger
        value="rooms"
        className={`flex items-center gap-1 py-2 rounded-none border-r border-stone-200 data-[state=active]:shadow-none ${
          activeTab === "rooms" ? "border-b-2 border-b-primary" : "border-b"
        }`}
        onClick={() => onChange("rooms")}
      >
        <Bed className="h-4 w-4" />
        <span className="hidden sm:inline-block">Rooms</span>
      </TabsTrigger>
      
      <TabsTrigger
        value="facilities"
        className={`flex items-center gap-1 py-2 rounded-none border-r border-stone-200 data-[state=active]:shadow-none ${
          activeTab === "facilities" ? "border-b-2 border-b-primary" : "border-b"
        }`}
        onClick={() => onChange("facilities")}
      >
        <Coffee className="h-4 w-4" />
        <span className="hidden sm:inline-block">Facilities</span>
      </TabsTrigger>
      
      <TabsTrigger
        value="reviews"
        className={`flex items-center gap-1 py-2 rounded-none border-r border-stone-200 data-[state=active]:shadow-none ${
          activeTab === "reviews" ? "border-b-2 border-b-primary" : "border-b"
        }`}
        onClick={() => onChange("reviews")}
      >
        <Star className="h-4 w-4" />
        <span className="hidden sm:inline-block">Reviews</span>
      </TabsTrigger>
      
      <TabsTrigger
        value="questions"
        className={`flex items-center gap-1 py-2 rounded-none border-r border-stone-200 data-[state=active]:shadow-none ${
          activeTab === "questions" ? "border-b-2 border-b-primary" : "border-b"
        }`}
        onClick={() => onChange("questions")}
      >
        <MessageCircle className="h-4 w-4" />
        <span className="hidden sm:inline-block">Q&A</span>
      </TabsTrigger>
      
      <TabsTrigger
        value="accessibility"
        className={`flex items-center gap-1 py-2 rounded-none border-r border-stone-200 data-[state=active]:shadow-none ${
          activeTab === "accessibility" ? "border-b-2 border-b-primary" : "border-b"
        }`}
        onClick={() => onChange("accessibility")}
      >
        <Wheelchair className="h-4 w-4" />
        <span className="hidden sm:inline-block">Accessibility</span>
      </TabsTrigger>
      
      <TabsTrigger
        value="transport"
        className={`flex items-center gap-1 py-2 rounded-none border-r border-stone-200 data-[state=active]:shadow-none ${
          activeTab === "transport" ? "border-b-2 border-b-primary" : "border-b"
        }`}
        onClick={() => onChange("transport")}
      >
        <Car className="h-4 w-4" />
        <span className="hidden sm:inline-block">Transport</span>
      </TabsTrigger>
      
      <TabsTrigger
        value="events"
        className={`flex items-center gap-1 py-2 rounded-none border-r border-stone-200 data-[state=active]:shadow-none ${
          activeTab === "events" ? "border-b-2 border-b-primary" : "border-b"
        }`}
        onClick={() => onChange("events")}
      >
        <Calendar className="h-4 w-4" />
        <span className="hidden sm:inline-block">Events</span>
      </TabsTrigger>
      
      <TabsTrigger
        value="itineraries"
        className={`flex items-center gap-1 py-2 rounded-none border-r border-stone-200 data-[state=active]:shadow-none ${
          activeTab === "itineraries" ? "border-b-2 border-b-primary" : "border-b"
        }`}
        onClick={() => onChange("itineraries")}
      >
        <Route className="h-4 w-4" />
        <span className="hidden sm:inline-block">Itineraries</span>
      </TabsTrigger>
      
      <TabsTrigger
        value="policies"
        className={`flex items-center gap-1 py-2 rounded-none border-r border-stone-200 data-[state=active]:shadow-none ${
          activeTab === "policies" ? "border-b-2 border-b-primary" : "border-b"
        }`}
        onClick={() => onChange("policies")}
      >
        <FileText className="h-4 w-4" />
        <span className="hidden sm:inline-block">Policies</span>
      </TabsTrigger>
      
      <TabsTrigger
        value="about"
        className={`flex items-center gap-1 py-2 rounded-none data-[state=active]:shadow-none ${
          activeTab === "about" ? "border-b-2 border-b-primary" : "border-b"
        }`}
        onClick={() => onChange("about")}
      >
        <Info className="h-4 w-4" />
        <span className="hidden sm:inline-block">About</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default HotelTabNavigation;
