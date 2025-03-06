
import React from 'react';
import { Crown, Utensils, Tent, Landmark, Mountain, Tag, Clock } from 'lucide-react';
import { RecommendationItem as RecommendationItemType } from '@/types/recommendations';

interface RecommendationItemProps {
  item: RecommendationItemType;
  preferences: string[];
}

const RecommendationItem: React.FC<RecommendationItemProps> = ({ item, preferences }) => {
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
  
  return (
    <div className="flex border rounded-lg overflow-hidden">
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
  );
};

export default RecommendationItem;
