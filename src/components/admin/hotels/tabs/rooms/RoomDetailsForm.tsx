
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Room } from "@/components/admin/hotels/types";

interface RoomDetailsFormProps {
  room: Room;
  index: number;
  handleRoomChange: (index: number, field: keyof Room, value: any) => void;
}

const RoomDetailsForm: React.FC<RoomDetailsFormProps> = ({
  room,
  index,
  handleRoomChange
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <Label htmlFor={`room-type-${index}`}>Room Type</Label>
        <Input
          id={`room-type-${index}`}
          placeholder="Deluxe Room"
          value={room.type}
          onChange={(e) => handleRoomChange(index, 'type', e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor={`room-capacity-${index}`}>Capacity</Label>
        <Input
          id={`room-capacity-${index}`}
          type="number"
          placeholder="2"
          value={room.capacity.toString()}
          onChange={(e) => handleRoomChange(index, 'capacity', parseInt(e.target.value))}
        />
      </div>
      <div>
        <Label htmlFor={`room-price-${index}`}>Price (per night in ₹)</Label>
        <Input
          id={`room-price-${index}`}
          type="number"
          placeholder="100"
          value={room.price.toString()}
          onChange={(e) => handleRoomChange(index, 'price', parseFloat(e.target.value))}
        />
      </div>
      <div>
        <Label htmlFor={`room-count-${index}`}>Number of Rooms</Label>
        <Input
          id={`room-count-${index}`}
          type="number"
          placeholder="5"
          value={room.count.toString()}
          onChange={(e) => handleRoomChange(index, 'count', parseInt(e.target.value))}
        />
      </div>
    </div>
  );
};

export default RoomDetailsForm;
