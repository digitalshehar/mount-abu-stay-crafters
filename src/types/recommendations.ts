
export type RecommendationItem = {
  id: number;
  type: 'hotel' | 'restaurant' | 'activity' | 'attraction';
  name: string;
  description: string;
  image: string;
  rating: number;
  price: string;
  tags: string[];
};
