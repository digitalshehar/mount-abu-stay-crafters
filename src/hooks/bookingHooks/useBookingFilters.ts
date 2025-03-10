
import { useState, useMemo } from 'react';
import { Booking, BookingStatusType, PaymentStatusType } from '@/hooks/useBookings';

export const useBookingFilters = (bookings: Booking[]) => {
  // Filter states
  const [dateRange, setDateRange] = useState<{from: Date | undefined, to: Date | undefined}>({
    from: undefined,
    to: undefined
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<BookingStatusType>('all');
  const [paymentFilter, setPaymentFilter] = useState<PaymentStatusType>('all');
  const [hotelFilter, setHotelFilter] = useState<number | null>(null);

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

  return {
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
  };
};
