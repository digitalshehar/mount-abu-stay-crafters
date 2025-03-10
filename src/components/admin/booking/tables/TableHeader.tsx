
import React from 'react';
import { TableHead, TableHeader as UITableHeader, TableRow } from '@/components/ui/table';

const BookingTableHeader: React.FC = () => {
  return (
    <UITableHeader>
      <TableRow>
        <TableHead className="w-[100px]">Booking ID</TableHead>
        <TableHead className="w-[180px]">Guest</TableHead>
        <TableHead className="w-[100px]">Type</TableHead>
        <TableHead className="w-[180px]">Service</TableHead>
        <TableHead className="w-[120px]">Check In</TableHead>
        <TableHead className="w-[120px]">Check Out</TableHead>
        <TableHead className="w-[100px]">Amount</TableHead>
        <TableHead className="w-[100px]">Status</TableHead>
        <TableHead className="w-[100px]">Payment</TableHead>
        <TableHead className="text-right w-[100px]">Actions</TableHead>
      </TableRow>
    </UITableHeader>
  );
};

export default BookingTableHeader;
