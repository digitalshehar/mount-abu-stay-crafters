
import React, { useState } from "react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HotelGalleryProps {
  name: string;
  images: string[];
  fullScreen?: boolean;
  onClose?: () => void;
}

const HotelGallery: React.FC<HotelGalleryProps> = ({ 
  name, 
  images, 
  fullScreen = false,
  onClose
}) => {
  const [showLightbox, setShowLightbox] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  // Ensure we have at least one image and handle empty array cases properly
  const galleryImages = images && images.length > 0 ? images : ["/placeholder.svg"];

  const handleOpenLightbox = (index: number) => {
    setCurrentImage(index);
    setShowLightbox(true);
  };

  const handleNext = () => {
    setCurrentImage((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrev = () => {
    setCurrentImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const renderFullScreenGallery = () => (
    <Dialog open={fullScreen} onOpenChange={() => onClose && onClose()}>
      <DialogContent className="max-w-6xl p-0 bg-black/95">
        <DialogClose className="absolute right-4 top-4 z-10">
          <X className="h-6 w-6 text-white" />
        </DialogClose>

        <div className="h-[80vh] flex flex-col md:flex-row">
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="relative w-full h-full">
              <img
                src={galleryImages[currentImage]}
                alt={`${name} - Image ${currentImage + 1}`}
                className="object-contain w-full h-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full p-2 hover:bg-black/50"
                onClick={handlePrev}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full p-2 hover:bg-black/50"
                onClick={handleNext}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>

          <div className="w-full md:w-64 bg-black/80 p-4 overflow-auto">
            <h3 className="text-white font-semibold mb-4">All Photos ({galleryImages.length})</h3>
            <div className="grid grid-cols-3 md:grid-cols-1 gap-2">
              {galleryImages.map((image, idx) => (
                <div 
                  key={idx} 
                  className={`
                    relative cursor-pointer overflow-hidden rounded-md
                    ${currentImage === idx ? 'ring-2 ring-primary' : ''}
                  `}
                  onClick={() => setCurrentImage(idx)}
                >
                  <img
                    src={image}
                    alt={`${name} - Thumbnail ${idx + 1}`}
                    className="aspect-square object-cover w-full h-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  // Lightbox for standard gallery view
  const renderLightbox = () => (
    <Dialog open={showLightbox} onOpenChange={setShowLightbox}>
      <DialogContent className="max-w-5xl p-0 bg-black/95">
        <DialogClose className="absolute right-4 top-4 z-10">
          <X className="h-6 w-6 text-white" />
        </DialogClose>
        
        <div className="relative h-[80vh] flex items-center justify-center">
          <img
            src={galleryImages[currentImage]}
            alt={`${name} - Image ${currentImage + 1}`}
            className="object-contain h-full max-w-full"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
          
          <div className="absolute bottom-4 left-0 right-0 text-center text-white">
            <p>{currentImage + 1} / {galleryImages.length}</p>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full p-2 hover:bg-black/50"
            onClick={handlePrev}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full p-2 hover:bg-black/50"
            onClick={handleNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  // If showing full screen gallery, render that
  if (fullScreen) {
    return renderFullScreenGallery();
  }

  // Main gallery component
  return (
    <>
      <div className="container-custom py-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[400px]">
          {/* Main large image */}
          <div className="col-span-2 md:col-span-2 row-span-2 relative" onClick={() => handleOpenLightbox(0)}>
            <img
              src={galleryImages[0]}
              alt={`${name} - Main Image`}
              className="w-full h-full object-cover rounded-l-lg cursor-pointer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.svg";
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-10 hover:bg-opacity-0 transition-opacity duration-300 rounded-l-lg"></div>
          </div>

          {/* Secondary images */}
          {galleryImages.slice(1, 5).map((image, idx) => (
            <div 
              key={idx} 
              className={`relative ${idx === 2 ? 'rounded-tr-lg' : ''} ${idx === 3 ? 'rounded-br-lg' : ''}`}
              onClick={() => handleOpenLightbox(idx + 1)}
            >
              <img
                src={image}
                alt={`${name} - Image ${idx + 2}`}
                className={`w-full h-full object-cover cursor-pointer ${idx === 2 ? 'rounded-tr-lg' : ''} ${idx === 3 ? 'rounded-br-lg' : ''}`}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />
              <div className={`absolute inset-0 bg-black bg-opacity-10 hover:bg-opacity-0 transition-opacity duration-300 ${idx === 2 ? 'rounded-tr-lg' : ''} ${idx === 3 ? 'rounded-br-lg' : ''}`}></div>
              
              {idx === 3 && galleryImages.length > 5 && (
                <div 
                  className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer rounded-br-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose && onClose();
                  }}
                >
                  <span className="text-white font-semibold text-lg">+{galleryImages.length - 5} Photos</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {renderLightbox()}
    </>
  );
};

export default HotelGallery;
