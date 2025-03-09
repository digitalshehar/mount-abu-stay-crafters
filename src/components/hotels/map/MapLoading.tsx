
import React from 'react';
import { Loader2 } from 'lucide-react';

const MapLoading = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-stone-50 rounded-lg">
      <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
      <p className="text-stone-600 text-sm">Loading map...</p>
    </div>
  );
};

export default MapLoading;
