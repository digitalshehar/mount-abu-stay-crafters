
import React from 'react';
import { Calendar, SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NoBookingsFoundProps {
  onCreateBooking?: () => void;
}

const NoBookingsFound: React.FC<NoBookingsFoundProps> = ({ onCreateBooking }) => {
  return (
    <div className="text-center py-12 border rounded-md shadow-sm bg-gray-50">
      <SearchX className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
      <h3 className="text-lg font-semibold mb-2">No Bookings Found</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        There are no bookings that match your current filter criteria. Try adjusting your filters or create a new booking.
      </p>
      
      {onCreateBooking && (
        <Button onClick={onCreateBooking} className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>Create New Booking</span>
        </Button>
      )}
    </div>
  );
};

export default NoBookingsFound;
