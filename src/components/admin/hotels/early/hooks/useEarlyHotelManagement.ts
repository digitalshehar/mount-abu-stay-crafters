
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { EarlyHotel, EarlyHotelFormData } from '../../types/earlyHotel';
import { toast } from 'sonner';

export const useEarlyHotelManagement = () => {
  const [earlyHotels, setEarlyHotels] = useState<EarlyHotel[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<EarlyHotel[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<EarlyHotel | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch early hotels from Supabase
  const fetchEarlyHotels = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('early_hotels')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        // Convert database records to match the EarlyHotel type
        const typedHotels: EarlyHotel[] = data.map(hotel => ({
          ...hotel,
          status: hotel.status as 'active' | 'inactive'
        }));
        setEarlyHotels(typedHotels);
        setFilteredHotels(typedHotels);
      }
    } catch (error) {
      console.error('Error fetching early hotels:', error);
      toast.error('Failed to load early hotels');
    } finally {
      setLoading(false);
    }
  };

  // Fetch hotels on component mount
  useEffect(() => {
    fetchEarlyHotels();
  }, []);

  // Filter hotels based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredHotels(earlyHotels);
      return;
    }
    
    const searchTermLower = searchTerm.toLowerCase();
    const filtered = earlyHotels.filter(hotel => 
      hotel.name.toLowerCase().includes(searchTermLower) ||
      hotel.location.toLowerCase().includes(searchTermLower) ||
      String(hotel.hourly_rate).includes(searchTermLower) ||
      (hotel.description && hotel.description.toLowerCase().includes(searchTermLower))
    );
    
    setFilteredHotels(filtered);
  }, [searchTerm, earlyHotels]);

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the useEffect
  };

  // Add new hotel
  const handleAddHotel = async (hotel: EarlyHotelFormData) => {
    try {
      setLoading(true);
      
      // Ensure amenities is an array
      const amenities = Array.isArray(hotel.amenities) ? hotel.amenities : [];
      
      // Insert new hotel into Supabase
      const { data, error } = await supabase
        .from('early_hotels')
        .insert([
          {
            ...hotel,
            amenities,
            status: hotel.status || 'active'
          }
        ])
        .select();

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        // Convert the returned data to match EarlyHotel type
        const newHotel: EarlyHotel = {
          ...data[0],
          status: data[0].status as 'active' | 'inactive'
        };
        
        setEarlyHotels(prevHotels => [newHotel, ...prevHotels]);
        setIsAddDialogOpen(false);
        toast.success("Early hotel added successfully!");
      }
    } catch (error) {
      console.error('Error adding early hotel:', error);
      toast.error('Failed to add early hotel');
    } finally {
      setLoading(false);
    }
  };

  // Edit existing hotel
  const handleEditHotel = async (hotel: EarlyHotel) => {
    try {
      setLoading(true);

      // Ensure amenities is an array
      const amenities = Array.isArray(hotel.amenities) ? hotel.amenities : [];

      // Update hotel in Supabase
      const { error } = await supabase
        .from('early_hotels')
        .update({
          name: hotel.name,
          location: hotel.location,
          image: hotel.image,
          stars: hotel.stars,
          hourly_rate: hotel.hourly_rate,
          min_hours: hotel.min_hours,
          max_hours: hotel.max_hours,
          description: hotel.description,
          amenities,
          featured: hotel.featured,
          status: hotel.status
        })
        .eq('id', hotel.id);

      if (error) {
        throw error;
      }

      // Update local state
      setEarlyHotels(prevHotels => 
        prevHotels.map(h => h.id === hotel.id ? hotel : h)
      );
      
      setIsEditDialogOpen(false);
      toast.success("Early hotel updated successfully!");
    } catch (error) {
      console.error('Error updating early hotel:', error);
      toast.error('Failed to update early hotel');
    } finally {
      setLoading(false);
    }
  };

  // Delete hotel
  const handleDeleteHotel = async (id: number) => {
    try {
      setLoading(true);

      // Delete hotel from Supabase
      const { error } = await supabase
        .from('early_hotels')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      // Update local state
      setEarlyHotels(prevHotels => 
        prevHotels.filter(hotel => hotel.id !== id)
      );
      
      toast.success("Early hotel deleted successfully!");
    } catch (error) {
      console.error('Error deleting early hotel:', error);
      toast.error('Failed to delete early hotel');
    } finally {
      setLoading(false);
    }
  };

  // Toggle hotel status (active/inactive)
  const handleToggleStatus = async (id: number) => {
    try {
      // Find the current hotel
      const hotel = earlyHotels.find(h => h.id === id);
      if (!hotel) return;
      
      // Determine the new status
      const newStatus = hotel.status === 'active' ? 'inactive' as const : 'active' as const;
      
      // Update in Supabase
      const { error } = await supabase
        .from('early_hotels')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) {
        throw error;
      }

      // Update local state
      setEarlyHotels(prevHotels => 
        prevHotels.map(h => {
          if (h.id === id) {
            return {
              ...h,
              status: newStatus
            };
          }
          return h;
        })
      );
      
      toast.success(`Hotel ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully!`);
    } catch (error) {
      console.error('Error updating hotel status:', error);
      toast.error('Failed to update hotel status');
    }
  };

  // Toggle featured status
  const handleToggleFeatured = async (id: number) => {
    try {
      // Find the current hotel
      const hotel = earlyHotels.find(h => h.id === id);
      if (!hotel) return;
      
      // Determine the new featured status
      const newFeaturedStatus = !hotel.featured;
      
      // Update in Supabase
      const { error } = await supabase
        .from('early_hotels')
        .update({ featured: newFeaturedStatus })
        .eq('id', id);

      if (error) {
        throw error;
      }

      // Update local state
      setEarlyHotels(prevHotels => 
        prevHotels.map(h => {
          if (h.id === id) {
            return {
              ...h,
              featured: newFeaturedStatus
            };
          }
          return h;
        })
      );
      
      toast.success(`Hotel ${newFeaturedStatus ? 'featured' : 'unfeatured'} successfully!`);
    } catch (error) {
      console.error('Error updating featured status:', error);
      toast.error('Failed to update featured status');
    }
  };

  return {
    earlyHotels,
    filteredHotels,
    searchTerm,
    setSearchTerm,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDetailsDialogOpen,
    setIsDetailsDialogOpen,
    selectedHotel,
    setSelectedHotel,
    loading,
    handleSearch,
    handleAddHotel,
    handleEditHotel,
    handleDeleteHotel,
    handleToggleStatus,
    handleToggleFeatured,
    fetchEarlyHotels
  };
};
