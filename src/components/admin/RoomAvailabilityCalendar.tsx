
import React, { useState } from 'react';
import { DayPicker, DayContent, DayContentProps } from 'react-day-picker';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SelectMultipleEventHandler } from 'react-day-picker';

interface RoomAvailabilityCalendarProps {
  roomId: string;
  initialBookedDates?: Date[];
}

const RoomAvailabilityCalendar: React.FC<RoomAvailabilityCalendarProps> = ({
  roomId,
  initialBookedDates = []
}) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [bookedDates, setBookedDates] = useState<Date[]>(initialBookedDates);
  const [isUpdating, setIsUpdating] = useState(false);

  // Sample function to update availability
  const handleUpdateAvailability = async () => {
    setIsUpdating(true);
    
    try {
      // In a real app, you would call your API here
      console.log('Updating availability for dates:', selectedDates);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // Update booked dates
      setBookedDates(prev => [...prev, ...selectedDates]);
      setSelectedDates([]);
      
      console.log('Availability updated successfully');
      // You could use a toast notification here
    } catch (error) {
      console.error('Failed to update availability:', error);
      // Error handling
    } finally {
      setIsUpdating(false);
    }
  };
  
  const handleResetSelection = () => {
    setSelectedDates([]);
  };
  
  const handleDaySelect: SelectMultipleEventHandler = (days) => {
    if (!days) {
      setSelectedDates([]);
      return;
    }
    setSelectedDates(days);
  };

  // Custom day cell renderer to show availability status
  const CustomDayContent = (props: DayContentProps) => {
    const { date, activeModifiers } = props;
    const isBooked = bookedDates.some(bookedDate => 
      bookedDate.getDate() === date.getDate() && 
      bookedDate.getMonth() === date.getMonth() && 
      bookedDate.getFullYear() === date.getFullYear()
    );
    
    const isSelected = activeModifiers?.selected;
    
    return (
      <div className="relative">
        <DayContent {...props} />
        {isBooked && !isSelected && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3/4 h-3/4 rounded-full bg-red-200 opacity-50 absolute"></div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-1">
        <CardTitle className="text-md">Room Availability Calendar</CardTitle>
        <div className="mt-2 flex items-center space-x-3">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-200 mr-1"></div>
            <span className="text-xs">Booked</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-200 mr-1"></div>
            <span className="text-xs">Selected</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-200 mr-1"></div>
            <span className="text-xs">Available</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <DayPicker
          mode="multiple"
          selected={selectedDates}
          onSelect={handleDaySelect}
          modifiers={{
            available: bookedDates.map(date => new Date(date)).filter(date => date > new Date()),
            selected: selectedDates
          }}
          modifiersStyles={{
            selected: { 
              backgroundColor: '#dbeafe',
              color: '#1e40af'
            }
          }}
          components={{
            DayContent: CustomDayContent
          }}
        />
        
        <div className="flex justify-between mt-4">
          <Badge variant="outline">
            {selectedDates.length} {selectedDates.length === 1 ? 'date' : 'dates'} selected
          </Badge>
          <div className="space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleResetSelection}
              disabled={selectedDates.length === 0 || isUpdating}
            >
              Reset
            </Button>
            <Button 
              size="sm" 
              onClick={handleUpdateAvailability}
              disabled={selectedDates.length === 0 || isUpdating}
            >
              {isUpdating ? 'Updating...' : 'Update Availability'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomAvailabilityCalendar;
