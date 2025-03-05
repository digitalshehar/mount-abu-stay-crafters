
import { MapPin, Calendar } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface BikeSearchFormProps {
  search: {
    location: string;
    dates: string;
    type: string;
  };
  setSearch: (search: {
    location: string;
    dates: string;
    type: string;
  }) => void;
}

const BikeSearchForm = ({ search, setSearch }: BikeSearchFormProps) => {
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
          placeholder="Pickup location"
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
                placeholder="Pickup — Dropoff date"
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
                  {!date ? "Select pickup date" : !endDate ? "Now select dropoff date" : ""}
                </div>
              }
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="relative">
        <select
          className="w-full pl-4 pr-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
          value={search.type}
          onChange={(e) => setSearch({ ...search, type: e.target.value })}
        >
          <option value="">Bike Type</option>
          <option value="scooter">Scooter</option>
          <option value="standard">Standard</option>
          <option value="cruiser">Cruiser</option>
          <option value="sports">Sports</option>
        </select>
      </div>
    </div>
  );
};

export default BikeSearchForm;
