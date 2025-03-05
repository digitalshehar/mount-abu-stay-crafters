
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CarRental } from "@/integrations/supabase/custom-types";

interface CarRentalFormProps {
  car: Partial<CarRental>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isEdit?: boolean;
}

const CarRentalForm = ({ car, onInputChange, onSubmit, onCancel, isEdit = false }: CarRentalFormProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 py-4">
      <div className="space-y-2 col-span-2">
        <Label htmlFor="name">Car Name*</Label>
        <Input 
          id="name"
          name="name"
          value={car.name || ""}
          onChange={onInputChange}
          placeholder="Enter car name"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="type">Car Type*</Label>
        <select
          id="type"
          name="type"
          value={car.type || "SUV"}
          onChange={onInputChange}
          className="w-full rounded-md border border-stone-200 px-3 py-2"
        >
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Hatchback">Hatchback</option>
          <option value="Luxury">Luxury</option>
        </select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="transmission">Transmission*</Label>
        <select
          id="transmission"
          name="transmission"
          value={car.transmission || "Manual"}
          onChange={onInputChange}
          className="w-full rounded-md border border-stone-200 px-3 py-2"
        >
          <option value="Manual">Manual</option>
          <option value="Automatic">Automatic</option>
        </select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="capacity">Seating Capacity*</Label>
        <Input 
          id="capacity"
          name="capacity"
          type="number"
          value={car.capacity || 0}
          onChange={onInputChange}
          placeholder="Enter capacity"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="price">Price Per Day (₹)*</Label>
        <Input 
          id="price"
          name="price"
          type="number"
          value={car.price || 0}
          onChange={onInputChange}
          placeholder="Enter price"
        />
      </div>
      
      <div className="space-y-2 col-span-2">
        <Label htmlFor="image">Image URL*</Label>
        <Input 
          id="image"
          name="image"
          value={car.image || ""}
          onChange={onInputChange}
          placeholder="Enter image URL"
        />
      </div>
      
      <div className="space-y-2 col-span-2">
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description"
          name="description"
          value={car.description || ""}
          onChange={onInputChange}
          placeholder="Enter car description"
          rows={4}
        />
      </div>
      
      <div className="col-span-2 flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={onSubmit}>{isEdit ? "Update Car" : "Add Car"}</Button>
      </div>
    </div>
  );
};

export default CarRentalForm;
