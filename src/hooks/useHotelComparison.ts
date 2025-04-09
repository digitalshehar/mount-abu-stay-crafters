
import { useState } from 'react';
import { Hotel } from '@/components/admin/hotels/types';
import { useToast } from '@/hooks/use-toast';

export const useHotelComparison = () => {
  const [compareList, setCompareList] = useState<number[]>([]);
  const [isCompareVisible, setIsCompareVisible] = useState(false);
  const { toast } = useToast();
  
  const addToCompare = (id: number) => {
    setCompareList(prev => {
      // Check if hotel is already in the list
      if (prev.includes(id)) {
        return prev;
      }
      
      // Maximum 4 hotels to compare
      if (prev.length >= 4) {
        toast({
          title: "Compare limit reached",
          description: "You can compare a maximum of 4 hotels at once. Please remove one to add another.",
          variant: "destructive"
        });
        return prev;
      }
      
      toast({
        title: "Added to compare",
        description: "Hotel has been added to your comparison list"
      });
      
      return [...prev, id];
    });
  };
  
  const removeFromCompare = (id: number) => {
    setCompareList(prev => {
      const newList = prev.filter(hotelId => hotelId !== id);
      
      if (newList.length !== prev.length) {
        toast({
          title: "Removed from compare",
          description: "Hotel has been removed from your comparison list"
        });
      }
      
      return newList;
    });
  };
  
  const clearCompareList = () => {
    setCompareList([]);
    toast({
      title: "Compare list cleared",
      description: "All hotels have been removed from your comparison list"
    });
  };
  
  const isInCompare = (id: number) => {
    return compareList.includes(id);
  };
  
  // Function to get hotel data for comparison
  const compareHotels = (hotels: Hotel[]) => {
    return hotels.filter(hotel => compareList.includes(hotel.id as number));
  };
  
  return {
    compareList,
    addToCompare,
    removeFromCompare,
    clearCompareList,
    isInCompare,
    compareHotels,
    isCompareVisible,
    setIsCompareVisible
  };
};
