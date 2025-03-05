
import React, { useState } from "react";
import { CalendarRange, Users, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

interface BookingPanelProps {
  hotelName: string;
  basePrice: number;
}

const HotelBookingPanel: React.FC<BookingPanelProps> = ({ hotelName, basePrice }) => {
  const { toast } = useToast();
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined);
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState(2);
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isCheckOutOpen, setIsCheckOutOpen] = useState(false);

  const handleBookNow = () => {
    if (!checkIn || !checkOut) {
      toast({
        title: "Missing dates",
        description: "Please select check-in and check-out dates.",
        variant: "destructive",
      });
      return;
    }

    if (checkOut <= checkIn) {
      toast({
        title: "Invalid dates",
        description: "Check-out date must be after check-in date.",
        variant: "destructive",
      });
      return;
    }

    // Calculate the number of nights
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    
    toast({
      title: "Booking request received",
      description: `Your booking request for ${hotelName} has been received. Total: ₹${basePrice * nights} for ${nights} nights.`,
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 sticky top-24">
      <h3 className="text-xl font-semibold mb-4">Book Your Stay</h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="check-in">Check-in</Label>
            <Popover open={isCheckInOpen} onOpenChange={setIsCheckInOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  id="check-in"
                >
                  <CalendarRange className="mr-2 h-4 w-4" />
                  {checkIn ? format(checkIn, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={checkIn}
                  onSelect={(date) => {
                    setCheckIn(date);
                    setIsCheckInOpen(false);
                  }}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="check-out">Check-out</Label>
            <Popover open={isCheckOutOpen} onOpenChange={setIsCheckOutOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  id="check-out"
                >
                  <CalendarRange className="mr-2 h-4 w-4" />
                  {checkOut ? format(checkOut, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={checkOut}
                  onSelect={(date) => {
                    setCheckOut(date);
                    setIsCheckOutOpen(false);
                  }}
                  initialFocus
                  disabled={(date) => date < (checkIn || new Date())}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="guests">Guests</Label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-500 h-4 w-4" />
            <Input
              id="guests"
              type="number"
              min={1}
              max={10}
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="pt-4 border-t border-stone-200">
          <div className="flex justify-between mb-2">
            <span>Base price per night</span>
            <span>₹{basePrice}</span>
          </div>
          
          {checkIn && checkOut && (
            <>
              <div className="flex justify-between mb-2">
                <span>
                  {Math.ceil(
                    (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
                  )}{" "}
                  nights
                </span>
                <span>
                  ₹
                  {basePrice *
                    Math.ceil(
                      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
                    )}
                </span>
              </div>
              <div className="flex justify-between font-semibold mb-4">
                <span>Total (incl. taxes)</span>
                <span>
                  ₹
                  {Math.ceil(
                    basePrice *
                      Math.ceil(
                        (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
                      ) *
                      1.18
                  )}
                </span>
              </div>
            </>
          )}
        </div>
        
        <Button className="w-full" size="lg" onClick={handleBookNow}>
          <CreditCard className="mr-2 h-4 w-4" /> Book Now
        </Button>
        
        <p className="text-xs text-center text-stone-500 mt-2">
          You won't be charged yet. Payment will be collected at the property.
        </p>
      </div>
    </div>
  );
};

export default HotelBookingPanel;
