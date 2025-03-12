
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

const COMPARE_STORAGE_KEY = 'hotel_compare_list';

export const useHotelComparison = (maxCompare = 3) => {
  // Load hotels to compare from localStorage
  const loadCompareList = (): number[] => {
    try {
      const savedList = localStorage.getItem(COMPARE_STORAGE_KEY);
      return savedList ? JSON.parse(savedList) : [];
    } catch (error) {
      console.error('Error loading compare list from storage:', error);
      return [];
    }
  };

  const [compareList, setCompareList] = useState<number[]>(loadCompareList);

  // Save compare list to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(compareList));
    } catch (error) {
      console.error('Error saving compare list to storage:', error);
    }
  }, [compareList]);

  // Add a hotel to the compare list
  const addToCompare = useCallback((hotelId: number) => {
    if (compareList.includes(hotelId)) {
      return;
    }

    if (compareList.length >= maxCompare) {
      toast.error(`You can only compare up to ${maxCompare} hotels at a time`, {
        description: "Remove a hotel from the comparison first."
      });
      return;
    }

    setCompareList(prevList => [...prevList, hotelId]);
    toast.success("Added to comparison", {
      description: "Go to compare to see hotel details side by side"
    });
  }, [compareList, maxCompare]);

  // Remove a hotel from the compare list
  const removeFromCompare = useCallback((hotelId: number) => {
    setCompareList(prevList => prevList.filter(id => id !== hotelId));
    toast.info("Removed from comparison");
  }, []);

  // Clear all hotels from the compare list
  const clearCompare = useCallback(() => {
    setCompareList([]);
    toast.info("Comparison list cleared");
  }, []);

  // Check if a hotel is in the compare list
  const isInCompare = useCallback((hotelId: number) => {
    return compareList.includes(hotelId);
  }, [compareList]);

  return {
    compareList,
    addToCompare,
    removeFromCompare,
    clearCompare,
    isInCompare
  };
};
