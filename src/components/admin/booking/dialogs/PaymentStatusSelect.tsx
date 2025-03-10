
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PaymentStatusSelectProps {
  id?: string;
  currentStatus: string;
  onStatusChange: (id: string, status: string) => Promise<boolean>;
}

const PaymentStatusSelect: React.FC<PaymentStatusSelectProps> = ({ id = '', currentStatus, onStatusChange }) => {
  const handleStatusChange = (status: string) => {
    onStatusChange(id, status);
  };

  return (
    <div className="space-y-1">
      <Label className="text-xs text-muted-foreground">Payment Status</Label>
      <Select defaultValue={currentStatus} onValueChange={handleStatusChange}>
        <SelectTrigger>
          <SelectValue placeholder="Payment Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="paid">Paid</SelectItem>
          <SelectItem value="refunded">Refunded</SelectItem>
          <SelectItem value="failed">Failed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PaymentStatusSelect;
