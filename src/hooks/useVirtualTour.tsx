
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface VirtualTourProps {
  isOpen: boolean;
  onClose: () => void;
  hotelName: string;
}

export const useVirtualTour = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  
  // Mock panoramic images for the virtual tour
  const panoramicViews = [
    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1540304453527-62f979142a17?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3'
  ];
  
  const locations = [
    'Hotel Entrance',
    'Lobby',
    'Restaurant',
    'Superior Room'
  ];
  
  const startVirtualTour = () => {
    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      setCurrentPosition(0);
    }, 1000);
  };
  
  const nextPosition = () => {
    setCurrentPosition((prev) => 
      prev === panoramicViews.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevPosition = () => {
    setCurrentPosition((prev) => 
      prev === 0 ? panoramicViews.length - 1 : prev - 1
    );
  };
  
  const VirtualTourComponent: React.FC<VirtualTourProps> = ({ isOpen, onClose, hotelName }) => {
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    
    const handleZoomIn = () => {
      setZoom((prev) => Math.min(prev + 0.2, 2));
    };
    
    const handleZoomOut = () => {
      setZoom((prev) => Math.max(prev - 0.2, 0.6));
    };
    
    const handleRotate = () => {
      setRotation((prev) => (prev + 90) % 360);
    };
    
    const resetView = () => {
      setZoom(1);
      setRotation(0);
    };
    
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-5xl h-[80vh] p-0 flex flex-col">
          <DialogHeader className="p-4 bg-black text-white">
            <div className="flex justify-between items-center">
              <DialogTitle>{hotelName} - Virtual Tour</DialogTitle>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-white">
                <X className="h-5 w-5" />
              </Button>
            </div>
          </DialogHeader>
          
          <div className="flex-1 bg-black relative overflow-hidden">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-12 w-12 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="h-full w-full relative">
                <img
                  src={panoramicViews[currentPosition]}
                  alt={`${hotelName} - ${locations[currentPosition]}`}
                  className="h-full w-full object-cover transition-all duration-300"
                  style={{
                    transform: `scale(${zoom}) rotate(${rotation}deg)`,
                    transformOrigin: 'center',
                  }}
                />
                
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white px-4 py-2 rounded-full text-sm">
                  {locations[currentPosition]}
                </div>
                
                <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
                  {panoramicViews.map((_, index) => (
                    <button
                      key={index}
                      className={`h-2 w-2 rounded-full ${index === currentPosition ? 'bg-white' : 'bg-gray-500'}`}
                      onClick={() => setCurrentPosition(index)}
                    ></button>
                  ))}
                </div>
                
                <button
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white p-2 rounded-full"
                  onClick={prevPosition}
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                
                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white p-2 rounded-full"
                  onClick={nextPosition}
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
                
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button
                    className="bg-black bg-opacity-60 text-white p-2 rounded-full"
                    onClick={handleZoomIn}
                  >
                    <ZoomIn className="h-5 w-5" />
                  </button>
                  
                  <button
                    className="bg-black bg-opacity-60 text-white p-2 rounded-full"
                    onClick={handleZoomOut}
                  >
                    <ZoomOut className="h-5 w-5" />
                  </button>
                  
                  <button
                    className="bg-black bg-opacity-60 text-white p-2 rounded-full"
                    onClick={handleRotate}
                  >
                    <RotateCcw className="h-5 w-5" />
                  </button>
                  
                  <button
                    className="bg-black bg-opacity-60 text-white p-2 rounded-full text-xs"
                    onClick={resetView}
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4 bg-gray-100 flex flex-wrap gap-2">
            {locations.map((location, index) => (
              <Button
                key={index}
                variant={currentPosition === index ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPosition(index)}
              >
                {location}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    );
  };
  
  return {
    startVirtualTour,
    isLoading,
    currentPosition,
    nextPosition,
    prevPosition,
    VirtualTourComponent
  };
};
