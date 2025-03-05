import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/context/AuthContext';
import { Crown, Tag, Clock, Coffee, Tent, Mountain, Landmark, Utensils } from 'lucide-react';

type RecommendationItem = {
  id: number;
  type: 'hotel' | 'restaurant' | 'activity' | 'attraction';
  name: string;
  description: string;
  image: string;
  rating: number;
  price: string;
  tags: string[];
};

const recommendationsData: RecommendationItem[] = [
  {
    id: 1,
    type: 'hotel',
    name: 'Hilltop Luxury Resort',
    description: 'Premium resort with mountain views',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3',
    rating: 4.8,
    price: '₹5,800',
    tags: ['luxury', 'spa', 'family-friendly']
  },
  {
    id: 2,
    type: 'attraction',
    name: 'Nakki Lake',
    description: 'Beautiful lake perfect for boating',
    image: 'https://images.unsplash.com/photo-1522067533025-89b802de9bbf?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3',
    rating: 4.6,
    price: 'Free',
    tags: ['nature', 'family-friendly', 'photography']
  },
  {
    id: 3,
    type: 'activity',
    name: 'Trekking to Guru Shikhar',
    description: 'Exciting trek to the highest peak',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3',
    rating: 4.7,
    price: '₹1,200',
    tags: ['adventure', 'nature', 'photography']
  },
  {
    id: 4,
    type: 'restaurant',
    name: 'Arbuda Restaurant',
    description: 'Traditional Rajasthani cuisine',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3',
    rating: 4.5,
    price: '₹₹',
    tags: ['traditional', 'family-friendly', 'vegetarian']
  },
  {
    id: 5,
    type: 'attraction',
    name: 'Dilwara Temples',
    description: 'Exquisite Jain temples with marble carvings',
    image: 'https://images.unsplash.com/photo-1514434789019-00f42a4b7c47?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3',
    rating: 4.9,
    price: '₹100',
    tags: ['cultural', 'historic', 'architecture']
  },
  {
    id: 6,
    type: 'hotel',
    name: 'Mountain View Cottages',
    description: 'Cozy cottages near Sunset Point',
    image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3',
    rating: 4.3,
    price: '₹3,500',
    tags: ['budget', 'couples', 'views']
  },
];

interface PersonalizedRecommendationsProps {
  className?: string;
}

const PersonalizedRecommendations: React.FC<PersonalizedRecommendationsProps> = ({ className = '' }) => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<string[]>(['family-friendly', 'nature']);
  const [showPreferences, setShowPreferences] = useState(false);
  
  const togglePreference = (preference: string) => {
    setPreferences(prev => 
      prev.includes(preference)
        ? prev.filter(p => p !== preference)
        : [...prev, preference]
    );
  };
  
  const getFilteredRecommendations = () => {
    if (preferences.length === 0) return recommendationsData;
    
    return recommendationsData.filter(item => 
      item.tags.some(tag => preferences.includes(tag))
    ).sort((a, b) => {
      const aMatches = a.tags.filter(tag => preferences.includes(tag)).length;
      const bMatches = b.tags.filter(tag => preferences.includes(tag)).length;
      return bMatches - aMatches;
    });
  };
  
  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'hotel':
        return <Crown className="h-4 w-4" />;
      case 'restaurant':
        return <Utensils className="h-4 w-4" />;
      case 'activity':
        return <Tent className="h-4 w-4" />;
      case 'attraction':
        return <Landmark className="h-4 w-4" />;
      default:
        return <Mountain className="h-4 w-4" />;
    }
  };
  
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
          <div className="mb-4 p-3 border rounded-lg bg-gray-50">
            <h4 className="text-sm font-medium mb-2">Your Travel Preferences</h4>
            <div className="grid grid-cols-2 gap-2">
              {['luxury', 'budget', 'adventure', 'relaxation', 'family-friendly', 'couples', 
               'cultural', 'nature', 'food', 'shopping', 'historic', 'photography'].map(pref => (
                <div key={pref} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`pref-${pref}`} 
                    checked={preferences.includes(pref)}
                    onCheckedChange={() => togglePreference(pref)}
                  />
                  <label
                    htmlFor={`pref-${pref}`}
                    className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                  >
                    {pref}
                  </label>
                </div>
              ))}
            </div>
          </div>
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
              <div key={item.id} className="flex border rounded-lg overflow-hidden">
                <div className="w-24 h-24 flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-3">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-1.5">
                      {getTypeIcon(item.type)}
                      <h3 className="text-sm font-medium">{item.name}</h3>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-xs font-medium">{item.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-1">
                      {item.type === 'hotel' || item.type === 'activity' ? (
                        <Clock className="h-3 w-3 text-gray-400" />
                      ) : (
                        <Tag className="h-3 w-3 text-gray-400" />
                      )}
                      <span className="text-xs text-gray-600">{item.price}</span>
                    </div>
                    <div className="flex gap-1">
                      {item.tags.filter(tag => preferences.includes(tag)).map(tag => (
                        <span key={tag} className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default PersonalizedRecommendations;
