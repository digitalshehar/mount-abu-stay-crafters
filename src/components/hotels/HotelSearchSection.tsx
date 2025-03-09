
import React, { useState } from "react";
import { Search, Calendar, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format, addDays } from "date-fns";

interface HotelSearchSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

const HotelSearchSection = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
}: HotelSearchSectionProps) => {
  const [checkIn, setCheckIn] = useState<Date | undefined>(new Date());
  const [checkOut, setCheckOut] = useState<Date | undefined>(
    addDays(new Date(), 1)
  );
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);

  // Handle input change without submitting the form
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle form submission with prevent default
  const handleSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(e);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border-t-4 border-blue-600">
      <form onSubmit={handleSubmitSearch} className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-stone-200">
          <div className="p-4 md:col-span-4">
            <div className="flex items-center h-full">
              <MapPin className="h-5 w-5 text-blue-500 mr-2" />
              <div className="flex-grow">
                <label htmlFor="search-location" className="block text-xs text-stone-500 mb-1">
                  Destination
                </label>
                <Input
                  id="search-location"
                  type="text"
                  placeholder="Mount Abu, Rajasthan"
                  value={searchQuery}
                  onChange={handleQueryChange}
                  className="border-none shadow-none focus-visible:ring-0 p-0 h-auto text-base"
                />
              </div>
            </div>
          </div>

          <div className="p-4 md:col-span-3">
            <div className="flex items-center h-full">
              <Calendar className="h-5 w-5 text-blue-500 mr-2" />
              <div className="flex-grow">
                <label htmlFor="check-in" className="block text-xs text-stone-500 mb-1">
                  Check-in
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className="p-0 h-auto text-base font-normal justify-start hover:bg-transparent"
                    >
                      {checkIn ? format(checkIn, "EEE, MMM d, yyyy") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={checkIn}
                      onSelect={setCheckIn}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <div className="p-4 md:col-span-3">
            <div className="flex items-center h-full">
              <Calendar className="h-5 w-5 text-blue-500 mr-2" />
              <div className="flex-grow">
                <label htmlFor="check-out" className="block text-xs text-stone-500 mb-1">
                  Check-out
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className="p-0 h-auto text-base font-normal justify-start hover:bg-transparent"
                    >
                      {checkOut ? format(checkOut, "EEE, MMM d, yyyy") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={checkOut}
                      onSelect={setCheckOut}
                      initialFocus
                      disabled={(date) => date < (checkIn || new Date())}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <div className="p-4 md:col-span-2 flex items-center justify-between">
            <div className="flex flex-col">
              <label className="block text-xs text-stone-500 mb-1">
                Guests & Rooms
              </label>
              <div className="flex items-center space-x-1 text-base">
                <span>{guests} Guests,</span>
                <span>{rooms} Room</span>
              </div>
            </div>
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-7 w-7">
                    <Users className="h-4 w-4 text-blue-500" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-60 p-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Guests</span>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-7 w-7 p-0"
                          onClick={(e) => {
                            e.preventDefault();
                            setGuests(Math.max(1, guests - 1));
                          }}
                          type="button"
                        >-</Button>
                        <span className="w-6 text-center">{guests}</span>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-7 w-7 p-0"
                          onClick={(e) => {
                            e.preventDefault();
                            setGuests(Math.min(10, guests + 1));
                          }}
                          type="button"
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
                          onClick={(e) => {
                            e.preventDefault();
                            setRooms(Math.max(1, rooms - 1));
                          }}
                          type="button"
                        >-</Button>
                        <span className="w-6 text-center">{rooms}</span>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-7 w-7 p-0"
                          onClick={(e) => {
                            e.preventDefault();
                            setRooms(Math.min(5, rooms + 1));
                          }}
                          type="button"
                        >+</Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-stone-50 flex justify-end">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            <Search className="h-4 w-4 mr-2" />
            Search Hotels
          </Button>
        </div>
      </form>
    </div>
  );
};

export default HotelSearchSection;
