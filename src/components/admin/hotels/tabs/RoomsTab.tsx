
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Trash, Plus, Upload, X } from "lucide-react";
import { Room } from "../types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface RoomsTabProps {
  rooms: Room[];
  handleRoomChange: (index: number, field: keyof Room, value: any) => void;
  handleAddRoom: () => void;
  handleRemoveRoom: (index: number) => void;
  onBack?: () => void;
  onSubmit?: () => Promise<void>;
  isLoading?: boolean;
}

const RoomsTab: React.FC<RoomsTabProps> = ({
  rooms,
  handleRoomChange,
  handleAddRoom,
  handleRemoveRoom,
  onBack,
  onSubmit,
  isLoading
}) => {
  const [uploadingRoom, setUploadingRoom] = useState<number | null>(null);
  const { toast } = useToast();

  const handleAddImage = async (roomIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `rooms/${fileName}`;

    try {
      setUploadingRoom(roomIndex);
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from('images').getPublicUrl(filePath);
      
      // Add the image URL to the room's images array
      const currentImages = rooms[roomIndex].images || [];
      handleRoomChange(
        roomIndex, 
        'images', 
        [...currentImages, data.publicUrl]
      );
      
      toast({
        title: "Image uploaded",
        description: "Room image has been added successfully",
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "There was an error uploading the image",
      });
    } finally {
      setUploadingRoom(null);
    }
  };

  const handleRemoveImage = (roomIndex: number, imageIndex: number) => {
    const currentImages = [...(rooms[roomIndex].images || [])];
    currentImages.splice(imageIndex, 1);
    handleRoomChange(roomIndex, 'images', currentImages);
  };

  return (
    <div className="space-y-4">
      {rooms.map((room, index) => (
        <Card key={index} className="relative">
          <Button
            variant="destructive"
            size="icon"
            className="absolute right-2 top-2 h-6 w-6"
            onClick={() => handleRemoveRoom(index)}
          >
            <Trash className="h-4 w-4" />
          </Button>
          <CardContent className="pt-6 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor={`room-type-${index}`}>Room Type</Label>
                <Input
                  id={`room-type-${index}`}
                  placeholder="Deluxe Room"
                  value={room.type}
                  onChange={(e) => handleRoomChange(index, 'type', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor={`room-capacity-${index}`}>Capacity</Label>
                <Input
                  id={`room-capacity-${index}`}
                  type="number"
                  placeholder="2"
                  value={room.capacity.toString()}
                  onChange={(e) => handleRoomChange(index, 'capacity', parseInt(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor={`room-price-${index}`}>Price (per night in ₹)</Label>
                <Input
                  id={`room-price-${index}`}
                  type="number"
                  placeholder="100"
                  value={room.price.toString()}
                  onChange={(e) => handleRoomChange(index, 'price', parseFloat(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor={`room-count-${index}`}>Number of Rooms</Label>
                <Input
                  id={`room-count-${index}`}
                  type="number"
                  placeholder="5"
                  value={room.count.toString()}
                  onChange={(e) => handleRoomChange(index, 'count', parseInt(e.target.value))}
                />
              </div>
            </div>
            
            {/* Room Images */}
            <div className="mt-4">
              <Label className="mb-2 block">Room Images</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {room.images?.map((image, imgIndex) => (
                  <div key={imgIndex} className="relative h-20 w-20 rounded-md overflow-hidden group">
                    <img 
                      src={image} 
                      alt={`${room.type} view ${imgIndex + 1}`} 
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
                        onClick={() => handleRemoveImage(index, imgIndex)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Label
                  htmlFor={`room-image-${index}`}
                  className="h-20 w-20 border-2 border-dashed rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  {uploadingRoom === index ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                  ) : (
                    <Upload className="h-6 w-6 text-gray-400" />
                  )}
                  <Input
                    id={`room-image-${index}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleAddImage(index, e)}
                    disabled={uploadingRoom !== null}
                  />
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button onClick={handleAddRoom} variant="outline" className="w-full">
        <Plus className="mr-2 h-4 w-4" /> Add Room
      </Button>

      {(onBack || onSubmit) && (
        <div className="flex justify-between gap-2 mt-4">
          {onBack && (
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
          )}
          {onSubmit && (
            <Button onClick={onSubmit} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Hotel"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default RoomsTab;
