
import { SetStateAction } from "react";
import { NewHotel, SeasonalPrice } from "@/components/admin/hotels/types";

export const useSeasonalPricingManagement = (
  newHotel: NewHotel, 
  setNewHotel: React.Dispatch<SetStateAction<NewHotel>>
) => {
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

  return {
    handleAddSeasonalPrice,
    handleUpdateSeasonalPrice,
    handleRemoveSeasonalPrice
  };
};
