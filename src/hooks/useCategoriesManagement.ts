
import { SetStateAction } from "react";
import { NewHotel } from "@/components/admin/hotels/types";

export const useCategoriesManagement = (
  newHotel: NewHotel, 
  setNewHotel: React.Dispatch<SetStateAction<NewHotel>>
) => {
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

  return {
    handleCategoryToggle,
    handleAddCategory,
    handleRemoveCategory
  };
};
