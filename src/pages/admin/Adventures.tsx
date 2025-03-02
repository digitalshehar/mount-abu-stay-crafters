
import React, { useState } from "react";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash, 
  Calendar, 
  Map,
  Eye,
  Filter,
  Star
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

const AdminAdventures = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sample adventure data - would typically come from API
  const [adventures, setAdventures] = useState([
    {
      id: 1,
      name: "Sunset Point Trekking",
      type: "Trekking",
      duration: "3 hours",
      difficulty: "Easy",
      price: 800,
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=1574&ixlib=rb-4.0.3",
      bookings: 24,
      rating: 4.8,
      status: "active"
    },
    {
      id: 2,
      name: "Wildlife Safari",
      type: "Sightseeing",
      duration: "5 hours",
      difficulty: "Easy",
      price: 1200,
      image: "https://images.unsplash.com/photo-1561040594-a1b8785b8d1e?auto=format&fit=crop&q=80&w=1548&ixlib=rb-4.0.3",
      bookings: 18,
      rating: 4.5,
      status: "active"
    },
    {
      id: 3,
      name: "Overnight Camping Experience",
      type: "Camping",
      duration: "24 hours",
      difficulty: "Moderate",
      price: 2500,
      image: "https://images.unsplash.com/photo-1517823382935-51bfcb0ec6bc?auto=format&fit=crop&q=80&w=1740&ixlib=rb-4.0.3",
      bookings: 12,
      rating: 4.9,
      status: "inactive"
    },
  ]);

  // Form state for new adventure
  const [newAdventure, setNewAdventure] = useState({
    name: "",
    type: "Trekking",
    duration: "",
    difficulty: "Easy",
    price: 0,
    image: "",
    description: ""
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewAdventure({
      ...newAdventure,
      [name]: name === "price" ? Number(value) : value
    });
  };

  // Handle adding a new adventure
  const handleAddAdventure = () => {
    // Validation would happen here in a real application
    const newId = adventures.length > 0 ? Math.max(...adventures.map(adv => adv.id)) + 1 : 1;
    
    const adventureToAdd = {
      ...newAdventure,
      id: newId,
      bookings: 0,
      rating: 0,
      status: "active"
    };
    
    setAdventures([...adventures, adventureToAdd]);
    
    setNewAdventure({
      name: "",
      type: "Trekking",
      duration: "",
      difficulty: "Easy",
      price: 0,
      image: "",
      description: ""
    });
    
    toast({
      title: "Adventure added",
      description: `${newAdventure.name} has been added successfully.`,
    });
  };

  // Handle deleting an adventure
  const handleDeleteAdventure = (id: number) => {
    setAdventures(adventures.filter(adv => adv.id !== id));
    
    toast({
      title: "Adventure deleted",
      description: "The adventure has been deleted successfully.",
      variant: "destructive"
    });
  };

  // Filter adventures based on search query
  const filteredAdventures = adventures.filter(adv => 
    adv.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    adv.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    adv.difficulty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Adventures</h1>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus size={16} />
              Add New Adventure
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Adventure</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2 col-span-2">
                <Label htmlFor="name">Adventure Name*</Label>
                <Input 
                  id="name"
                  name="name"
                  value={newAdventure.name}
                  onChange={handleInputChange}
                  placeholder="Enter adventure name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Activity Type*</Label>
                <select
                  id="type"
                  name="type"
                  value={newAdventure.type}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-stone-200 px-3 py-2"
                >
                  <option value="Trekking">Trekking</option>
                  <option value="Sightseeing">Sightseeing</option>
                  <option value="Camping">Camping</option>
                  <option value="Water Activity">Water Activity</option>
                  <option value="Yoga">Yoga</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty Level*</Label>
                <select
                  id="difficulty"
                  name="difficulty"
                  value={newAdventure.difficulty}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-stone-200 px-3 py-2"
                >
                  <option value="Easy">Easy</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Challenging">Challenging</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration">Duration*</Label>
                <Input 
                  id="duration"
                  name="duration"
                  value={newAdventure.duration}
                  onChange={handleInputChange}
                  placeholder="e.g. 3 hours"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">Price Per Person (₹)*</Label>
                <Input 
                  id="price"
                  name="price"
                  type="number"
                  value={newAdventure.price}
                  onChange={handleInputChange}
                  placeholder="Enter price"
                />
              </div>
              
              <div className="space-y-2 col-span-2">
                <Label htmlFor="image">Image URL*</Label>
                <Input 
                  id="image"
                  name="image"
                  value={newAdventure.image}
                  onChange={handleInputChange}
                  placeholder="Enter image URL"
                />
              </div>
              
              <div className="space-y-2 col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description"
                  name="description"
                  value={newAdventure.description}
                  onChange={handleInputChange}
                  placeholder="Enter adventure description"
                  rows={4}
                />
              </div>
              
              <div className="col-span-2 flex justify-end gap-2 mt-4">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={handleAddAdventure}>Add Adventure</Button>
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
              placeholder="Search adventures by name, type, or difficulty..."
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
                <th className="px-6 py-3 font-medium">Duration</th>
                <th className="px-6 py-3 font-medium">Price</th>
                <th className="px-6 py-3 font-medium">Difficulty</th>
                <th className="px-6 py-3 font-medium">Rating</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdventures.map((adventure) => (
                <tr key={adventure.id} className="border-b border-stone-100 hover:bg-stone-50">
                  <td className="px-6 py-4">
                    <img 
                      src={adventure.image} 
                      alt={adventure.name} 
                      className="w-16 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium">{adventure.name}</td>
                  <td className="px-6 py-4 text-stone-600">{adventure.type}</td>
                  <td className="px-6 py-4 text-stone-600">{adventure.duration}</td>
                  <td className="px-6 py-4">₹{adventure.price.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      adventure.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : 
                      adventure.difficulty === 'Moderate' ? 'bg-amber-100 text-amber-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {adventure.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Star size={14} className="text-yellow-500 fill-yellow-500 mr-1" />
                      <span>{adventure.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      adventure.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-stone-100 text-stone-800'
                    }`}>
                      {adventure.status === 'active' ? 'Active' : 'Inactive'}
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
                        onClick={() => handleDeleteAdventure(adventure.id)}
                      >
                        <Trash size={16} className="text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredAdventures.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-6 py-8 text-center text-stone-500">
                    No adventures found. Try a different search or add a new adventure.
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

export default AdminAdventures;
