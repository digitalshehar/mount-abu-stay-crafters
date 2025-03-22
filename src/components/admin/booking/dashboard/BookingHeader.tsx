
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, RefreshCw, FileDown } from 'lucide-react';

interface BookingHeaderProps {
  exportBookingsToCSV: () => void;
  fetchBookings?: () => Promise<void>;
}

const BookingHeader: React.FC<BookingHeaderProps> = ({ 
  exportBookingsToCSV, 
  fetchBookings 
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleRefresh = async () => {
    if (fetchBookings) {
      setIsRefreshing(true);
      await fetchBookings();
      setIsRefreshing(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Booking Management</h1>
        <p className="text-muted-foreground">
          Manage all bookings including hotels, car rentals, bike rentals, and adventures.
        </p>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefresh} 
          disabled={isRefreshing}
          className="flex items-center gap-1"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={exportBookingsToCSV}
          className="flex items-center gap-1"
        >
          <FileDown className="h-4 w-4" />
          <span>Export</span>
        </Button>
        
        <Button 
          variant="default" 
          size="sm"
          className="flex items-center gap-1"
        >
          <PlusCircle className="h-4 w-4" />
          <span>New Booking</span>
        </Button>
      </div>
    </div>
  );
};

export default BookingHeader;
