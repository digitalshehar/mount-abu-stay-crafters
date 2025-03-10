
import { supabase } from '@/integrations/supabase/client';

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
