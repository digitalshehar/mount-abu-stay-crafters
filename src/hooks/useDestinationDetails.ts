
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Destination, Adventure } from '@/integrations/supabase/custom-types';
import { toast } from 'sonner';

export const useDestinationDetails = (destinationSlug?: string) => {
  const [destination, setDestination] = useState<Destination | null>(null);
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (destinationSlug) {
      fetchDestinationDetails(destinationSlug);
    }
  }, [destinationSlug]);

  const fetchDestinationDetails = async (slug: string) => {
    try {
      setLoading(true);

      // Fetch destination details
      const { data: destinationData, error: destinationError } = await supabase
        .from('destinations')
        .select('*')
        .eq('slug', slug)
        .single();

      if (destinationError) {
        throw destinationError;
      }

      if (destinationData) {
        setDestination(destinationData);

        // Fetch adventures related to this destination
        const { data: adventuresData, error: adventuresError } = await supabase
          .from('adventures')
          .select('*')
          .eq('location', destinationData.location)
          .eq('status', 'active');

        if (adventuresError) {
          console.error('Error fetching related adventures:', adventuresError);
        } else {
          setAdventures(adventuresData || []);
        }
      }
    } catch (err: any) {
      console.error('Error fetching destination details:', err.message);
      setError(err.message);
      toast.error('Failed to load destination details');
    } finally {
      setLoading(false);
    }
  };

  return {
    destination,
    adventures,
    loading,
    error
  };
};
