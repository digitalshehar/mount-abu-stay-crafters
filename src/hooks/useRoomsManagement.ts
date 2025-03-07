
import { SetStateAction } from "react";
import { NewHotel, Room } from "@/components/admin/hotels/types";

export const useRoomsManagement = (
  newHotel: NewHotel, 
  setNewHotel: React.Dispatch<SetStateAction<NewHotel>>
) => {
  const handleRoomChange = (index: number, field: string, value: any) => {
    const updatedRooms = [...newHotel.rooms];
    updatedRooms[index] = {
      ...updatedRooms[index],
      [field]: field === 'capacity' || field === 'price' || field === 'count' 
        ? Number(value) 
        : value,
    };
    setNewHotel({ ...newHotel, rooms: updatedRooms });
  };

  const handleAddRoom = () => {
    // Get the last room's type to determine a sensible next type
    const lastRoom = newHotel.rooms[newHotel.rooms.length - 1];
    let nextType = "Deluxe";
    
    if (lastRoom.type === "Standard") nextType = "Deluxe";
    else if (lastRoom.type === "Deluxe") nextType = "Suite";
    else if (lastRoom.type === "Suite") nextType = "Family";
    else if (lastRoom.type === "Family") nextType = "Executive";
    else nextType = "Presidential";
    
    // Calculate suggested price based on the last room's price and new room type
    const basePrice = newHotel.pricePerNight;
    let suggestedPrice = basePrice;
    
    if (nextType === "Deluxe") suggestedPrice = basePrice * 1.3;
    else if (nextType === "Suite") suggestedPrice = basePrice * 1.8;
    else if (nextType === "Family") suggestedPrice = basePrice * 1.5;
    else if (nextType === "Executive") suggestedPrice = basePrice * 2;
    else if (nextType === "Presidential") suggestedPrice = basePrice * 3;
    
    setNewHotel({
      ...newHotel,
      rooms: [
        ...newHotel.rooms,
        { 
          type: nextType, 
          capacity: nextType === "Family" ? 4 : nextType === "Suite" ? 3 : 2, 
          price: Math.round(suggestedPrice), 
          count: 1 
        },
      ],
    });
  };

  const handleRemoveRoom = (index: number) => {
    if (newHotel.rooms.length <= 1) {
      return; // Don't remove the last room
    }
    
    const updatedRooms = [...newHotel.rooms];
    updatedRooms.splice(index, 1);
    setNewHotel({ ...newHotel, rooms: updatedRooms });
  };

  return {
    handleRoomChange,
    handleAddRoom,
    handleRemoveRoom
  };
};
