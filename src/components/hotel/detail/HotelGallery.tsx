
import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface HotelGalleryProps {
  images: string[];
  showFullGallery: boolean;
  setShowFullGallery: (show: boolean) => void;
}

const HotelGallery: React.FC<HotelGalleryProps> = ({ 
  images, 
  showFullGallery, 
  setShowFullGallery 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Default images in case none are provided
  const galleryImages = images && images.length > 0 
    ? images 
    : [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3',
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=2425&ixlib=rb-4.0.3',
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=2074&ixlib=rb-4.0.3',
        'https://images.unsplash.com/photo-1564078516393-cf04bd966897?auto=format&fit=crop&q=80&w=2074&ixlib=rb-4.0.3'
      ];

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="md:col-span-2 aspect-[16/9] overflow-hidden rounded-lg">
          <img 
            src={galleryImages[0]} 
            alt="Hotel main view" 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onClick={() => {
              setCurrentImageIndex(0);
              setShowFullGallery(true);
            }}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          {galleryImages.slice(1, 3).map((image, index) => (
            <div key={index + 1} className="aspect-square overflow-hidden rounded-lg">
              <img 
                src={image} 
                alt={`Hotel view ${index + 2}`} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                onClick={() => {
                  setCurrentImageIndex(index + 1);
                  setShowFullGallery(true);
                }}
              />
            </div>
          ))}
        </div>
        
        <div className="relative aspect-[1/1] overflow-hidden rounded-lg">
          <img 
            src={galleryImages[3] || galleryImages[0]} 
            alt="Hotel view 4" 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onClick={() => {
              setCurrentImageIndex(3);
              setShowFullGallery(true);
            }}
          />
          
          {galleryImages.length > 4 && (
            <div 
              className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer"
              onClick={() => setShowFullGallery(true)}
            >
              <div className="text-white text-center">
                <p className="text-xl font-semibold">+{galleryImages.length - 4}</p>
                <p className="text-sm">More Photos</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Dialog open={showFullGallery} onOpenChange={setShowFullGallery}>
        <DialogContent className="max-w-5xl p-0 bg-black border-none">
          <Button 
            onClick={() => setShowFullGallery(false)} 
            variant="ghost" 
            className="absolute right-2 top-2 z-10 text-white hover:bg-black/20" 
            size="icon"
          >
            <X className="h-6 w-6" />
          </Button>
          
          <div className="relative h-[80vh] flex items-center justify-center">
            <Button 
              onClick={goToPrevImage} 
              variant="ghost" 
              className="absolute left-2 z-10 text-white hover:bg-black/20 h-12 w-12 rounded-full" 
              size="icon"
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
            
            <img 
              src={galleryImages[currentImageIndex]} 
              alt={`Hotel view ${currentImageIndex + 1}`} 
              className="max-h-full max-w-full object-contain"
            />
            
            <Button 
              onClick={goToNextImage} 
              variant="ghost" 
              className="absolute right-2 z-10 text-white hover:bg-black/20 h-12 w-12 rounded-full" 
              size="icon"
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
            
            <div className="absolute bottom-4 left-0 right-0 text-center text-white">
              {currentImageIndex + 1} / {galleryImages.length}
            </div>
          </div>
          
          <div className="bg-black p-2 overflow-x-auto">
            <div className="flex space-x-2">
              {galleryImages.map((image, index) => (
                <div 
                  key={index} 
                  className={`w-20 h-20 flex-shrink-0 overflow-hidden rounded cursor-pointer border-2 ${
                    index === currentImageIndex ? 'border-primary' : 'border-transparent'
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img 
                    src={image} 
                    alt={`Thumbnail ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HotelGallery;
