
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Room } from "@/components/admin/hotels/types";

export const useRoomImageUpload = (
  rooms: Room[], 
  handleRoomChange: (index: number, field: keyof Room, value: any) => void
) => {
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

  return {
    uploadingRoom,
    handleAddImage,
    handleRemoveImage
  };
};

export default useRoomImageUpload;
