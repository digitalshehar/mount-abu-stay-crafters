
import { useState } from "react";
import { NewHotel, Room } from "@/components/admin/hotels/types";

export const useNewHotel = () => {
  const [newHotel, setNewHotel] = useState<NewHotel>({
    name: "",
    location: "",
    stars: 3,
    pricePerNight: 0,
    image: "",
    description: "",
    amenities: [],
    rooms: [{ type: "Standard", capacity: 2, price: 0, count: 1 }],
    featured: false,
  });

  const resetNewHotel = () => {
    setNewHotel({
      name: "",
      location: "",
      stars: 3,
      pricePerNight: 0,
      image: "",
      description: "",
      amenities: [],
      rooms: [{ type: "Standard", capacity: 2, price: 0, count: 1 }],
      featured: false,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setNewHotel({ ...newHotel, [name]: checked });
    } else {
      setNewHotel({ ...newHotel, [name]: value });
    }
  };

  const handleAmenityToggle = (amenity: string) => {
    if (newHotel.amenities.includes(amenity)) {
      setNewHotel({
        ...newHotel,
        amenities: newHotel.amenities.filter((a) => a !== amenity),
      });
    } else {
      setNewHotel({
        ...newHotel,
        amenities: [...newHotel.amenities, amenity],
      });
    }
  };

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
    setNewHotel({
      ...newHotel,
      rooms: [
        ...newHotel.rooms,
        { type: "Deluxe", capacity: 2, price: 0, count: 1 },
      ],
    });
  };

  const handleRemoveRoom = (index: number) => {
    const updatedRooms = [...newHotel.rooms];
    updatedRooms.splice(index, 1);
    setNewHotel({ ...newHotel, rooms: updatedRooms });
  };

  return {
    newHotel,
    setNewHotel,
    resetNewHotel,
    handleInputChange,
    handleAmenityToggle,
    handleRoomChange,
    handleAddRoom,
    handleRemoveRoom
  };
};
