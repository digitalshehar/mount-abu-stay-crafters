
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface HotelSkeletonListProps {
  count?: number;
}

const HotelSkeletonList: React.FC<HotelSkeletonListProps> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden border border-stone-100">
          <Skeleton className="w-full h-48" />
          <div className="p-4 space-y-3">
            <Skeleton className="w-3/4 h-5" />
            <Skeleton className="w-1/2 h-4" />
            <div className="flex justify-between items-center pt-2">
              <Skeleton className="w-1/3 h-4" />
              <Skeleton className="w-1/4 h-6" />
            </div>
            <div className="flex space-x-2 pt-1">
              <Skeleton className="w-16 h-4" />
              <Skeleton className="w-16 h-4" />
              <Skeleton className="w-16 h-4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HotelSkeletonList;
