
import React from 'react';
import { TableRow, TableHead, TableHeader as ShadcnTableHeader } from '@/components/ui/table';

const AdminTableHeader = () => {
  return (
    <TableRow>
      <ShadcnTableHeader className="w-[180px]">Booking Ref/ID</ShadcnTableHeader>
      <ShadcnTableHeader className="w-[150px]">Customer</ShadcnTableHeader>
      <ShadcnTableHeader className="w-[180px]">Service Details</ShadcnTableHeader>
      <ShadcnTableHeader className="w-[150px]">Check In</ShadcnTableHeader>
      <ShadcnTableHeader className="w-[150px]">Check Out</ShadcnTableHeader>
      <ShadcnTableHeader className="w-[120px]">Amount</ShadcnTableHeader>
      <ShadcnTableHeader className="w-[120px]">Status</ShadcnTableHeader>
      <ShadcnTableHeader className="w-[120px]">Payment</ShadcnTableHeader>
      <ShadcnTableHeader className="w-[120px]">Type</ShadcnTableHeader>
      <ShadcnTableHeader className="w-[80px] text-right">Actions</ShadcnTableHeader>
    </TableRow>
  );
};

export default AdminTableHeader;
