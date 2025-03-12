
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useBooking } from '@/context/BookingContext';
import { format } from 'date-fns';

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const { bookingDetails, clearBookingDetails } = useBooking();
  
  // Generate a random booking reference
  const bookingReference = React.useMemo(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }, []);
  
  // Clear booking details when leaving this page
  useEffect(() => {
    return () => {
      clearBookingDetails();
    };
  }, [clearBookingDetails]);
  
  if (!bookingDetails.hotel) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Booking Confirmation</h1>
            <Card>
              <CardContent className="pt-6">
                <p>No booking information found. Please select a hotel first.</p>
                <Button onClick={() => navigate('/hotels')} className="mt-4">Browse Hotels</Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-20 w-20 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600 mb-8">Your booking has been successfully confirmed. Check your email for details.</p>
          
          <Card className="mb-8 text-left">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <h2 className="text-xl font-semibold">Booking Reference</h2>
                  <p className="text-lg font-mono">{bookingReference}</p>
                </div>
                
                <div>
                  <h3 className="font-medium">Hotel</h3>
                  <p>{bookingDetails.hotel?.name}</p>
                </div>
                
                <div>
                  <h3 className="font-medium">Location</h3>
                  <p>{bookingDetails.hotel?.location}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium">Check-in</h3>
                    <p>{bookingDetails.checkIn ? format(bookingDetails.checkIn, 'PPP') : 'Not specified'}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Check-out</h3>
                    <p>{bookingDetails.checkOut ? format(bookingDetails.checkOut, 'PPP') : 'Not specified'}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium">Guests</h3>
                    <p>{bookingDetails.guests || 1}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Rooms</h3>
                    <p>{bookingDetails.rooms || 1}</p>
                  </div>
                </div>
                
                <div className="border-t pt-2">
                  <h3 className="font-medium">Total Amount</h3>
                  <p className="text-lg font-bold">₹{Math.round((bookingDetails.totalPrice || 0) * 1.18)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate('/')}>Return to Home</Button>
            <Button onClick={() => navigate('/bookings')} variant="outline">View My Bookings</Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BookingConfirmation;
