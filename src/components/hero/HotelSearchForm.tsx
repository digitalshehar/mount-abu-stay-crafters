
import React, { useState } from 'react';
import { MapPin, Calendar, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { DateRange } from 'react-day-picker';
import { format, addDays } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

interface HotelSearchProps {
  search: {
    location: string;
    dates: string;
    guests: string;
  };
  setSearch: React.Dispatch<React.SetStateAction<{
    location: string;
    dates: string;
    guests: string;
  }>>;
}

const HotelSearchForm: React.FC<HotelSearchProps> = ({ search, setSearch }) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  
  const [guestData, setGuestData] = useState({
    adults: 2,
    children: 0,
    rooms: 1,
  });
  
  // Enhanced to handle input validation
  const handleInputChange = (field: string, value: string) => {
    setSearch(prev => ({ ...prev, [field]: value }));
  };

  // Update the dates string whenever the date range changes
  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    if (range?.from) {
      let dateString = format(range.from, "MMM d");
      if (range.to) {
        dateString += " - " + format(range.to, "MMM d, yyyy");
      } else {
        dateString += ", " + format(range.from, "yyyy");
      }
      handleInputChange("dates", dateString);
    } else {
      handleInputChange("dates", "");
    }
  };

  // Update guests string when guest data changes
  const handleGuestChange = (type: 'adults' | 'children' | 'rooms', value: number) => {
    if (value < 0) return;
    
    // Add maximum limits
    const maxValues = {
      adults: 10,
      children: 6,
      rooms: 5
    };
    
    // Apply minimum limits
    const minValues = {
      adults: 1,
      children: 0,
      rooms: 1
    };
    
    // Ensure the value is within limits
    const validatedValue = Math.max(
      minValues[type], 
      Math.min(maxValues[type], value)
    );
    
    const newGuestData = { ...guestData, [type]: validatedValue };
    setGuestData(newGuestData);
    
    const totalGuests = newGuestData.adults + newGuestData.children;
    const guestString = `${totalGuests} ${totalGuests === 1 ? 'guest' : 'guests'}, ${newGuestData.rooms} ${newGuestData.rooms === 1 ? 'room' : 'rooms'}`;
    handleInputChange("guests", guestString);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      <div className="space-y-2">
        <Label htmlFor="hotel-location" className="text-sm font-medium">Location</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input 
            id="hotel-location"
            placeholder="Where are you going?" 
            className="pl-10"
            value={search.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            type="text"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="hotel-dates" className="text-sm font-medium">Dates</Label>
        <div className="relative">
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                id="hotel-dates"
                variant="outline" 
                role="combobox" 
                className={cn(
                  "w-full justify-start text-left font-normal relative",
                  !search.dates && "text-muted-foreground"
                )}
              >
                <Calendar className="absolute left-3 h-4 w-4 text-gray-500" />
                <span className="ml-10">
                  {search.dates || "Check-in — Check-out"}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="range"
                defaultMonth={new Date()}
                selected={dateRange}
                onSelect={handleDateRangeChange}
                numberOfMonths={2}
                disabled={(date) => date < new Date()}
                className="pointer-events-auto"
              />
              <div className="border-t p-3 flex justify-end">
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={() => {
                    setDateRange(undefined);
                    handleInputChange("dates", "");
                  }}
                >
                  Clear
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="hotel-guests" className="text-sm font-medium">Guests</Label>
        <div className="relative">
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                id="hotel-guests"
                variant="outline" 
                role="combobox" 
                className={cn(
                  "w-full justify-start text-left font-normal relative",
                  !search.guests && "text-muted-foreground"
                )}
              >
                <Users className="absolute left-3 h-4 w-4 text-gray-500" />
                <span className="ml-10">
                  {search.guests || "Guests & Rooms"}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-4" align="start">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Adults</span>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 w-7 p-0"
                      onClick={() => handleGuestChange('adults', guestData.adults - 1)}
                      type="button"
                      disabled={guestData.adults <= 1}
                    >-</Button>
                    <span className="w-6 text-center">{guestData.adults}</span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 w-7 p-0"
                      onClick={() => handleGuestChange('adults', guestData.adults + 1)}
                      type="button"
                      disabled={guestData.adults >= 10}
                    >+</Button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Children</span>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 w-7 p-0"
                      onClick={() => handleGuestChange('children', guestData.children - 1)}
                      type="button"
                      disabled={guestData.children <= 0}
                    >-</Button>
                    <span className="w-6 text-center">{guestData.children}</span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 w-7 p-0"
                      onClick={() => handleGuestChange('children', guestData.children + 1)}
                      type="button"
                      disabled={guestData.children >= 6}
                    >+</Button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Rooms</span>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 w-7 p-0"
                      onClick={() => handleGuestChange('rooms', guestData.rooms - 1)}
                      type="button"
                      disabled={guestData.rooms <= 1}
                    >-</Button>
                    <span className="w-6 text-center">{guestData.rooms}</span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 w-7 p-0"
                      onClick={() => handleGuestChange('rooms', guestData.rooms + 1)}
                      type="button"
                      disabled={guestData.rooms >= 5}
                    >+</Button>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button 
                    className="w-full"
                    variant="default"
                    onClick={() => {
                      document.dispatchEvent(new Event('click')); // Close popover
                    }}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default HotelSearchForm;
