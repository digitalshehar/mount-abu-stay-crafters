
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { TableRow, TableCell, TableBody, Table } from '@/components/ui/table';
import BookingTableHeader from './TableHeader';

const TableLoading: React.FC = () => {
  return (
    <div className="rounded-md border shadow-sm">
      <Table>
        <BookingTableHeader />
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
              <TableCell>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[120px]" />
                  <Skeleton className="h-3 w-[150px]" />
                </div>
              </TableCell>
              <TableCell><Skeleton className="h-6 w-[80px]" /></TableCell>
              <TableCell><Skeleton className="h-4 w-[140px]" /></TableCell>
              <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
              <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
              <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
              <TableCell><Skeleton className="h-6 w-[80px]" /></TableCell>
              <TableCell><Skeleton className="h-6 w-[80px]" /></TableCell>
              <TableCell className="text-right"><Skeleton className="h-8 w-8 rounded-full ml-auto" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableLoading;
