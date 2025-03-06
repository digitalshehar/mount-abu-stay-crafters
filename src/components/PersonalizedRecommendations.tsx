
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/context/AuthContext';
import PreferenceSelector from './recommendations/PreferenceSelector';
import RecommendationItem from './recommendations/RecommendationItem';
import { useRecommendations } from '@/hooks/useRecommendations';

interface PersonalizedRecommendationsProps {
  className?: string;
}

const PersonalizedRecommendations: React.FC<PersonalizedRecommendationsProps> = ({ className = '' }) => {
  const { user } = useAuth();
  const { preferences, togglePreference, getFilteredRecommendations } = useRecommendations();
  const [showPreferences, setShowPreferences] = useState(false);
  
  const filteredRecommendations = getFilteredRecommendations();

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Personalized Recommendations</CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowPreferences(!showPreferences)}
          >
            {showPreferences ? 'Hide Preferences' : 'Set Preferences'}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4">
        {showPreferences && (
          <PreferenceSelector 
            preferences={preferences}
            togglePreference={togglePreference}
          />
        )}
        
        <ScrollArea className="h-[300px]">
          <div className="space-y-3">
            {!user && !showPreferences && (
              <div className="bg-gray-50 p-3 rounded-lg mb-3">
                <p className="text-sm">
                  <a href="/auth" className="text-primary font-medium">Sign in</a> to receive personalized recommendations based on your preferences.
                </p>
              </div>
            )}
            
            {filteredRecommendations.map(item => (
              <RecommendationItem 
                key={item.id} 
                item={item} 
                preferences={preferences} 
              />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default PersonalizedRecommendations;
