
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";

interface RoomImageGalleryProps {
  roomIndex: number;
  images: string[];
  handleRemoveImage: (roomIndex: number, imageIndex: number) => void;
  handleAddImage: (roomIndex: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  uploadingRoom: number | null;
}

const RoomImageGallery: React.FC<RoomImageGalleryProps> = ({
  roomIndex,
  images = [],
  handleRemoveImage,
  handleAddImage,
  uploadingRoom
}) => {
  return (
    <div className="mt-4">
      <Label className="mb-2 block">Room Images</Label>
      <div className="flex flex-wrap gap-2 mb-2">
        {images?.map((image, imgIndex) => (
          <div key={imgIndex} className="relative h-20 w-20 rounded-md overflow-hidden group">
            <img 
              src={image} 
              alt={`Room view ${imgIndex + 1}`} 
              className="h-full w-full object-cover" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://placehold.co/80x80/f3f4f6/6b7280?text=Not+Found";
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center">
              <Button
                variant="destructive"
                size="icon"
                className="h-6 w-6 opacity-0 group-hover:opacity-100"
                onClick={() => handleRemoveImage(roomIndex, imgIndex)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        
        <Label
          htmlFor={`room-image-${roomIndex}`}
          className="h-20 w-20 border-2 border-dashed rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
        >
          {uploadingRoom === roomIndex ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
          ) : (
            <Upload className="h-6 w-6 text-gray-400" />
          )}
          <Input
            id={`room-image-${roomIndex}`}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleAddImage(roomIndex, e)}
            disabled={uploadingRoom !== null}
          />
        </Label>
      </div>
    </div>
  );
};

export default RoomImageGallery;
