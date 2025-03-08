
import React from "react";
import { ReactNode } from "react";

interface HotelInfoSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const HotelInfoSection = ({ title, children, className = "" }: HotelInfoSectionProps) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <h2 className="text-xl font-semibold">{title}</h2>
      {children}
    </div>
  );
};

export default HotelInfoSection;
