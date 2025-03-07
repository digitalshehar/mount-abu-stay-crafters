
import React from "react";

const LoadingState = () => {
  return (
    <div className="p-8 text-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-6 bg-stone-200 rounded w-48 mb-4"></div>
        <div className="h-4 bg-stone-200 rounded w-64"></div>
      </div>
    </div>
  );
};

export default LoadingState;
