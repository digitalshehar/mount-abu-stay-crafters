
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useBookingFilters } from './bookingHooks/useBookingFilters';
import { useBookingStats } from './bookingHooks/useBookingStats';
import { useBookingExport } from './bookingHooks/useBookingExport';
import * as bookingService from '@/services/bookingService';

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
  base_price?: number;
  tax_amount?: number;
  payment_status: string;
  booking_status: string;
  created_at: string;
  booking_type: BookingType;
  booking_reference?: string;
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

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching all types of bookings...');
      
      // Fetch all types of bookings in parallel
      const [hotelBookings, carBookings, bikeBookings, adventureBookings] = await Promise.all([
        bookingService.fetchHotelBookings(),
        bookingService.fetchCarBookings(),
        bookingService.fetchBikeBookings(),
        bookingService.fetchAdventureBookings()
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
    const channel = bookingService.setupRealtimeBookings(fetchBookings);
      
    // Clean up subscription
    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchBookings]);

  // Use the booking stats hook with the filtered bookings
  const bookingStats = useBookingStats(filteredBookings);

  // Use the booking export hook
  const { exportBookingsToCSV } = useBookingExport(filteredBookings);

  const addBooking = async (bookingData: Partial<Booking>) => {
    const response = await bookingService.addBooking(bookingData, fetchBookings);
    
    if (response.success) {
      toast({
        title: 'Booking Successful',
        description: 'Your booking has been confirmed and a confirmation email has been sent!',
      });
      return response.data;
    } else {
      toast({
        title: 'Booking Error',
        description: response.error || 'An error occurred while processing your booking',
        variant: 'destructive',
      });
      return null;
    }
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
    updateBookingStatus: bookingService.updateBookingStatus,
    updatePaymentStatus: bookingService.updatePaymentStatus,
    deleteBooking: bookingService.deleteBooking,
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
