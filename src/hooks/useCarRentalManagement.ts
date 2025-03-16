
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CarRental } from "@/integrations/supabase/custom-types";

export const useCarRentalManagement = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [cars, setCars] = useState<CarRental[]>([]);
  
  // Dialog states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<CarRental | null>(null);

  // Form state for new car
  const [newCar, setNewCar] = useState({
    name: "",
    type: "SUV",
    capacity: 5,
    transmission: "Manual",
    price: 0,
    image: "",
    description: ""
  });

  const fetchCars = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('car_rentals')
        .select('*');
      
      if (error) throw error;
      
      if (data) {
        const formattedCars: CarRental[] = data.map(car => ({
          id: car.id,
          name: car.name,
          type: car.type,
          capacity: car.capacity,
          transmission: car.transmission,
          price: parseFloat(car.price.toString()),
          image: car.image,
          bookings: car.bookings || 0,
          status: car.status as 'available' | 'booked' | 'maintenance',
          description: car.description
        }));
        setCars(formattedCars);
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
      toast({
        title: "Error fetching cars",
        description: "There was a problem loading the car data.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form input changes for new car
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewCar({
      ...newCar,
      [name]: name === "capacity" || name === "price" ? Number(value) : value
    });
  };

  // Handle form input changes for editing car
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!editingCar) return;
    
    const { name, value } = e.target;
    setEditingCar({
      ...editingCar,
      [name]: name === "capacity" || name === "price" ? Number(value) : value
    });
  };

  // Handle adding a new car
  const handleAddCar = async () => {
    // Validation
    if (!newCar.name || !newCar.type || newCar.capacity <= 0 || newCar.price <= 0 || !newCar.image) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields marked with *",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('car_rentals')
        .insert({
          name: newCar.name,
          type: newCar.type,
          capacity: newCar.capacity,
          transmission: newCar.transmission,
          price: newCar.price,
          image: newCar.image,
          description: newCar.description,
          status: 'available'
        })
        .select()
        .single();
      
      if (error) throw error;
      
      if (data) {
        const newCarData: CarRental = {
          id: data.id,
          name: data.name,
          type: data.type,
          capacity: data.capacity,
          transmission: data.transmission,
          price: parseFloat(data.price.toString()),
          image: data.image,
          bookings: 0,
          status: 'available',
          description: data.description
        };
        
        setCars([...cars, newCarData]);
        
        // Reset form
        setNewCar({
          name: "",
          type: "SUV",
          capacity: 5,
          transmission: "Manual",
          price: 0,
          image: "",
          description: ""
        });
        
        toast({
          title: "Car added",
          description: `${newCar.name} has been added successfully.`,
        });
        
        setIsAddDialogOpen(false);
      }
    } catch (error) {
      console.error("Error adding car:", error);
      toast({
        title: "Error adding car",
        description: "There was a problem adding the car. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Handle updating a car
  const handleUpdateCar = async () => {
    if (!editingCar) return;
    
    // Validation
    if (!editingCar.name || !editingCar.type || editingCar.capacity <= 0 || editingCar.price <= 0 || !editingCar.image) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields marked with *",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const { error } = await supabase
        .from('car_rentals')
        .update({
          name: editingCar.name,
          type: editingCar.type,
          capacity: editingCar.capacity,
          transmission: editingCar.transmission,
          price: editingCar.price,
          image: editingCar.image,
          description: editingCar.description
        })
        .eq('id', editingCar.id);
      
      if (error) throw error;
      
      // Update local state
      const updatedCars = cars.map(car => 
        car.id === editingCar.id ? editingCar : car
      );
      
      setCars(updatedCars);
      
      toast({
        title: "Car updated",
        description: `${editingCar.name} has been updated successfully.`,
      });
      
      setIsEditDialogOpen(false);
      setEditingCar(null);
    } catch (error) {
      console.error("Error updating car:", error);
      toast({
        title: "Error updating car",
        description: "There was a problem updating the car. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Open edit dialog and set editing car
  const handleEditClick = (car: CarRental) => {
    setEditingCar(car);
    setIsEditDialogOpen(true);
  };

  // Handle deleting a car
  const handleDeleteCar = async (id: number) => {
    try {
      const { error } = await supabase
        .from('car_rentals')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setCars(cars.filter(car => car.id !== id));
      
      toast({
        title: "Car deleted",
        description: "The car has been deleted successfully.",
        variant: "destructive"
      });
    } catch (error) {
      console.error("Error deleting car:", error);
      toast({
        title: "Error deleting car",
        description: "There was a problem deleting the car. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Handle toggling car status
  const handleToggleStatus = async (id: number) => {
    try {
      const car = cars.find(c => c.id === id);
      if (!car) return;
      
      const newStatus = car.status === 'available' ? 'maintenance' : 'available';
      
      const { error } = await supabase
        .from('car_rentals')
        .update({ status: newStatus })
        .eq('id', id);
      
      if (error) throw error;
      
      setCars(cars.map(c => 
        c.id === id ? { ...c, status: newStatus as 'available' | 'booked' | 'maintenance' } : c
      ));
      
      toast({
        title: "Status updated",
        description: `Car status has been updated to ${newStatus}.`,
      });
    } catch (error) {
      console.error("Error updating car status:", error);
      toast({
        title: "Error updating status",
        description: "There was a problem updating the car status. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Filter cars based on search query
  const filteredCars = cars.filter(car => 
    car.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    car.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchCars();
  }, []);

  return {
    cars,
    filteredCars,
    isLoading,
    searchQuery,
    setSearchQuery,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    editingCar,
    setEditingCar,
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
