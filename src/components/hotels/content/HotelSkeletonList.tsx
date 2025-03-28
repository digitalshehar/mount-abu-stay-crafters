
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface HotelSkeletonListProps {
  count: number;
}

const HotelSkeletonList: React.FC<HotelSkeletonListProps> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="border rounded-lg p-4 bg-white shadow-sm">
          <Skeleton className="h-48 w-full rounded-md mb-4" />
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-4" />
          <div className="flex items-center mb-4">
            <Skeleton className="h-4 w-4 rounded-full mr-1" />
            <Skeleton className="h-4 w-4 rounded-full mr-1" />
            <Skeleton className="h-4 w-4 rounded-full mr-1" />
            <Skeleton className="h-4 w-4 rounded-full mr-1" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </div>
          <div className="flex justify-between items-center">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-8 w-1/4 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default HotelSkeletonList;
