
// Import the toast type from hooks/use-toast
import { type ToastProps } from "@/types/toast";
import { toast } from "@/hooks/use-toast";

export const validateSearch = (searchParams: URLSearchParams, toastFn: (props: ToastProps) => void) => {
  // Basic validation - require at least one parameter
  if (searchParams.toString() === '') {
    toastFn({
      title: 'Search Error',
      description: 'Please fill in at least one search field',
      variant: 'destructive',
    });
    return false;
  }
  return true;
};
