
import React, { useState } from "react";
import { Plus, Images, Camera, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NewHotel } from "@/components/admin/hotels/types";

interface GalleryTabProps {
  newHotel: NewHotel;
  addGalleryImage: (imageUrl: string) => void;
  removeGalleryImage: (index: number) => void;
  onBack: () => void;
  onNext: () => void;
}

const GalleryTab = ({
  newHotel,
  addGalleryImage,
  removeGalleryImage,
  onBack,
  onNext
}: GalleryTabProps) => {
  const [newGalleryImage, setNewGalleryImage] = useState("");

  const handleAddGalleryImage = () => {
    if (newGalleryImage.trim()) {
      if (!newHotel.gallery.includes(newGalleryImage)) {
        addGalleryImage(newGalleryImage);
        setNewGalleryImage("");
      } else {
        alert("This image is already in the gallery");
      }
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Images className="h-5 w-5 text-primary" />
            <Label className="text-lg font-medium">Photo Gallery</Label>
          </div>
          <span className="text-sm text-stone-500">
            {newHotel.gallery.length} photos
          </span>
        </div>
        
        <div className="mb-6">
          <p className="text-sm text-stone-600 mb-2">
            Add additional photos to showcase your hotel. The main image you added in the general tab will be shown first.
          </p>
          
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Enter image URL"
              value={newGalleryImage}
              onChange={(e) => setNewGalleryImage(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleAddGalleryImage}
              disabled={!newGalleryImage.trim()}
              type="button"
            >
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>
          
          {newHotel.gallery.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {newHotel.gallery.map((image, index) => (
                <div key={index} className="relative group rounded-md overflow-hidden border border-stone-200">
                  <img 
                    src={image} 
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-40 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button 
                      variant="destructive" 
                      size="icon"
                      onClick={() => removeGalleryImage(index)}
                      className="h-8 w-8"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 bg-stone-50 border border-dashed border-stone-200 rounded-lg text-center">
              <Camera className="h-10 w-10 text-stone-400 mx-auto mb-2" />
              <p className="text-stone-500">No gallery images added yet</p>
              <p className="text-xs text-stone-400 mt-1">Add URLs to showcase your hotel with multiple photos</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-between gap-2 mt-4">
        <Button variant="outline" onClick={onBack}>Back: Amenities</Button>
        <Button variant="outline" onClick={onNext}>Next: Rooms</Button>
      </div>
    </div>
  );
};

export default GalleryTab;
