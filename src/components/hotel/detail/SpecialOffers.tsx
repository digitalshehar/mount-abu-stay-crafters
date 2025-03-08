
import React from "react";
import { Button } from "@/components/ui/button";

interface OfferProps {
  label: string;
  title: string;
  description: string;
}

const Offer = ({ label, title, description }: OfferProps) => (
  <div className="bg-white p-4 rounded-md border border-blue-100 flex flex-col sm:flex-row items-start gap-4">
    <div className="bg-blue-100 text-blue-700 p-2 rounded-md font-semibold">
      {label}
    </div>
    <div>
      <h4 className="font-medium">{title}</h4>
      <p className="text-sm text-stone-600">{description}</p>
    </div>
    <Button size="sm" className="ml-auto mt-2 sm:mt-0">Apply</Button>
  </div>
);

const SpecialOffers = () => {
  return (
    <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-100">
      <h3 className="text-lg font-semibold text-blue-800 mb-4">Special Offers</h3>
      <div className="space-y-4">
        <Offer 
          label="Save 15%" 
          title="Early Bird Special" 
          description="Book 30 days in advance and save 15% on your stay."
        />
        
        <Offer 
          label="Free Night" 
          title="Stay 4, Pay 3" 
          description="Book 4 nights and get 1 night completely free."
        />
      </div>
    </div>
  );
};

export default SpecialOffers;
