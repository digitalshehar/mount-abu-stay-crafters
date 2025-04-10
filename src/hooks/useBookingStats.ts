
import { useMemo } from 'react';
import { Booking, BookingStats } from '@/hooks/useBookings';

export const useBookingStats = (filteredBookings: Booking[]) => {
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
      occupancyRate: 75.5 // Default occupancy rate as placeholder
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

    // Calculate occupancy rate if we have data
    if (filteredBookings.length > 0) {
      // This is a placeholder calculation - in a real system you would 
      // calculate based on room availability and booking dates
      const confirmedBookings = filteredBookings.filter(b => 
        b.booking_status === 'confirmed' || b.booking_status === 'completed'
      ).length;
      stats.occupancyRate = (confirmedBookings / filteredBookings.length) * 100;
    }

    return stats;
  }, [filteredBookings]);

  return bookingStats;
};
