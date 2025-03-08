
import React, { ReactNode } from "react";

interface HotelFeatureItemProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const HotelFeatureItem = ({ icon, title, description }: HotelFeatureItemProps) => {
  return (
    <div className="flex items-start">
      <div className="mt-1 mr-3 bg-primary/10 rounded-full p-1.5">
        {icon}
      </div>
      <div>
        <h3 className="font-medium mb-1">{title}</h3>
        <p className="text-sm text-stone-600">{description}</p>
      </div>
    </div>
  );
};

export default HotelFeatureItem;
