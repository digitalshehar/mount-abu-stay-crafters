
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner"; // Import toast from sonner directly

export const validateSearch = (searchParams: URLSearchParams, toastFunction: any) => {
  if (searchParams.toString() === "") {
    toastFunction({
      title: "Please enter search details",
      description: "At least one field is required to search",
      variant: "destructive"
    });
    return false;
  }
  return true;
};
