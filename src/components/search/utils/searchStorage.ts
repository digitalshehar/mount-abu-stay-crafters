
import { SearchResult } from "../types";

const RECENT_SEARCHES_KEY = "recent_searches";
const MAX_RECENT_SEARCHES = 5;

/**
 * Gets recent searches from localStorage
 */
export const getRecentSearches = (): SearchResult[] => {
  try {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error retrieving recent searches:", error);
    return [];
  }
};

/**
 * Adds a search result to recent searches
 */
export const addToRecentSearches = (result: SearchResult): void => {
  try {
    const recentSearches = getRecentSearches();
    
    // Check if the item already exists
    const existingIndex = recentSearches.findIndex(
      (item) => item.id === result.id && item.type === result.type
    );
    
    // If it exists, remove it (we'll add it to the front)
    if (existingIndex > -1) {
      recentSearches.splice(existingIndex, 1);
    }
    
    // Add the new result to the beginning
    recentSearches.unshift(result);
    
    // Limit to MAX_RECENT_SEARCHES
    const limitedSearches = recentSearches.slice(0, MAX_RECENT_SEARCHES);
    
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(limitedSearches));
  } catch (error) {
    console.error("Error saving recent search:", error);
  }
};

/**
 * Clears all recent searches
 */
export const clearRecentSearches = (): void => {
  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  } catch (error) {
    console.error("Error clearing recent searches:", error);
  }
};
