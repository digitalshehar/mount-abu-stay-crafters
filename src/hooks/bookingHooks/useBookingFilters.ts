
import { useState, useMemo } from 'react';
import { Booking, BookingStatusType, BookingType, PaymentStatusType } from '@/hooks/useBookings';

export const useBookingFilters = (bookings: Booking[], bookingTypeFilterProp?: BookingType) => {
  // Filter states
  const [dateRange, setDateRange] = useState<{from: Date | undefined, to: Date | undefined}>({
    from: undefined,
    to: undefined
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<BookingStatusType>('all');
  const [paymentFilter, setPaymentFilter] = useState<PaymentStatusType>('all');
  const [hotelFilter, setHotelFilter] = useState<number | null>(null);
  const [bookingTypeFilter, setBookingTypeFilter] = useState<BookingType>('all');

  // Use the provided booking type filter if it exists
  const effectiveBookingTypeFilter = bookingTypeFilterProp || bookingTypeFilter;

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
        booking.car_name?.toLowerCase().includes(query) ||
        booking.bike_name?.toLowerCase().includes(query) ||
        booking.adventure_name?.toLowerCase().includes(query) ||
        booking.room_type?.toLowerCase().includes(query)
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

    // Apply booking type filter
    if (effectiveBookingTypeFilter !== 'all') {
      result = result.filter(booking => booking.booking_type === effectiveBookingTypeFilter);
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
  }, [bookings, searchQuery, statusFilter, paymentFilter, hotelFilter, dateRange, effectiveBookingTypeFilter]);

  return {
    filteredBookings,
    dateRange,
    searchQuery,
    statusFilter,
    paymentFilter,
    hotelFilter,
    bookingTypeFilter: effectiveBookingTypeFilter,
    setDateRange,
    setSearchQuery,
    setStatusFilter,
    setPaymentFilter,
    setHotelFilter,
    setBookingTypeFilter
  };
};
