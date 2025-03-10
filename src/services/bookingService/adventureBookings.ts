
import { supabase } from '@/integrations/supabase/client';
import { Booking } from '@/hooks/useBookings';

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
      booking_type: 'adventure',
      booking_reference: `ADV${adventure.id}${Date.now().toString().slice(-4)}`
    }));
  } catch (error: any) {
    console.error('Error fetching adventure bookings:', error);
    return [];
  }
};
