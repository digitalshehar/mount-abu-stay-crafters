
import React from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ImagePreviewProps {
  imageUrl: string;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validationErrors: {[key: string]: string};
}

const ImagePreview = ({ 
  imageUrl, 
  handleImageChange, 
  handleImageUpload,
  validationErrors 
}: ImagePreviewProps) => {
  const [previewImage, setPreviewImage] = React.useState<string | null>(imageUrl || null);
  
  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImageChange(e);
    
    const value = e.target.value;
    if (value.trim()) {
      setPreviewImage(value);
    } else {
      setPreviewImage(null);
    }
  };
  
  return (
    <div className="space-y-2 md:col-span-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="image" className={validationErrors.image ? "text-red-500" : ""}>
          Main Image URL*
        </Label>
        {validationErrors.image && (
          <span className="text-xs text-red-500">{validationErrors.image}</span>
        )}
      </div>
      <div className="flex space-x-2">
        <Input 
          id="image"
          name="image"
          value={imageUrl}
          onChange={onImageChange}
          placeholder="Enter image URL"
          className={`flex-1 ${validationErrors.image ? "border-red-500" : ""}`}
          required
        />
        {handleImageUpload && (
          <div className="relative">
            <Input
              type="file"
              id="image-upload"
              onChange={handleImageUpload}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              accept="image/*"
            />
            <Button type="button" variant="outline" className="h-10">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>
        )}
      </div>
      
      {(previewImage || imageUrl) && (
        <div className="mt-2 relative">
          <div className="h-[150px] rounded-md overflow-hidden border border-stone-200">
            <img 
              src={previewImage || imageUrl} 
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagePreview;
