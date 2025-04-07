
import React from "react";
import { CarRental } from "@/integrations/supabase/custom-types";
import { Button } from "@/components/ui/button";
import { Edit, Trash, Eye, Check, X } from "lucide-react";

interface CarRentalTableProps {
  cars: CarRental[];
  onEdit: (car: CarRental) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number) => void;
  isLoading?: boolean;
}

const CarRentalTable: React.FC<CarRentalTableProps> = ({ 
  cars, 
  onEdit, 
  onDelete, 
  onToggleStatus,
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-pulse">
          <div className="h-4 bg-stone-200 rounded w-1/4 mx-auto mb-4"></div>
          <div className="h-4 bg-stone-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-xs text-stone-500 border-b">
            <th className="px-6 py-3 font-medium">Image</th>
            <th className="px-6 py-3 font-medium">Name</th>
            <th className="px-6 py-3 font-medium">Type</th>
            <th className="px-6 py-3 font-medium">Capacity</th>
            <th className="px-6 py-3 font-medium">Transmission</th>
            <th className="px-6 py-3 font-medium">Price</th>
            <th className="px-6 py-3 font-medium">Status</th>
            <th className="px-6 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id} className="border-b border-stone-100 hover:bg-stone-50">
              <td className="px-6 py-4">
                <img 
                  src={car.image} 
                  alt={car.name} 
                  className="w-16 h-12 object-cover rounded"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/100x80?text=Car";
                  }}
                />
              </td>
              <td className="px-6 py-4 font-medium">{car.name}</td>
              <td className="px-6 py-4 text-stone-600">{car.type}</td>
              <td className="px-6 py-4 text-stone-600">{car.capacity || car.seats} passengers</td>
              <td className="px-6 py-4 text-stone-600">{car.transmission}</td>
              <td className="px-6 py-4">₹{car.price?.toLocaleString() || car.price_per_day?.toLocaleString()}/day</td>
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
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    title={car.status === 'available' ? 'Mark as Maintenance' : 'Mark as Available'}
                    onClick={() => onToggleStatus(car.id)}
                  >
                    {car.status === 'available' ? 
                      <X size={16} className="text-amber-500" /> : 
                      <Check size={16} className="text-green-500" />
                    }
                  </Button>
                  <Button variant="ghost" size="icon" title="View">
                    <Eye size={16} className="text-blue-500" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    title="Edit"
                    onClick={() => onEdit(car)}
                  >
                    <Edit size={16} className="text-amber-500" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    title="Delete"
                    onClick={() => onDelete(car.id)}
                  >
                    <Trash size={16} className="text-red-500" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
          {cars.length === 0 && (
            <tr>
              <td colSpan={8} className="px-6 py-8 text-center text-stone-500">
                No cars found. Try a different search or add a new car.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CarRentalTable;
