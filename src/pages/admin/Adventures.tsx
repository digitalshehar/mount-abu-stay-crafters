
import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash, 
  Map,
  Eye,
  Filter,
  Star,
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

interface Adventure {
  id: number;
  name: string;
  type: string;
  duration: string;
  difficulty: string;
  price: number;
  image: string;
  bookings: number;
  rating: number;
  status: 'active' | 'inactive';
  description?: string;
}

const AdminAdventures = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [adventures, setAdventures] = useState<Adventure[]>([]);

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

  useEffect(() => {
    fetchAdventures();
  }, []);

  const fetchAdventures = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('adventures')
        .select('*');
      
      if (error) throw error;
      
      if (data) {
        const formattedAdventures = data.map(adv => ({
          id: adv.id,
          name: adv.name,
          type: adv.type,
          duration: adv.duration,
          difficulty: adv.difficulty,
          price: parseFloat(adv.price.toString()),
          image: adv.image,
          bookings: adv.bookings || 0,
          rating: parseFloat(adv.rating?.toString() || "0"),
          status: adv.status as 'active' | 'inactive',
          description: adv.description
        }));
        setAdventures(formattedAdventures);
      }
    } catch (error) {
      console.error("Error fetching adventures:", error);
      toast({
        title: "Error fetching adventures",
        description: "There was a problem loading the adventure data.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewAdventure({
      ...newAdventure,
      [name]: name === "price" ? Number(value) : value
    });
  };

  // Handle adding a new adventure
  const handleAddAdventure = async () => {
    // Validation
    if (!newAdventure.name || !newAdventure.type || !newAdventure.duration || !newAdventure.difficulty || newAdventure.price <= 0 || !newAdventure.image) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields marked with *",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('adventures')
        .insert({
          name: newAdventure.name,
          type: newAdventure.type,
          duration: newAdventure.duration,
          difficulty: newAdventure.difficulty,
          price: newAdventure.price,
          image: newAdventure.image,
          description: newAdventure.description,
          status: 'active'
        })
        .select()
        .single();
      
      if (error) throw error;
      
      if (data) {
        const newAdventureData: Adventure = {
          id: data.id,
          name: data.name,
          type: data.type,
          duration: data.duration,
          difficulty: data.difficulty,
          price: parseFloat(data.price.toString()),
          image: data.image,
          bookings: 0,
          rating: 0,
          status: 'active',
          description: data.description
        };
        
        setAdventures([...adventures, newAdventureData]);
        
        // Reset form
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
        
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error("Error adding adventure:", error);
      toast({
        title: "Error adding adventure",
        description: "There was a problem adding the adventure. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Handle deleting an adventure
  const handleDeleteAdventure = async (id: number) => {
    try {
      const { error } = await supabase
        .from('adventures')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setAdventures(adventures.filter(adv => adv.id !== id));
      
      toast({
        title: "Adventure deleted",
        description: "The adventure has been deleted successfully.",
        variant: "destructive"
      });
    } catch (error) {
      console.error("Error deleting adventure:", error);
      toast({
        title: "Error deleting adventure",
        description: "There was a problem deleting the adventure. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Handle toggling adventure status
  const handleToggleStatus = async (id: number) => {
    try {
      const adventure = adventures.find(adv => adv.id === id);
      if (!adventure) return;
      
      const newStatus = adventure.status === 'active' ? 'inactive' : 'active';
      
      const { error } = await supabase
        .from('adventures')
        .update({ status: newStatus })
        .eq('id', id);
      
      if (error) throw error;
      
      setAdventures(adventures.map(adv => 
        adv.id === id ? { ...adv, status: newStatus as 'active' | 'inactive' } : adv
      ));
      
      toast({
        title: "Status updated",
        description: `Adventure status has been updated to ${newStatus}.`,
      });
    } catch (error) {
      console.error("Error updating adventure status:", error);
      toast({
        title: "Error updating status",
        description: "There was a problem updating the adventure status. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Filter adventures based on search query
  const filteredAdventures = adventures.filter(adv => 
    adv.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    adv.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    adv.difficulty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manage Adventures</h1>
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
        <h1 className="text-2xl font-bold">Manage Adventures</h1>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddAdventure}>Add Adventure</Button>
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
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title={adventure.status === 'active' ? 'Deactivate' : 'Activate'}
                        onClick={() => handleToggleStatus(adventure.id)}
                      >
                        {adventure.status === 'active' ? 
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
                        onClick={() => handleDeleteAdventure(adventure.id)}
                      >
                        <Trash size={16} className="text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredAdventures.length === 0 && !isLoading && (
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
