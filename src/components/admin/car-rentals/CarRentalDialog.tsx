
import React from "react";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import CarRentalForm from "@/components/admin/car-rentals/CarRentalForm";
import { CarRental } from "@/integrations/supabase/custom-types";

interface CarRentalDialogProps {
  isEdit?: boolean;
  carData: Partial<CarRental> | null;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: () => Promise<void>;
  onCancel: () => void;
}

const CarRentalDialog: React.FC<CarRentalDialogProps> = ({ 
  isEdit = false,
  carData,
  onInputChange,
  onSubmit,
  onCancel
}) => {
  if (!carData) return null;
  
  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>{isEdit ? "Edit Car" : "Add New Car"}</DialogTitle>
        <DialogDescription>
          {isEdit 
            ? "Update the details of this car." 
            : "Fill in the details to add a new car to your rental fleet."}
        </DialogDescription>
      </DialogHeader>
      <CarRentalForm 
        car={carData as any} 
        onInputChange={onInputChange} 
        onSubmit={onSubmit} 
        onCancel={onCancel} 
        isEdit={isEdit}
      />
    </DialogContent>
  );
};

export default CarRentalDialog;
