
import React, { useState } from "react";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash, 
  Car,
  Eye,
  Filter
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

const AdminCarRentals = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Sample car data - would typically come from API
  const [cars, setCars] = useState([
    {
      id: 1,
      name: "Toyota Innova",
      type: "SUV",
      capacity: 7,
      transmission: "Automatic",
      price: 2500,
      image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=1740&ixlib=rb-4.0.3",
      bookings: 24,
      status: "available"
    },
    {
      id: 2,
      name: "Honda City",
      type: "Sedan",
      capacity: 5,
      transmission: "Manual",
      price: 1800,
      image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=1664&ixlib=rb-4.0.3",
      bookings: 18,
      status: "available"
    },
    {
      id: 3,
      name: "Maruti Swift",
      type: "Hatchback",
      capacity: 5,
      transmission: "Manual",
      price: 1200,
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1742&ixlib=rb-4.0.3",
      bookings: 32,
      status: "maintenance"
    },
  ]);

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

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewCar({
      ...newCar,
      [name]: name === "capacity" || name === "price" ? Number(value) : value
    });
  };

  // Handle adding a new car
  const handleAddCar = () => {
    // Validation would happen here in a real application
    const newId = cars.length > 0 ? Math.max(...cars.map(car => car.id)) + 1 : 1;
    
    const carToAdd = {
      ...newCar,
      id: newId,
      bookings: 0,
      status: "available"
    };
    
    setCars([...cars, carToAdd]);
    
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
  };

  // Handle deleting a car
  const handleDeleteCar = (id: number) => {
    setCars(cars.filter(car => car.id !== id));
    
    toast({
      title: "Car deleted",
      description: "The car has been deleted successfully.",
      variant: "destructive"
    });
  };

  // Filter cars based on search query
  const filteredCars = cars.filter(car => 
    car.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    car.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              {filteredCars.length === 0 && (
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
