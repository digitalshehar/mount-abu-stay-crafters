
import { supabase } from '@/integrations/supabase/client';
import { Booking } from '@/hooks/useBookings';

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
      booking_type: 'bike'
    }));
  } catch (error: any) {
    console.error('Error fetching bike bookings:', error);
    return [];
  }
};
