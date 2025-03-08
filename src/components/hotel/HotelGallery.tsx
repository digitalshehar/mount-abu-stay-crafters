
import React, { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import FullScreenGallery from "./gallery/FullScreenGallery";
import GalleryLightbox from "./gallery/GalleryLightbox";
import GalleryThumbnails from "./gallery/GalleryThumbnails";

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

  // If showing full screen gallery, render that
  if (fullScreen) {
    return (
      <Dialog open={fullScreen} onOpenChange={() => onClose && onClose()}>
        <FullScreenGallery
          images={galleryImages}
          name={name}
          currentImage={currentImage}
          setCurrentImage={setCurrentImage}
          onClose={() => onClose && onClose()}
        />
      </Dialog>
    );
  }

  // Main gallery component
  return (
    <>
      <div className="container-custom py-4">
        <GalleryThumbnails 
          images={galleryImages}
          name={name}
          onThumbnailClick={handleOpenLightbox}
        />
      </div>

      {/* Lightbox dialog */}
      <Dialog open={showLightbox} onOpenChange={setShowLightbox}>
        <GalleryLightbox
          images={galleryImages}
          name={name}
          currentImage={currentImage}
          onClose={() => setShowLightbox(false)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      </Dialog>
    </>
  );
};

export default HotelGallery;
