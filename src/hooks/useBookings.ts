
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Booking {
  id: string;
  user_id: string;
  hotel_id: number;
  hotel_name?: string;
  room_type: string;
  check_in_date: string;
  check_out_date: string;
  guest_name: string;
  guest_email: string;
  guest_phone?: string;
  number_of_guests: number;
  total_price: number;
  payment_status: string;
  booking_status: string;
  created_at: string;
}

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const { toast } = useToast();

  const fetchBookings = async () => {
    try {
      setLoading(true);
      
      console.log('Fetching bookings from Supabase...');
      
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          hotels(name)
        `)
        .returns<any[]>();

      if (error) {
        console.error('Error fetching bookings:', error);
        toast({
          title: 'Error',
          description: 'Failed to load bookings data: ' + error.message,
          variant: 'destructive',
        });
        setBookings([]);
        setRecentBookings([]);
        setLoading(false);
        return;
      }

      // Transform data to include hotel name
      const formattedBookings = data.map((booking: any) => ({
        ...booking,
        hotel_name: booking.hotels?.name || 'Unknown Hotel',
      }));

      console.log('Bookings fetched:', formattedBookings);
      
      setBookings(formattedBookings);
      setRecentBookings(formattedBookings.slice(0, 5));
    } catch (error: any) {
      console.error('Error in fetchBookings:', error);
      toast({
        title: 'Error',
        description: 'Failed to load bookings data: ' + (error.message || 'Unknown error'),
        variant: 'destructive',
      });
      setBookings([]);
      setRecentBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Function to add a new booking
  const addBooking = async (bookingData: Omit<Booking, 'id' | 'created_at'>) => {
    try {
      console.log('Adding new booking:', bookingData);
      
      const { data, error } = await supabase
        .from('bookings')
        .insert(bookingData)
        .select()
        .returns<any[]>();

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

  // Function to update booking status
  const updateBookingStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ booking_status: status })
        .eq('id', id)
        .returns<any>();

      if (error) throw error;
      
      toast({
        title: 'Status Updated',
        description: `Booking status has been changed to ${status}`,
      });
      
      fetchBookings();
      return true;
    } catch (error: any) {
      console.error('Error updating booking status:', error);
      toast({
        title: 'Update Failed',
        description: 'Failed to update booking status: ' + (error.message || 'Unknown error'),
        variant: 'destructive',
      });
      return false;
    }
  };

  // Function to update payment status
  const updatePaymentStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ payment_status: status })
        .eq('id', id)
        .returns<any>();

      if (error) throw error;
      
      toast({
        title: 'Payment Status Updated',
        description: `Payment status has been changed to ${status}`,
      });
      
      fetchBookings();
      return true;
    } catch (error: any) {
      console.error('Error updating payment status:', error);
      toast({
        title: 'Update Failed',
        description: 'Failed to update payment status: ' + (error.message || 'Unknown error'),
        variant: 'destructive',
      });
      return false;
    }
  };

  return {
    bookings,
    recentBookings,
    loading,
    fetchBookings,
    addBooking,
    updateBookingStatus,
    updatePaymentStatus
  };
};
