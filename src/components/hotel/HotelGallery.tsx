
import React, { useState } from "react";
import { ImageOff } from "lucide-react";

interface HotelGalleryProps {
  name: string;
  images: string[];
}

const HotelGallery = ({ name, images }: HotelGalleryProps) => {
  const [mainImageError, setMainImageError] = useState(false);
  const [imageErrors, setImageErrors] = useState<{[key: number]: boolean}>({});
  const [activeImage, setActiveImage] = useState(0);

  const handleMainImageError = () => {
    setMainImageError(true);
  };

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({...prev, [index]: true}));
  };

  const handleThumbnailClick = (index: number) => {
    setActiveImage(index);
  };

  return (
    <>
      <div className="relative h-[60vh] overflow-hidden rounded-lg shadow-lg">
        {!mainImageError && images[activeImage] ? (
          <img 
            src={images[activeImage]} 
            alt={`${name} - main view`} 
            className="w-full h-full object-cover transition-transform duration-700"
            onError={handleMainImageError}
          />
        ) : (
          <div className="w-full h-full bg-stone-200 flex items-center justify-center">
            <div className="text-center">
              <ImageOff className="h-16 w-16 mx-auto text-stone-500 mb-4" />
              <p className="text-stone-600 text-lg">Image not available</p>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 flex items-end">
          <div className="container-custom pb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-2 animate-fade-in-down">{name}</h1>
          </div>
        </div>
      </div>
      
      {images.length > 1 && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Gallery</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((image: string, index: number) => (
              <div 
                key={index} 
                className={`rounded-lg overflow-hidden h-32 bg-stone-100 cursor-pointer transition-all duration-300 hover:opacity-90 ${index === activeImage ? 'ring-4 ring-primary ring-offset-2' : 'opacity-70'}`}
                onClick={() => handleThumbnailClick(index)}
              >
                {!imageErrors[index] ? (
                  <img 
                    src={image} 
                    alt={`${name} - view ${index + 1}`} 
                    className="w-full h-full object-cover"
                    onError={() => handleImageError(index)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-stone-100">
                    <div className="text-center">
                      <ImageOff className="h-8 w-8 mx-auto text-stone-400 mb-1" />
                      <p className="text-xs text-stone-500">Image not available</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default HotelGallery;
