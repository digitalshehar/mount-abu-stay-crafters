
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { EarlyHotel, EarlyHotelFormData } from '../types/earlyHotel';
import FormSection from './components/FormSection';

interface EarlyHotelDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSubmit: (data: EarlyHotelFormData | EarlyHotel) => void;
  title: string;
  initialData?: EarlyHotel;
}

const EarlyHotelDialog: React.FC<EarlyHotelDialogProps> = ({
  isOpen,
  setIsOpen,
  onSubmit,
  title,
  initialData
}) => {
  const [formData, setFormData] = useState<Partial<EarlyHotel>>({
    name: '',
    location: '',
    image: '',
    stars: 3,
    hourly_rate: 0,
    min_hours: 1,
    max_hours: 8,
    description: '',
    amenities: [],
    featured: false,
    status: 'active' as const // Using 'as const' to ensure correct type
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData
      });
    } else {
      // Reset form when dialog opens for adding a new hotel
      setFormData({
        name: '',
        location: '',
        image: '',
        stars: 3,
        hourly_rate: 0,
        min_hours: 1,
        max_hours: 8,
        description: '',
        amenities: [],
        featured: false,
        status: 'active' as const
      });
    }
  }, [initialData, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'hourly_rate' || name === 'min_hours' || name === 'max_hours' || name === 'stars') {
      setFormData({
        ...formData,
        [name]: Number(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.location?.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.image?.trim()) {
      newErrors.image = 'Image URL is required';
    }
    
    if (!formData.hourly_rate || formData.hourly_rate <= 0) {
      newErrors.hourly_rate = 'Hourly rate must be greater than 0';
    }
    
    if (!formData.min_hours || formData.min_hours <= 0) {
      newErrors.min_hours = 'Minimum hours must be greater than 0';
    }
    
    if (!formData.max_hours || formData.max_hours <= 0) {
      newErrors.max_hours = 'Maximum hours must be greater than 0';
    }
    
    if (formData.min_hours && formData.max_hours && formData.min_hours >= formData.max_hours) {
      newErrors.max_hours = 'Maximum hours must be greater than minimum hours';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    
    // Ensure the status is correctly typed
    const dataToSubmit: EarlyHotelFormData = {
      ...formData as EarlyHotelFormData,
      status: (formData.status as 'active' | 'inactive') || 'active'
    };
    
    onSubmit(initialData ? { ...initialData, ...dataToSubmit } : dataToSubmit);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md md:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {initialData 
              ? "Edit the details of this early hotel property." 
              : "Add a new early hotel that can be booked on hourly basis."}
          </DialogDescription>
        </DialogHeader>
        
        <FormSection
          formData={formData}
          errors={errors}
          handleInputChange={handleInputChange}
          setFormData={setFormData}
        />
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {initialData ? 'Update Early Hotel' : 'Add Early Hotel'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EarlyHotelDialog;
