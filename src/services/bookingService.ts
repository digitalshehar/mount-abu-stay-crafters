
import { supabase } from '@/integrations/supabase/client';
import { Booking, BookingType } from '@/hooks/useBookings';
import { v4 as uuidv4 } from 'uuid';

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

export const addBooking = async (bookingData: Partial<Booking>, refetchCallback: () => Promise<void>) => {
  try {
    console.log('Adding new booking:', bookingData);
    
    // Calculate tax (10% of total price)
    const basePrice = bookingData.total_price || 0;
    const tax = basePrice * 0.1; // 10% tax
    const totalWithTax = basePrice + tax;
    
    // Ensure required fields
    const requiredFields = [
      'guest_name', 
      'guest_email', 
      'check_in_date', 
      'check_out_date', 
      'number_of_guests',
      'booking_type'
    ];
    
    const missingFields = requiredFields.filter(field => !bookingData[field as keyof Booking]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
    
    // Generate booking reference
    const bookingReference = generateBookingReference();
    
    // Create a properly typed booking object without optional fields
    const bookingWithTax = {
      hotel_id: bookingData.hotel_id,
      guest_name: bookingData.guest_name!,
      guest_email: bookingData.guest_email!,
      guest_phone: bookingData.guest_phone || null,
      check_in_date: bookingData.check_in_date!,
      check_out_date: bookingData.check_out_date!,
      number_of_guests: bookingData.number_of_guests!,
      room_type: bookingData.room_type || 'Standard Room',
      total_price: totalWithTax,
      base_price: basePrice,
      tax_amount: tax,
      booking_status: bookingData.booking_status || 'confirmed',
      payment_status: bookingData.payment_status || 'pending',
      created_at: new Date().toISOString(),
      booking_reference: bookingReference,
      user_id: bookingData.user_id || null
    };
    
    // Store the booking_type in a variable since it's not part of the database schema
    const bookingType = bookingData.booking_type!;
    
    const { data, error } = await supabase
      .from('bookings')
      .insert(bookingWithTax)
      .select()
      .single();

    if (error) {
      console.error('Error adding booking:', error);
      return { success: false, error: error.message, data: null };
    }

    // Add the booking_type back to the response data
    const responseData = {
      ...data,
      booking_type: bookingType,
      booking_reference: bookingReference
    };

    // Refresh bookings after adding a new one
    if (refetchCallback) {
      refetchCallback();
    }
    
    return { success: true, error: null, data: responseData };
  } catch (error: any) {
    console.error('Error in addBooking:', error);
    return { success: false, error: error.message, data: null };
  }
};

export const updateBookingStatus = async (id: string, status: string) => {
  try {
    const { error } = await supabase
      .from('bookings')
      .update({ booking_status: status })
      .eq('id', id);

    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error updating booking status:', error);
    return false;
  }
};

export const updatePaymentStatus = async (id: string, status: string) => {
  try {
    const { error } = await supabase
      .from('bookings')
      .update({ payment_status: status })
      .eq('id', id);

    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error updating payment status:', error);
    return false;
  }
};

export const deleteBooking = async (id: string) => {
  try {
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', id);

    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error deleting booking:', error);
    return false;
  }
};

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
