
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { EarlyHotel } from '../../types/earlyHotel';
import { toast } from 'sonner';

export const useEarlyHotelManagement = () => {
  const [hotels, setHotels] = useState<EarlyHotel[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<EarlyHotel[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Dialog states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<EarlyHotel | null>(null);
  
  const fetchHotels = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('early_hotels')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setHotels(data as EarlyHotel[]);
      setFilteredHotels(data as EarlyHotel[]);
    } catch (err: any) {
      console.error('Error fetching hotels:', err);
      setError(err.message);
      toast.error('Failed to load hotels');
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);
  
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredHotels(hotels);
      return;
    }
    
    const term = searchTerm.toLowerCase();
    const filtered = hotels.filter(hotel => 
      hotel.name.toLowerCase().includes(term) || 
      hotel.location.toLowerCase().includes(term)
    );
    
    setFilteredHotels(filtered);
  };
  
  useEffect(() => {
    handleSearch();
  }, [searchTerm, hotels]);
  
  const handleAddHotel = async (hotel: Partial<EarlyHotel>) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('early_hotels')
        .insert(hotel)
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      toast.success('Hotel added successfully');
      await fetchHotels();
      return true;
    } catch (err: any) {
      console.error('Error adding hotel:', err);
      toast.error('Failed to add hotel');
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  const handleEditHotel = async (hotel: Partial<EarlyHotel>) => {
    if (!selectedHotel?.id) return;
    
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('early_hotels')
        .update(hotel)
        .eq('id', selectedHotel.id);
      
      if (error) {
        throw error;
      }
      
      toast.success('Hotel updated successfully');
      await fetchHotels();
      return true;
    } catch (err: any) {
      console.error('Error updating hotel:', err);
      toast.error('Failed to update hotel');
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteHotel = async (id: number) => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('early_hotels')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      toast.success('Hotel deleted successfully');
      await fetchHotels();
      return true;
    } catch (err: any) {
      console.error('Error deleting hotel:', err);
      toast.error('Failed to delete hotel');
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  const handleToggleStatus = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    
    try {
      const { error } = await supabase
        .from('early_hotels')
        .update({ status: newStatus })
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      toast.success(`Hotel ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`);
      await fetchHotels();
    } catch (err: any) {
      console.error('Error updating hotel status:', err);
      toast.error('Failed to update hotel status');
    }
  };
  
  const handleToggleFeatured = async (id: number, currentFeatured: boolean) => {
    try {
      const { error } = await supabase
        .from('early_hotels')
        .update({ featured: !currentFeatured })
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      toast.success(`Hotel ${!currentFeatured ? 'featured' : 'unfeatured'} successfully`);
      await fetchHotels();
    } catch (err: any) {
      console.error('Error updating hotel featured status:', err);
      toast.error('Failed to update featured status');
    }
  };
  
  return {
    hotels,
    filteredHotels,
    searchTerm,
    setSearchTerm,
    loading,
    error,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    isDetailsDialogOpen,
    setIsDetailsDialogOpen,
    selectedHotel,
    setSelectedHotel,
    handleSearch,
    handleAddHotel,
    handleEditHotel,
    handleDeleteHotel,
    handleToggleStatus,
    handleToggleFeatured,
    fetchHotels
  };
};
