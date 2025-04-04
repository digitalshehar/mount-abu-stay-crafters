
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { EarlyHotel } from '../../types/earlyHotel';
import AmenitiesField from './AmenitiesField';

interface FormSectionProps {
  formData: Partial<EarlyHotel>;
  errors: Record<string, string>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<Partial<EarlyHotel>>>;
}

const FormSection: React.FC<FormSectionProps> = ({
  formData,
  errors,
  handleInputChange,
  setFormData,
}) => {
  return (
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
      
      <AmenitiesField 
        amenities={formData.amenities || []}
        onChange={(amenities) => setFormData({...formData, amenities})}
      />
      
      <div className="flex items-center space-x-2">
        <Switch
          id="featured"
          checked={formData.featured || false}
          onCheckedChange={(checked) => setFormData({...formData, featured: checked})}
        />
        <Label htmlFor="featured">Featured Hotel</Label>
      </div>
    </div>
  );
};

export default FormSection;
