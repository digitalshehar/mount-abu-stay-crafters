
import React, { useState } from "react";
import { Calendar, Users, Shield, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Room {
  type: string;
  price: number;
  capacity: number;
}

interface BookingPanelProps {
  hotel: {
    name: string;
    price: number;
    rooms: Room[];
  };
  onInitiateBooking: () => void;
}

const BookingPanel = ({ hotel, onInitiateBooking }: BookingPanelProps) => {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState("2");
  const [selectedRoom, setSelectedRoom] = useState("");

  const handleBookNow = () => {
    if (!checkInDate || !checkOutDate || !selectedRoom) {
      toast.error("Please fill in all required fields", {
        description: "Check-in date, check-out date and room type are required."
      });
      return;
    }

    onInitiateBooking();
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-stone-100 sticky top-24">
      <h2 className="text-2xl font-display font-semibold mb-2">Book Your Stay</h2>
      <p className="text-2xl font-bold text-primary mb-6">₹{hotel.price}<span className="text-sm font-normal text-stone-500">/night</span></p>
      
      <div className="space-y-4 mb-6">
        <div>
          <label htmlFor="check-in" className="block text-sm font-medium text-stone-600 mb-1">Check-in Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
            <Input 
              id="check-in"
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="check-out" className="block text-sm font-medium text-stone-600 mb-1">Check-out Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
            <Input 
              id="check-out"
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="guests" className="block text-sm font-medium text-stone-600 mb-1">Guests</label>
          <div className="relative">
            <Users className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
            <select
              id="guests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
            >
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
            </select>
          </div>
        </div>
        
        <div>
          <label htmlFor="room-type" className="block text-sm font-medium text-stone-600 mb-1">Room Type</label>
          <select
            id="room-type"
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
          >
            <option value="">Select Room Type</option>
            {hotel.rooms.map((room: Room, index: number) => (
              <option key={index} value={room.type}>
                {room.type} - ₹{room.price}/night
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <Separator className="my-6" />
      
      <div className="space-y-2 mb-6">
        <div className="flex justify-between">
          <span className="text-stone-600">Room charges</span>
          <span>₹{hotel.price}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-stone-600">Taxes & fees</span>
          <span>₹{Math.round(hotel.price * 0.18)}</span>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between font-semibold">
          <span>Total (per night)</span>
          <span>₹{hotel.price + Math.round(hotel.price * 0.18)}</span>
        </div>
      </div>
      
      <Button className="w-full" size="lg" onClick={handleBookNow}>
        Book Now
      </Button>
      
      <div className="mt-4 text-center">
        <div className="text-sm text-stone-500 flex items-center justify-center">
          <Shield className="h-3 w-3 mr-1" /> Best price guaranteed
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-stone-100">
        <h3 className="font-semibold mb-3">Why Book Direct</h3>
        <ul className="space-y-2 text-sm text-stone-600">
          <li className="flex items-start">
            <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
            <span>Best rate guarantee</span>
          </li>
          <li className="flex items-start">
            <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
            <span>Free cancellation up to 48 hours</span>
          </li>
          <li className="flex items-start">
            <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
            <span>No hidden fees</span>
          </li>
          <li className="flex items-start">
            <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
            <span>Priority room allocation</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BookingPanel;
