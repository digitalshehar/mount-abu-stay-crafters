
import { MapPin, Calendar, Users } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface HotelSearchFormProps {
  search: {
    location: string;
    dates: string;
    guests: string;
  };
  setSearch: (search: {
    location: string;
    dates: string;
    guests: string;
  }) => void;
}

const HotelSearchForm = ({ search, setSearch }: HotelSearchFormProps) => {
  const [dateOpen, setDateOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [guestsOpen, setGuestsOpen] = useState(false);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!date) {
      setDate(selectedDate);
    } else if (!endDate && selectedDate && selectedDate > date) {
      setEndDate(selectedDate);
      // Update the parent component's dates string
      const dateString = `${format(date, "MM/dd/yyyy")} — ${format(selectedDate, "MM/dd/yyyy")}`;
      setSearch({ ...search, dates: dateString });
      setDateOpen(false);
    } else {
      // Reset and start over if end date is selected or invalid date is chosen
      setDate(selectedDate);
      setEndDate(undefined);
    }
  };

  const handleGuestsSelect = (value: string) => {
    setSearch({ ...search, guests: value });
    setGuestsOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Location Input */}
      <div className="relative">
        <MapPin className="absolute left-3 top-3 h-5 w-5 text-stone-400" />
        <input
          type="text"
          placeholder="Where are you going?"
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          value={search.location}
          onChange={(e) => setSearch({ ...search, location: e.target.value })}
        />
      </div>

      {/* Date Selection - Uses Dialog on mobile, Popover on desktop */}
      <div className="relative">
        <Dialog open={dateOpen && window.innerWidth < 768} onOpenChange={setDateOpen}>
          <DialogTrigger asChild>
            <div className="relative cursor-pointer md:hidden">
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-stone-400" />
              <input
                type="text"
                placeholder="Check-in — Check-out"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
                value={search.dates}
                readOnly
                onClick={() => setDateOpen(true)}
              />
            </div>
          </DialogTrigger>
          <DialogContent className="p-0 max-w-[350px] rounded-lg">
            <div className="p-3">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                disabled={(selectedDate) => 
                  selectedDate < new Date(new Date().setHours(0, 0, 0, 0))
                }
                initialFocus
                className="w-full"
              />
              <div className="p-3 text-sm text-center text-muted-foreground">
                {!date ? "Select check-in date" : !endDate ? "Now select check-out date" : ""}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Popover open={dateOpen && window.innerWidth >= 768} onOpenChange={setDateOpen}>
          <PopoverTrigger asChild>
            <div className="relative cursor-pointer hidden md:block">
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-stone-400" />
              <input
                type="text"
                placeholder="Check-in — Check-out"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
                value={search.dates}
                readOnly
                onClick={() => setDateOpen(true)}
              />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              disabled={(selectedDate) => 
                selectedDate < new Date(new Date().setHours(0, 0, 0, 0))
              }
              initialFocus
              className={cn("p-3 pointer-events-auto")}
              footer={
                <div className="px-4 pt-2 pb-4 text-sm text-muted-foreground">
                  {!date ? "Select check-in date" : !endDate ? "Now select check-out date" : ""}
                </div>
              }
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Guests Selection - Use Dialog on mobile, Select on desktop */}
      <div className="relative">
        <Dialog open={guestsOpen && window.innerWidth < 768} onOpenChange={setGuestsOpen}>
          <DialogTrigger asChild>
            <div className="relative cursor-pointer md:hidden">
              <Users className="absolute left-3 top-3 h-5 w-5 text-stone-400" />
              <input
                type="text"
                placeholder="Guests & Rooms"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
                value={search.guests ? search.guests.replace('-', ' Guest(s), ') + ' Room(s)' : ""}
                readOnly
                onClick={() => setGuestsOpen(true)}
              />
            </div>
          </DialogTrigger>
          <DialogContent className="p-4 max-w-[350px] rounded-lg">
            <h3 className="text-lg font-medium mb-3">Select Guests & Rooms</h3>
            <div className="space-y-3">
              {["1-1", "2-1", "2-2", "3-1", "4-1", "4-2"].map((option) => {
                const [guests, rooms] = option.split('-');
                return (
                  <Button 
                    key={option}
                    variant={search.guests === option ? "default" : "outline"} 
                    className="w-full justify-start h-12 text-left"
                    onClick={() => handleGuestsSelect(option)}
                  >
                    {guests} Guest{Number(guests) > 1 ? 's' : ''}, {rooms} Room{Number(rooms) > 1 ? 's' : ''}
                  </Button>
                );
              })}
            </div>
          </DialogContent>
        </Dialog>

        <div className="hidden md:block relative">
          <Users className="absolute left-3 top-3 h-5 w-5 text-stone-400 z-10 pointer-events-none" />
          <Select 
            value={search.guests} 
            onValueChange={(value) => setSearch({ ...search, guests: value })}
          >
            <SelectTrigger className="w-full pl-10 py-3 rounded-lg border border-stone-200">
              <SelectValue placeholder="Guests & Rooms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-1">1 Guest, 1 Room</SelectItem>
              <SelectItem value="2-1">2 Guests, 1 Room</SelectItem>
              <SelectItem value="2-2">2 Guests, 2 Rooms</SelectItem>
              <SelectItem value="3-1">3 Guests, 1 Room</SelectItem>
              <SelectItem value="4-1">4 Guests, 1 Room</SelectItem>
              <SelectItem value="4-2">4 Guests, 2 Rooms</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default HotelSearchForm;
