
import React, { useState } from "react";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash, 
  Calendar, 
  Bike,
  Eye,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const AdminBikeRentals = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sample bike data - would typically come from API
  const [bikes, setBikes] = useState([
    {
      id: 1,
      name: "Royal Enfield Classic 350",
      type: "Cruiser",
      engine: "350cc",
      price: 1200,
      image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1740&ixlib=rb-4.0.3",
      bookings: 18,
      status: "available"
    },
    {
      id: 2,
      name: "Honda Activa",
      type: "Scooter",
      engine: "110cc",
      price: 500,
      image: "https://images.unsplash.com/photo-1625897428517-7e2062829ec9?auto=format&fit=crop&q=80&w=1587&ixlib=rb-4.0.3",
      bookings: 25,
      status: "available"
    },
    {
      id: 3,
      name: "TVS Apache RTR 160",
      type: "Sports",
      engine: "160cc",
      price: 800,
      image: "https://images.unsplash.com/photo-1614551139870-4f35052aadf5?auto=format&fit=crop&q=80&w=1528&ixlib=rb-4.0.3",
      bookings: 14,
      status: "maintenance"
    },
  ]);

  // Form state for new bike
  const [newBike, setNewBike] = useState({
    name: "",
    type: "Scooter",
    engine: "",
    price: 0,
    image: "",
    description: ""
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewBike({
      ...newBike,
      [name]: name === "price" ? Number(value) : value
    });
  };

  // Handle adding a new bike
  const handleAddBike = () => {
    // Validation would happen here in a real application
    const newId = bikes.length > 0 ? Math.max(...bikes.map(bike => bike.id)) + 1 : 1;
    
    const bikeToAdd = {
      ...newBike,
      id: newId,
      bookings: 0,
      status: "available"
    };
    
    setBikes([...bikes, bikeToAdd]);
    
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
  };

  // Handle deleting a bike
  const handleDeleteBike = (id: number) => {
    setBikes(bikes.filter(bike => bike.id !== id));
    
    toast({
      title: "Bike deleted",
      description: "The bike has been deleted successfully.",
      variant: "destructive"
    });
  };

  // Filter bikes based on search query
  const filteredBikes = bikes.filter(bike => 
    bike.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    bike.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bike.engine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Bike Rentals</h1>
        
        <Dialog>
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
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={handleAddBike}>Add Bike</Button>
                </DialogClose>
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
              {filteredBikes.length === 0 && (
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
