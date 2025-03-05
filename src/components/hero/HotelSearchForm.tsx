
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div className="relative">
        <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-stone-400" />
        <input
          type="text"
          placeholder="Where are you going?"
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          value={search.location}
          onChange={(e) => setSearch({ ...search, location: e.target.value })}
        />
      </div>
      <div className="relative">
        <Popover open={dateOpen} onOpenChange={setDateOpen}>
          <PopoverTrigger asChild>
            <div className="relative cursor-pointer">
              <Calendar className="absolute left-4 top-3.5 h-5 w-5 text-stone-400" />
              <input
                type="text"
                placeholder="Check-in — Check-out"
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
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
      <div className="relative">
        <Users className="absolute left-4 top-3.5 h-5 w-5 text-stone-400" />
        <select
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
          value={search.guests}
          onChange={(e) => setSearch({ ...search, guests: e.target.value })}
        >
          <option value="">Guests & Rooms</option>
          <option value="1-1">1 Guest, 1 Room</option>
          <option value="2-1">2 Guests, 1 Room</option>
          <option value="2-2">2 Guests, 2 Rooms</option>
          <option value="3-1">3 Guests, 1 Room</option>
          <option value="4-1">4 Guests, 1 Room</option>
          <option value="4-2">4 Guests, 2 Rooms</option>
        </select>
      </div>
    </div>
  );
};

export default HotelSearchForm;
