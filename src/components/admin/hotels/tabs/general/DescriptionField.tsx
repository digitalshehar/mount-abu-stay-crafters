
import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface DescriptionFieldProps {
  description: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const DescriptionField = ({ description, handleInputChange }: DescriptionFieldProps) => {
  return (
    <div className="space-y-2 md:col-span-2">
      <Label htmlFor="description">Description</Label>
      <Textarea 
        id="description"
        name="description"
        value={description}
        onChange={handleInputChange}
        placeholder="Enter hotel description"
        rows={4}
      />
      {description && (
        <div className="flex justify-between text-xs text-stone-500">
          <span>{description.length} characters</span>
          <span>{250 - description.length} characters remaining</span>
        </div>
      )}
    </div>
  );
};

export default DescriptionField;
