
import React from "react";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

interface GuestRoomSelectorProps {
  guests: number;
  rooms: number;
  setGuests: (count: number) => void;
  setRooms: (count: number) => void;
}

const GuestRoomSelector: React.FC<GuestRoomSelectorProps> = ({
  guests,
  rooms,
  setGuests,
  setRooms
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <label className="block text-xs text-stone-500 mb-1">
          Guests & Rooms
        </label>
        <div className="flex items-center space-x-1 text-base">
          <span>{guests} Guests,</span>
          <span>{rooms} Room{rooms !== 1 ? 's' : ''}</span>
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
  );
};

export default GuestRoomSelector;
