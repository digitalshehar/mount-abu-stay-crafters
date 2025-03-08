
import React from "react";
import { Calendar } from "lucide-react";

interface RoomHeaderProps {
  title?: string;
}

const RoomHeader = ({ title = "Available Rooms" }: RoomHeaderProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="flex items-center gap-2 text-sm text-stone-500">
        <Calendar className="h-4 w-4" />
        <span>
          Availability for: <span className="font-medium text-stone-700">Tonight</span>
        </span>
      </div>
    </div>
  );
};

export default RoomHeader;
