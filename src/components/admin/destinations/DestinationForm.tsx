
import React, { useState } from "react";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { Destination } from "@/integrations/supabase/custom-types";

interface DestinationFormProps {
  destination: Partial<Destination>;
  onSubmit: (data: Partial<Destination>) => Promise<void>;
  onCancel: () => void;
  isEditing: boolean;
}

const DestinationForm = ({ destination, onSubmit, onCancel, isEditing }: DestinationFormProps) => {
  const [formData, setFormData] = useState<Partial<Destination>>(destination);
  const [newHighlight, setNewHighlight] = useState("");
  const [newActivity, setNewActivity] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddHighlight = () => {
    if (newHighlight.trim()) {
      setFormData(prev => ({
        ...prev,
        highlights: [...(prev.highlights || []), newHighlight.trim()]
      }));
      setNewHighlight("");
    }
  };

  const handleRemoveHighlight = (index: number) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights?.filter((_, i) => i !== index) || []
    }));
  };

  const handleAddActivity = () => {
    if (newActivity.trim()) {
      setFormData(prev => ({
        ...prev,
        activities: [...(prev.activities || []), newActivity.trim()]
      }));
      setNewActivity("");
    }
  };

  const handleRemoveActivity = (index: number) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities?.filter((_, i) => i !== index) || []
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>{isEditing ? "Edit Destination" : "Add New Destination"}</DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-4 py-4">
        <div className="space-y-2 col-span-2">
          <Label htmlFor="name">Destination Name*</Label>
          <Input 
            id="name"
            name="name"
            value={formData.name || ''}
            onChange={handleInputChange}
            placeholder="Enter destination name"
          />
        </div>
        
        <div className="space-y-2 col-span-2">
          <Label htmlFor="slug">Slug*</Label>
          <Input 
            id="slug"
            name="slug"
            value={formData.slug || ''}
            onChange={handleInputChange}
            placeholder="Enter URL slug (e.g., mount-abu)"
          />
          <p className="text-xs text-stone-500">Will be generated from name if left empty</p>
        </div>
        
        <div className="space-y-2 col-span-2">
          <Label htmlFor="location">Location*</Label>
          <Input 
            id="location"
            name="location"
            value={formData.location || ''}
            onChange={handleInputChange}
            placeholder="Enter location"
          />
        </div>
        
        <div className="space-y-2 col-span-2">
          <Label htmlFor="image">Image URL*</Label>
          <Input 
            id="image"
            name="image"
            value={formData.image || ''}
            onChange={handleInputChange}
            placeholder="Enter image URL"
          />
        </div>
        
        <div className="space-y-2 col-span-2">
          <Label htmlFor="description">Description*</Label>
          <Textarea 
            id="description"
            name="description"
            value={formData.description || ''}
            onChange={handleInputChange}
            placeholder="Enter destination description"
            rows={4}
          />
        </div>
        
        <div className="space-y-2 col-span-2">
          <Label htmlFor="bestTimeToVisit">Best Time to Visit</Label>
          <Input 
            id="bestTimeToVisit"
            name="bestTimeToVisit"
            value={formData.bestTimeToVisit || ''}
            onChange={handleInputChange}
            placeholder="E.g., October to March"
          />
        </div>
        
        <div className="space-y-2 col-span-2">
          <div className="flex justify-between items-center mb-2">
            <Label htmlFor="highlights">Highlights</Label>
          </div>
          <div className="flex gap-2 mb-2">
            <Input 
              id="newHighlight"
              value={newHighlight}
              onChange={(e) => setNewHighlight(e.target.value)}
              placeholder="Add a highlight"
            />
            <Button type="button" onClick={handleAddHighlight} className="flex-shrink-0">
              <Plus size={16} />
            </Button>
          </div>
          <div className="space-y-2">
            {formData.highlights?.map((highlight, index) => (
              <div key={index} className="flex justify-between items-center bg-stone-50 px-3 py-2 rounded-md">
                <span>{highlight}</span>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleRemoveHighlight(index)}
                >
                  <X size={14} />
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-2 col-span-2">
          <div className="flex justify-between items-center mb-2">
            <Label htmlFor="activities">Activities</Label>
          </div>
          <div className="flex gap-2 mb-2">
            <Input 
              id="newActivity"
              value={newActivity}
              onChange={(e) => setNewActivity(e.target.value)}
              placeholder="Add an activity"
            />
            <Button type="button" onClick={handleAddActivity} className="flex-shrink-0">
              <Plus size={16} />
            </Button>
          </div>
          <div className="space-y-2">
            {formData.activities?.map((activity, index) => (
              <div key={index} className="flex justify-between items-center bg-stone-50 px-3 py-2 rounded-md">
                <span>{activity}</span>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleRemoveActivity(index)}
                >
                  <X size={14} />
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="col-span-2 flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={handleSubmit}>{isEditing ? "Update Destination" : "Add Destination"}</Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default DestinationForm;
