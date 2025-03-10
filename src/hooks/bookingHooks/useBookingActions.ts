
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useBookingActions = (fetchBookings: () => Promise<void>) => {
  const { toast } = useToast();

  // Function to update booking status
  const updateBookingStatus = async (id: string, status: string) => {
    try {
      // Type as 'any' to avoid TypeScript errors
      const { error } = await supabase
        .from('bookings')
        .update({ booking_status: status } as any)
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: 'Status Updated',
        description: `Booking status has been changed to ${status}`,
      });
      
      fetchBookings();
      return true;
    } catch (error) {
      console.error('Error updating booking status:', error);
      toast({
        title: 'Update Failed',
        description: 'Failed to update booking status',
        variant: 'destructive',
      });
      return false;
    }
  };

  // Function to update payment status
  const updatePaymentStatus = async (id: string, status: string) => {
    try {
      // Type as 'any' to avoid TypeScript errors
      const { error } = await supabase
        .from('bookings')
        .update({ payment_status: status } as any)
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: 'Payment Status Updated',
        description: `Payment status has been changed to ${status}`,
      });
      
      fetchBookings();
      return true;
    } catch (error) {
      console.error('Error updating payment status:', error);
      toast({
        title: 'Update Failed',
        description: 'Failed to update payment status',
        variant: 'destructive',
      });
      return false;
    }
  };

  // Function to add a new booking
  const addBooking = async (bookingData: any) => {
    try {
      console.log('Adding new booking:', bookingData);
      
      // Type as 'any' to avoid TypeScript errors when using insert
      const { data, error } = await supabase
        .from('bookings')
        .insert(bookingData as any)
        .select()
        .single();

      if (error) {
        console.error('Error adding booking:', error);
        toast({
          title: 'Booking Failed',
          description: error.message,
          variant: 'destructive',
        });
        return null;
      }

      toast({
        title: 'Booking Successful',
        description: 'Your booking has been confirmed!',
      });

      // Refresh bookings after adding a new one
      fetchBookings();
      
      return data;
    } catch (error: any) {
      console.error('Error in addBooking:', error);
      toast({
        title: 'Booking Error',
        description: error.message || 'An error occurred while processing your booking',
        variant: 'destructive',
      });
      return null;
    }
  };

  return {
    updateBookingStatus,
    updatePaymentStatus,
    addBooking
  };
};
