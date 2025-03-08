
import React, { useState } from "react";
import { ImageOff, X, ChevronLeft, ChevronRight, Grid3X3 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface HotelGalleryProps {
  name: string;
  images: string[];
}

const HotelGallery = ({ name, images }: HotelGalleryProps) => {
  const [mainImageError, setMainImageError] = useState(false);
  const [imageErrors, setImageErrors] = useState<{[key: number]: boolean}>({});
  const [activeImage, setActiveImage] = useState(0);
  const [showFullGallery, setShowFullGallery] = useState(false);
  
  // Ensure we have at least one image
  const allImages = images.length > 0 ? images : [images[0]];
  
  // For display in the main gallery preview, we show up to 5 images
  const displayImages = allImages.slice(0, 5);
  
  const handleMainImageError = () => {
    setMainImageError(true);
  };

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({...prev, [index]: true}));
  };

  const handleThumbnailClick = (index: number) => {
    setActiveImage(index);
  };
  
  const navigateImage = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setActiveImage(prev => (prev > 0 ? prev - 1 : allImages.length - 1));
    } else {
      setActiveImage(prev => (prev < allImages.length - 1 ? prev + 1 : 0));
    }
  };
  
  // Render image gallery with error handling
  const renderImage = (image: string, index: number, large = false) => {
    return !imageErrors[index] ? (
      <img 
        src={image} 
        alt={`${name} - view ${index + 1}`} 
        className={`w-full h-full object-cover ${large ? 'cursor-zoom-in' : ''}`}
        onError={() => handleImageError(index)}
        onClick={large ? () => setShowFullGallery(true) : undefined}
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center bg-stone-100">
        <div className="text-center">
          <ImageOff className={`${large ? 'h-16 w-16' : 'h-8 w-8'} mx-auto text-stone-400 mb-1`} />
          <p className="text-xs text-stone-500">Image not available</p>
        </div>
      </div>
    );
  };

  return (
    <div className="container-custom py-8">
      {/* Main Gallery Grid */}
      <div className="grid grid-cols-4 gap-2 h-[400px]">
        {/* Main large image */}
        <div className="col-span-2 row-span-2 rounded-l-lg overflow-hidden bg-stone-100 relative">
          {renderImage(displayImages[0], 0, true)}
        </div>
        
        {/* Secondary images grid */}
        {displayImages.slice(1, 5).map((image, idx) => (
          <div 
            key={idx + 1} 
            className={`bg-stone-100 overflow-hidden ${
              idx === 2 ? 'rounded-tr-lg' : idx === 3 ? 'rounded-br-lg' : ''
            }`}
          >
            {renderImage(image, idx + 1, true)}
            
            {/* Last image shows count of remaining photos */}
            {idx === 3 && allImages.length > 5 && (
              <div 
                className="absolute inset-0 bg-black/40 flex items-center justify-center text-white cursor-pointer"
                onClick={() => setShowFullGallery(true)}
              >
                <div className="text-center">
                  <Grid3X3 className="h-6 w-6 mx-auto mb-1" />
                  <p className="font-medium">+{allImages.length - 5} photos</p>
                </div>
              </div>
            )}
          </div>
        ))}
        
        {/* View all photos button */}
        <Button 
          variant="outline" 
          className="absolute bottom-4 right-4 bg-white shadow-md"
          onClick={() => setShowFullGallery(true)}
        >
          <Grid3X3 className="h-4 w-4 mr-2" />
          View All Photos
        </Button>
      </div>
      
      {/* Full Gallery Dialog */}
      <Dialog open={showFullGallery} onOpenChange={setShowFullGallery}>
        <DialogContent className="max-w-4xl p-0 bg-black h-[80vh] flex flex-col">
          <div className="p-4 flex justify-between items-center bg-black/80 text-white">
            <h3 className="font-medium">{name} - Photo Gallery</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowFullGallery(false)}
              className="text-white hover:text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex-grow relative">
            {/* Main image display */}
            <div className="absolute inset-0 flex items-center justify-center">
              {!imageErrors[activeImage] ? (
                <img 
                  src={allImages[activeImage]} 
                  alt={`${name} - view ${activeImage + 1}`}
                  className="max-h-full max-w-full object-contain"
                  onError={() => handleImageError(activeImage)}
                />
              ) : (
                <div className="text-center text-white">
                  <ImageOff className="h-16 w-16 mx-auto mb-2" />
                  <p>Image not available</p>
                </div>
              )}
            </div>
            
            {/* Navigation buttons */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-white hover:bg-white/20 h-10 w-10 rounded-full"
              onClick={() => navigateImage('prev')}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-white hover:bg-white/20 h-10 w-10 rounded-full"
              onClick={() => navigateImage('next')}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
          
          {/* Thumbnails */}
          <div className="p-4 bg-black/80 flex items-center overflow-x-auto space-x-2">
            {allImages.map((image, idx) => (
              <div 
                key={idx}
                className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden cursor-pointer ${
                  activeImage === idx ? 'ring-2 ring-white' : 'opacity-70'
                }`}
                onClick={() => setActiveImage(idx)}
              >
                {!imageErrors[idx] ? (
                  <img 
                    src={image}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                    onError={() => handleImageError(idx)}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <ImageOff className="h-4 w-4 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HotelGallery;
