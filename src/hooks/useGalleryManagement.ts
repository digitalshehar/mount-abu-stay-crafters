
import { SetStateAction } from "react";
import { NewHotel } from "@/components/admin/hotels/types";

export const useGalleryManagement = (
  newHotel: NewHotel, 
  setNewHotel: React.Dispatch<SetStateAction<NewHotel>>
) => {
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

  return {
    addGalleryImage,
    removeGalleryImage
  };
};
