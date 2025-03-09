
import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    
    // Update the state with the current match
    setMatches(mediaQuery.matches);
    
    // Create a handler for changes
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    
    // Add the listener to update the state
    mediaQuery.addEventListener('change', handler);
    
    // Clean up
    return () => {
      mediaQuery.removeEventListener('change', handler);
    };
  }, [query]);

  return matches;
}
