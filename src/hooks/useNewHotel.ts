
import { useState } from "react";
import { NewHotel, Room, SeasonalPrice } from "@/components/admin/hotels/types";

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
    gallery: [],
    categories: [],
    seasonalPricing: []
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
      gallery: [],
      categories: [],
      seasonalPricing: []
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setNewHotel({ ...newHotel, [name]: checked });
    } else if (type === 'number') {
      setNewHotel({ ...newHotel, [name]: value === '' ? 0 : Number(value) });
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

  const handleCategoryToggle = (category: string) => {
    if (newHotel.categories.includes(category)) {
      setNewHotel({
        ...newHotel,
        categories: newHotel.categories.filter((c) => c !== category),
      });
    } else {
      setNewHotel({
        ...newHotel,
        categories: [...newHotel.categories, category],
      });
    }
  };

  const handleAddCategory = (category: string) => {
    if (category && !newHotel.categories.includes(category)) {
      setNewHotel({
        ...newHotel,
        categories: [...newHotel.categories, category],
      });
    }
  };

  const handleRemoveCategory = (category: string) => {
    setNewHotel({
      ...newHotel,
      categories: newHotel.categories.filter((c) => c !== category),
    });
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

  const addGalleryImage = (imageUrl: string) => {
    if (imageUrl && !newHotel.gallery.includes(imageUrl)) {
      setNewHotel({
        ...newHotel,
        gallery: [...newHotel.gallery, imageUrl]
      });
    }
  };

  const removeGalleryImage = (index: number) => {
    const updatedGallery = [...newHotel.gallery];
    updatedGallery.splice(index, 1);
    setNewHotel({ ...newHotel, gallery: updatedGallery });
  };

  // Seasonal pricing functions
  const handleAddSeasonalPrice = (season: SeasonalPrice) => {
    setNewHotel({
      ...newHotel,
      seasonalPricing: [...newHotel.seasonalPricing, season]
    });
  };

  const handleUpdateSeasonalPrice = (index: number, field: string, value: any) => {
    const updatedPricing = [...newHotel.seasonalPricing];
    updatedPricing[index] = {
      ...updatedPricing[index],
      [field]: field === 'priceMultiplier' ? Number(value) : value
    };
    setNewHotel({
      ...newHotel,
      seasonalPricing: updatedPricing
    });
  };

  const handleRemoveSeasonalPrice = (index: number) => {
    const updatedPricing = [...newHotel.seasonalPricing];
    updatedPricing.splice(index, 1);
    setNewHotel({
      ...newHotel,
      seasonalPricing: updatedPricing
    });
  };

  const isFormValid = () => {
    return (
      newHotel.name.trim() !== "" &&
      newHotel.location.trim() !== "" &&
      newHotel.pricePerNight > 0 &&
      newHotel.image.trim() !== ""
    );
  };

  return {
    newHotel,
    setNewHotel,
    resetNewHotel,
    handleInputChange,
    handleAmenityToggle,
    handleCategoryToggle,
    handleAddCategory,
    handleRemoveCategory,
    handleRoomChange,
    handleAddRoom,
    handleRemoveRoom,
    addGalleryImage,
    removeGalleryImage,
    handleAddSeasonalPrice,
    handleUpdateSeasonalPrice,
    handleRemoveSeasonalPrice,
    isFormValid
  };
};
