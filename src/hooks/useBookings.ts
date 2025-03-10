
import { useState, useEffect, useMemo } from 'react';
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

  // Filter states
  const [dateRange, setDateRange] = useState<{from: Date | undefined, to: Date | undefined}>({
    from: undefined,
    to: undefined
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<BookingStatusType>('all');
  const [paymentFilter, setPaymentFilter] = useState<PaymentStatusType>('all');
  const [hotelFilter, setHotelFilter] = useState<number | null>(null);

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

  // Filtered bookings based on search query and filters
  const filteredBookings = useMemo(() => {
    let result = [...bookings];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(booking => 
        booking.guest_name.toLowerCase().includes(query) ||
        booking.guest_email.toLowerCase().includes(query) ||
        booking.hotel_name?.toLowerCase().includes(query) ||
        booking.room_type.toLowerCase().includes(query)
      );
    }
    
    // Apply booking status filter
    if (statusFilter !== 'all') {
      result = result.filter(booking => booking.booking_status === statusFilter);
    }
    
    // Apply payment status filter
    if (paymentFilter !== 'all') {
      result = result.filter(booking => booking.payment_status === paymentFilter);
    }

    // Apply hotel filter
    if (hotelFilter !== null) {
      result = result.filter(booking => booking.hotel_id === hotelFilter);
    }

    // Apply date range filter
    if (dateRange.from) {
      result = result.filter(booking => {
        const checkInDate = new Date(booking.check_in_date);
        return checkInDate >= dateRange.from!;
      });
    }

    if (dateRange.to) {
      result = result.filter(booking => {
        const checkInDate = new Date(booking.check_in_date);
        return checkInDate <= dateRange.to!;
      });
    }
    
    return result;
  }, [bookings, searchQuery, statusFilter, paymentFilter, hotelFilter, dateRange]);

  // Function to add a new booking
  const addBooking = async (bookingData: Omit<Booking, 'id' | 'created_at'>) => {
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

  // Calculate booking statistics
  const bookingStats: BookingStats = useMemo(() => {
    const stats: BookingStats = {
      totalBookings: filteredBookings.length,
      totalRevenue: 0,
      averageBookingValue: 0,
      bookingsByStatus: {},
      bookingsByHotel: {},
      bookingsByRoomType: {},
      revenueByMonth: {},
      occupancyRate: 0 // Will calculate this if room data is available
    };

    // Calculate total revenue and averages
    stats.totalRevenue = filteredBookings.reduce((sum, booking) => sum + Number(booking.total_price), 0);
    stats.averageBookingValue = stats.totalBookings > 0 ? stats.totalRevenue / stats.totalBookings : 0;

    // Group by status
    filteredBookings.forEach(booking => {
      // By status
      stats.bookingsByStatus[booking.booking_status] = (stats.bookingsByStatus[booking.booking_status] || 0) + 1;
      
      // By hotel
      const hotelKey = booking.hotel_name || 'Unknown';
      stats.bookingsByHotel[hotelKey] = (stats.bookingsByHotel[hotelKey] || 0) + 1;
      
      // By room type
      stats.bookingsByRoomType[booking.room_type] = (stats.bookingsByRoomType[booking.room_type] || 0) + 1;
      
      // By month (for revenue analysis)
      const bookingMonth = new Date(booking.check_in_date).toISOString().substring(0, 7); // YYYY-MM format
      stats.revenueByMonth[bookingMonth] = (stats.revenueByMonth[bookingMonth] || 0) + Number(booking.total_price);
    });

    return stats;
  }, [filteredBookings]);

  const exportBookingsToCSV = () => {
    // Create CSV content
    const headers = [
      'Guest Name',
      'Email',
      'Hotel',
      'Room Type',
      'Check In',
      'Check Out',
      'Guests',
      'Total Price',
      'Booking Status',
      'Payment Status',
      'Created At'
    ].join(',');
    
    const rows = filteredBookings.map(booking => [
      booking.guest_name,
      booking.guest_email,
      booking.hotel_name || 'Unknown Hotel',
      booking.room_type,
      booking.check_in_date,
      booking.check_out_date,
      booking.number_of_guests,
      booking.total_price,
      booking.booking_status,
      booking.payment_status,
      booking.created_at
    ].map(cell => `"${cell}"`).join(','));
    
    const csvContent = [headers, ...rows].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `bookings_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
