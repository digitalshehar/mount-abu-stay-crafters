
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BikeRental } from '@/integrations/supabase/custom-types';
import { toast } from 'sonner';

export const useBikeRentalManagement = () => {
  const [bikes, setBikes] = useState<BikeRental[]>([]);
  const [filteredBikes, setFilteredBikes] = useState<BikeRental[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editingBike, setEditingBike] = useState<BikeRental | null>(null);

  // New bike template
  const newBike: Partial<BikeRental> = {
    name: '',
    type: '',
    engine: '',
    price: 0,
    image: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3',
    bookings: 0,
    status: 'available',
    description: '',
    slug: '',
    price_per_day: 0,
    model: '',
    brand: ''
  };

  useEffect(() => {
    fetchBikes();
  }, []);

  useEffect(() => {
    filterBikes();
  }, [searchQuery, bikes]);

  const fetchBikes = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('bike_rentals')
        .select('*');

      if (error) {
        throw error;
      }

      // Map database fields to our interface
      const formattedBikes: BikeRental[] = data.map(bike => ({
        id: bike.id,
        name: bike.name,
        slug: bike.slug || bike.name.toLowerCase().replace(/\s+/g, '-'),
        image: bike.image,
        price_per_day: bike.price,
        model: bike.type || '',
        brand: bike.engine || '',
        engine: bike.engine,
        status: bike.status,
        description: bike.description,
        type: bike.type,
        price: bike.price,
        bookings: bike.bookings || 0
      }));

      setBikes(formattedBikes);
      setFilteredBikes(formattedBikes);
    } catch (error: any) {
      console.error('Error fetching bikes:', error.message);
      toast.error('Failed to load bikes');
    } finally {
      setIsLoading(false);
    }
  };

  const filterBikes = () => {
    if (!searchQuery.trim()) {
      setFilteredBikes(bikes);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = bikes.filter(
      bike =>
        bike.name.toLowerCase().includes(query) ||
        bike.type?.toLowerCase().includes(query) ||
        bike.engine?.toLowerCase().includes(query) ||
        bike.description?.toLowerCase().includes(query)
    );
    setFilteredBikes(filtered);
  };

  const handleAddBike = async (formData: Partial<BikeRental>) => {
    try {
      const newBikeData = {
        name: formData.name,
        type: formData.type,
        engine: formData.engine,
        price: formData.price,
        image: formData.image,
        description: formData.description,
        status: 'available',
        bookings: 0
      };

      const { data, error } = await supabase
        .from('bike_rentals')
        .insert([newBikeData])
        .select();

      if (error) throw error;

      if (data && data[0]) {
        const addedBike: BikeRental = {
          id: data[0].id,
          name: data[0].name,
          slug: data[0].name.toLowerCase().replace(/\s+/g, '-'),
          image: data[0].image,
          price_per_day: data[0].price,
          model: data[0].type || '',
          brand: data[0].engine || '',
          engine: data[0].engine,
          status: data[0].status,
          description: data[0].description,
          type: data[0].type,
          price: data[0].price,
          bookings: data[0].bookings || 0
        };

        setBikes(prevBikes => [...prevBikes, addedBike]);
        toast.success('Bike added successfully');
        setIsDialogOpen(false);
      }
    } catch (error: any) {
      console.error('Error adding bike:', error.message);
      toast.error('Failed to add bike');
    }
  };

  const handleUpdateBike = async (formData: Partial<BikeRental>) => {
    try {
      if (!editingBike) return;

      const updateData = {
        name: formData.name,
        type: formData.type,
        engine: formData.engine,
        price: formData.price,
        image: formData.image,
        description: formData.description
      };

      const { error } = await supabase
        .from('bike_rentals')
        .update(updateData)
        .eq('id', editingBike.id);

      if (error) throw error;

      setBikes(prevBikes =>
        prevBikes.map(bike =>
          bike.id === editingBike.id
            ? {
                ...bike,
                ...formData,
                status: bike.status,
                price_per_day: formData.price || bike.price_per_day,
                model: formData.type || bike.model,
                brand: formData.engine || bike.brand
              }
            : bike
        )
      );

      toast.success('Bike updated successfully');
      setIsDialogOpen(false);
      setEditingBike(null);
    } catch (error: any) {
      console.error('Error updating bike:', error.message);
      toast.error('Failed to update bike');
    }
  };

  const handleDeleteBike = async (id: number) => {
    try {
      const { error } = await supabase
        .from('bike_rentals')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setBikes(prevBikes => prevBikes.filter(bike => bike.id !== id));
      toast.success('Bike deleted successfully');
    } catch (error: any) {
      console.error('Error deleting bike:', error.message);
      toast.error('Failed to delete bike');
    }
  };

  const handleToggleStatus = async (id: number) => {
    try {
      const bikeToUpdate = bikes.find(bike => bike.id === id);
      if (!bikeToUpdate) return;

      const newStatus = bikeToUpdate.status === 'available' ? 'maintenance' : 'available';

      const { error } = await supabase
        .from('bike_rentals')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      setBikes(prevBikes =>
        prevBikes.map(bike =>
          bike.id === id
            ? { ...bike, status: newStatus as BikeRental['status'] }
            : bike
        )
      );

      toast.success(`Bike ${newStatus === 'available' ? 'activated' : 'deactivated'}`);
    } catch (error: any) {
      console.error('Error toggling bike status:', error.message);
      toast.error('Failed to update bike status');
    }
  };

  const handleEditBike = (bike: BikeRental) => {
    setEditingBike({
      ...bike,
      type: bike.type || bike.model,
      price: bike.price || bike.price_per_day
    });
    setIsDialogOpen(true);
  };

  return {
    bikes,
    filteredBikes,
    searchQuery,
    setSearchQuery,
    isDialogOpen,
    setIsDialogOpen,
    isLoading,
    editingBike,
    setEditingBike,
    newBike,
    handleAddBike,
    handleUpdateBike,
    handleDeleteBike,
    handleToggleStatus,
    handleEditBike
  };
};
