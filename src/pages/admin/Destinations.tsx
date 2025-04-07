
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useDestinationManagement } from "@/hooks/useDestinationManagement";
import DestinationForm from "@/components/admin/destinations/DestinationForm";

const AdminDestinations = () => {
  const {
    filteredDestinations,
    searchQuery,
    setSearchQuery,
    isDialogOpen,
    setIsDialogOpen,
    isLoading,
    editingDestination,
    setEditingDestination,
    newDestination,
    handleAddDestination,
    handleUpdateDestination,
    handleDeleteDestination,
    handleToggleStatus,
    handleEditDestination
  } = useDestinationManagement();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manage Destinations</h1>
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
        <h1 className="text-2xl font-bold">Manage Destinations</h1>
        
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setEditingDestination(null);
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus size={16} />
              Add New Destination
            </Button>
          </DialogTrigger>
          
          <DestinationForm
            destination={editingDestination || newDestination}
            onSubmit={editingDestination ? handleUpdateDestination : handleAddDestination}
            onCancel={() => {
              setIsDialogOpen(false);
              setEditingDestination(null);
            }}
            isEditing={!!editingDestination}
          />
        </Dialog>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <Input
            placeholder="Search destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-stone-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-stone-500">Destination</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-stone-500">Location</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-stone-500">Activities</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-stone-500">Highlights</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-stone-500">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-stone-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {filteredDestinations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-stone-500">
                    No destinations found. Create your first destination!
                  </td>
                </tr>
              ) : (
                filteredDestinations.map((destination) => (
                  <tr key={destination.id}>
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded object-cover"
                            src={destination.image}
                            alt={destination.name}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://via.placeholder.com/100?text=Destination";
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-stone-900">{destination.name}</div>
                          <div className="text-xs text-stone-500">/{destination.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-stone-500">{destination.location}</td>
                    <td className="px-4 py-4 text-sm text-stone-500">
                      {destination.activities?.length || 0} activities
                    </td>
                    <td className="px-4 py-4 text-sm text-stone-500">
                      {destination.highlights?.length || 0} highlights
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        destination.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {destination.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-stone-500">
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditDestination(destination)}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                          onClick={() => handleDeleteDestination(destination.id)}
                        >
                          Delete
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleToggleStatus(destination.id)}
                        >
                          {destination.status === 'active' ? 'Deactivate' : 'Activate'}
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

export default AdminDestinations;
