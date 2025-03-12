
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useBooking } from '@/context/BookingContext';
import { format } from 'date-fns';

const Checkout = () => {
  const navigate = useNavigate();
  const { bookingDetails } = useBooking();
  
  // Placeholder function for handling checkout
  const handleCheckout = () => {
    // In a real app, you would process payment and create a booking here
    // For now, just navigate to the confirmation page
    navigate('/booking/confirmation');
  };
  
  if (!bookingDetails.hotel) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>
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
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Checkout</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Booking Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
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
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Please note: This is a demo application. No real payment will be processed.</p>
                  <Button onClick={handleCheckout} size="lg" className="w-full">Complete Booking</Button>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle>Price Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Room Rate</span>
                      <span>₹{bookingDetails.totalPrice || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes & Fees</span>
                      <span>₹{Math.round((bookingDetails.totalPrice || 0) * 0.18)}</span>
                    </div>
                    <div className="border-t pt-2 mt-2 font-bold flex justify-between">
                      <span>Total</span>
                      <span>₹{Math.round((bookingDetails.totalPrice || 0) * 1.18)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Checkout;
