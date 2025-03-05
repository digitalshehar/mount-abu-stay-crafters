import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash, 
  Car,
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
import { CarRental } from "@/integrations/supabase/custom-types";

const AdminCarRentals = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [cars, setCars] = useState<CarRental[]>([]);

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

  useEffect(() => {
    fetchCars();
  }, []);

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

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewCar({
      ...newCar,
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
        
        setIsDialogOpen(false);
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

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manage Car Rentals</h1>
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
        <h1 className="text-2xl font-bold">Manage Car Rentals</h1>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus size={16} />
              Add New Car
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Car</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2 col-span-2">
                <Label htmlFor="name">Car Name*</Label>
                <Input 
                  id="name"
                  name="name"
                  value={newCar.name}
                  onChange={handleInputChange}
                  placeholder="Enter car name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Car Type*</Label>
                <select
                  id="type"
                  name="type"
                  value={newCar.type}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-stone-200 px-3 py-2"
                >
                  <option value="SUV">SUV</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Luxury">Luxury</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="transmission">Transmission*</Label>
                <select
                  id="transmission"
                  name="transmission"
                  value={newCar.transmission}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-stone-200 px-3 py-2"
                >
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="capacity">Seating Capacity*</Label>
                <Input 
                  id="capacity"
                  name="capacity"
                  type="number"
                  value={newCar.capacity}
                  onChange={handleInputChange}
                  placeholder="Enter capacity"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">Price Per Day (₹)*</Label>
                <Input 
                  id="price"
                  name="price"
                  type="number"
                  value={newCar.price}
                  onChange={handleInputChange}
                  placeholder="Enter price"
                />
              </div>
              
              <div className="space-y-2 col-span-2">
                <Label htmlFor="image">Image URL*</Label>
                <Input 
                  id="image"
                  name="image"
                  value={newCar.image}
                  onChange={handleInputChange}
                  placeholder="Enter image URL"
                />
              </div>
              
              <div className="space-y-2 col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description"
                  name="description"
                  value={newCar.description}
                  onChange={handleInputChange}
                  placeholder="Enter car description"
                  rows={4}
                />
              </div>
              
              <div className="col-span-2 flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddCar}>Add Car</Button>
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
              placeholder="Search cars by name or type..."
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
                <th className="px-6 py-3 font-medium">Capacity</th>
                <th className="px-6 py-3 font-medium">Price</th>
                <th className="px-6 py-3 font-medium">Bookings</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCars.map((car) => (
                <tr key={car.id} className="border-b border-stone-100 hover:bg-stone-50">
                  <td className="px-6 py-4">
                    <img 
                      src={car.image} 
                      alt={car.name} 
                      className="w-16 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium">{car.name}</td>
                  <td className="px-6 py-4 text-stone-600">{car.type}</td>
                  <td className="px-6 py-4 text-stone-600">{car.capacity} seats</td>
                  <td className="px-6 py-4">₹{car.price.toLocaleString()}/day</td>
                  <td className="px-6 py-4">{car.bookings}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      car.status === 'available' ? 'bg-green-100 text-green-800' : 
                      car.status === 'booked' ? 'bg-blue-100 text-blue-800' : 
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {car.status === 'available' ? 'Available' : 
                       car.status === 'booked' ? 'Booked' : 'Maintenance'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title={car.status === 'available' ? 'Mark as Maintenance' : 'Mark as Available'}
                        onClick={() => handleToggleStatus(car.id)}
                      >
                        {car.status === 'available' ? 
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
                        onClick={() => handleDeleteCar(car.id)}
                      >
                        <Trash size={16} className="text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCars.length === 0 && !isLoading && (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-stone-500">
                    No cars found. Try a different search or add a new car.
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

export default AdminCarRentals;
