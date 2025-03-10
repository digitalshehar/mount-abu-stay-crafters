
import { Booking } from '@/hooks/useBookings';

export const useBookingExport = (filteredBookings: Booking[]) => {
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

  return { exportBookingsToCSV };
};
