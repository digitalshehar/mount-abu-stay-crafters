
import React, { useState } from "react";
import { ImageOff } from "lucide-react";

interface HotelGalleryProps {
  name: string;
  images: string[];
}

const HotelGallery = ({ name, images }: HotelGalleryProps) => {
  const [mainImageError, setMainImageError] = useState(false);
  const [imageErrors, setImageErrors] = useState<{[key: number]: boolean}>({});

  const handleMainImageError = () => {
    setMainImageError(true);
  };

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({...prev, [index]: true}));
  };

  return (
    <>
      <div className="relative h-[50vh] overflow-hidden">
        {!mainImageError && images[0] ? (
          <img 
            src={images[0]} 
            alt={`${name} - main view`} 
            className="w-full h-full object-cover"
            onError={handleMainImageError}
          />
        ) : (
          <div className="w-full h-full bg-stone-200 flex items-center justify-center">
            <div className="text-center">
              <ImageOff className="h-16 w-16 mx-auto text-stone-500 mb-4" />
              <p className="text-stone-600 text-lg">Main image not available</p>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 flex items-end">
          <div className="container-custom pb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">{name}</h1>
          </div>
        </div>
      </div>
      
      {images.length > 1 && (
        <div className="grid grid-cols-3 gap-4 mt-10">
          {images.slice(1, 4).map((image: string, index: number) => (
            <div key={index} className="rounded-lg overflow-hidden h-48 bg-stone-100">
              {!imageErrors[index] ? (
                <img 
                  src={image} 
                  alt={`${name} - view ${index + 2}`} 
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
      )}
    </>
  );
};

export default HotelGallery;
