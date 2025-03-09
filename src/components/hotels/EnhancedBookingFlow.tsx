
import React, { useState } from 'react';
import { CalendarIcon, Clock, CreditCard, Shield, Plus, Minus, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format, addDays, differenceInDays } from 'date-fns';
import { toast } from 'sonner';

interface EnhancedBookingFlowProps {
  hotelName: string;
  roomTypes: Array<{
    type: string;
    price: number;
    capacity: number;
    available: number;
  }>;
  onBookingComplete?: (bookingData: any) => void;
}

const EnhancedBookingFlow: React.FC<EnhancedBookingFlowProps> = ({
  hotelName,
  roomTypes,
  onBookingComplete
}) => {
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(addDays(new Date(), 2));
  const [guests, setGuests] = useState({ adults: 2, children: 0 });
  const [selectedRoomType, setSelectedRoomType] = useState<string | null>(null);
  const [roomQuantities, setRoomQuantities] = useState<Record<string, number>>({});
  const [bookingStep, setBookingStep] = useState<'selection' | 'confirmation' | 'processing' | 'complete'>('selection');
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [hasInsurance, setHasInsurance] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'upi'>('card');
  
  // Calculate the number of nights
  const nights = checkInDate && checkOutDate 
    ? differenceInDays(checkOutDate, checkInDate) 
    : 0;
  
  // Format the dates for display
  const formattedCheckIn = checkInDate 
    ? format(checkInDate, 'PPP') 
    : 'Select date';
  
  const formattedCheckOut = checkOutDate 
    ? format(checkOutDate, 'PPP') 
    : 'Select date';
  
  // Handle room quantity adjustments
  const updateRoomQuantity = (roomType: string, change: number) => {
    const currentQuantity = roomQuantities[roomType] || 0;
    const newQuantity = Math.max(0, currentQuantity + change);
    
    setRoomQuantities(prev => ({
      ...prev,
      [roomType]: newQuantity
    }));
    
    // If a room is selected, set it as the selected room type
    if (newQuantity > 0 && !selectedRoomType) {
      setSelectedRoomType(roomType);
    }
    
    // If quantity drops to zero, deselect if it was the selected room type
    if (newQuantity === 0 && selectedRoomType === roomType) {
      setSelectedRoomType(null);
    }
  };
  
  // Calculate the total price
  const calculateTotal = () => {
    let total = 0;
    
    roomTypes.forEach(room => {
      const quantity = roomQuantities[room.type] || 0;
      total += room.price * quantity * nights;
    });
    
    // Add insurance if selected (mock 5% of total)
    if (hasInsurance) {
      total += total * 0.05;
    }
    
    return total;
  };
  
  // Proceed to confirmation
  const proceedToConfirmation = () => {
    if (!selectedRoomType || !nights) {
      toast.error("Please complete your selection", {
        description: "You need to select dates and at least one room to continue."
      });
      return;
    }
    
    const details = {
      hotelName,
      checkIn: formattedCheckIn,
      checkOut: formattedCheckOut,
      nights,
      rooms: Object.entries(roomQuantities).map(([type, quantity]) => {
        const roomInfo = roomTypes.find(r => r.type === type);
        return {
          type,
          quantity,
          price: roomInfo?.price || 0
        };
      }).filter(r => r.quantity > 0),
      guests,
      hasInsurance,
      total: calculateTotal()
    };
    
    setBookingDetails(details);
    setBookingStep('confirmation');
  };
  
  // Complete booking
  const completeBooking = () => {
    setBookingStep('processing');
    
    // Simulate API call
    setTimeout(() => {
      setBookingStep('complete');
      
      toast.success("Booking confirmed!", {
        description: `Your booking at ${hotelName} has been confirmed.`
      });
      
      if (onBookingComplete) {
        onBookingComplete(bookingDetails);
      }
    }, 2000);
  };
  
  // Reset the booking process
  const resetBooking = () => {
    setBookingStep('selection');
    setSelectedRoomType(null);
    setRoomQuantities({});
    setHasInsurance(false);
  };
  
  if (bookingStep === 'processing') {
    return (
      <div className="p-6 bg-white rounded-lg border shadow-sm text-center">
        <Loader2 className="h-12 w-12 animate-spin mx-auto text-blue-600 mb-4" />
        <h3 className="text-lg font-semibold mb-2">Processing Your Booking</h3>
        <p className="text-stone-500">Please wait while we confirm your reservation...</p>
      </div>
    );
  }
  
  if (bookingStep === 'complete') {
    return (
      <div className="p-6 bg-white rounded-lg border border-green-100 shadow-sm">
        <div className="text-center mb-6">
          <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-green-700 mb-2">Booking Confirmed!</h3>
          <p className="text-stone-600">
            Your reservation at {hotelName} has been successfully confirmed.
          </p>
        </div>
        
        <div className="bg-stone-50 p-4 rounded-lg mb-4">
          <h4 className="font-medium mb-3 text-sm">Booking Details</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-stone-500">Check-in</span>
              <span>{bookingDetails?.checkIn}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Check-out</span>
              <span>{bookingDetails?.checkOut}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Rooms</span>
              <span>
                {bookingDetails?.rooms.map((r: any) => `${r.quantity} ${r.type}`).join(', ')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Guests</span>
              <span>
                {bookingDetails?.guests.adults} Adults, {bookingDetails?.guests.children} Children
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center font-semibold mb-4">
          <span>Total Amount</span>
          <span className="text-blue-600">₹{bookingDetails?.total.toLocaleString()}</span>
        </div>
        
        <Button onClick={resetBooking} className="w-full">
          Book Another Room
        </Button>
      </div>
    );
  }
  
  if (bookingStep === 'confirmation') {
    return (
      <div className="p-6 bg-white rounded-lg border shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Confirm Your Booking</h3>
        
        <div className="space-y-4 mb-6">
          <div className="bg-blue-50 p-3 rounded-lg">
            <h4 className="font-medium text-blue-700 mb-2">Stay Details</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <div className="text-stone-500">Check-in</div>
                <div className="font-medium">{formattedCheckIn}</div>
              </div>
              <div>
                <div className="text-stone-500">Check-out</div>
                <div className="font-medium">{formattedCheckOut}</div>
              </div>
              <div>
                <div className="text-stone-500">Nights</div>
                <div className="font-medium">{nights}</div>
              </div>
              <div>
                <div className="text-stone-500">Guests</div>
                <div className="font-medium">{guests.adults} Adults, {guests.children} Children</div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Room Selection</h4>
            <div className="space-y-2">
              {Object.entries(roomQuantities)
                .filter(([_, quantity]) => quantity > 0)
                .map(([roomType, quantity]) => {
                  const room = roomTypes.find(r => r.type === roomType);
                  if (!room) return null;
                  
                  return (
                    <div key={roomType} className="flex justify-between items-center p-2 border rounded-lg">
                      <div>
                        <div className="font-medium">{roomType}</div>
                        <div className="text-xs text-stone-500">
                          {quantity} {quantity === 1 ? 'room' : 'rooms'} × {nights} {nights === 1 ? 'night' : 'nights'}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-blue-600">
                          ₹{(room.price * quantity * nights).toLocaleString()}
                        </div>
                        <div className="text-xs text-stone-500">
                          ₹{room.price.toLocaleString()}/night/room
                        </div>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Payment Method</h4>
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant={paymentMethod === 'card' ? 'default' : 'outline'} 
                size="sm" 
                className="flex flex-col h-auto py-2 justify-center items-center"
                onClick={() => setPaymentMethod('card')}
              >
                <CreditCard className="h-5 w-5 mb-1" />
                <span className="text-xs">Card</span>
              </Button>
              <Button 
                variant={paymentMethod === 'paypal' ? 'default' : 'outline'} 
                size="sm" 
                className="flex flex-col h-auto py-2 justify-center items-center"
                onClick={() => setPaymentMethod('paypal')}
              >
                <span className="font-bold text-sm">Pay</span>
                <span className="text-xs">PayPal</span>
              </Button>
              <Button 
                variant={paymentMethod === 'upi' ? 'default' : 'outline'} 
                size="sm" 
                className="flex flex-col h-auto py-2 justify-center items-center"
                onClick={() => setPaymentMethod('upi')}
              >
                <span className="font-bold text-sm">UPI</span>
                <span className="text-xs">Payment</span>
              </Button>
            </div>
          </div>
          
          <div className="bg-stone-50 p-3 rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm">Room charges</span>
              <span className="text-sm">₹{(calculateTotal() - (hasInsurance ? calculateTotal() * 0.05 : 0)).toLocaleString()}</span>
            </div>
            {hasInsurance && (
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">Travel insurance</span>
                <span className="text-sm">₹{(calculateTotal() * 0.05).toLocaleString()}</span>
              </div>
            )}
            <div className="border-t border-stone-200 my-2"></div>
            <div className="flex justify-between items-center font-semibold">
              <span>Total Amount</span>
              <span className="text-blue-600">₹{calculateTotal().toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" className="w-full" onClick={() => setBookingStep('selection')}>
            Back
          </Button>
          <Button className="w-full" onClick={completeBooking}>
            Confirm & Pay
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6 bg-white rounded-lg border shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Book Your Stay</h3>
      
      {/* Date Selection */}
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Check-in</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="w-full justify-start text-left"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formattedCheckIn}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={checkInDate}
                  onSelect={setCheckInDate}
                  initialFocus
                  disabled={date => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">Check-out</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="w-full justify-start text-left"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formattedCheckOut}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={checkOutDate}
                  onSelect={setCheckOutDate}
                  initialFocus
                  disabled={date => !checkInDate || date <= checkInDate}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        {/* Guest Selection */}
        <div>
          <label className="text-sm font-medium mb-1 block">Guests</label>
          <div className="flex justify-between items-center border rounded-md p-2">
            <div>
              <div className="text-sm">Adults</div>
              <div className="text-xs text-stone-500">Age 18+</div>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-7 w-7" 
                onClick={() => setGuests(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))}
                disabled={guests.adults <= 1}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-6 text-center">{guests.adults}</span>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-7 w-7" 
                onClick={() => setGuests(prev => ({ ...prev, adults: Math.min(10, prev.adults + 1) }))}
                disabled={guests.adults >= 10}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center border border-t-0 rounded-b-md p-2">
            <div>
              <div className="text-sm">Children</div>
              <div className="text-xs text-stone-500">Ages 0-17</div>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-7 w-7" 
                onClick={() => setGuests(prev => ({ ...prev, children: Math.max(0, prev.children - 1) }))}
                disabled={guests.children <= 0}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-6 text-center">{guests.children}</span>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-7 w-7" 
                onClick={() => setGuests(prev => ({ ...prev, children: Math.min(6, prev.children + 1) }))}
                disabled={guests.children >= 6}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Room Selection */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Select Room Type</h4>
        <div className="space-y-3">
          {roomTypes.map(room => (
            <div 
              key={room.type}
              className={`border rounded-lg p-4 ${selectedRoomType === room.type ? 'border-blue-400 bg-blue-50' : ''}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="font-medium">{room.type}</h5>
                  <div className="text-xs text-stone-500 flex items-center mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    Last booking: 2 hours ago
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-blue-600">₹{room.price}</div>
                  <div className="text-xs text-stone-500">per night</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm">
                  <span className="text-green-600 font-medium">
                    {room.available} rooms
                  </span>
                  <span className="text-stone-500"> left at this price</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={() => updateRoomQuantity(room.type, -1)}
                    disabled={!roomQuantities[room.type]}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-6 text-center">{roomQuantities[room.type] || 0}</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={() => updateRoomQuantity(room.type, 1)}
                    disabled={roomQuantities[room.type] >= room.available}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Insurance Option */}
      <div className="mb-6">
        <div 
          className={`border rounded-lg p-4 cursor-pointer ${hasInsurance ? 'border-blue-400 bg-blue-50' : ''}`}
          onClick={() => setHasInsurance(!hasInsurance)}
        >
          <div className="flex items-start">
            <Shield className="h-5 w-5 mr-3 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="font-medium flex items-center">
                Travel Insurance
                <span className="ml-2 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                  Recommended
                </span>
              </h5>
              <p className="text-sm text-stone-600 mt-1">
                Protect your trip against unexpected cancellations, delays, medical emergencies, and more.
              </p>
              <p className="text-xs font-medium text-blue-600 mt-2">
                Only ₹{(calculateTotal() * 0.05).toLocaleString()} for your entire stay
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Summary & Booking Button */}
      {Object.values(roomQuantities).some(q => q > 0) && (
        <div className="bg-stone-50 p-4 rounded-lg mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm">Room charges</span>
            <span className="text-sm">₹{(calculateTotal() - (hasInsurance ? calculateTotal() * 0.05 : 0)).toLocaleString()}</span>
          </div>
          {hasInsurance && (
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm">Travel insurance</span>
              <span className="text-sm">₹{(calculateTotal() * 0.05).toLocaleString()}</span>
            </div>
          )}
          <div className="border-t border-stone-200 my-2"></div>
          <div className="flex justify-between items-center font-semibold">
            <span>Total Amount</span>
            <span className="text-blue-600">₹{calculateTotal().toLocaleString()}</span>
          </div>
        </div>
      )}
      
      <Button 
        className="w-full" 
        onClick={proceedToConfirmation}
        disabled={!Object.values(roomQuantities).some(q => q > 0) || !nights}
      >
        Continue to Book
      </Button>
    </div>
  );
};

export default EnhancedBookingFlow;
