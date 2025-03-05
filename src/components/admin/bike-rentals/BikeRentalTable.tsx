
import React from "react";
import { BikeRental } from "@/integrations/supabase/custom-types";
import { Button } from "@/components/ui/button";
import { Edit, Trash, Eye, Check, X } from "lucide-react";

interface BikeRentalTableProps {
  bikes: BikeRental[];
  isLoading: boolean;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number) => void;
  onEdit: (bike: BikeRental) => void;
}

const BikeRentalTable = ({ bikes, isLoading, onDelete, onToggleStatus, onEdit }: BikeRentalTableProps) => {
  return (
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
          {bikes.map((bike) => (
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
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    title={bike.status === 'available' ? 'Mark as Maintenance' : 'Mark as Available'}
                    onClick={() => onToggleStatus(bike.id)}
                  >
                    {bike.status === 'available' ? 
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
                    onClick={() => onEdit(bike)}
                  >
                    <Edit size={16} className="text-amber-500" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    title="Delete"
                    onClick={() => onDelete(bike.id)}
                  >
                    <Trash size={16} className="text-red-500" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
          {bikes.length === 0 && !isLoading && (
            <tr>
              <td colSpan={8} className="px-6 py-8 text-center text-stone-500">
                No bikes found. Try a different search or add a new bike.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BikeRentalTable;
