
import { Booking } from '@/hooks/useBookings';
import { hasPermission, getUserRole } from './permissions';

/**
 * Checks if a user can manage a booking based on their role
 */
export const canManageBooking = (user: any, booking: Booking): boolean => {
  const userRole = getUserRole(user);
  
  // Admins can manage all bookings
  if (hasPermission(userRole, 'manage_bookings')) {
    return true;
  }
  
  // Users can only manage their own bookings
  if (hasPermission(userRole, 'view_bookings')) {
    return user?.id === booking.user_id;
  }
  
  return false;
};

/**
 * Gets a user-friendly label for booking types
 */
export const getBookingTypeLabel = (type: string): string => {
  switch (type) {
    case 'hotel': return 'Hotel Stay';
    case 'car': return 'Car Rental';
    case 'bike': return 'Bike Rental';
    case 'adventure': return 'Adventure Tour';
    default: return 'Booking';
  }
};

/**
 * Formats a price value for display
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};
