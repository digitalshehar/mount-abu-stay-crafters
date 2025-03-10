
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BookingStatusSelectProps {
  currentStatus: string;
  onStatusChange: (status: string) => void;
}

const BookingStatusSelect: React.FC<BookingStatusSelectProps> = ({ currentStatus, onStatusChange }) => {
  return (
    <div className="space-y-1">
      <Label className="text-xs text-muted-foreground">Booking Status</Label>
      <Select defaultValue={currentStatus} onValueChange={onStatusChange}>
        <SelectTrigger>
          <SelectValue placeholder="Booking Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="confirmed">Confirmed</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="cancelled">Cancelled</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default BookingStatusSelect;
