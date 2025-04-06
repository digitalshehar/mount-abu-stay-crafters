
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, User, CreditCard, Check, X, Eye, MoreHorizontal } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

interface Booking {
  id: string;
  booking_reference: string;
  guest_name: string;
  guest_email: string;
  guest_phone?: string;
  hotel_name: string;
  check_in_date: string;
  check_out_date: string;
  total_price: number;
  booking_status: string;
  payment_status: string;
  created_at: string;
}

const EarlyHotelBookingsList = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showBookingDetails, setShowBookingDetails] = useState(false);

  useEffect(() => {
    fetchEarlyHotelBookings();
  }, []);

  const fetchEarlyHotelBookings = async () => {
    try {
      setLoading(true);
      // Fetch hotels first to get IDs
      const { data: hotelsData, error: hotelsError } = await supabase
        .from('early_hotels')
        .select('id');

      if (hotelsError) {
        throw hotelsError;
      }

      if (!hotelsData || hotelsData.length === 0) {
        setBookings([]);
        return;
      }

      const hotelIds = hotelsData.map(hotel => hotel.id);

      // Now fetch bookings for these hotels
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .in('hotel_id', hotelIds)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching early hotel bookings:', error);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ booking_status: status })
        .eq('id', id);

      if (error) throw error;

      setBookings(bookings.map(booking => 
        booking.id === id ? { ...booking, booking_status: status } : booking
      ));

      if (selectedBooking && selectedBooking.id === id) {
        setSelectedBooking({ ...selectedBooking, booking_status: status });
      }

      toast.success(`Booking status updated to ${status}`);
    } catch (error) {
      console.error('Error updating booking status:', error);
      toast.error('Failed to update booking status');
    }
  };

  const updatePaymentStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ payment_status: status })
        .eq('id', id);

      if (error) throw error;

      setBookings(bookings.map(booking => 
        booking.id === id ? { ...booking, payment_status: status } : booking
      ));

      if (selectedBooking && selectedBooking.id === id) {
        setSelectedBooking({ ...selectedBooking, payment_status: status });
      }

      toast.success(`Payment status updated to ${status}`);
    } catch (error) {
      console.error('Error updating payment status:', error);
      toast.error('Failed to update payment status');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const calculateDuration = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffMs = end.getTime() - start.getTime();
    const diffHrs = Math.round(diffMs / (1000 * 60 * 60));
    return `${diffHrs} hour${diffHrs !== 1 ? 's' : ''}`;
  };

  const viewBookingDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowBookingDetails(true);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Early Hotel Bookings</h2>
        <Button size="sm" onClick={fetchEarlyHotelBookings}>
          <MoreHorizontal className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4 p-4 border rounded-md">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-md">
          <Clock className="h-12 w-12 mx-auto text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-900">No Early Hotel Bookings</h3>
          <p className="text-gray-500 mt-1">No bookings have been made for early hotels yet.</p>
        </div>
      ) : (
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reference</TableHead>
                <TableHead>Guest</TableHead>
                <TableHead>Hotel</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.booking_reference}</TableCell>
                  <TableCell>{booking.guest_name}</TableCell>
                  <TableCell>{booking.hotel_name}</TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-3.5 w-3.5 mr-1 text-gray-500" />
                      {new Date(booking.check_in_date).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(booking.booking_status)}>
                      {booking.booking_status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={booking.payment_status === 'paid' ? 'default' : 'secondary'}>
                      {booking.payment_status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => viewBookingDetails(booking)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => updateBookingStatus(booking.id, 'confirmed')}>
                            <Check className="h-4 w-4 mr-2 text-green-600" />
                            Mark as Confirmed
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateBookingStatus(booking.id, 'completed')}>
                            <Check className="h-4 w-4 mr-2 text-blue-600" />
                            Mark as Completed
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateBookingStatus(booking.id, 'cancelled')}>
                            <X className="h-4 w-4 mr-2 text-red-600" />
                            Mark as Cancelled
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updatePaymentStatus(booking.id, 'paid')}>
                            <CreditCard className="h-4 w-4 mr-2 text-green-600" />
                            Mark as Paid
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Booking Details Dialog */}
      <Dialog open={showBookingDetails} onOpenChange={setShowBookingDetails}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 py-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Reference</p>
                  <p className="font-medium">{selectedBooking.booking_reference}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Price</p>
                  <p className="font-medium">₹{selectedBooking.total_price}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Guest</p>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1 text-gray-500" />
                    <p>{selectedBooking.guest_name}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Contact</p>
                  <p className="text-sm">{selectedBooking.guest_email}</p>
                  {selectedBooking.guest_phone && (
                    <p className="text-sm">{selectedBooking.guest_phone}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Hotel</p>
                  <p>{selectedBooking.hotel_name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Duration</p>
                  <p>{calculateDuration(selectedBooking.check_in_date, selectedBooking.check_out_date)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Check-in</p>
                  <p>{formatDate(selectedBooking.check_in_date)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Check-out</p>
                  <p>{formatDate(selectedBooking.check_out_date)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Booking Status</p>
                  <Badge className={getStatusBadgeColor(selectedBooking.booking_status)}>
                    {selectedBooking.booking_status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Payment Status</p>
                  <Badge variant={selectedBooking.payment_status === 'paid' ? 'default' : 'secondary'}>
                    {selectedBooking.payment_status}
                  </Badge>
                </div>
              </div>
              
              <div className="flex justify-between border-t pt-4">
                <div>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => updateBookingStatus(selectedBooking.id, 'cancelled')}
                    disabled={selectedBooking.booking_status === 'cancelled'}
                  >
                    Cancel Booking
                  </Button>
                </div>
                <div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mr-2"
                    onClick={() => updateBookingStatus(selectedBooking.id, 'completed')}
                    disabled={selectedBooking.booking_status === 'completed'}
                  >
                    Mark Completed
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => updatePaymentStatus(selectedBooking.id, 'paid')}
                    disabled={selectedBooking.payment_status === 'paid'}
                  >
                    Mark Paid
                  </Button>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBookingDetails(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EarlyHotelBookingsList;
