
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Sample booking data (in a real app, this would come from an API)
const bookings = [
  {
    id: 'BK12345',
    hotelName: 'Sunrise Resort',
    location: 'Mount Abu, Rajasthan',
    checkIn: '2023-11-15',
    checkOut: '2023-11-18',
    status: 'Confirmed',
    totalAmount: 12500,
  },
  {
    id: 'BK12346',
    hotelName: 'Hilltop Retreat',
    location: 'Mount Abu, Rajasthan',
    checkIn: '2023-12-24',
    checkOut: '2023-12-28',
    status: 'Pending',
    totalAmount: 18900,
  },
];

const BookingHistory = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Your Bookings</h1>
          
          {bookings.length > 0 ? (
            <div className="space-y-6">
              {bookings.map((booking) => (
                <Card key={booking.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="mb-1">{booking.hotelName}</CardTitle>
                        <p className="text-sm text-gray-600">{booking.location}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm ${
                        booking.status === 'Confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Booking ID</h3>
                        <p>{booking.id}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Check-in</h3>
                        <p>{new Date(booking.checkIn).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Check-out</h3>
                        <p>{new Date(booking.checkOut).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Amount</h3>
                        <p className="font-semibold">₹{booking.totalAmount}</p>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      {booking.status === 'Pending' && (
                        <Button variant="destructive" size="sm">Cancel</Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="mb-4">You don't have any bookings yet.</p>
                <Button>Book a Hotel</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BookingHistory;
