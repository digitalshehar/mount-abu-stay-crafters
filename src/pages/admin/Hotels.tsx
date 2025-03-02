
import React, { useState } from "react";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash, 
  Star, 
  Filter, 
  SlidersHorizontal, 
  Eye
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

const AdminHotels = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sample hotel data - would typically come from API
  const [hotels, setHotels] = useState([
    {
      id: 1,
      name: "Mount Abu Palace",
      location: "Near Nakki Lake",
      stars: 5,
      pricePerNight: 6500,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1640&ixlib=rb-4.0.3",
      status: "active"
    },
    {
      id: 2,
      name: "Sunset View Resort",
      location: "Sunset Point Road",
      stars: 4,
      pricePerNight: 4200,
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1740&ixlib=rb-4.0.3",
      status: "active"
    },
    {
      id: 3,
      name: "Hillview Hotel",
      location: "Guru Shikhar Road",
      stars: 3,
      pricePerNight: 2800,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1640&ixlib=rb-4.0.3",
      status: "inactive"
    },
  ]);

  // Form state for new hotel
  const [newHotel, setNewHotel] = useState({
    name: "",
    location: "",
    stars: 4,
    pricePerNight: 0,
    image: "",
    description: ""
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewHotel({
      ...newHotel,
      [name]: name === "stars" || name === "pricePerNight" ? Number(value) : value
    });
  };

  // Handle adding a new hotel
  const handleAddHotel = () => {
    // Validation would happen here in a real application
    const newId = hotels.length > 0 ? Math.max(...hotels.map(hotel => hotel.id)) + 1 : 1;
    
    const hotelToAdd = {
      ...newHotel,
      id: newId,
      status: "active"
    };
    
    setHotels([...hotels, hotelToAdd]);
    
    setNewHotel({
      name: "",
      location: "",
      stars: 4,
      pricePerNight: 0,
      image: "",
      description: ""
    });
    
    toast({
      title: "Hotel added",
      description: `${newHotel.name} has been added successfully.`,
    });
  };

  // Handle deleting a hotel
  const handleDeleteHotel = (id: number) => {
    setHotels(hotels.filter(hotel => hotel.id !== id));
    
    toast({
      title: "Hotel deleted",
      description: "The hotel has been deleted successfully.",
      variant: "destructive"
    });
  };

  // Filter hotels based on search query
  const filteredHotels = hotels.filter(hotel => 
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Hotels</h1>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus size={16} />
              Add New Hotel
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Hotel</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2 col-span-2">
                <Label htmlFor="name">Hotel Name*</Label>
                <Input 
                  id="name"
                  name="name"
                  value={newHotel.name}
                  onChange={handleInputChange}
                  placeholder="Enter hotel name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location*</Label>
                <Input 
                  id="location"
                  name="location"
                  value={newHotel.location}
                  onChange={handleInputChange}
                  placeholder="Enter location"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pricePerNight">Price Per Night (₹)*</Label>
                <Input 
                  id="pricePerNight"
                  name="pricePerNight"
                  type="number"
                  value={newHotel.pricePerNight}
                  onChange={handleInputChange}
                  placeholder="Enter price"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="stars">Star Rating*</Label>
                <select
                  id="stars"
                  name="stars"
                  value={newHotel.stars}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-stone-200 px-3 py-2"
                >
                  <option value={1}>1 Star</option>
                  <option value={2}>2 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={5}>5 Stars</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image">Image URL*</Label>
                <Input 
                  id="image"
                  name="image"
                  value={newHotel.image}
                  onChange={handleInputChange}
                  placeholder="Enter image URL"
                />
              </div>
              
              <div className="space-y-2 col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description"
                  name="description"
                  value={newHotel.description}
                  onChange={handleInputChange}
                  placeholder="Enter hotel description"
                  rows={4}
                />
              </div>
              
              <div className="col-span-2 flex justify-end gap-2 mt-4">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={handleAddHotel}>Add Hotel</Button>
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
              placeholder="Search hotels by name or location..."
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
                <th className="px-6 py-3 font-medium">Location</th>
                <th className="px-6 py-3 font-medium">Price</th>
                <th className="px-6 py-3 font-medium">Rating</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredHotels.map((hotel) => (
                <tr key={hotel.id} className="border-b border-stone-100 hover:bg-stone-50">
                  <td className="px-6 py-4">
                    <img 
                      src={hotel.image} 
                      alt={hotel.name} 
                      className="w-16 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium">{hotel.name}</td>
                  <td className="px-6 py-4 text-stone-600">{hotel.location}</td>
                  <td className="px-6 py-4">₹{hotel.pricePerNight.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Star size={16} className="text-yellow-500 fill-yellow-500" />
                      <span className="ml-1">{hotel.stars}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      hotel.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-stone-100 text-stone-800'
                    }`}>
                      {hotel.status === 'active' ? 'Active' : 'Inactive'}
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
                        onClick={() => handleDeleteHotel(hotel.id)}
                      >
                        <Trash size={16} className="text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredHotels.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-stone-500">
                    No hotels found. Try a different search or add a new hotel.
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

export default AdminHotels;
