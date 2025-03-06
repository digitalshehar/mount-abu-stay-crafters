
import { useState } from 'react';
import { recommendationsData } from '@/data/recommendationsData';
import { RecommendationItem } from '@/types/recommendations';

export const useRecommendations = () => {
  const [preferences, setPreferences] = useState<string[]>(['family-friendly', 'nature']);
  
  const togglePreference = (preference: string) => {
    setPreferences(prev => 
      prev.includes(preference)
        ? prev.filter(p => p !== preference)
        : [...prev, preference]
    );
  };
  
  const getFilteredRecommendations = (): RecommendationItem[] => {
    if (preferences.length === 0) return recommendationsData;
    
    return recommendationsData.filter(item => 
      item.tags.some(tag => preferences.includes(tag))
    ).sort((a, b) => {
      const aMatches = a.tags.filter(tag => preferences.includes(tag)).length;
      const bMatches = b.tags.filter(tag => preferences.includes(tag)).length;
      return bMatches - aMatches;
    });
  };
  
  return {
    preferences,
    togglePreference,
    getFilteredRecommendations
  };
};
