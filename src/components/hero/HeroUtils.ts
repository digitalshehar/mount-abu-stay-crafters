
import { toast } from "sonner"; 

// The function needs to handle both our custom toast hook and sonner toast
export const validateSearch = (searchParams: URLSearchParams, toastFunction: any) => {
  if (searchParams.toString() === "") {
    // Try to use the provided toast function, fallback to sonner's toast
    if (toastFunction) {
      toastFunction({
        title: "Please enter search details",
        description: "At least one field is required to search",
        variant: "destructive"
      });
    } else {
      toast.error("Please enter at least one search detail");
    }
    return false;
  }
  return true;
};
