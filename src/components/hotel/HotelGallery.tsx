
import React from "react";

interface HotelGalleryProps {
  name: string;
  images: string[];
}

const HotelGallery = ({ name, images }: HotelGalleryProps) => {
  return (
    <>
      <div className="relative h-[50vh] overflow-hidden">
        <img 
          src={images[0]} 
          alt={`${name} - main view`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 flex items-end">
          <div className="container-custom pb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">{name}</h1>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-10">
        {images.slice(1, 4).map((image: string, index: number) => (
          <img 
            key={index}
            src={image} 
            alt={`${name} - view ${index + 2}`} 
            className="w-full h-48 object-cover rounded-lg"
          />
        ))}
      </div>
    </>
  );
};

export default HotelGallery;
