
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash } from "lucide-react";
import { Room } from "@/components/admin/hotels/types";
import RoomDetailsForm from "./RoomDetailsForm";
import RoomImageGallery from "./RoomImageGallery";

interface RoomCardProps {
  room: Room;
  index: number;
  handleRoomChange: (index: number, field: keyof Room, value: any) => void;
  handleRemoveRoom: (index: number) => void;
  handleAddImage: (roomIndex: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: (roomIndex: number, imageIndex: number) => void;
  uploadingRoom: number | null;
}

const RoomCard: React.FC<RoomCardProps> = ({
  room,
  index,
  handleRoomChange,
  handleRemoveRoom,
  handleAddImage,
  handleRemoveImage,
  uploadingRoom
}) => {
  return (
    <Card className="relative transition-shadow hover:shadow-md">
      <Button
        variant="destructive"
        size="icon"
        className="absolute right-2 top-2 h-7 w-7 z-10"
        onClick={() => handleRemoveRoom(index)}
      >
        <Trash className="h-4 w-4" />
      </Button>
      <CardContent className="pt-6 pb-4">
        <div className="grid md:grid-cols-2 gap-4">
          <RoomDetailsForm 
            room={room}
            index={index}
            handleRoomChange={handleRoomChange}
          />
          
          <RoomImageGallery
            roomIndex={index}
            images={room.images || []}
            handleRemoveImage={handleRemoveImage}
            handleAddImage={handleAddImage}
            uploadingRoom={uploadingRoom}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomCard;
