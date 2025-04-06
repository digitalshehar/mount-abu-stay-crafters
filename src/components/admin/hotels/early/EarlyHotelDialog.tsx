
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { EarlyHotel } from '../types/earlyHotel';
import FormSection from './components/FormSection';
import { toast } from 'sonner';

interface EarlyHotelDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSubmit: (hotel: Partial<EarlyHotel>) => Promise<void>;
  title: string;
  initialData?: EarlyHotel;
}

const EarlyHotelDialog: React.FC<EarlyHotelDialogProps> = ({
  isOpen,
  setIsOpen,
  onSubmit,
  title,
  initialData,
}) => {
  const [formData, setFormData] = useState<Partial<EarlyHotel>>({
    name: '',
    location: '',
    image: '',
    hourly_rate: 0,
    min_hours: 1,
    max_hours: 8,
    stars: 3,
    description: '',
    amenities: [],
    featured: false,
    status: 'active',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      // Reset form when opening the add dialog
      setFormData({
        name: '',
        location: '',
        image: '',
        hourly_rate: 0,
        min_hours: 1,
        max_hours: 8,
        stars: 3,
        description: '',
        amenities: [],
        featured: false,
        status: 'active',
      });
    }
    
    // Clear errors when dialog opens/closes
    setErrors({});
  }, [initialData, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name?.trim()) {
      newErrors.name = 'Hotel name is required';
    }
    
    if (!formData.location?.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.image?.trim()) {
      newErrors.image = 'Image URL is required';
    }
    
    if (!formData.hourly_rate || formData.hourly_rate <= 0) {
      newErrors.hourly_rate = 'Please enter a valid hourly rate';
    }
    
    if (!formData.min_hours || formData.min_hours <= 0) {
      newErrors.min_hours = 'Minimum hours must be at least 1';
    }
    
    if (!formData.max_hours || formData.max_hours <= 0) {
      newErrors.max_hours = 'Maximum hours must be at least 1';
    }
    
    if (formData.min_hours && formData.max_hours && formData.min_hours > formData.max_hours) {
      newErrors.min_hours = 'Minimum hours cannot be greater than maximum hours';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      setFormData({
        ...formData,
        [name]: parseFloat(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    setLoading(true);
    try {
      await onSubmit(formData);
      setIsOpen(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to save hotel');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <FormSection
          formData={formData}
          errors={errors}
          handleInputChange={handleInputChange}
          setFormData={setFormData}
        />
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Saving...' : 'Save Hotel'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EarlyHotelDialog;
