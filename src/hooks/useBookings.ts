import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useBookingFilters } from './bookingHooks/useBookingFilters';
import { useBookingStats } from './bookingHooks/useBookingStats';
import { useBookingActions } from './bookingHooks/useBookingActions';
import { useBookingExport } from './bookingHooks/useBookingExport';

export type BookingType = 'hotel' | 'car' | 'bike' | 'adventure' | 'all';

export interface Booking {
  id: string;
  user_id: string;
  hotel_id?: number;
  car_id?: number;
  bike_id?: number;
  adventure_id?: number;
  hotel_name?: string;
  car_name?: string;
  bike_name?: string;
  adventure_name?: string;
  room_type?: string;
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
  booking_type: BookingType;
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
  bookingsByType?: Record<string, number>;
}

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const { toast } = useToast();
  const [bookingType, setBookingType] = useState<BookingType>('all');

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
  } = useBookingFilters(bookings, bookingType);

  const fetchHotelBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          hotels:hotel_id (name)
        `);

      if (error) throw error;

      return data.map((booking: any) => ({
        ...booking,
        hotel_name: booking.hotels?.name || 'Unknown Hotel',
        booking_type: 'hotel'
      }));
    } catch (error: any) {
      console.error('Error fetching hotel bookings:', error);
      return [];
    }
  };

  const fetchCarBookings = async () => {
    try {
      // Replace with your actual car booking table and structure
      const { data, error } = await supabase
        .from('car_rentals')
        .select('*');

      if (error) throw error;

      // Transform car rental data into booking structure
      // This is a placeholder implementation, adjust based on your actual data structure
      return data.map((car: any) => ({
        id: `car-${car.id}`,
        user_id: car.user_id || 'guest',
        car_id: car.id,
        car_name: car.name,
        guest_name: 'Car Rental Customer',
        guest_email: 'car@example.com',
        check_in_date: new Date().toISOString(),
        check_out_date: new Date(Date.now() + 86400000).toISOString(),
        number_of_guests: car.capacity || 1,
        total_price: car.price || 0,
        payment_status: 'paid',
        booking_status: car.status === 'available' ? 'completed' : 'confirmed',
        created_at: car.created_at || new Date().toISOString(),
        booking_type: 'car'
      }));
    } catch (error: any) {
      console.error('Error fetching car bookings:', error);
      return [];
    }
  };

  const fetchBikeBookings = async () => {
    try {
      // Replace with your actual bike booking table and structure
      const { data, error } = await supabase
        .from('bike_rentals')
        .select('*');

      if (error) throw error;

      // Transform bike rental data into booking structure
      return data.map((bike: any) => ({
        id: `bike-${bike.id}`,
        user_id: bike.user_id || 'guest',
        bike_id: bike.id,
        bike_name: bike.name,
        guest_name: 'Bike Rental Customer',
        guest_email: 'bike@example.com',
        check_in_date: new Date().toISOString(),
        check_out_date: new Date(Date.now() + 86400000).toISOString(),
        number_of_guests: 1,
        total_price: bike.price || 0,
        payment_status: 'paid',
        booking_status: bike.status === 'available' ? 'completed' : 'confirmed',
        created_at: bike.created_at || new Date().toISOString(),
        booking_type: 'bike'
      }));
    } catch (error: any) {
      console.error('Error fetching bike bookings:', error);
      return [];
    }
  };

  const fetchAdventureBookings = async () => {
    try {
      // Replace with your actual adventure booking table and structure
      const { data, error } = await supabase
        .from('adventures')
        .select('*');

      if (error) throw error;

      // Transform adventure data into booking structure
      return data.map((adventure: any) => ({
        id: `adventure-${adventure.id}`,
        user_id: adventure.user_id || 'guest',
        adventure_id: adventure.id,
        adventure_name: adventure.name,
        guest_name: 'Adventure Customer',
        guest_email: 'adventure@example.com',
        check_in_date: new Date().toISOString(),
        check_out_date: new Date(Date.now() + 86400000).toISOString(),
        number_of_guests: adventure.max_group_size || 1,
        total_price: adventure.price || 0,
        payment_status: 'paid',
        booking_status: adventure.status === 'active' ? 'confirmed' : 'cancelled',
        created_at: adventure.created_at || new Date().toISOString(),
        booking_type: 'adventure'
      }));
    } catch (error: any) {
      console.error('Error fetching adventure bookings:', error);
      return [];
    }
  };

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching all types of bookings...');
      
      // Fetch all types of bookings in parallel
      const [hotelBookings, carBookings, bikeBookings, adventureBookings] = await Promise.all([
        fetchHotelBookings(),
        fetchCarBookings(),
        fetchBikeBookings(),
        fetchAdventureBookings()
      ]);

      // Combine all bookings
      const allBookings = [
        ...hotelBookings,
        ...carBookings,
        ...bikeBookings,
        ...adventureBookings
      ];

      console.log('All bookings fetched:', allBookings);
      
      // Sort by created_at date (newest first)
      allBookings.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      
      setBookings(allBookings);
      setRecentBookings(allBookings.slice(0, 5));
      
    } catch (error: any) {
      console.error('Error in fetchBookings:', error);
      setError(error.message);
      toast({
        title: 'Error',
        description: 'Failed to load bookings data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    // Initial fetch
    fetchBookings();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('booking-updates')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'bookings' },
        (payload) => {
          console.log('Booking update received:', payload);
          fetchBookings();
        }
      )
      .subscribe();
      
    // Clean up subscription
    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchBookings]);

  // Use the booking stats hook with the filtered bookings
  const bookingStats = useBookingStats(filteredBookings);

  // Use the booking actions hook
  const { updateBookingStatus, updatePaymentStatus, addBooking, deleteBooking } = useBookingActions(fetchBookings);

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
    deleteBooking,
    setSearchQuery,
    setStatusFilter,
    setPaymentFilter,
    setHotelFilter,
    setDateRange,
    searchQuery,
    statusFilter,
    paymentFilter,
    dateRange,
    exportBookingsToCSV,
    bookingType,
    setBookingType
  };
};
