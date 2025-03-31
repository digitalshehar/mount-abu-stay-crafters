
import { ToastType } from '@/hooks/use-toast';

export const validateSearch = (searchParams: URLSearchParams, toast: ToastType) => {
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
