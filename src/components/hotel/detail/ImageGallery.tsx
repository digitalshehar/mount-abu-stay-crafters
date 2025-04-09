
import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, Maximize, Grid3X3 } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  hotelName: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, hotelName }) => {
  const [showFullGallery, setShowFullGallery] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'single' | 'grid'>('single');
  
  // Use a default image if no images are provided
  const galleryImages = images && images.length > 0 
    ? images 
    : ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3'];
  
  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };
  
  const handleNextImage = () => {
    setSelectedImageIndex((prev) => 
      (prev + 1) % galleryImages.length
    );
  };
  
  const toggleGallery = () => {
    setShowFullGallery(!showFullGallery);
    setViewMode('single');
  };
  
  const toggleViewMode = () => {
    setViewMode(viewMode === 'single' ? 'grid' : 'single');
  };
  
  return (
    <>
      <div className="aspect-[16/9] overflow-hidden rounded-xl relative group">
        <img 
          src={galleryImages[0]} 
          alt={hotelName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {galleryImages.length > 1 && (
          <Button 
            onClick={toggleGallery} 
            variant="secondary" 
            className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Grid3X3 className="h-4 w-4 mr-2" />
            View {galleryImages.length} Photos
          </Button>
        )}
      </div>
      
      {/* Full Gallery Dialog */}
      <Dialog open={showFullGallery} onOpenChange={setShowFullGallery}>
        <DialogContent className="max-w-5xl p-0 h-[90vh] flex flex-col bg-black text-white">
          <div className="p-4 flex justify-between items-center">
            <h3 className="text-lg font-medium">{hotelName}: Photo Gallery</h3>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={toggleViewMode}>
                {viewMode === 'single' ? (
                  <>
                    <Grid3X3 className="h-4 w-4 mr-2" />
                    Grid View
                  </>
                ) : (
                  <>
                    <Maximize className="h-4 w-4 mr-2" />
                    Single View
                  </>
                )}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setShowFullGallery(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {viewMode === 'single' ? (
            <div className="flex-1 relative">
              <img 
                src={galleryImages[selectedImageIndex]} 
                alt={`${hotelName} - Image ${selectedImageIndex + 1}`}
                className="w-full h-full object-contain"
              />
              
              {galleryImages.length > 1 && (
                <>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 rounded-full bg-black/50 text-white"
                    onClick={handlePrevImage}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 rounded-full bg-black/50 text-white"
                    onClick={handleNextImage}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full text-sm">
                {selectedImageIndex + 1} / {galleryImages.length}
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages.map((src, index) => (
                <div 
                  key={index} 
                  className={`aspect-square rounded-lg overflow-hidden cursor-pointer ${selectedImageIndex === index ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => {
                    setSelectedImageIndex(index);
                    setViewMode('single');
                  }}
                >
                  <img 
                    src={src} 
                    alt={`${hotelName} - Image ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageGallery;
