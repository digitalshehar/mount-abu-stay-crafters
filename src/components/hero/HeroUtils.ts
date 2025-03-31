
// Import the toast type from hooks/use-toast
import { toast } from "@/hooks/use-toast";

export const validateSearch = (searchParams: URLSearchParams, toast: typeof toast) => {
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
