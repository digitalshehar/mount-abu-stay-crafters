
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useAdventureManagement } from "@/hooks/useAdventureManagement";
import { Adventure } from "@/integrations/supabase/custom-types";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AdventureFormProps {
  adventure: Partial<Adventure>;
  onSubmit: (data: Partial<Adventure>) => Promise<void>;
  onCancel: () => void;
  isEditing: boolean;
}

const AdventureForm: React.FC<AdventureFormProps> = ({ adventure, onSubmit, onCancel, isEditing }) => {
  const [formData, setFormData] = useState<Partial<Adventure>>(adventure);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div className="grid grid-cols-2 gap-4 py-4">
      <div className="space-y-2 col-span-2">
        <Label htmlFor="name">Adventure Name*</Label>
        <Input 
          id="name"
          name="name"
          value={formData.name || ''}
          onChange={handleInputChange}
          placeholder="Enter adventure name"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="type">Type*</Label>
        <Input 
          id="type"
          name="type"
          value={formData.type || ''}
          onChange={handleInputChange}
          placeholder="e.g. Trekking, Wildlife"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="difficulty">Difficulty*</Label>
        <select
          id="difficulty"
          name="difficulty"
          value={formData.difficulty || 'Easy'}
          onChange={handleInputChange}
          className="w-full rounded-md border border-stone-200 px-3 py-2"
        >
          <option value="Easy">Easy</option>
          <option value="Moderate">Moderate</option>
          <option value="Difficult">Difficult</option>
        </select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="duration">Duration*</Label>
        <Input 
          id="duration"
          name="duration"
          value={formData.duration || ''}
          onChange={handleInputChange}
          placeholder="e.g. 3-4 hours"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="price">Price*</Label>
        <Input 
          id="price"
          name="price"
          type="number"
          value={formData.price || ''}
          onChange={handleInputChange}
          placeholder="Enter price"
        />
      </div>
      
      <div className="space-y-2 col-span-2">
        <Label htmlFor="location">Location*</Label>
        <Input 
          id="location"
          name="location"
          value={formData.location || ''}
          onChange={handleInputChange}
          placeholder="Enter location"
        />
      </div>
      
      <div className="space-y-2 col-span-2">
        <Label htmlFor="image">Image URL*</Label>
        <Input 
          id="image"
          name="image"
          value={formData.image || ''}
          onChange={handleInputChange}
          placeholder="Enter image URL"
        />
      </div>
      
      <div className="space-y-2 col-span-2">
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description"
          name="description"
          value={formData.description || ''}
          onChange={handleInputChange}
          placeholder="Enter adventure description"
          rows={4}
        />
      </div>
      
      <div className="col-span-2 flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSubmit}>{isEditing ? "Update Adventure" : "Add Adventure"}</Button>
      </div>
    </div>
  );
};

const AdminAdventures = () => {
  const {
    filteredAdventures,
    searchQuery,
    setSearchQuery,
    isDialogOpen,
    setIsDialogOpen,
    isLoading,
    editingAdventure,
    setEditingAdventure,
    newAdventure,
    handleAddAdventure,
    handleUpdateAdventure,
    handleDeleteAdventure,
    handleToggleStatus
  } = useAdventureManagement();

  const handleEditClick = (adventure: Adventure) => {
    setEditingAdventure(adventure);
    setIsDialogOpen(true);
  };

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
        
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setEditingAdventure(null);
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus size={16} />
              Add New Adventure
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingAdventure ? "Edit Adventure" : "Add New Adventure"}</DialogTitle>
            </DialogHeader>
            <AdventureForm
              adventure={editingAdventure || newAdventure}
              onSubmit={editingAdventure ? handleUpdateAdventure : handleAddAdventure}
              onCancel={() => {
                setIsDialogOpen(false);
                setEditingAdventure(null);
              }}
              isEditing={!!editingAdventure}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <Input
            placeholder="Search adventures..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
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
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://via.placeholder.com/100?text=Adventure";
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-stone-900">{adventure.name}</div>
                          <div className="text-sm text-stone-500">{adventure.type}</div>
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
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditClick(adventure)}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                          onClick={() => handleDeleteAdventure(adventure.id)}
                        >
                          Delete
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleToggleStatus(adventure.id)}
                        >
                          {adventure.status === 'active' ? 'Deactivate' : 'Activate'}
                        </Button>
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
