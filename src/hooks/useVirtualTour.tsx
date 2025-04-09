
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, ArrowLeft, ArrowRight, RotateCw, ZoomIn, ZoomOut } from 'lucide-react';

interface VirtualTourProps {
  isOpen: boolean;
  onClose: () => void;
  hotelName: string;
}

const VirtualTourDialog: React.FC<VirtualTourProps> = ({ isOpen, onClose, hotelName }) => {
  const [currentView, setCurrentView] = useState(0);
  const [zoom, setZoom] = useState(1);
  
  const viewPoints = [
    { name: 'Lobby', image: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28f8e?auto=format&fit=crop&q=80&w=2074&ixlib=rb-4.0.3' },
    { name: 'Room', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3' },
    { name: 'Bathroom', image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3' },
    { name: 'Restaurant', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3' },
  ];
  
  const handleNext = () => {
    setCurrentView((prev) => (prev + 1) % viewPoints.length);
  };
  
  const handlePrevious = () => {
    setCurrentView((prev) => (prev - 1 + viewPoints.length) % viewPoints.length);
  };
  
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 2));
  };
  
  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 0.6));
  };
  
  const handleResetZoom = () => {
    setZoom(1);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[90vh] flex flex-col p-0 bg-black text-white">
        <DialogHeader className="p-4 flex flex-row items-center justify-between">
          <div>
            <DialogTitle className="text-white">Virtual Tour: {hotelName}</DialogTitle>
            <DialogDescription className="text-gray-300">
              Currently viewing: {viewPoints[currentView].name}
            </DialogDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white">
            <X className="h-5 w-5" />
          </Button>
        </DialogHeader>
        
        <div className="relative flex-1 overflow-hidden">
          <img
            src={viewPoints[currentView].image}
            alt={viewPoints[currentView].name}
            className="w-full h-full object-cover transition-transform duration-300"
            style={{ transform: `scale(${zoom})` }}
          />
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm p-2 rounded-lg flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={handlePrevious}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            
            {viewPoints.map((point, index) => (
              <Button
                key={index}
                variant={index === currentView ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentView(index)}
              >
                {point.name}
              </Button>
            ))}
            
            <Button variant="outline" size="icon" onClick={handleNext}>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm p-2 rounded-lg flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleResetZoom}>
              <RotateCw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const useVirtualTour = () => {
  const startVirtualTour = () => {
    // Could include additional setup logic here
    return true;
  };
  
  return {
    startVirtualTour,
    VirtualTourComponent: VirtualTourDialog
  };
};
