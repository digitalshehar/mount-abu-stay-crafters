
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Calendar as CalendarIcon, Loader2, Plus, Trash } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface AvailabilitySlot {
  id: number;
  hotel_id: number;
  date: string;
  available_slots: number;
}

interface EarlyHotelAvailabilityManagerProps {
  hotelId: number;
}

const EarlyHotelAvailabilityManager: React.FC<EarlyHotelAvailabilityManagerProps> = ({ hotelId }) => {
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [availableSlots, setAvailableSlots] = useState(10);
  const [submitting, setSubmitting] = useState(false);
  
  // Fetch availability slots
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('early_hotel_availability')
          .select('*')
          .eq('hotel_id', hotelId)
          .order('date', { ascending: true });
          
        if (error) {
          throw error;
        }
        
        if (data) {
          setSlots(data as AvailabilitySlot[]);
        }
      } catch (error) {
        console.error('Error fetching availability:', error);
        toast.error('Failed to load availability data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAvailability();
  }, [hotelId]);
  
  // Add availability slot
  const handleAddSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date) {
      toast.error('Please select a date');
      return;
    }
    
    try {
      setSubmitting(true);
      
      // Format date to YYYY-MM-DD
      const formattedDate = format(date, 'yyyy-MM-dd');
      
      // Check if slot already exists for this date
      const existingSlot = slots.find(slot => slot.date === formattedDate);
      
      if (existingSlot) {
        // Update existing slot
        const { error } = await supabase
          .from('early_hotel_availability')
          .update({ available_slots: availableSlots })
          .eq('id', existingSlot.id);
          
        if (error) throw error;
        
        // Update local state
        setSlots(prevSlots => 
          prevSlots.map(slot => 
            slot.id === existingSlot.id 
              ? { ...slot, available_slots: availableSlots } 
              : slot
          )
        );
        
        toast.success('Availability updated successfully');
      } else {
        // Insert new slot
        const { data, error } = await supabase
          .from('early_hotel_availability')
          .insert([
            { 
              hotel_id: hotelId,
              date: formattedDate,
              available_slots: availableSlots 
            }
          ])
          .select();
          
        if (error) throw error;
        
        if (data && data.length > 0) {
          setSlots(prevSlots => [...prevSlots, data[0] as AvailabilitySlot]);
          toast.success('Availability added successfully');
        }
      }
      
      // Reset form
      setDate(new Date());
      setAvailableSlots(10);
    } catch (error) {
      console.error('Error managing availability:', error);
      toast.error('Failed to update availability');
    } finally {
      setSubmitting(false);
    }
  };
  
  // Delete availability slot
  const handleDeleteSlot = async (id: number) => {
    try {
      const { error } = await supabase
        .from('early_hotel_availability')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setSlots(prevSlots => prevSlots.filter(slot => slot.id !== id));
      toast.success('Availability slot deleted');
    } catch (error) {
      console.error('Error deleting availability slot:', error);
      toast.error('Failed to delete availability slot');
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Hotel Availability</CardTitle>
        <CardDescription>
          Set the number of available slots for specific dates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddSlot} className="space-y-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="date">Select Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(currentDate) => currentDate < new Date(new Date().setHours(0, 0, 0, 0))}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="availableSlots">Available Slots</Label>
              <Input
                id="availableSlots"
                type="number"
                min={1}
                value={availableSlots}
                onChange={(e) => setAvailableSlots(parseInt(e.target.value))}
              />
            </div>
            
            <div className="flex items-end">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={submitting || !date}
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Availability
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Current Availability</h3>
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : slots.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-md">
              <p className="text-gray-500">No availability slots defined yet</p>
              <p className="text-sm text-gray-400 mt-2">Add availability using the form above</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Available Slots</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {slots.map((slot) => (
                  <TableRow key={slot.id}>
                    <TableCell>
                      {new Date(slot.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </TableCell>
                    <TableCell>{slot.available_slots}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteSlot(slot.id)}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EarlyHotelAvailabilityManager;
