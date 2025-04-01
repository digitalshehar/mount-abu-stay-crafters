
import { toast } from "sonner"; 

/**
 * Validates search parameters and shows appropriate toast messages
 * @param searchParams The URL search parameters to validate
 * @param toastFunction Optional custom toast function to use
 * @returns Boolean indicating if the validation passed
 */
export const validateSearch = (searchParams: URLSearchParams, toastFunction: any) => {
  // Handle completely empty search
  if (searchParams.toString() === "") {
    showToast(
      toastFunction,
      "Please enter search details",
      "At least one field is required to search",
      "destructive"
    );
    return false;
  }

  // Check for location on hotel searches
  if (searchParams.has('type') && searchParams.get('type') === 'hotels' && !searchParams.has('location')) {
    showToast(
      toastFunction,
      "Missing destination",
      "Please enter a location for your hotel search",
      "warning"
    );
    return false;
  }

  // Validate date range if dates are provided
  if (searchParams.has('dates')) {
    const dates = searchParams.get('dates');
    if (dates && !isValidDateFormat(dates)) {
      showToast(
        toastFunction,
        "Invalid dates",
        "Please select valid check-in and check-out dates",
        "warning"
      );
      return false;
    }
  }

  return true;
};

/**
 * Shows a toast message using either the provided function or sonner's toast
 */
const showToast = (toastFunction: any, title: string, description: string, variant: string) => {
  if (toastFunction) {
    toastFunction({
      title,
      description,
      variant
    });
  } else {
    // Fallback to sonner toast
    if (variant === 'destructive' || variant === 'error') {
      toast.error(title, { description });
    } else if (variant === 'warning') {
      toast.warning(title, { description });
    } else {
      toast.info(title, { description });
    }
  }
};

/**
 * Validates if a date string is properly formatted (e.g., "Oct 10 - Oct 15, 2023")
 */
const isValidDateFormat = (dateString: string): boolean => {
  // Simple validation - check if there's a hyphen for date range
  return dateString.includes('-');
};
