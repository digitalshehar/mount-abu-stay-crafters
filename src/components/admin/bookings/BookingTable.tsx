
import React, { useState } from "react";
import { format } from "date-fns";
import { Booking } from "@/hooks/useBookings";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Calendar, 
  ChevronDown, 
  Edit, 
  MoreHorizontal, 
  User, 
  Clock, 
  Hotel 
} from "lucide-react";
import BookingDetailsDialog from "./BookingDetailsDialog";

interface BookingTableProps {
  bookings: Booking[];
  loading: boolean;
  onUpdateStatus: (id: string, status: string) => void;
  onUpdatePaymentStatus: (id: string, status: string) => void;
}

const BookingTable = ({ 
  bookings, 
  loading, 
  onUpdateStatus, 
  onUpdatePaymentStatus 
}: BookingTableProps) => {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'refunded': return 'bg-purple-100 text-purple-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setDetailsOpen(true);
  };

  const bookingStatusOptions = ['confirmed', 'pending', 'cancelled', 'completed'];
  const paymentStatusOptions = ['pending', 'paid', 'failed', 'refunded'];

  if (loading) {
    return (
      <div className="border rounded-md p-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Loading bookings...</p>
        </div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="border rounded-md p-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="text-lg font-medium">No bookings found</p>
          <p className="text-sm text-muted-foreground">No booking records match your criteria.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Guest</TableHead>
                <TableHead>Hotel</TableHead>
                <TableHead>Room Type</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">
                    {booking.id.substring(0, 8)}...
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{booking.guest_name}</p>
                        <p className="text-xs text-muted-foreground">{booking.guest_email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Hotel className="h-4 w-4 text-muted-foreground" />
                      {booking.hotel_name || `Hotel #${booking.hotel_id}`}
                    </div>
                  </TableCell>
                  <TableCell>{booking.room_type}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs">{format(new Date(booking.check_in_date), 'MMM dd, yyyy')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs">{format(new Date(booking.check_out_date), 'MMM dd, yyyy')}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(booking.created_at), 'MMM dd, yyyy')}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">₹{Number(booking.total_price).toLocaleString('en-IN')}</div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 px-2 flex items-center gap-1">
                          <Badge className={getStatusBadgeColor(booking.booking_status)}>
                            {booking.booking_status}
                          </Badge>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {bookingStatusOptions.map((status) => (
                          <DropdownMenuItem
                            key={status}
                            onClick={() => onUpdateStatus(booking.id, status)}
                          >
                            <Badge className={getStatusBadgeColor(status)} variant="outline">
                              {status}
                            </Badge>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 px-2 flex items-center gap-1">
                          <Badge className={getPaymentStatusBadgeColor(booking.payment_status)}>
                            {booking.payment_status}
                          </Badge>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {paymentStatusOptions.map((status) => (
                          <DropdownMenuItem
                            key={status}
                            onClick={() => onUpdatePaymentStatus(booking.id, status)}
                          >
                            <Badge className={getPaymentStatusBadgeColor(status)} variant="outline">
                              {status}
                            </Badge>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(booking)}>
                          <Edit className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {selectedBooking && (
        <BookingDetailsDialog
          booking={selectedBooking}
          isOpen={detailsOpen}
          onClose={() => setDetailsOpen(false)}
          onUpdateStatus={onUpdateStatus}
          onUpdatePaymentStatus={onUpdatePaymentStatus}
        />
      )}
    </>
  );
};

export default BookingTable;
