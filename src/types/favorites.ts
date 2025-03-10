
export type Favorite = {
  id: string;
  item_type: 'hotel' | 'adventure' | 'car' | 'bike';
  item_id: number;
  name?: string;
  image?: string;
  price?: number;
  location?: string;
  created_at?: string;
  user_id?: string;
};
