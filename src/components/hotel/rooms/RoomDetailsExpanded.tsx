
import React from "react";
import { Check } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { getRoomAmenities } from "./RoomAmenities";

interface RoomDetailsExpandedProps {
  roomType: string;
  capacity: number;
}

const RoomDetailsExpanded = ({ roomType, capacity }: RoomDetailsExpandedProps) => {
  return (
    <div className="bg-stone-50 border-t border-stone-200 p-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h4 className="font-medium mb-3">Room Details</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8">
            <div className="space-y-2">
              <p className="text-sm font-medium">Room Size</p>
              <p className="text-sm text-stone-600">{roomType.includes('Suite') ? '48' : roomType.includes('Deluxe') ? '32' : '24'} square meters</p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Bed Type</p>
              <p className="text-sm text-stone-600">
                {roomType.includes('Suite') || roomType.includes('Deluxe') 
                  ? 'King-size bed' 
                  : 'Queen-size bed'}
              </p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">View</p>
              <p className="text-sm text-stone-600">
                {roomType.includes('Suite') 
                  ? 'Lake view' 
                  : roomType.includes('Deluxe') 
                    ? 'Mountain view' 
                    : 'Garden view'}
              </p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Occupancy</p>
              <p className="text-sm text-stone-600">Maximum {capacity} guests</p>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div>
            <h4 className="font-medium mb-3">Room Amenities</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4">
              {getRoomAmenities(roomType).concat([
                { icon: <Check className="h-3 w-3 mr-1" />, text: 'Air conditioning' },
                { icon: <Check className="h-3 w-3 mr-1" />, text: 'Private bathroom' },
                { icon: <Check className="h-3 w-3 mr-1" />, text: 'Safe deposit box' },
                { icon: <Check className="h-3 w-3 mr-1" />, text: 'Mini fridge' },
                { icon: <Check className="h-3 w-3 mr-1" />, text: 'Room service' },
                { icon: <Check className="h-3 w-3 mr-1" />, text: 'Daily housekeeping' },
              ]).map((amenity, i) => (
                <div key={i} className="flex items-center text-sm text-stone-600">
                  {amenity.icon} {amenity.text}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-3">Room Policies</h4>
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-medium">Cancellation Policy</p>
              <p className="text-stone-600">Free cancellation before 48 hours of check-in. One night charge after that.</p>
            </div>
            
            <div>
              <p className="font-medium">Payment</p>
              <p className="text-stone-600">No prepayment needed – pay at the property</p>
            </div>
            
            <div>
              <p className="font-medium">Meals</p>
              <p className="text-green-600">Breakfast included in the price</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsExpanded;
