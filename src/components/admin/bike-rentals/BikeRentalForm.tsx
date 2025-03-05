
import React, { useState, useEffect } from "react";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { BikeRental } from "@/integrations/supabase/custom-types";
import { useToast } from "@/hooks/use-toast";

interface BikeRentalFormProps {
  initialData: Partial<BikeRental> | any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isEditing: boolean;
}

const BikeRentalForm = ({ initialData, onSubmit, onCancel, isEditing }: BikeRentalFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    id: initialData.id || null,
    name: initialData.name || "",
    type: initialData.type || "Scooter",
    engine: initialData.engine || "",
    price: initialData.price || 0,
    image: initialData.image || "",
    description: initialData.description || "",
    status: initialData.status || "available",
    bookings: initialData.bookings || 0
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || null,
        name: initialData.name || "",
        type: initialData.type || "Scooter",
        engine: initialData.engine || "",
        price: initialData.price || 0,
        image: initialData.image || "",
        description: initialData.description || "",
        status: initialData.status || "available",
        bookings: initialData.bookings || 0
      });
    }
  }, [initialData]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" ? Number(value) : value
    });
  };

  const handleSubmit = () => {
    // Validation
    if (!formData.name || !formData.type || !formData.engine || formData.price <= 0 || !formData.image) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields marked with *",
        variant: "destructive"
      });
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>{isEditing ? "Edit Bike" : "Add New Bike"}</DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-4 py-4">
        <div className="space-y-2 col-span-2">
          <Label htmlFor="name">Bike Name*</Label>
          <Input 
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter bike name"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="type">Bike Type*</Label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="w-full rounded-md border border-stone-200 px-3 py-2"
          >
            <option value="Scooter">Scooter</option>
            <option value="Sports">Sports</option>
            <option value="Cruiser">Cruiser</option>
            <option value="Standard">Standard</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="engine">Engine Capacity*</Label>
          <Input 
            id="engine"
            name="engine"
            value={formData.engine}
            onChange={handleInputChange}
            placeholder="e.g. 125cc"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="price">Price Per Day (₹)*</Label>
          <Input 
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Enter price"
          />
        </div>
        
        <div className="space-y-2 col-span-1">
          <Label htmlFor="image">Image URL*</Label>
          <Input 
            id="image"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="Enter image URL"
          />
        </div>
        
        <div className="space-y-2 col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter bike description"
            rows={4}
          />
        </div>
        
        <div className="col-span-2 flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={handleSubmit}>{isEditing ? "Update Bike" : "Add Bike"}</Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default BikeRentalForm;
