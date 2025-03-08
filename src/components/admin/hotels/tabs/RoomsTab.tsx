
import React from "react";
import { Plus, X, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NewHotel, Room } from "@/components/admin/hotels/types";

interface RoomsTabProps {
  newHotel: NewHotel;
  handleRoomChange: (index: number, field: string, value: any) => void;
  handleAddRoom: () => void;
  handleRemoveRoom: (index: number) => void;
  onBack: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const RoomsTab = ({
  newHotel,
  handleRoomChange,
  handleAddRoom,
  handleRemoveRoom,
  onBack,
  onSubmit,
  isLoading
}: RoomsTabProps) => {
  const roomPriceAnalysis = (roomType: string, price: number) => {
    const basePrice = newHotel.pricePerNight;
    if (price < basePrice * 0.7) {
      return "Low price compared to base rate";
    } else if (price > basePrice * 1.5) {
      return "High price compared to base rate";
    }
    return "Price is within normal range";
  };

  const handleAddRoomImage = (roomIndex: number, imageUrl: string) => {
    const currentRoom = newHotel.rooms[roomIndex];
    const currentImages = currentRoom.images || [];
    
    if (imageUrl && !currentImages.includes(imageUrl)) {
      handleRoomChange(roomIndex, 'images', [...currentImages, imageUrl]);
    }
  };

  const handleRemoveRoomImage = (roomIndex: number, imageIndex: number) => {
    const currentRoom = newHotel.rooms[roomIndex];
    const currentImages = [...(currentRoom.images || [])];
    currentImages.splice(imageIndex, 1);
    handleRoomChange(roomIndex, 'images', currentImages);
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between items-center mb-4">
          <Label>Room Types</Label>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleAddRoom}
            type="button"
          >
            <Plus size={16} className="mr-1" /> Add Room Type
          </Button>
        </div>
        
        <div className="flex justify-end mb-4">
          <Button 
            onClick={onSubmit}
            disabled={isLoading || !newHotel.name || !newHotel.location || newHotel.pricePerNight <= 0 || !newHotel.image}
            type="button"
          >
            {isLoading ? "Adding..." : "Add Hotel"}
          </Button>
        </div>
        
        <div className="max-h-[400px] overflow-y-auto">
          {newHotel.rooms.map((room, index) => (
            <div key={index} className="p-4 border rounded-lg mb-4">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium">Room Type {index + 1}</h4>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleRemoveRoom(index)}
                  type="button"
                  disabled={newHotel.rooms.length === 1}
                >
                  <X size={18} className="text-red-500" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`roomType-${index}`}>Room Type*</Label>
                  <select
                    id={`roomType-${index}`}
                    value={room.type}
                    onChange={(e) => handleRoomChange(index, 'type', e.target.value)}
                    className="w-full rounded-md border border-stone-200 px-3 py-2"
                  >
                    <option value="Standard">Standard</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Suite">Suite</option>
                    <option value="Family">Family</option>
                    <option value="Executive">Executive</option>
                    <option value="Presidential">Presidential</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`capacity-${index}`}>Capacity (Guests)*</Label>
                  <Input 
                    id={`capacity-${index}`}
                    type="number"
                    min="1"
                    value={room.capacity}
                    onChange={(e) => handleRoomChange(index, 'capacity', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`price-${index}`}>Price Per Night (₹)*</Label>
                  <Input 
                    id={`price-${index}`}
                    type="number"
                    min="1"
                    value={room.price}
                    onChange={(e) => handleRoomChange(index, 'price', e.target.value)}
                    required
                  />
                  {room.price > 0 && (
                    <p className="text-xs text-stone-500">
                      {roomPriceAnalysis(room.type, room.price)}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`count-${index}`}>Number of Rooms*</Label>
                  <Input 
                    id={`count-${index}`}
                    type="number"
                    min="1"
                    value={room.count}
                    onChange={(e) => handleRoomChange(index, 'count', e.target.value)}
                    required
                  />
                </div>

                <div className="col-span-2 mt-4">
                  <Label>Room Images</Label>
                  <div className="flex flex-wrap mt-2 gap-2">
                    {(room.images || []).map((image, imgIndex) => (
                      <div key={imgIndex} className="relative group">
                        <img 
                          src={image} 
                          alt={`Room ${index + 1} image ${imgIndex + 1}`} 
                          className="w-20 h-20 object-cover rounded"
                        />
                        <button
                          onClick={() => handleRemoveRoomImage(index, imgIndex)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          type="button"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                    <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
                      <input
                        type="text"
                        placeholder="Image URL"
                        className="w-full p-1 text-xs"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleAddRoomImage(index, e.currentTarget.value);
                            e.currentTarget.value = '';
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between gap-2 mt-4">
        <Button variant="outline" onClick={onBack}>Back: Gallery</Button>
        <Button 
          onClick={onSubmit}
          disabled={isLoading || !newHotel.name || !newHotel.location || newHotel.pricePerNight <= 0 || !newHotel.image}
          type="button"
        >
          {isLoading ? "Adding..." : "Add Hotel"}
        </Button>
      </div>
    </div>
  );
};

export default RoomsTab;
