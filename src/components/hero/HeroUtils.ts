
// Import the toast type correctly
import { type Toast } from "@/hooks/use-toast";

export const validateSearch = (searchParams: URLSearchParams, toast: Toast) => {
  // Basic validation - require at least one parameter
  if (searchParams.toString() === '') {
    toast({
      title: 'Search Error',
      description: 'Please fill in at least one search field',
      variant: 'destructive',
    });
    return false;
  }
  return true;
};
