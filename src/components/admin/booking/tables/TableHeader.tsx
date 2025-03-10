
import React from 'react';
import { TableRow, TableHead, TableHeader as ShadcnTableHeader } from '@/components/ui/table';

const AdminTableHeader = () => {
  return (
    <TableRow>
      <ShadcnTableHeader className="w-[100px]">ID/Ref</ShadcnTableHeader>
      <ShadcnTableHeader className="w-[150px]">Customer</ShadcnTableHeader>
      <ShadcnTableHeader className="w-[100px]">Type</ShadcnTableHeader>
      <ShadcnTableHeader className="w-[150px]">Service</ShadcnTableHeader>
      <ShadcnTableHeader className="w-[120px]">Check In</ShadcnTableHeader>
      <ShadcnTableHeader className="w-[120px]">Check Out</ShadcnTableHeader>
      <ShadcnTableHeader className="w-[100px]">Amount</ShadcnTableHeader>
      <ShadcnTableHeader className="w-[100px]">Status</ShadcnTableHeader>
      <ShadcnTableHeader className="w-[100px]">Payment</ShadcnTableHeader>
      <ShadcnTableHeader className="w-[80px] text-right">Actions</ShadcnTableHeader>
    </TableRow>
  );
};

export default AdminTableHeader;
