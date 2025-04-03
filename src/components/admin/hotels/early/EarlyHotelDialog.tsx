
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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { EarlyHotel } from '../types/earlyHotel';
import { X, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface EarlyHotelDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSubmit: (data: any) => void;
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
  });

  const [newAmenity, setNewAmenity] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData
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

  const handleAddAmenity = () => {
    if (!newAmenity.trim()) return;
    if (formData.amenities?.includes(newAmenity.trim())) return;
    
    setFormData({
      ...formData,
      amenities: [...(formData.amenities || []), newAmenity.trim()]
    });
    
    setNewAmenity('');
  };

  const handleRemoveAmenity = (amenity: string) => {
    setFormData({
      ...formData,
      amenities: formData.amenities?.filter(a => a !== amenity) || []
    });
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
    onSubmit(formData);
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
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className={errors.name ? "text-destructive" : ""}>
                Hotel Name *
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter hotel name"
                value={formData.name || ''}
                onChange={handleInputChange}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location" className={errors.location ? "text-destructive" : ""}>
                Location *
              </Label>
              <Input
                id="location"
                name="location"
                placeholder="Enter hotel location"
                value={formData.location || ''}
                onChange={handleInputChange}
                className={errors.location ? "border-destructive" : ""}
              />
              {errors.location && (
                <p className="text-xs text-destructive">{errors.location}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image" className={errors.image ? "text-destructive" : ""}>
              Image URL *
            </Label>
            <Input
              id="image"
              name="image"
              placeholder="Enter image URL"
              value={formData.image || ''}
              onChange={handleInputChange}
              className={errors.image ? "border-destructive" : ""}
            />
            {errors.image && (
              <p className="text-xs text-destructive">{errors.image}</p>
            )}
            {formData.image && (
              <div className="mt-2 w-full h-36 rounded-md overflow-hidden">
                <img 
                  src={formData.image} 
                  alt="Hotel Preview" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hourly_rate" className={errors.hourly_rate ? "text-destructive" : ""}>
                Hourly Rate (₹) *
              </Label>
              <Input
                id="hourly_rate"
                name="hourly_rate"
                type="number"
                min="0"
                placeholder="Enter hourly rate"
                value={formData.hourly_rate || ''}
                onChange={handleInputChange}
                className={errors.hourly_rate ? "border-destructive" : ""}
              />
              {errors.hourly_rate && (
                <p className="text-xs text-destructive">{errors.hourly_rate}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="min_hours" className={errors.min_hours ? "text-destructive" : ""}>
                Minimum Hours *
              </Label>
              <Input
                id="min_hours"
                name="min_hours"
                type="number"
                min="1"
                max="24"
                placeholder="Minimum hours"
                value={formData.min_hours || ''}
                onChange={handleInputChange}
                className={errors.min_hours ? "border-destructive" : ""}
              />
              {errors.min_hours && (
                <p className="text-xs text-destructive">{errors.min_hours}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="max_hours" className={errors.max_hours ? "text-destructive" : ""}>
                Maximum Hours *
              </Label>
              <Input
                id="max_hours"
                name="max_hours"
                type="number"
                min="1"
                max="24"
                placeholder="Maximum hours"
                value={formData.max_hours || ''}
                onChange={handleInputChange}
                className={errors.max_hours ? "border-destructive" : ""}
              />
              {errors.max_hours && (
                <p className="text-xs text-destructive">{errors.max_hours}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="stars">Star Rating</Label>
            <Input
              id="stars"
              name="stars"
              type="number"
              min="1"
              max="5"
              placeholder="Star rating"
              value={formData.stars || 3}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter hotel description"
              value={formData.description || ''}
              onChange={handleInputChange}
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Amenities</Label>
            <div className="flex gap-2">
              <Input
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                placeholder="Add amenity"
              />
              <Button type="button" onClick={handleAddAmenity} size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.amenities?.map((amenity) => (
                <Badge key={amenity} variant="secondary" className="flex items-center gap-1">
                  {amenity}
                  <button onClick={() => handleRemoveAmenity(amenity)} className="ml-1">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {formData.amenities?.length === 0 && (
                <span className="text-sm text-muted-foreground">No amenities added</span>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => setFormData({...formData, featured: checked})}
            />
            <Label htmlFor="featured">Featured Hotel</Label>
          </div>
        </div>
        
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
