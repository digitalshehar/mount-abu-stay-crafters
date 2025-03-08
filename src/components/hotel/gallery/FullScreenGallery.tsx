
import React from "react";
import { DialogContent, DialogClose } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FullScreenGalleryProps {
  images: string[];
  name: string;
  currentImage: number;
  setCurrentImage: (index: number) => void;
  onClose: () => void;
}

const FullScreenGallery = ({
  images,
  name,
  currentImage,
  setCurrentImage,
  onClose
}: FullScreenGalleryProps) => {
  const handleNext = () => {
    setCurrentImage((currentImage + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImage((currentImage - 1 + images.length) % images.length);
  };

  return (
    <DialogContent className="max-w-6xl p-0 bg-black/95">
      <DialogClose className="absolute right-4 top-4 z-10">
        <X className="h-6 w-6 text-white" />
      </DialogClose>

      <div className="h-[80vh] flex flex-col md:flex-row">
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="relative w-full h-full">
            <img
              src={images[currentImage]}
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
          <h3 className="text-white font-semibold mb-4">All Photos ({images.length})</h3>
          <div className="grid grid-cols-3 md:grid-cols-1 gap-2">
            {images.map((image, idx) => (
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
  );
};

export default FullScreenGallery;
