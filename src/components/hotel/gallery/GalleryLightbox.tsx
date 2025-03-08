
import React from "react";
import { DialogContent, DialogClose } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GalleryLightboxProps {
  images: string[];
  name: string;
  currentImage: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const GalleryLightbox = ({
  images,
  name,
  currentImage,
  onClose,
  onNext,
  onPrev
}: GalleryLightboxProps) => {
  return (
    <DialogContent className="max-w-5xl p-0 bg-black/95">
      <DialogClose className="absolute right-4 top-4 z-10">
        <X className="h-6 w-6 text-white" />
      </DialogClose>
      
      <div className="relative h-[80vh] flex items-center justify-center">
        <img
          src={images[currentImage]}
          alt={`${name} - Image ${currentImage + 1}`}
          className="object-contain h-full max-w-full"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
        
        <div className="absolute bottom-4 left-0 right-0 text-center text-white">
          <p>{currentImage + 1} / {images.length}</p>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full p-2 hover:bg-black/50"
          onClick={onPrev}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full p-2 hover:bg-black/50"
          onClick={onNext}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </DialogContent>
  );
};

export default GalleryLightbox;
