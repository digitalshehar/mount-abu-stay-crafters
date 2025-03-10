
import React from "react";
import { Button } from "@/components/ui/button";
import { Filter, RefreshCw, Download } from "lucide-react";

interface BookingDashboardHeaderProps {
  onFilterOpen: () => void;
  bookingsCount: number;
  onRefresh: () => void;
}

const BookingDashboardHeader = ({ 
  onFilterOpen, 
  bookingsCount,
  onRefresh 
}: BookingDashboardHeaderProps) => {
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
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => {
            // Export functionality would go here
            const csvContent = "data:text/csv;charset=utf-8,";
            const link = document.createElement("a");
            link.setAttribute("href", encodeURI(csvContent));
            link.setAttribute("download", "bookings_export.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
          className="gap-1"
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
