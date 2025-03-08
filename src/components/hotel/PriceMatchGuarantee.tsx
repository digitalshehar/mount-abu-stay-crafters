
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface PriceMatchGuaranteeProps {
  isOpen: boolean;
  onClose: () => void;
  hotelName: string;
}

const PriceMatchGuarantee: React.FC<PriceMatchGuaranteeProps> = ({ 
  isOpen, 
  onClose,
  hotelName 
}) => {
  const [formData, setFormData] = useState({
    competitorName: '',
    competitorPrice: '',
    competitorUrl: '',
    additionalDetails: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      
      toast.success("Price match request submitted", {
        description: "We'll review your request and get back to you within 24 hours."
      });
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Price Match Guarantee</DialogTitle>
          <DialogDescription>
            Found {hotelName} cheaper elsewhere? Submit the details below and we'll match the price plus give you an additional 10% off.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="competitorName">Competitor Website/Platform*</Label>
            <Input 
              id="competitorName"
              name="competitorName"
              value={formData.competitorName}
              onChange={handleChange}
              required
              placeholder="e.g. Booking.com, Expedia"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="competitorPrice">Lower Price Found (₹)*</Label>
            <Input 
              id="competitorPrice"
              name="competitorPrice"
              value={formData.competitorPrice}
              onChange={handleChange}
              type="number"
              required
              placeholder="Enter price"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="competitorUrl">URL of the Lower Price (optional)</Label>
            <Input 
              id="competitorUrl"
              name="competitorUrl"
              value={formData.competitorUrl}
              onChange={handleChange}
              placeholder="Paste link here"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="additionalDetails">Additional Details</Label>
            <Textarea 
              id="additionalDetails"
              name="additionalDetails"
              value={formData.additionalDetails}
              onChange={handleChange}
              placeholder="Include dates, room type, and any other relevant information"
              rows={3}
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Price Match"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PriceMatchGuarantee;
