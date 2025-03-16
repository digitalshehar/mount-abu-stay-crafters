
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useCarRentalManagement } from "@/hooks/useCarRentalManagement";
import CarRentalTable from "@/components/admin/car-rentals/CarRentalTable";
import CarRentalSearch from "@/components/admin/car-rentals/CarRentalSearch";
import CarRentalDialog from "@/components/admin/car-rentals/CarRentalDialog";

const AdminCarRentals = () => {
  const {
    filteredCars,
    isLoading,
    searchQuery,
    setSearchQuery,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    editingCar,
    newCar,
    handleInputChange,
    handleEditInputChange,
    handleAddCar,
    handleUpdateCar,
    handleEditClick,
    handleDeleteCar,
    handleToggleStatus
  } = useCarRentalManagement();

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
        
        {/* Add new car dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus size={16} />
              Add New Car
            </Button>
          </DialogTrigger>
          <CarRentalDialog
            carData={newCar}
            onInputChange={handleInputChange}
            onSubmit={handleAddCar}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </Dialog>

        {/* Edit car dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <CarRentalDialog
            isEdit
            carData={editingCar}
            onInputChange={handleEditInputChange}
            onSubmit={handleUpdateCar}
            onCancel={() => setIsEditDialogOpen(false)}
          />
        </Dialog>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <CarRentalSearch 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />
        
        <CarRentalTable 
          cars={filteredCars} 
          onEdit={handleEditClick} 
          onDelete={handleDeleteCar} 
          onToggleStatus={handleToggleStatus} 
        />
      </div>
    </div>
  );
};

export default AdminCarRentals;
