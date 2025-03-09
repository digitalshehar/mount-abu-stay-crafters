
import React from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const PriceMatchGuarantee: React.FC = () => {
  const handlePriceMatch = () => {
    toast.success("Price match request submitted", {
      description: "We'll review your request and get back to you shortly."
    });
  };

  return (
    <div className="bg-white rounded-lg border border-stone-200 p-6 shadow-sm">
      <h3 className="font-semibold text-lg mb-3">Price Match Guarantee</h3>
      <p className="text-sm text-stone-600 mb-2">
        Found this hotel cheaper elsewhere? We'll match the price and give you an additional 10% off.
      </p>
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full"
        onClick={handlePriceMatch}
      >
        Claim Price Match
      </Button>
    </div>
  );
};

export default PriceMatchGuarantee;
