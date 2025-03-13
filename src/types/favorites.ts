
export interface Favorite {
  id: string;
  user_id: string;
  item_id: string | number;
  item_type: string;
  created_at: string;
  // Additional properties for joins
  hotels?: any;
  destinations?: any;
  adventures?: any;
  activities?: any;
}

export interface FavoritesState {
  favorites: Favorite[];
  loading: boolean;
  error: string | null;
}
