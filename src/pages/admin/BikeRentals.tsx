
import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash, 
  Bike,
  Eye,
  Filter,
  Check,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

interface Bike {
  id: number;
  name: string;
  type: string;
  engine: string;
  price: number;
  image: string;
  bookings: number;
  status: 'available' | 'booked' | 'maintenance';
  description?: string;
}

const AdminBikeRentals = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [bikes, setBikes] = useState<Bike[]>([]);

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
        const formattedBikes = data.map(bike => ({
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

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewBike({
      ...newBike,
      [name]: name === "price" ? Number(value) : value
    });
  };

  // Handle adding a new bike
  const handleAddBike = async () => {
    // Validation
    if (!newBike.name || !newBike.type || !newBike.engine || newBike.price <= 0 || !newBike.image) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields marked with *",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('bike_rentals')
        .insert({
          name: newBike.name,
          type: newBike.type,
          engine: newBike.engine,
          price: newBike.price,
          image: newBike.image,
          description: newBike.description,
          status: 'available'
        })
        .select()
        .single();
      
      if (error) throw error;
      
      if (data) {
        const newBikeData: Bike = {
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
          description: `${newBike.name} has been added successfully.`,
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

  // Filter bikes based on search query
  const filteredBikes = bikes.filter(bike => 
    bike.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    bike.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bike.engine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manage Bike Rentals</h1>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-6 bg-stone-200 rounded w-48 mb-4"></div>
            <div className="h-4 bg-stone-200 rounded w-64"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Bike Rentals</h1>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus size={16} />
              Add New Bike
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Bike</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2 col-span-2">
                <Label htmlFor="name">Bike Name*</Label>
                <Input 
                  id="name"
                  name="name"
                  value={newBike.name}
                  onChange={handleInputChange}
                  placeholder="Enter bike name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Bike Type*</Label>
                <select
                  id="type"
                  name="type"
                  value={newBike.type}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-stone-200 px-3 py-2"
                >
                  <option value="Scooter">Scooter</option>
                  <option value="Sports">Sports</option>
                  <option value="Cruiser">Cruiser</option>
                  <option value="Standard">Standard</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="engine">Engine Capacity*</Label>
                <Input 
                  id="engine"
                  name="engine"
                  value={newBike.engine}
                  onChange={handleInputChange}
                  placeholder="e.g. 125cc"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">Price Per Day (₹)*</Label>
                <Input 
                  id="price"
                  name="price"
                  type="number"
                  value={newBike.price}
                  onChange={handleInputChange}
                  placeholder="Enter price"
                />
              </div>
              
              <div className="space-y-2 col-span-1">
                <Label htmlFor="image">Image URL*</Label>
                <Input 
                  id="image"
                  name="image"
                  value={newBike.image}
                  onChange={handleInputChange}
                  placeholder="Enter image URL"
                />
              </div>
              
              <div className="space-y-2 col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description"
                  name="description"
                  value={newBike.description}
                  onChange={handleInputChange}
                  placeholder="Enter bike description"
                  rows={4}
                />
              </div>
              
              <div className="col-span-2 flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddBike}>Add Bike</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" size={18} />
            <Input
              placeholder="Search bikes by name, type, or engine capacity..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter size={16} />
            Filters
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-stone-500 border-b">
                <th className="px-6 py-3 font-medium">Image</th>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium">Engine</th>
                <th className="px-6 py-3 font-medium">Price</th>
                <th className="px-6 py-3 font-medium">Bookings</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBikes.map((bike) => (
                <tr key={bike.id} className="border-b border-stone-100 hover:bg-stone-50">
                  <td className="px-6 py-4">
                    <img 
                      src={bike.image} 
                      alt={bike.name} 
                      className="w-16 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium">{bike.name}</td>
                  <td className="px-6 py-4 text-stone-600">{bike.type}</td>
                  <td className="px-6 py-4 text-stone-600">{bike.engine}</td>
                  <td className="px-6 py-4">₹{bike.price.toLocaleString()}/day</td>
                  <td className="px-6 py-4">{bike.bookings}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      bike.status === 'available' ? 'bg-green-100 text-green-800' : 
                      bike.status === 'booked' ? 'bg-blue-100 text-blue-800' : 
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {bike.status === 'available' ? 'Available' : 
                       bike.status === 'booked' ? 'Booked' : 'Maintenance'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title={bike.status === 'available' ? 'Mark as Maintenance' : 'Mark as Available'}
                        onClick={() => handleToggleStatus(bike.id)}
                      >
                        {bike.status === 'available' ? 
                          <X size={16} className="text-amber-500" /> : 
                          <Check size={16} className="text-green-500" />
                        }
                      </Button>
                      <Button variant="ghost" size="icon" title="View">
                        <Eye size={16} className="text-blue-500" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Edit">
                        <Edit size={16} className="text-amber-500" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title="Delete"
                        onClick={() => handleDeleteBike(bike.id)}
                      >
                        <Trash size={16} className="text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredBikes.length === 0 && !isLoading && (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-stone-500">
                    No bikes found. Try a different search or add a new bike.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminBikeRentals;
