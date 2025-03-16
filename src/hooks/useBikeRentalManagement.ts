
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { BikeRental } from "@/integrations/supabase/custom-types";

export const useBikeRentalManagement = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bikes, setBikes] = useState<BikeRental[]>([]);
  const [editingBike, setEditingBike] = useState<BikeRental | null>(null);

  // Form state for new bike
  const [newBike, setNewBike] = useState({
    name: "",
    type: "Scooter",
    engine: "",
    price: 0,
    image: "",
    description: ""
  });

  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('bike_rentals')
        .select('*');
      
      if (error) throw error;
      
      if (data) {
        const formattedBikes: BikeRental[] = data.map(bike => ({
          id: bike.id,
          name: bike.name,
          type: bike.type,
          engine: bike.engine,
          price: parseFloat(bike.price.toString()),
          image: bike.image,
          bookings: bike.bookings || 0,
          status: bike.status as 'available' | 'booked' | 'maintenance',
          description: bike.description
        }));
        setBikes(formattedBikes);
      }
    } catch (error) {
      console.error("Error fetching bikes:", error);
      toast({
        title: "Error fetching bikes",
        description: "There was a problem loading the bike data.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle adding a new bike
  const handleAddBike = async (bikeData: any) => {
    try {
      const { data, error } = await supabase
        .from('bike_rentals')
        .insert({
          name: bikeData.name,
          type: bikeData.type,
          engine: bikeData.engine,
          price: bikeData.price,
          image: bikeData.image,
          description: bikeData.description,
          status: 'available'
        })
        .select()
        .single();
      
      if (error) throw error;
      
      if (data) {
        const newBikeData: BikeRental = {
          id: data.id,
          name: data.name,
          type: data.type,
          engine: data.engine,
          price: parseFloat(data.price.toString()),
          image: data.image,
          bookings: 0,
          status: 'available',
          description: data.description
        };
        
        setBikes([...bikes, newBikeData]);
        
        // Reset form
        setNewBike({
          name: "",
          type: "Scooter",
          engine: "",
          price: 0,
          image: "",
          description: ""
        });
        
        toast({
          title: "Bike added",
          description: `${bikeData.name} has been added successfully.`,
        });
        
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error("Error adding bike:", error);
      toast({
        title: "Error adding bike",
        description: "There was a problem adding the bike. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Handle updating a bike
  const handleUpdateBike = async (bikeData: BikeRental) => {
    try {
      const { error } = await supabase
        .from('bike_rentals')
        .update({
          name: bikeData.name,
          type: bikeData.type,
          engine: bikeData.engine,
          price: bikeData.price,
          image: bikeData.image,
          description: bikeData.description
        })
        .eq('id', bikeData.id);
      
      if (error) throw error;
      
      setBikes(bikes.map(b => b.id === bikeData.id ? bikeData : b));
      
      toast({
        title: "Bike updated",
        description: `${bikeData.name} has been updated successfully.`,
      });
      
      setEditingBike(null);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error updating bike:", error);
      toast({
        title: "Error updating bike",
        description: "There was a problem updating the bike. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Handle deleting a bike
  const handleDeleteBike = async (id: number) => {
    try {
      const { error } = await supabase
        .from('bike_rentals')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setBikes(bikes.filter(bike => bike.id !== id));
      
      toast({
        title: "Bike deleted",
        description: "The bike has been deleted successfully.",
        variant: "destructive"
      });
    } catch (error) {
      console.error("Error deleting bike:", error);
      toast({
        title: "Error deleting bike",
        description: "There was a problem deleting the bike. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Handle toggling bike status
  const handleToggleStatus = async (id: number) => {
    try {
      const bike = bikes.find(b => b.id === id);
      if (!bike) return;
      
      const newStatus = bike.status === 'available' ? 'maintenance' : 'available';
      
      const { error } = await supabase
        .from('bike_rentals')
        .update({ status: newStatus })
        .eq('id', id);
      
      if (error) throw error;
      
      setBikes(bikes.map(b => 
        b.id === id ? { ...b, status: newStatus as 'available' | 'booked' | 'maintenance' } : b
      ));
      
      toast({
        title: "Status updated",
        description: `Bike status has been updated to ${newStatus}.`,
      });
    } catch (error) {
      console.error("Error updating bike status:", error);
      toast({
        title: "Error updating status",
        description: "There was a problem updating the bike status. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleEditBike = (bike: BikeRental) => {
    setEditingBike(bike);
    setIsDialogOpen(true);
  };

  // Filter bikes based on search query
  const filteredBikes = bikes.filter(bike => 
    bike.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    bike.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bike.engine.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    setNewBike,
    handleAddBike,
    handleUpdateBike,
    handleDeleteBike,
    handleToggleStatus,
    handleEditBike
  };
};
