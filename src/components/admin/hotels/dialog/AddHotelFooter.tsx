
import React from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface AddHotelFooterProps {
  isLoading: boolean;
  isFormValid: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

const AddHotelFooter = ({
  isLoading,
  isFormValid,
  onCancel,
  onSubmit
}: AddHotelFooterProps) => {
  return (
    <DialogFooter className="mt-4">
      <div className="flex justify-between w-full items-center">
        <div className="text-xs text-stone-500">
          {!isFormValid ? (
            <span className="text-amber-500">* Required fields must be filled</span>
          ) : (
            <span className="text-green-500">✓ All required fields complete</span>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button 
            onClick={onSubmit}
            disabled={isLoading || !isFormValid}
          >
            {isLoading ? "Adding..." : "Add Hotel"}
          </Button>
        </div>
      </div>
    </DialogFooter>
  );
};

export default AddHotelFooter;
