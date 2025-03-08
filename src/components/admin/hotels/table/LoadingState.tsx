
import React from "react";

const LoadingState = () => {
  return (
    <div className="py-12 text-center">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 mx-auto mb-4"></div>
      <p className="text-lg font-medium text-stone-700">Loading hotels...</p>
    </div>
  );
};

export default LoadingState;
