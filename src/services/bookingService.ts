
import { supabase } from '@/integrations/supabase/client';
import { Booking, BookingType } from '@/hooks/useBookings';
import { v4 as uuidv4 } from 'uuid';
import * as bookingOperations from './bookingService/bookingOperations';

// Generate a booking reference like "BK-XXXX-XXXX"
const generateBookingReference = () => {
  const uniqueId = uuidv4().toUpperCase().replace(/-/g, '').substring(0, 8);
  return `BK-${uniqueId.substring(0, 4)}-${uniqueId.substring(4, 8)}`;
};

export const fetchHotelBookings = async (): Promise<Booking[]> => {
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
      booking_type: 'hotel' as BookingType
    }));
  } catch (error: any) {
    console.error('Error fetching hotel bookings:', error);
    return [];
  }
};

export const fetchCarBookings = async (): Promise<Booking[]> => {
  try {
    const { data, error } = await supabase
      .from('car_rentals')
      .select('*');

    if (error) throw error;

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
      booking_type: 'car' as BookingType
    }));
  } catch (error: any) {
    console.error('Error fetching car bookings:', error);
    return [];
  }
};

export const fetchBikeBookings = async (): Promise<Booking[]> => {
  try {
    const { data, error } = await supabase
      .from('bike_rentals')
      .select('*');

    if (error) throw error;

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
      booking_type: 'bike' as BookingType
    }));
  } catch (error: any) {
    console.error('Error fetching bike bookings:', error);
    return [];
  }
};

export const fetchAdventureBookings = async (): Promise<Booking[]> => {
  try {
    const { data, error } = await supabase
      .from('adventures')
      .select('*');

    if (error) throw error;

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
      booking_type: 'adventure' as BookingType
    }));
  } catch (error: any) {
    console.error('Error fetching adventure bookings:', error);
    return [];
  }
};

// Use the refactored booking operations
export const addBooking = bookingOperations.addBooking;
export const updateBookingStatus = bookingOperations.updateBookingStatus;
export const updatePaymentStatus = bookingOperations.updatePaymentStatus;
export const deleteBooking = bookingOperations.deleteBooking;

export const setupRealtimeBookings = (callbackFn: () => void) => {
  const channel = supabase
    .channel('booking-updates')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'bookings' },
      () => {
        callbackFn();
      }
    )
    .subscribe();
    
  return channel;
};
