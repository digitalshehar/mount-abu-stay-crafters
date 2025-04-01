
import React from 'react';
import { Shield, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface PriceMatchGuaranteeProps {
  priceMatch: {
    available: boolean;
    description: string;
    termsUrl: string;
  };
}

const PriceMatchGuarantee: React.FC<PriceMatchGuaranteeProps> = ({ priceMatch }) => {
  if (!priceMatch || !priceMatch.available) return null;
  
  return (
    <div className="bg-white rounded-lg border border-stone-200 p-4">
      <div className="flex items-center mb-3">
        <Shield className="h-5 w-5 text-green-600 mr-2" />
        <h3 className="font-semibold">Price Match Guarantee</h3>
      </div>
      
      <p className="text-sm text-stone-600 mb-3">
        {priceMatch.description}
      </p>
      
      <div className="flex justify-between items-center">
        <Button
          variant="link"
          size="sm"
          className="p-0 h-auto text-blue-600 text-xs flex items-center"
          asChild
        >
          <a href={priceMatch.termsUrl}>
            <Info className="h-3 w-3 mr-1" />
            View terms
          </a>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
        >
          Submit Claim
        </Button>
      </div>
    </div>
  );
};

export default PriceMatchGuarantee;
