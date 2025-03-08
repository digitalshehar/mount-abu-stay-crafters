
import { useState } from 'react';
import { Room } from '@/components/admin/hotels/types';

export const useDraggableRooms = (initialRooms: Room[], onRoomsChange: (rooms: Room[]) => void) => {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [draggedRoomIndex, setDraggedRoomIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedRoomIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedRoomIndex === null) return;
    if (draggedRoomIndex === index) return;

    const newRooms = [...rooms];
    const draggedRoom = newRooms[draggedRoomIndex];
    
    // Remove the dragged room from the array
    newRooms.splice(draggedRoomIndex, 1);
    
    // Insert it at the new position
    newRooms.splice(index, 0, draggedRoom);
    
    // Update the state and the dragged index
    setRooms(newRooms);
    setDraggedRoomIndex(index);
    
    // Call the callback to update the parent component
    onRoomsChange(newRooms);
  };

  const handleDragEnd = () => {
    setDraggedRoomIndex(null);
  };

  return {
    rooms,
    setRooms,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    draggedRoomIndex
  };
};
