
import React from "react";
import { Label } from "@/components/ui/label";

interface FeaturedToggleProps {
  isFeatured: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FeaturedToggle = ({ isFeatured, handleInputChange }: FeaturedToggleProps) => {
  return (
    <div className="space-y-1 md:col-span-2">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="featured"
          name="featured"
          checked={isFeatured}
          onChange={handleInputChange}
          className="h-4 w-4"
        />
        <Label htmlFor="featured">Feature this hotel on the homepage</Label>
      </div>
      <p className="text-xs text-stone-500 ml-6">Featured hotels receive more visibility and appear in special sections.</p>
    </div>
  );
};

export default FeaturedToggle;
