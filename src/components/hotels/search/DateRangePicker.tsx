
import React from "react";
import { Calendar } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";

interface DateRangePickerProps {
  label: string;
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  minDate?: Date;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  label,
  date,
  onDateChange,
  minDate
}) => {
  return (
    <div className="flex items-center h-full">
      <Calendar className="h-5 w-5 text-blue-500 mr-2" />
      <div className="flex-grow">
        <label className="block text-xs text-stone-500 mb-1">
          {label}
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="p-0 h-auto text-base font-normal justify-start hover:bg-transparent"
            >
              {date ? format(date, "EEE, MMM d, yyyy") : "Select date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={onDateChange}
              initialFocus
              disabled={(calDate) => minDate ? calDate < minDate : calDate < new Date()}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default DateRangePicker;
