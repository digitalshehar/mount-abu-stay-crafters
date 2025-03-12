
import React, { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { isWithinInterval, isSameDay, format, addDays, differenceInDays } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';

// Define the props for the component
interface RoomAvailabilityCalendarProps {
  roomId: number;
  roomType: string;
  onDateSelection?: (dates: { from: Date; to: Date }) => void;
}

// Type for date range
interface DateRange {
  from: Date;
  to?: Date;
}

// Mock data for unavailable dates
const unavailableDateRanges = [
  { from: new Date(2023, 11, 24), to: new Date(2023, 11, 26) }, // Dec 24-26
  { from: new Date(2023, 11, 31), to: new Date(2024, 0, 2) },   // Dec 31-Jan 2
  { from: new Date(2024, 0, 10), to: new Date(2024, 0, 15) },   // Jan 10-15
];

// Mock data for special rates
const specialRates = [
  { date: new Date(2023, 11, 20), price: 4500 }, // Dec 20
  { date: new Date(2023, 11, 21), price: 4500 }, // Dec 21
  { date: new Date(2024, 0, 5), price: 6000 },   // Jan 5
  { date: new Date(2024, 0, 6), price: 6000 },   // Jan 6
];

// Function to check if a date is unavailable
const isDateUnavailable = (date: Date) => {
  return unavailableDateRanges.some(range => 
    isWithinInterval(date, { start: range.from, end: range.to })
  );
};

// Function to get special price for a date if available
const getSpecialPrice = (date: Date) => {
  const specialRate = specialRates.find(rate => isSameDay(rate.date, date));
  return specialRate ? specialRate.price : null;
};

// Function to calculate total nights between two dates
const calculateNights = (from: Date, to: Date) => {
  return differenceInDays(to, from);
};

// Function to calculate the total price for a stay
const calculateTotalPrice = (from: Date, to: Date, basePrice: number) => {
  let total = 0;
  let currentDate = new Date(from);
  
  while (currentDate <= to) {
    const specialPrice = getSpecialPrice(currentDate);
    total += specialPrice ? specialPrice : basePrice;
    currentDate = addDays(currentDate, 1);
  }
  
  return total;
};

const RoomAvailabilityCalendar: React.FC<RoomAvailabilityCalendarProps> = ({ 
  roomId, 
  roomType, 
  onDateSelection 
}) => {
  const [date, setDate] = useState<DateRange>({ from: new Date(), to: addDays(new Date(), 3) });
  const [basePrice] = useState(5000); // Base price per night in ₹
  const { toast } = useToast();
  
  // Calculate total nights and price
  const nights = date.to ? calculateNights(date.from, date.to) : 0;
  const totalPrice = date.to ? calculateTotalPrice(date.from, date.to, basePrice) : 0;
  
  // Call the onDateSelection callback when dates change
  useEffect(() => {
    if (date.from && date.to && onDateSelection) {
      onDateSelection({ from: date.from, to: date.to });
    }
  }, [date, onDateSelection]);
  
  const handleBookNow = () => {
    if (!date.to) {
      toast({
        title: "Please select a check-out date",
        description: "You need to select both check-in and check-out dates to proceed.",
        variant: "destructive"
      });
      return;
    }
    
    // Check if any selected date is unavailable
    let currentDate = new Date(date.from);
    while (currentDate <= date.to) {
      if (isDateUnavailable(currentDate)) {
        toast({
          title: "Invalid selection",
          description: "Your selected dates include unavailable days. Please adjust your selection.",
          variant: "destructive"
        });
        return;
      }
      currentDate = addDays(currentDate, 1);
    }
    
    toast({
      title: "Booking initiated",
      description: `You're booking ${roomType} for ${nights} nights (${format(date.from, 'MMM d')} - ${format(date.to, 'MMM d')})`
    });
    
    // In a real app, this would navigate to a booking form or add to cart
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Check Availability</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2 mb-2 text-sm">
          <div>
            <span className="font-medium">Check-in:</span>
            <div className="mt-1">{date.from ? format(date.from, 'EEEE, MMMM d, yyyy') : 'Select date'}</div>
          </div>
          <div>
            <span className="font-medium">Check-out:</span>
            <div className="mt-1">{date.to ? format(date.to, 'EEEE, MMMM d, yyyy') : 'Select date'}</div>
          </div>
        </div>
        
        <div className="border rounded-md p-1">
          <Calendar
            // Fixed the CaptionLayout type error by using a valid value
            captionLayout="dropdown"
            mode="range"
            defaultMonth={date.from}
            selected={date}
            onSelect={setDate as any}
            numberOfMonths={2}
            disabled={[
              (date) => isDateUnavailable(date),
              (date) => date < new Date()
            ]}
            modifiers={{
              special: (date) => specialRates.some(rate => isSameDay(rate.date, date))
            }}
            modifiersStyles={{
              special: { backgroundColor: '#f0f9ff', color: '#0369a1' }
            }}
            className="w-full"
          />
        </div>
        
        <div className="text-sm space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
              Unavailable
            </Badge>
            <span>Dates that are already booked</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Special Rate
            </Badge>
            <span>Dates with special pricing</span>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Base rate per night:</span>
            <span>₹{basePrice.toLocaleString()}</span>
          </div>
          {date.to && (
            <>
              <div className="flex justify-between text-sm">
                <span>Total nights:</span>
                <span>{nights}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total price:</span>
                <span>₹{totalPrice.toLocaleString()}</span>
              </div>
            </>
          )}
        </div>
        
        <Button 
          className="w-full" 
          onClick={handleBookNow}
          disabled={!date.to}
        >
          Book Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default RoomAvailabilityCalendar;
