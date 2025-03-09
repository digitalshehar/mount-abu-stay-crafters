
import React from "react";
import { Check, Info, Clock, CreditCard, Calendar, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface HotelSidebarProps {
  hotel: any;
  onSelectRooms: () => void;
}

const HotelSidebar = ({ hotel, onSelectRooms }: HotelSidebarProps) => {
  if (!hotel) return null;
  
  return (
    <div className="sticky top-24 space-y-4">
      {/* Price Overview Card */}
      <div className="bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden">
        <div className="bg-blue-600 text-white p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Price</h3>
            <div className="text-sm bg-blue-500 px-2 py-1 rounded">Best Available Rate</div>
          </div>
          <div className="mt-2 flex items-baseline">
            <span className="text-2xl font-bold">₹{hotel.price?.toLocaleString()}</span>
            <span className="text-sm ml-1">/night</span>
          </div>
          <div className="mt-1 text-xs text-blue-100">Includes taxes and fees</div>
        </div>
        
        <div className="p-4">
          <Button 
            onClick={onSelectRooms} 
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            Select Rooms
          </Button>
          
          <div className="mt-4 space-y-3">
            <div className="flex items-start">
              <Check className="h-4 w-4 text-green-600 mt-0.5 mr-2" />
              <div className="text-sm">
                <span className="font-medium">Free cancellation</span>
                <p className="text-stone-500 text-xs mt-0.5">Until 24 hours before check-in</p>
              </div>
            </div>
            <div className="flex items-start">
              <Check className="h-4 w-4 text-green-600 mt-0.5 mr-2" />
              <div className="text-sm">
                <span className="font-medium">No prepayment needed</span>
                <p className="text-stone-500 text-xs mt-0.5">Pay at the property</p>
              </div>
            </div>
            <div className="flex items-start">
              <Info className="h-4 w-4 text-blue-600 mt-0.5 mr-2" />
              <div className="text-sm text-blue-600">
                <span className="font-medium">Only {Math.floor(Math.random() * 5) + 1} rooms left at this price!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hotel Highlights */}
      <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-4">
        <h3 className="font-medium mb-3">Hotel Highlights</h3>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 text-stone-400 mr-2" />
            <span>{hotel.location}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 text-stone-400 mr-2" />
            <div>
              <div>Check-in: {hotel.checkInTime || "2:00 PM"}</div>
              <div>Check-out: {hotel.checkOutTime || "12:00 PM"}</div>
            </div>
          </div>
          <Separator className="my-3" />
          <div className="grid grid-cols-2 gap-2">
            {hotel.amenities?.slice(0, 6).map((amenity: string, index: number) => (
              <div key={index} className="flex items-center text-sm">
                <Check className="h-3 w-3 text-green-600 mr-1 flex-shrink-0" />
                <span className="truncate">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Contact Information */}
      <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-4">
        <h3 className="font-medium mb-3">Contact Information</h3>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Phone className="h-4 w-4 text-stone-400 mr-2" />
            <span>{hotel.contactInfo?.phone || "+91 2974 238901"}</span>
          </div>
          <div className="flex items-center text-sm">
            <Mail className="h-4 w-4 text-stone-400 mr-2" />
            <span>{hotel.contactInfo?.email || "info@" + hotel.name.toLowerCase().replace(/\s+/g, '') + ".com"}</span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 text-stone-400 mr-2" />
            <span>{hotel.address}</span>
          </div>
        </div>
      </div>
      
      {/* Payment Options */}
      <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-4">
        <h3 className="font-medium mb-3">Payment Options</h3>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <CreditCard className="h-4 w-4 text-stone-400 mr-2" />
            <span>Credit/Debit Cards</span>
          </div>
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 text-stone-400 mr-2" />
            <span>Pay at Hotel</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelSidebar;
