
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Adventure } from '@/integrations/supabase/custom-types';
import { toast } from 'sonner';

export const useAdventureManagement = () => {
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [filteredAdventures, setFilteredAdventures] = useState<Adventure[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editingAdventure, setEditingAdventure] = useState<Adventure | null>(null);

  // New adventure template
  const newAdventure: Partial<Adventure> = {
    name: '',
    type: '',
    duration: '',
    difficulty: 'Easy',
    price: 0,
    image: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3',
    location: '',
    description: '',
    includes: [],
    timeline: [],
    requirements: [],
    status: 'active',
    bookings: 0
  };

  useEffect(() => {
    fetchAdventures();
  }, []);

  useEffect(() => {
    filterAdventures();
  }, [searchQuery, adventures]);

  const fetchAdventures = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('adventures')
        .select('*');

      if (error) {
        throw error;
      }

      setAdventures(data || []);
      setFilteredAdventures(data || []);
    } catch (error: any) {
      console.error('Error fetching adventures:', error.message);
      toast.error('Failed to load adventures');
    } finally {
      setIsLoading(false);
    }
  };

  const filterAdventures = () => {
    if (!searchQuery.trim()) {
      setFilteredAdventures(adventures);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = adventures.filter(
      adventure =>
        adventure.name.toLowerCase().includes(query) ||
        adventure.location?.toLowerCase().includes(query) ||
        adventure.difficulty?.toLowerCase().includes(query) ||
        adventure.type?.toLowerCase().includes(query)
    );
    setFilteredAdventures(filtered);
  };

  const handleAddAdventure = async (formData: Partial<Adventure>) => {
    try {
      // Generate a slug from the name if not provided
      const slug = formData.slug || formData.name?.toLowerCase().replace(/\s+/g, '-') || '';

      const newAdventureData = {
        name: formData.name,
        type: formData.type,
        duration: formData.duration,
        difficulty: formData.difficulty,
        price: formData.price,
        image: formData.image,
        location: formData.location,
        slug: slug,
        description: formData.description,
        includes: formData.includes,
        timeline: formData.timeline,
        requirements: formData.requirements,
        meeting_point: formData.meetingPoint,
        cancellation_policy: formData.cancellationPolicy,
        min_age: formData.minAge,
        max_group_size: formData.maxGroupSize,
        status: 'active',
        bookings: 0
      };

      const { data, error } = await supabase
        .from('adventures')
        .insert([newAdventureData])
        .select();

      if (error) throw error;

      if (data && data[0]) {
        setAdventures(prevAdventures => [...prevAdventures, data[0]]);
        toast.success('Adventure added successfully');
        setIsDialogOpen(false);
      }
    } catch (error: any) {
      console.error('Error adding adventure:', error.message);
      toast.error('Failed to add adventure');
    }
  };

  const handleUpdateAdventure = async (formData: Partial<Adventure>) => {
    try {
      if (!editingAdventure) return;

      const updateData = {
        name: formData.name,
        type: formData.type,
        duration: formData.duration,
        difficulty: formData.difficulty,
        price: formData.price,
        image: formData.image,
        location: formData.location,
        slug: formData.slug || formData.name?.toLowerCase().replace(/\s+/g, '-'),
        description: formData.description,
        includes: formData.includes,
        timeline: formData.timeline,
        requirements: formData.requirements,
        meeting_point: formData.meetingPoint,
        cancellation_policy: formData.cancellationPolicy,
        min_age: formData.minAge,
        max_group_size: formData.maxGroupSize
      };

      const { error } = await supabase
        .from('adventures')
        .update(updateData)
        .eq('id', editingAdventure.id);

      if (error) throw error;

      setAdventures(prevAdventures =>
        prevAdventures.map(adventure =>
          adventure.id === editingAdventure.id
            ? { ...adventure, ...formData }
            : adventure
        )
      );

      toast.success('Adventure updated successfully');
      setIsDialogOpen(false);
      setEditingAdventure(null);
    } catch (error: any) {
      console.error('Error updating adventure:', error.message);
      toast.error('Failed to update adventure');
    }
  };

  const handleDeleteAdventure = async (id: number) => {
    try {
      const { error } = await supabase
        .from('adventures')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setAdventures(prevAdventures => prevAdventures.filter(adventure => adventure.id !== id));
      toast.success('Adventure deleted successfully');
    } catch (error: any) {
      console.error('Error deleting adventure:', error.message);
      toast.error('Failed to delete adventure');
    }
  };

  const handleToggleStatus = async (id: number) => {
    try {
      const adventureToUpdate = adventures.find(adventure => adventure.id === id);
      if (!adventureToUpdate) return;

      const newStatus = adventureToUpdate.status === 'active' ? 'inactive' : 'active';

      const { error } = await supabase
        .from('adventures')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      setAdventures(prevAdventures =>
        prevAdventures.map(adventure =>
          adventure.id === id
            ? { ...adventure, status: newStatus }
            : adventure
        )
      );

      toast.success(`Adventure ${newStatus === 'active' ? 'activated' : 'deactivated'}`);
    } catch (error: any) {
      console.error('Error toggling adventure status:', error.message);
      toast.error('Failed to update adventure status');
    }
  };

  const handleEditAdventure = (adventure: Adventure) => {
    setEditingAdventure(adventure);
    setIsDialogOpen(true);
  };

  return {
    adventures,
    filteredAdventures,
    searchQuery,
    setSearchQuery,
    isDialogOpen,
    setIsDialogOpen,
    isLoading,
    editingAdventure,
    setEditingAdventure,
    newAdventure,
    handleAddAdventure,
    handleUpdateAdventure,
    handleDeleteAdventure,
    handleToggleStatus,
    handleEditAdventure
  };
};
