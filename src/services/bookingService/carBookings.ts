
import { supabase } from '@/integrations/supabase/client';
import { Booking } from '@/hooks/useBookings';

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
      booking_type: 'car'
    }));
  } catch (error: any) {
    console.error('Error fetching car bookings:', error);
    return [];
  }
};
