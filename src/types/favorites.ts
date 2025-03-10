
export type Favorite = {
  id: string;
  item_type: string;  // Changed from a union type to string to match the backend
  item_id: number;
  name?: string;
  image?: string;
  price?: number;
  location?: string;
  created_at?: string;
  user_id?: string;
};
