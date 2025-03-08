
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar, Check, Map, Phone, Mail, MessageCircle, CalendarDays
} from "lucide-react";

interface HotelSidebarProps {
  hotel: any;
  onSelectRooms: () => void;
}

const HotelSidebar = ({ hotel, onSelectRooms }: HotelSidebarProps) => {
  return (
    <div className="sticky top-24 space-y-6">
      <div className="bg-white rounded-lg border border-stone-200 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Price Overview</h3>
          <Badge className="bg-green-500">Best value</Badge>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-stone-600">Room rates from</span>
            <span className="font-semibold text-xl">₹{hotel.price}</span>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-stone-500">+ ₹{Math.round(hotel.price * 0.18)} taxes & fees</span>
            <span className="text-stone-500">per night</span>
          </div>
          
          <Button 
            className="w-full gap-2 mt-2" 
            onClick={onSelectRooms}
          >
            <Calendar className="h-4 w-4" />
            Select Rooms
          </Button>
          
          <p className="text-xs text-green-600 flex items-center justify-center mt-2">
            <Check className="h-3 w-3 mr-1" />
            Free cancellation on most rooms
          </p>
        </div>
      </div>

      {/* Price Match Guarantee */}
      <div className="bg-white rounded-lg border border-stone-200 p-6 shadow-sm">
        <h3 className="font-semibold text-lg mb-3">Price Match Guarantee</h3>
        <p className="text-sm text-stone-600 mb-2">
          Found this hotel cheaper elsewhere? We'll match the price and give you an additional 10% off.
        </p>
        <Button variant="outline" size="sm" className="w-full">
          Claim Price Match
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-stone-200 p-6 shadow-sm">
        <h3 className="font-semibold text-lg mb-4">Contact & Location</h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <Map className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
            <div>
              <p className="font-medium">Address</p>
              <p className="text-sm text-stone-600">{hotel.address || `${hotel.location}, India`}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Phone className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
            <div>
              <p className="font-medium">Phone</p>
              <p className="text-sm text-stone-600">{hotel.contactInfo?.phone || "+91 2974 123456"}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Mail className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
            <div>
              <p className="font-medium">Email</p>
              <p className="text-sm text-stone-600">{hotel.contactInfo?.email || "info@hotelinmountabu.com"}</p>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <p className="font-medium">Nearby Landmarks</p>
            {Object.entries(hotel.landmarks || {
              "Airport": "100 km",
              "Bus Station": "1.5 km",
              "City Center": "0.5 km"
            }).map(([key, value], idx) => (
              <div key={idx} className="flex justify-between text-sm">
                <span className="text-stone-600">{key}</span>
                <span className="text-stone-800">{value?.toString() || ""}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-stone-200 p-6 shadow-sm">
        <div className="flex items-center mb-4">
          <MessageCircle className="h-5 w-5 text-primary mr-2" />
          <h3 className="font-semibold text-lg">Quick Actions</h3>
        </div>
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full justify-start text-left"
            onClick={() => onSelectRooms()}
          >
            Ask a Question
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start text-left"
            onClick={() => onSelectRooms()}
          >
            Book Transportation
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start text-left"
            onClick={() => onSelectRooms()}
          >
            Explore Local Events
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start text-left"
            onClick={() => onSelectRooms()}
          >
            View Accessibility Features
          </Button>
        </div>
      </div>

      {/* Weather widget */}
      <div className="bg-white rounded-lg border border-stone-200 p-6 shadow-sm">
        <h3 className="font-semibold text-lg mb-4">Current Weather</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-semibold">26°C</p>
            <p className="text-sm text-stone-500">Partly Cloudy</p>
          </div>
          <div className="text-yellow-500">
            ☀️
          </div>
        </div>
        <Separator className="my-3" />
        <div className="flex justify-between items-center text-sm">
          <div className="text-center">
            <p className="font-medium">Fri</p>
            <p>25°C</p>
          </div>
          <div className="text-center">
            <p className="font-medium">Sat</p>
            <p>27°C</p>
          </div>
          <div className="text-center">
            <p className="font-medium">Sun</p>
            <p>24°C</p>
          </div>
          <div className="text-center">
            <p className="font-medium">Mon</p>
            <p>25°C</p>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-lg border border-stone-200 p-6 shadow-sm">
        <div className="flex items-center mb-4">
          <CalendarDays className="h-5 w-5 text-primary mr-2" />
          <h3 className="font-semibold text-lg">Upcoming Events</h3>
        </div>
        <div className="space-y-3">
          <div className="bg-stone-50 rounded-md p-3 border border-stone-100">
            <p className="font-medium">Summer Festival</p>
            <p className="text-xs text-stone-500 mt-1">May 15-17 • 1.2 km away</p>
          </div>
          <div className="bg-stone-50 rounded-md p-3 border border-stone-100">
            <p className="font-medium">Crafts Fair</p>
            <p className="text-xs text-stone-500 mt-1">Jun 5-7 • 2.5 km away</p>
          </div>
          <Button 
            variant="link" 
            className="w-full text-sm"
            onClick={onSelectRooms}
          >
            View all events →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HotelSidebar;
