
import { useToast } from "@/hooks/use-toast";

// Function to validate search params
export const validateSearch = (
  searchParams: URLSearchParams,
  toast: ReturnType<typeof useToast>["toast"]
): boolean => {
  if (searchParams.toString() === "") {
    toast({
      title: "Empty Search",
      description: "Please enter at least one search criteria",
      variant: "destructive",
    });
    return false;
  }
  
  // Check if location is empty and show a specific message
  const location = searchParams.get("location");
  if (!location || location.trim() === "") {
    toast({
      title: "Location Required",
      description: "Please enter a destination for your search",
      variant: "destructive",
    });
    return false;
  }
  
  return true;
};
