
import React from "react";
import RoomDetailsExpanded from "./RoomDetailsExpanded";
import RoomCountSelector from "./RoomCountSelector";
import RoomPriceDisplay from "./RoomPriceDisplay";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface Room {
  type: string;
  capacity: number;
  price: number;
  count?: number;
  images?: string[];
}

export interface RoomCardProps {
  room: Room;
  index: number;
  expandedRoom: string | null;
  roomCounts: Record<string, number>;
  toggleRoomDetails: (roomType: string) => void;
  increaseRoomCount: (roomType: string) => void;
  decreaseRoomCount: (roomType: string) => void;
  onBookRoom?: (roomType: string) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({
  room,
  index,
  expandedRoom,
  roomCounts,
  toggleRoomDetails,
  increaseRoomCount,
  decreaseRoomCount,
  onBookRoom,
}) => {
  const isExpanded = expandedRoom === room.type;
  const roomCount = roomCounts[room.type] || 1;

  return (
    <div className="bg-white rounded-lg border border-stone-200 overflow-hidden">
      <div className="p-4 md:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="font-semibold text-lg">{room.type}</h3>
            <p className="text-stone-600 text-sm">
              Up to {room.capacity} {room.capacity === 1 ? "person" : "people"}
            </p>
          </div>

          <RoomPriceDisplay price={room.price} roomCount={roomCount} />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
          <button
            type="button"
            onClick={() => toggleRoomDetails(room.type)}
            className="text-primary text-sm flex items-center hover:underline"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                Hide details
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                Show details
              </>
            )}
          </button>

          <div className="flex items-center gap-4">
            <RoomCountSelector
              roomCount={roomCount}
              onDecrease={() => decreaseRoomCount(room.type)}
              onIncrease={() => increaseRoomCount(room.type)}
            />

            <Button
              onClick={() => onBookRoom && onBookRoom(room.type)}
              className="w-32"
            >
              Book Now
            </Button>
          </div>
        </div>

        {isExpanded && (
          <RoomDetailsExpanded
            room={room}
            roomType={room.type}
            amenities={[
              "Free WiFi",
              "Air conditioning",
              "Flat-screen TV",
              "Private bathroom",
              "Desk",
              "Toiletries",
            ]}
            description="This comfortable and well-appointed room offers all the amenities you need for a relaxing stay."
          />
        )}
      </div>
    </div>
  );
};

export default RoomCard;
