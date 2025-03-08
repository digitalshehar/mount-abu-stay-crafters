
import React from "react";

interface RoomPriceDisplayProps {
  price: number;
}

const RoomPriceDisplay = ({ price }: RoomPriceDisplayProps) => {
  return (
    <div>
      <p className="text-green-600 text-sm font-medium">Limited time offer</p>
      <div className="my-1">
        {price < 3000 && (
          <p className="line-through text-stone-400 text-sm">₹{(price * 1.2).toFixed(0)}</p>
        )}
        <p className="text-xl font-bold">₹{price}</p>
      </div>
      <p className="text-xs text-stone-500">per night</p>
    </div>
  );
};

export default RoomPriceDisplay;
