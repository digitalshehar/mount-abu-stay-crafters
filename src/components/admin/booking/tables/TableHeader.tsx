
import React from 'react';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

const TableHeader: React.FC = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Booking ID</TableHead>
        <TableHead>Guest</TableHead>
        <TableHead>Type</TableHead>
        <TableHead>Service</TableHead>
        <TableHead>Check In</TableHead>
        <TableHead>Check Out</TableHead>
        <TableHead>Amount</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Payment</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default TableHeader;
