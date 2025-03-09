
// Define a more flexible Favorite type that works with our actual system
export type Favorite = {
  id: string;
  item_type: string;  // Using string to be more flexible with backend
  item_id: number;
  name?: string;
  image?: string;
  price?: number;
  location?: string;
  created_at?: string;
  user_id?: string;
};
