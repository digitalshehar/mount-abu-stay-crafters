
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { CarRental } from '@/integrations/supabase/custom-types';
import { toast } from 'sonner';

export const useCarRentalManagement = () => {
  const [cars, setCars] = useState<CarRental[]>([]);
  const [filteredCars, setFilteredCars] = useState<CarRental[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editingCar, setEditingCar] = useState<CarRental | null>(null);

  // Template for new car
  const newCar: Partial<CarRental> = {
    name: '',
    type: 'Sedan',
    capacity: 4,
    transmission: 'Manual',
    price: 0,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3',
    description: '',
    status: 'available',
    bookings: 0,
    slug: '',
    price_per_day: 0,
    model: '',
    brand: ''
  };

  // State for the new car form
  const [carData, setCarData] = useState(newCar);

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    filterCars();
  }, [searchQuery, cars]);

  const fetchCars = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('car_rentals')
        .select('*');

      if (error) {
        throw error;
      }

      // Map database fields to our interface
      const formattedCars: CarRental[] = data.map(car => ({
        id: car.id,
        name: car.name,
        slug: car.name.toLowerCase().replace(/\s+/g, '-'),
        image: car.image,
        price_per_day: car.price,
        model: car.type || '',
        brand: car.transmission || '',
        status: car.status,
        description: car.description,
        type: car.type,
        capacity: car.capacity,
        transmission: car.transmission,
        price: car.price,
        bookings: car.bookings || 0
      }));

      setCars(formattedCars);
      setFilteredCars(formattedCars);
    } catch (error: any) {
      console.error('Error fetching cars:', error.message);
      toast.error('Failed to load cars');
    } finally {
      setIsLoading(false);
    }
  };

  const filterCars = () => {
    if (!searchQuery.trim()) {
      setFilteredCars(cars);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = cars.filter(
      car =>
        car.name.toLowerCase().includes(query) ||
        car.type?.toLowerCase().includes(query) ||
        car.transmission?.toLowerCase().includes(query) ||
        car.description?.toLowerCase().includes(query)
    );
    setFilteredCars(filtered);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCarData(prev => ({
      ...prev,
      [name]: name === 'capacity' || name === 'price' ? Number(value) : value
    }));
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditingCar(prev => {
      if (!prev) return null;
      return {
        ...prev,
        [name]: name === 'capacity' || name === 'price' ? Number(value) : value
      };
    });
  };

  const handleAddCar = async () => {
    try {
      const newCarData = {
        name: carData.name,
        type: carData.type,
        capacity: carData.capacity,
        transmission: carData.transmission,
        price: carData.price,
        image: carData.image,
        description: carData.description,
        status: 'available',
        bookings: 0
      };

      const { data, error } = await supabase
        .from('car_rentals')
        .insert([newCarData])
        .select();

      if (error) throw error;

      if (data && data[0]) {
        const addedCar: CarRental = {
          id: data[0].id,
          name: data[0].name,
          slug: data[0].name.toLowerCase().replace(/\s+/g, '-'),
          image: data[0].image,
          price_per_day: data[0].price,
          model: data[0].type || '',
          brand: data[0].transmission || '',
          status: data[0].status,
          description: data[0].description,
          type: data[0].type,
          capacity: data[0].capacity,
          transmission: data[0].transmission,
          price: data[0].price,
          bookings: data[0].bookings || 0
        };

        setCars(prevCars => [...prevCars, addedCar]);
        toast.success('Car added successfully');
        setIsAddDialogOpen(false);
        setCarData(newCar);
      }
    } catch (error: any) {
      console.error('Error adding car:', error.message);
      toast.error('Failed to add car');
    }
  };

  const handleUpdateCar = async () => {
    try {
      if (!editingCar) return;

      const updateData = {
        name: editingCar.name,
        type: editingCar.type,
        capacity: editingCar.capacity,
        transmission: editingCar.transmission,
        price: editingCar.price,
        image: editingCar.image,
        description: editingCar.description
      };

      const { error } = await supabase
        .from('car_rentals')
        .update(updateData)
        .eq('id', editingCar.id);

      if (error) throw error;

      setCars(prevCars =>
        prevCars.map(car =>
          car.id === editingCar.id
            ? {
                ...car,
                ...editingCar,
                status: car.status,
                price_per_day: editingCar.price || car.price_per_day,
                model: editingCar.type || car.model,
                brand: editingCar.transmission || car.brand
              }
            : car
        )
      );

      toast.success('Car updated successfully');
      setIsEditDialogOpen(false);
      setEditingCar(null);
    } catch (error: any) {
      console.error('Error updating car:', error.message);
      toast.error('Failed to update car');
    }
  };

  const handleEditClick = (car: CarRental) => {
    setEditingCar({
      ...car,
      type: car.type || car.model,
      capacity: car.capacity || 4,
      price: car.price || car.price_per_day
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteCar = async (id: number) => {
    try {
      const { error } = await supabase
        .from('car_rentals')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setCars(prevCars => prevCars.filter(car => car.id !== id));
      toast.success('Car deleted successfully');
    } catch (error: any) {
      console.error('Error deleting car:', error.message);
      toast.error('Failed to delete car');
    }
  };

  const handleToggleStatus = async (id: number) => {
    try {
      const carToUpdate = cars.find(car => car.id === id);
      if (!carToUpdate) return;

      const newStatus = carToUpdate.status === 'available' ? 'maintenance' : 'available';

      const { error } = await supabase
        .from('car_rentals')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      setCars(prevCars =>
        prevCars.map(car =>
          car.id === id
            ? { ...car, status: newStatus as CarRental['status'] }
            : car
        )
      );

      toast.success(`Car ${newStatus === 'available' ? 'activated' : 'deactivated'}`);
    } catch (error: any) {
      console.error('Error toggling car status:', error.message);
      toast.error('Failed to update car status');
    }
  };

  return {
    filteredCars,
    isLoading,
    searchQuery,
    setSearchQuery,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    editingCar,
    newCar,
    handleInputChange,
    handleEditInputChange,
    handleAddCar,
    handleUpdateCar,
    handleEditClick,
    handleDeleteCar,
    handleToggleStatus
  };
};
