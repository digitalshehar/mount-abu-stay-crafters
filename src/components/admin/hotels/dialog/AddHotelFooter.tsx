
import React from "react";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

interface AddHotelFooterProps {
  isLoading: boolean;
  isFormValid: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  isEditing?: boolean;
}

const AddHotelFooter = ({
  isLoading,
  isFormValid,
  onCancel,
  onSubmit,
  isEditing = false
}: AddHotelFooterProps) => {
  return (
    <div className="flex items-center justify-end gap-3 pt-3 border-t mt-6">
      <Button
        variant="outline"
        type="button"
        onClick={onCancel}
        disabled={isLoading}
      >
        Cancel
      </Button>
      <Button
        onClick={onSubmit}
        disabled={!isFormValid || isLoading}
        className="gap-1"
      >
        {isLoading && <LoaderCircle className="h-4 w-4 animate-spin" />}
        {isEditing ? 'Save Changes' : 'Add Hotel'}
      </Button>
    </div>
  );
};

export default AddHotelFooter;
