
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PaymentStatusSelectProps {
  currentStatus: string;
  onStatusChange: (status: string) => void;
}

const PaymentStatusSelect: React.FC<PaymentStatusSelectProps> = ({ currentStatus, onStatusChange }) => {
  return (
    <div className="space-y-1">
      <Label className="text-xs text-muted-foreground">Payment Status</Label>
      <Select defaultValue={currentStatus} onValueChange={onStatusChange}>
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
