
import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="text-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto" />
        <p className="mt-4 text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
