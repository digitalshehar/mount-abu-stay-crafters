
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Eye, Printer, Edit } from "lucide-react";
import { Booking } from "@/hooks/useBookings";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

interface BookingsTableProps {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
  updateBookingStatus: (id: string, status: string) => Promise<boolean>;
  updatePaymentStatus: (id: string, status: string) => Promise<boolean>;
  isCompact?: boolean;
}

const BookingsTable = ({
  bookings,
  loading,
  error,
  updateBookingStatus,
  updatePaymentStatus,
  isCompact = false
}: BookingsTableProps) => {
  if (error) {
    return (
      <div className="p-4 text-center">
        <div className="text-red-500 mb-2">Error loading bookings</div>
        <p className="text-sm text-stone-500">{error}</p>
      </div>
    );
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return { variant: 'outline', color: 'text-green-600 border-green-200 bg-green-50' };
      case 'pending':
        return { variant: 'outline', color: 'text-amber-600 border-amber-200 bg-amber-50' };
      case 'cancelled':
        return { variant: 'outline', color: 'text-red-600 border-red-200 bg-red-50' };
      case 'completed':
        return { variant: 'outline', color: 'text-blue-600 border-blue-200 bg-blue-50' };
      default:
        return { variant: 'outline', color: 'text-stone-600 border-stone-200 bg-stone-50' };
    }
  };

  const getPaymentBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return { variant: 'outline', color: 'text-green-600 border-green-200 bg-green-50' };
      case 'pending':
        return { variant: 'outline', color: 'text-amber-600 border-amber-200 bg-amber-50' };
      case 'refunded':
        return { variant: 'outline', color: 'text-purple-600 border-purple-200 bg-purple-50' };
      case 'failed':
        return { variant: 'outline', color: 'text-red-600 border-red-200 bg-red-50' };
      default:
        return { variant: 'outline', color: 'text-stone-600 border-stone-200 bg-stone-50' };
    }
  };

  const renderTableContent = () => {
    if (loading) {
      return Array(isCompact ? 3 : 6).fill(0).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton className="h-5 w-24" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-32" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-24" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-20" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-20" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-16" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-8 w-8 rounded-full" />
          </TableCell>
        </TableRow>
      ));
    }

    if (bookings.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={7} className="h-32 text-center">
            <div className="flex flex-col items-center justify-center">
              <p className="text-stone-500 mb-1">No bookings found</p>
              <span className="text-xs text-stone-400">Try adjusting your filters</span>
            </div>
          </TableCell>
        </TableRow>
      );
    }

    return bookings.map((booking) => (
      <TableRow key={booking.id}>
        <TableCell>
          <div className="font-medium">{booking.guest_name}</div>
          <div className="text-xs text-stone-500">{booking.guest_email}</div>
        </TableCell>
        <TableCell>{booking.hotel_name}</TableCell>
        <TableCell>
          <div>{format(new Date(booking.check_in_date), 'PP')}</div>
          <div className="text-xs text-stone-500">{booking.room_type}</div>
        </TableCell>
        <TableCell>
          <Badge 
            variant="outline"
            className={getStatusBadgeVariant(booking.booking_status).color}
          >
            {booking.booking_status}
          </Badge>
        </TableCell>
        <TableCell>
          <Badge 
            variant="outline"
            className={getPaymentBadgeVariant(booking.payment_status).color}
          >
            {booking.payment_status}
          </Badge>
        </TableCell>
        <TableCell className="text-right font-medium">
          ₹{booking.total_price.toLocaleString('en-IN')}
        </TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              
              <DropdownMenuItem className="cursor-pointer">
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              
              <DropdownMenuItem className="cursor-pointer">
                <Edit className="mr-2 h-4 w-4" />
                Edit Booking
              </DropdownMenuItem>
              
              <DropdownMenuItem className="cursor-pointer">
                <Printer className="mr-2 h-4 w-4" />
                Print
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuLabel>Change Status</DropdownMenuLabel>
              <DropdownMenuItem 
                className="cursor-pointer"
                onClick={() => updateBookingStatus(booking.id, 'confirmed')}
              >
                <Badge variant="outline" className="mr-2 bg-green-50 border-green-200 text-green-600">
                  Confirmed
                </Badge>
                Set as Confirmed
              </DropdownMenuItem>
              
              <DropdownMenuItem 
                className="cursor-pointer"
                onClick={() => updateBookingStatus(booking.id, 'pending')}
              >
                <Badge variant="outline" className="mr-2 bg-amber-50 border-amber-200 text-amber-600">
                  Pending
                </Badge>
                Set as Pending
              </DropdownMenuItem>
              
              <DropdownMenuItem 
                className="cursor-pointer"
                onClick={() => updateBookingStatus(booking.id, 'cancelled')}
              >
                <Badge variant="outline" className="mr-2 bg-red-50 border-red-200 text-red-600">
                  Cancelled
                </Badge>
                Set as Cancelled
              </DropdownMenuItem>
              
              <DropdownMenuItem 
                className="cursor-pointer"
                onClick={() => updateBookingStatus(booking.id, 'completed')}
              >
                <Badge variant="outline" className="mr-2 bg-blue-50 border-blue-200 text-blue-600">
                  Completed
                </Badge>
                Set as Completed
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuLabel>Change Payment</DropdownMenuLabel>
              <DropdownMenuItem 
                className="cursor-pointer"
                onClick={() => updatePaymentStatus(booking.id, 'paid')}
              >
                <Badge variant="outline" className="mr-2 bg-green-50 border-green-200 text-green-600">
                  Paid
                </Badge>
                Mark as Paid
              </DropdownMenuItem>
              
              <DropdownMenuItem 
                className="cursor-pointer"
                onClick={() => updatePaymentStatus(booking.id, 'pending')}
              >
                <Badge variant="outline" className="mr-2 bg-amber-50 border-amber-200 text-amber-600">
                  Pending
                </Badge>
                Mark as Pending
              </DropdownMenuItem>
              
              <DropdownMenuItem 
                className="cursor-pointer"
                onClick={() => updatePaymentStatus(booking.id, 'refunded')}
              >
                <Badge variant="outline" className="mr-2 bg-purple-50 border-purple-200 text-purple-600">
                  Refunded
                </Badge>
                Mark as Refunded
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Guest</TableHead>
            <TableHead>Hotel</TableHead>
            <TableHead>Check-in/Room</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {renderTableContent()}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingsTable;
