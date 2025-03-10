
import { supabase } from '@/integrations/supabase/client';
import { Booking } from '@/hooks/useBookings';

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
      booking_type: 'hotel'
    }));
  } catch (error: any) {
    console.error('Error fetching hotel bookings:', error);
    return [];
  }
};
