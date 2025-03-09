
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addDays } from "date-fns";
import DestinationInput from "./search/DestinationInput";
import DateRangePicker from "./search/DateRangePicker";
import GuestRoomSelector from "./search/GuestRoomSelector";

interface HotelSearchSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

const HotelSearchSection: React.FC<HotelSearchSectionProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
}) => {
  const [checkIn, setCheckIn] = useState<Date | undefined>(new Date());
  const [checkOut, setCheckOut] = useState<Date | undefined>(
    addDays(new Date(), 1)
  );
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);

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
            <DestinationInput 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
            />
          </div>

          <div className="p-4 md:col-span-3">
            <DateRangePicker 
              label="Check-in"
              date={checkIn}
              onDateChange={setCheckIn}
            />
          </div>

          <div className="p-4 md:col-span-3">
            <DateRangePicker 
              label="Check-out"
              date={checkOut}
              onDateChange={setCheckOut}
              minDate={checkIn || new Date()}
            />
          </div>

          <div className="p-4 md:col-span-2">
            <GuestRoomSelector 
              guests={guests}
              rooms={rooms}
              setGuests={setGuests}
              setRooms={setRooms}
            />
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
