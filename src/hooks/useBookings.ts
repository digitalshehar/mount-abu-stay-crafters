
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useBookingFilters } from './bookingHooks/useBookingFilters';
import { useBookingStats } from './bookingHooks/useBookingStats';
import { useBookingActions } from './bookingHooks/useBookingActions';
import { useBookingExport } from './bookingHooks/useBookingExport';

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

export type BookingStatusType = 'confirmed' | 'pending' | 'cancelled' | 'completed' | 'all';
export type PaymentStatusType = 'paid' | 'pending' | 'refunded' | 'failed' | 'all';

export interface BookingStats {
  totalBookings: number;
  totalRevenue: number;
  averageBookingValue: number;
  bookingsByStatus: Record<string, number>;
  bookingsByHotel: Record<string, number>;
  bookingsByRoomType: Record<string, number>;
  revenueByMonth: Record<string, number>;
  occupancyRate: number;
}

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const { toast } = useToast();

  // Use the extracted hooks
  const {
    filteredBookings,
    dateRange,
    searchQuery,
    statusFilter,
    paymentFilter,
    hotelFilter,
    setDateRange,
    setSearchQuery,
    setStatusFilter,
    setPaymentFilter,
    setHotelFilter
  } = useBookingFilters(bookings);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching bookings from Supabase...');
      
      // This should use the proper type to avoid TypeScript errors
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          hotels:hotel_id (name)
        `);

      if (error) {
        console.error('Error fetching bookings:', error);
        setError(error.message);
        toast({
          title: 'Error',
          description: 'Failed to load bookings data',
          variant: 'destructive',
        });
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
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Use the booking stats hook
  const bookingStats = useBookingStats(filteredBookings);

  // Use the booking actions hook
  const { updateBookingStatus, updatePaymentStatus, addBooking } = useBookingActions(fetchBookings);

  // Use the booking export hook
  const { exportBookingsToCSV } = useBookingExport(filteredBookings);

  return {
    bookings,
    filteredBookings,
    recentBookings,
    loading,
    error,
    bookingStats,
    fetchBookings,
    addBooking,
    updateBookingStatus,
    updatePaymentStatus,
    setSearchQuery,
    setStatusFilter,
    setPaymentFilter,
    setHotelFilter,
    setDateRange,
    searchQuery,
    statusFilter,
    paymentFilter,
    dateRange,
    exportBookingsToCSV
  };
};
