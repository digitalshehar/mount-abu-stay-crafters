
import React from 'react';
import { Button } from "@/components/ui/button";

interface CompareButtonProps {
  compareCount: number;
  onToggleDrawer: () => void;
}

const CompareButton: React.FC<CompareButtonProps> = ({
  compareCount,
  onToggleDrawer
}) => {
  if (compareCount === 0) return null;
  
  return (
    <Button
      size="sm"
      onClick={onToggleDrawer}
    >
      Compare ({compareCount})
    </Button>
  );
};

export default CompareButton;
