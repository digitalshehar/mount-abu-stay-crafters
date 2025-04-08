
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { EarlyHotel } from '@/components/admin/hotels/types/earlyHotel';
import EarlyHotelDetails from '@/components/early-hotel/EarlyHotelDetails';
import EarlyHotelBookingDialog from '@/components/early-hotel/EarlyHotelBookingDialog';
import EarlyHotelBookingSuccessDialog from '@/components/early-hotel/EarlyHotelBookingSuccessDialog';
import { useEarlyHotelBooking } from '@/hooks/useEarlyHotelBooking';
import { toast } from 'sonner';

const EarlyHotelDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [hotel, setHotel] = useState<EarlyHotel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const {
    showBookingForm,
    setShowBookingForm,
    isBookingLoading,
    selectedHours,
    setSelectedHours,
    showBookingSuccess,
    setShowBookingSuccess,
    bookingReference,
    bookingDetails,
    guestName,
    setGuestName,
    guestEmail,
    setGuestEmail,
    guestPhone,
    setGuestPhone,
    handleBookingSubmit,
    calculateTotalPrice
  } = useEarlyHotelBooking(hotel);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        setIsLoading(true);
        
        if (!id) {
          toast.error("Hotel ID is missing");
          return;
        }
        
        const { data, error } = await supabase
          .from('early_hotels')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) {
          throw error;
        }
        
        setHotel(data);
      } catch (error: any) {
        console.error('Error fetching hotel details:', error);
        toast.error('Failed to load hotel details');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchHotel();
  }, [id]);

  return (
    <>
      <EarlyHotelDetails 
        hotel={hotel} 
        isLoading={isLoading} 
      />
      
      <EarlyHotelBookingDialog
        hotel={hotel}
        isOpen={showBookingForm}
        onClose={() => setShowBookingForm(false)}
        selectedHours={selectedHours}
        totalPrice={calculateTotalPrice(hotel, selectedHours)}
        isLoading={isBookingLoading}
        guestName={guestName}
        setGuestName={setGuestName}
        guestEmail={guestEmail}
        setGuestEmail={setGuestEmail}
        guestPhone={guestPhone}
        setGuestPhone={setGuestPhone}
        onSubmit={handleBookingSubmit}
      />
      
      <EarlyHotelBookingSuccessDialog
        isOpen={showBookingSuccess}
        onClose={() => setShowBookingSuccess(false)}
        bookingReference={bookingReference}
        bookingDetails={bookingDetails}
      />
    </>
  );
};

export default EarlyHotelDetailPage;
