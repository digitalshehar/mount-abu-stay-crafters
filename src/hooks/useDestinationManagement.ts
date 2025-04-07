
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Destination } from '@/integrations/supabase/custom-types';
import { toast } from 'sonner';

export const useDestinationManagement = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editingDestination, setEditingDestination] = useState<Destination | null>(null);

  // New destination template
  const newDestination: Partial<Destination> = {
    name: '',
    slug: '',
    location: '',
    image: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3',
    description: '',
    highlights: [],
    activities: [],
    status: 'active',
    featured: false
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  useEffect(() => {
    filterDestinations();
  }, [searchQuery, destinations]);

  const fetchDestinations = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('destinations')
        .select('*');

      if (error) {
        throw error;
      }

      setDestinations(data || []);
      setFilteredDestinations(data || []);
    } catch (error: any) {
      console.error('Error fetching destinations:', error.message);
      toast.error('Failed to load destinations');
    } finally {
      setIsLoading(false);
    }
  };

  const filterDestinations = () => {
    if (!searchQuery.trim()) {
      setFilteredDestinations(destinations);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = destinations.filter(
      destination =>
        destination.name.toLowerCase().includes(query) ||
        destination.location?.toLowerCase().includes(query) ||
        destination.description?.toLowerCase().includes(query)
    );
    setFilteredDestinations(filtered);
  };

  const handleAddDestination = async (formData: Partial<Destination>) => {
    try {
      // Generate a slug from the name if not provided
      const slug = formData.slug || formData.name?.toLowerCase().replace(/\s+/g, '-') || '';

      const newDestinationData = {
        name: formData.name,
        slug: slug,
        location: formData.location,
        description: formData.description,
        image: formData.image,
        highlights: formData.highlights,
        activities: formData.activities,
        best_time_to_visit: formData.bestTimeToVisit,
        status: 'active'
      };

      const { data, error } = await supabase
        .from('destinations')
        .insert([newDestinationData])
        .select();

      if (error) throw error;

      if (data && data[0]) {
        setDestinations(prevDestinations => [...prevDestinations, data[0]]);
        toast.success('Destination added successfully');
        setIsDialogOpen(false);
      }
    } catch (error: any) {
      console.error('Error adding destination:', error.message);
      toast.error('Failed to add destination');
    }
  };

  const handleUpdateDestination = async (formData: Partial<Destination>) => {
    try {
      if (!editingDestination) return;

      const updateData = {
        name: formData.name,
        slug: formData.slug || formData.name?.toLowerCase().replace(/\s+/g, '-'),
        location: formData.location,
        description: formData.description,
        image: formData.image,
        highlights: formData.highlights,
        activities: formData.activities,
        best_time_to_visit: formData.bestTimeToVisit,
        featured: formData.featured
      };

      const { error } = await supabase
        .from('destinations')
        .update(updateData)
        .eq('id', editingDestination.id);

      if (error) throw error;

      setDestinations(prevDestinations =>
        prevDestinations.map(destination =>
          destination.id === editingDestination.id
            ? { ...destination, ...formData }
            : destination
        )
      );

      toast.success('Destination updated successfully');
      setIsDialogOpen(false);
      setEditingDestination(null);
    } catch (error: any) {
      console.error('Error updating destination:', error.message);
      toast.error('Failed to update destination');
    }
  };

  const handleDeleteDestination = async (id: number) => {
    try {
      const { error } = await supabase
        .from('destinations')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setDestinations(prevDestinations => prevDestinations.filter(destination => destination.id !== id));
      toast.success('Destination deleted successfully');
    } catch (error: any) {
      console.error('Error deleting destination:', error.message);
      toast.error('Failed to delete destination');
    }
  };

  const handleToggleStatus = async (id: number) => {
    try {
      const destinationToUpdate = destinations.find(destination => destination.id === id);
      if (!destinationToUpdate) return;

      const newStatus = destinationToUpdate.status === 'active' ? 'inactive' : 'active';

      const { error } = await supabase
        .from('destinations')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      setDestinations(prevDestinations =>
        prevDestinations.map(destination =>
          destination.id === id
            ? { ...destination, status: newStatus }
            : destination
        )
      );

      toast.success(`Destination ${newStatus === 'active' ? 'activated' : 'deactivated'}`);
    } catch (error: any) {
      console.error('Error toggling destination status:', error.message);
      toast.error('Failed to update destination status');
    }
  };

  const handleEditDestination = (destination: Destination) => {
    setEditingDestination(destination);
    setIsDialogOpen(true);
  };

  return {
    destinations,
    filteredDestinations,
    searchQuery,
    setSearchQuery,
    isDialogOpen,
    setIsDialogOpen,
    isLoading,
    editingDestination,
    setEditingDestination,
    newDestination,
    handleAddDestination,
    handleUpdateDestination,
    handleDeleteDestination,
    handleToggleStatus,
    handleEditDestination
  };
};
