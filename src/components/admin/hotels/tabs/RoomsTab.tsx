
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Room } from "../types";
import RoomCard from "./rooms/RoomCard";
import useRoomImageUpload from "@/hooks/useRoomImageUpload";

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
  const { uploadingRoom, handleAddImage, handleRemoveImage } = useRoomImageUpload(rooms, handleRoomChange);

  return (
    <div className="space-y-4">
      {rooms.map((room, index) => (
        <RoomCard
          key={index}
          room={room}
          index={index}
          handleRoomChange={handleRoomChange}
          handleRemoveRoom={handleRemoveRoom}
          handleAddImage={handleAddImage}
          handleRemoveImage={handleRemoveImage}
          uploadingRoom={uploadingRoom}
        />
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
