
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface BookingFilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentFilters: any;
  onApplyFilters: (filters: any) => void;
}

const BookingFilterPanel = ({
  isOpen,
  onClose,
  currentFilters,
  onApplyFilters,
}: BookingFilterPanelProps) => {
  const [filters, setFilters] = useState(currentFilters);
  const [hotels, setHotels] = useState<Array<{ id: number; name: string }>>([]);
  
  // Fetch hotels for the filter
  useEffect(() => {
    const fetchHotels = async () => {
      const { data, error } = await supabase
        .from('hotels')
        .select('id, name')
        .order('name');
        
      if (!error && data) {
        setHotels(data);
      }
    };
    
    fetchHotels();
  }, []);
  
  const resetFilters = () => {
    setFilters({
      status: [],
      dateRange: null,
      hotelId: null,
      paymentStatus: []
    });
  };
  
  const handleStatusToggle = (value: string) => {
    if (filters.status.includes(value)) {
      setFilters({
        ...filters,
        status: filters.status.filter((s: string) => s !== value)
      });
    } else {
      setFilters({
        ...filters,
        status: [...filters.status, value]
      });
    }
  };
  
  const handlePaymentStatusToggle = (value: string) => {
    if (filters.paymentStatus.includes(value)) {
      setFilters({
        ...filters,
        paymentStatus: filters.paymentStatus.filter((s: string) => s !== value)
      });
    } else {
      setFilters({
        ...filters,
        paymentStatus: [...filters.paymentStatus, value]
      });
    }
  };
  
  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter Bookings</SheetTitle>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(100vh-180px)] p-4">
          <div className="space-y-6">
            {/* Booking Status Filter */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Booking Status</h3>
              <div className="grid grid-cols-1 gap-2">
                {['confirmed', 'pending', 'cancelled', 'completed'].map((status) => (
                  <div key={status} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`status-${status}`} 
                      checked={filters.status.includes(status)}
                      onCheckedChange={() => handleStatusToggle(status)}
                    />
                    <label 
                      htmlFor={`status-${status}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Payment Status Filter */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Payment Status</h3>
              <div className="grid grid-cols-1 gap-2">
                {['pending', 'paid', 'failed', 'refunded'].map((status) => (
                  <div key={status} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`payment-${status}`} 
                      checked={filters.paymentStatus.includes(status)}
                      onCheckedChange={() => handlePaymentStatusToggle(status)}
                    />
                    <label 
                      htmlFor={`payment-${status}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Date Range Filter */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Date Range</h3>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.dateRange ? (
                      format(new Date(filters.dateRange), 'PPP')
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={filters.dateRange}
                    onSelect={(date) => setFilters({ ...filters, dateRange: date })}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            {/* Hotel Filter */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Hotel</h3>
              <Select 
                value={filters.hotelId?.toString() || ""}
                onValueChange={(value) => setFilters({ 
                  ...filters, 
                  hotelId: value ? parseInt(value) : null 
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All hotels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All hotels</SelectItem>
                  {hotels.map((hotel) => (
                    <SelectItem key={hotel.id} value={hotel.id.toString()}>
                      {hotel.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </ScrollArea>
        
        <SheetFooter className="mt-6">
          <Button variant="outline" onClick={resetFilters}>
            Reset
          </Button>
          <Button onClick={handleApply}>
            Apply Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default BookingFilterPanel;
