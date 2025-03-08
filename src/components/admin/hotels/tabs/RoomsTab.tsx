
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, GripVertical } from "lucide-react";
import { Room } from "../types";
import RoomCard from "./rooms/RoomCard";
import useRoomImageUpload from "@/hooks/useRoomImageUpload";
import { useDraggableRooms } from "@/hooks/useDraggableRooms";

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
  
  // Use our custom drag and drop hook
  const { 
    rooms: draggableRooms,
    setRooms: setDraggableRooms,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    draggedRoomIndex
  } = useDraggableRooms(rooms, (newRooms) => {
    // Update each room with its new index
    newRooms.forEach((room, index) => {
      if (index !== rooms.findIndex(r => r.type === room.type)) {
        handleRoomChange(index, 'type', room.type);
      }
    });
  });
  
  // Update draggable rooms when rooms prop changes
  useEffect(() => {
    setDraggableRooms(rooms);
  }, [rooms, setDraggableRooms]);

  return (
    <div className="space-y-4">
      {draggableRooms.map((room, index) => (
        <div
          key={index}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragEnd={handleDragEnd}
          className={`relative ${draggedRoomIndex === index ? 'opacity-50' : ''}`}
        >
          <div className="absolute top-2 left-2 cursor-move p-2 rounded-full hover:bg-stone-100 z-10">
            <GripVertical className="h-5 w-5 text-stone-400" />
          </div>
          <RoomCard
            room={room}
            index={index}
            handleRoomChange={handleRoomChange}
            handleRemoveRoom={handleRemoveRoom}
            handleAddImage={handleAddImage}
            handleRemoveImage={handleRemoveImage}
            uploadingRoom={uploadingRoom}
          />
        </div>
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
