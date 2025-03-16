
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useBikeRentalManagement } from "@/hooks/useBikeRentalManagement";
import BikeRentalForm from "@/components/admin/bike-rentals/BikeRentalForm";
import BikeRentalTable from "@/components/admin/bike-rentals/BikeRentalTable";
import BikeRentalSearch from "@/components/admin/bike-rentals/BikeRentalSearch";

const AdminBikeRentals = () => {
  const {
    filteredBikes,
    searchQuery,
    setSearchQuery,
    isDialogOpen,
    setIsDialogOpen,
    isLoading,
    editingBike,
    setEditingBike,
    newBike,
    handleAddBike,
    handleUpdateBike,
    handleDeleteBike,
    handleToggleStatus,
    handleEditBike
  } = useBikeRentalManagement();

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
        
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setEditingBike(null);
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus size={16} />
              Add New Bike
            </Button>
          </DialogTrigger>
          <BikeRentalForm 
            initialData={editingBike || newBike} 
            onSubmit={editingBike ? handleUpdateBike : handleAddBike}
            onCancel={() => {
              setIsDialogOpen(false);
              setEditingBike(null);
            }}
            isEditing={!!editingBike}
          />
        </Dialog>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <BikeRentalSearch 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        
        <BikeRentalTable 
          bikes={filteredBikes}
          isLoading={isLoading}
          onDelete={handleDeleteBike}
          onToggleStatus={handleToggleStatus}
          onEdit={handleEditBike}
        />
      </div>
    </div>
  );
};

export default AdminBikeRentals;
