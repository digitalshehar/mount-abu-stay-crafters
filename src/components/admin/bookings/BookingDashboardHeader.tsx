
import React from "react";
import { Button } from "@/components/ui/button";
import { Filter, RefreshCw, Download, Calendar } from "lucide-react";
import { format } from "date-fns";

interface BookingDashboardHeaderProps {
  onFilterOpen: () => void;
  bookingsCount: number;
  onRefresh: () => void;
  onCalendarView?: () => void;
  bookings: any[];
}

const BookingDashboardHeader = ({ 
  onFilterOpen, 
  bookingsCount,
  onRefresh,
  onCalendarView,
  bookings
}: BookingDashboardHeaderProps) => {
  const generateCSV = () => {
    if (!bookings || bookings.length === 0) return '';
    
    // Define CSV headers
    const headers = [
      'ID', 
      'Guest Name', 
      'Hotel', 
      'Room Type', 
      'Check-in', 
      'Check-out', 
      'Status',
      'Payment Status',
      'Total Amount',
      'Created At'
    ];
    
    // Create CSV rows from booking data
    const rows = bookings.map(booking => [
      booking.id,
      booking.guest_name,
      booking.hotel_name,
      booking.room_type,
      booking.check_in_date ? format(new Date(booking.check_in_date), 'yyyy-MM-dd') : '',
      booking.check_out_date ? format(new Date(booking.check_out_date), 'yyyy-MM-dd') : '',
      booking.status,
      booking.payment_status,
      booking.total_amount ? `₹${booking.total_amount}` : '',
      booking.created_at ? format(new Date(booking.created_at), 'yyyy-MM-dd HH:mm') : ''
    ]);
    
    // Combine headers and rows
    return [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
  };

  const handleExport = () => {
    const csvContent = generateCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    // Set filename with current date
    const fileName = `bookings_export_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold">Booking Management</h1>
        <p className="text-muted-foreground">
          {bookingsCount} total bookings
        </p>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRefresh}
          className="gap-1"
        >
          <RefreshCw className="h-4 w-4" /> Refresh
        </Button>
        
        {onCalendarView && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onCalendarView}
            className="gap-1"
          >
            <Calendar className="h-4 w-4" /> Calendar
          </Button>
        )}
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleExport}
          className="gap-1"
          disabled={!bookings || bookings.length === 0}
        >
          <Download className="h-4 w-4" /> Export
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onFilterOpen}
          className="gap-1"
        >
          <Filter className="h-4 w-4" /> Filter
        </Button>
      </div>
    </div>
  );
};

export default BookingDashboardHeader;
