
import React from "react";

interface GalleryThumbnailsProps {
  images: string[];
  name: string;
  onThumbnailClick: (index: number) => void;
}

const GalleryThumbnails = ({ 
  images, 
  name, 
  onThumbnailClick 
}: GalleryThumbnailsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[400px] border border-stone-200 rounded-lg overflow-hidden shadow-sm">
      {/* Main large image */}
      <div className="col-span-2 md:col-span-2 row-span-2 relative" onClick={() => onThumbnailClick(0)}>
        <img
          src={images[0]}
          alt={`${name} - Main Image`}
          className="w-full h-full object-cover cursor-pointer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-10 hover:bg-opacity-0 transition-opacity duration-300"></div>
      </div>

      {/* Secondary images */}
      {images.slice(1, 5).map((image, idx) => (
        <div 
          key={idx} 
          className="relative"
          onClick={() => onThumbnailClick(idx + 1)}
        >
          <img
            src={image}
            alt={`${name} - Image ${idx + 2}`}
            className="w-full h-full object-cover cursor-pointer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-10 hover:bg-opacity-0 transition-opacity duration-300"></div>
          
          {idx === 3 && images.length > 5 && (
            <div 
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onThumbnailClick(5);
              }}
            >
              <span className="text-white font-semibold text-lg">+{images.length - 5} Photos</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default GalleryThumbnails;
