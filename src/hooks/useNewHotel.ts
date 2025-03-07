
import { useState } from "react";
import { NewHotel, Room, SeasonalPrice } from "@/components/admin/hotels/types";
import { useRoomsManagement } from "@/hooks/useRoomsManagement";
import { useCategoriesManagement } from "@/hooks/useCategoriesManagement";
import { useGalleryManagement } from "@/hooks/useGalleryManagement";
import { useSeasonalPricingManagement } from "@/hooks/useSeasonalPricingManagement";

const DEFAULT_HOTEL: NewHotel = {
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
};

export const useNewHotel = () => {
  const [newHotel, setNewHotel] = useState<NewHotel>(DEFAULT_HOTEL);

  const resetNewHotel = () => {
    setNewHotel(DEFAULT_HOTEL);
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

  const isFormValid = () => {
    return (
      newHotel.name.trim() !== "" &&
      newHotel.location.trim() !== "" &&
      newHotel.pricePerNight > 0 &&
      newHotel.image.trim() !== ""
    );
  };

  // Use the specialized hooks for their respective functionalities
  const roomsManagement = useRoomsManagement(newHotel, setNewHotel);
  const categoriesManagement = useCategoriesManagement(newHotel, setNewHotel);
  const galleryManagement = useGalleryManagement(newHotel, setNewHotel);
  const seasonalPricingManagement = useSeasonalPricingManagement(newHotel, setNewHotel);

  return {
    newHotel,
    setNewHotel,
    resetNewHotel,
    handleInputChange,
    handleAmenityToggle,
    isFormValid,
    ...roomsManagement,
    ...categoriesManagement,
    ...galleryManagement,
    ...seasonalPricingManagement
  };
};
