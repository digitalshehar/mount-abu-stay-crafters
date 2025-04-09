
import { 
  Hotel, 
  Destination, 
  Adventure, 
  BikeRental, 
  CarRental 
} from "@/integrations/supabase/custom-types";

export type SearchResultType = "hotel" | "home" | "destination" | "adventure" | "bike" | "car" | "early-hotel";

export interface SearchResult {
  id: number;
  name: string;
  type: SearchResultType;
  slug?: string;
  location?: string;
  image?: string;
}

export interface GlobalSearchProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
}
