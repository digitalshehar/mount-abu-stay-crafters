import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Adventure {
  id: number;
  name: string;
  location: string;
  description?: string;
  price: number;
  image: string;
  difficulty: string;
  duration: string;
  status: string;
  bookings?: number;
}

const AdminAdventures = () => {
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchAdventures();
  }, []);

  const fetchAdventures = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('adventures')
        .select('*');

      if (error) throw error;

      setAdventures(data || []);
    } catch (error) {
      console.error('Error fetching adventures:', error);
      toast({
        title: "Error",
        description: "Failed to load adventures",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Filter adventures based on search query
  const filteredAdventures = adventures.filter(adventure => 
    adventure.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    adventure.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    adventure.difficulty.toLowerCase().includes(searchQuery.toLowerCase())
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
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus size={16} />
              Add New Adventure
            </Button>
          </DialogTrigger>
          {/* We'll implement the adventure form dialog in a future update */}
        </Dialog>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <input
            type="text"
            placeholder="Search adventures..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:max-w-sm px-4 py-2 border rounded-md"
          />
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-stone-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-stone-500">Adventure</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-stone-500">Location</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-stone-500">Difficulty</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-stone-500">Duration</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-stone-500">Price</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-stone-500">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-stone-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {filteredAdventures.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-stone-500">
                    No adventures found. Create your first adventure!
                  </td>
                </tr>
              ) : (
                filteredAdventures.map((adventure) => (
                  <tr key={adventure.id}>
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded object-cover"
                            src={adventure.image}
                            alt={adventure.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-stone-900">{adventure.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-stone-500">{adventure.location}</td>
                    <td className="px-4 py-4 text-sm text-stone-500">{adventure.difficulty}</td>
                    <td className="px-4 py-4 text-sm text-stone-500">{adventure.duration}</td>
                    <td className="px-4 py-4 text-sm text-stone-500">₹{adventure.price}</td>
                    <td className="px-4 py-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        adventure.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {adventure.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-stone-500">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">Delete</Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAdventures;
