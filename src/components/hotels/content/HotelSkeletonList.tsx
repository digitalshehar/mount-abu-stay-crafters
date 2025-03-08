
import React from "react";

const HotelSkeletonList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse"
        >
          <div className="h-52 bg-stone-200"></div>
          <div className="p-6 space-y-3">
            <div className="h-6 bg-stone-200 rounded w-3/4"></div>
            <div className="h-4 bg-stone-200 rounded w-1/2"></div>
            <div className="flex space-x-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-6 bg-stone-200 rounded w-16"
                ></div>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <div className="h-6 bg-stone-200 rounded w-24"></div>
              <div className="h-10 bg-stone-200 rounded w-28"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HotelSkeletonList;
