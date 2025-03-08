
import React, { useState } from "react";
import { Search, Calendar, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";

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
    new Date(new Date().setDate(new Date().getDate() + 1))
  );
  const [guests, setGuests] = useState(2);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-stone-200">
      <form onSubmit={handleSearch}>
        <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-stone-200">
          <div className="p-4">
            <div className="flex items-center h-full">
              <MapPin className="h-5 w-5 text-stone-400 mr-2" />
              <div className="flex-grow">
                <label htmlFor="search-location" className="block text-xs text-stone-500 mb-1">
                  Destination
                </label>
                <Input
                  id="search-location"
                  type="text"
                  placeholder="Mount Abu, Rajasthan"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-none shadow-none focus-visible:ring-0 p-0 h-auto text-base"
                />
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center h-full">
              <Calendar className="h-5 w-5 text-stone-400 mr-2" />
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
                      {checkIn ? format(checkIn, "MMMM d, yyyy") : "Select date"}
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

          <div className="p-4">
            <div className="flex items-center h-full">
              <Calendar className="h-5 w-5 text-stone-400 mr-2" />
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
                      {checkOut ? format(checkOut, "MMMM d, yyyy") : "Select date"}
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

          <div className="p-4 flex items-center">
            <div className="flex-grow pr-2">
              <div className="flex items-center h-full">
                <Users className="h-5 w-5 text-stone-400 mr-2" />
                <div className="flex-grow">
                  <label htmlFor="guests" className="block text-xs text-stone-500 mb-1">
                    Guests
                  </label>
                  <div className="flex items-center">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 rounded-full"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                    >
                      -
                    </Button>
                    <span className="mx-2 text-base">{guests}</span>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 rounded-full"
                      onClick={() => setGuests(Math.min(10, guests + 1))}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <Button type="submit" className="h-10">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HotelSearchSection;
