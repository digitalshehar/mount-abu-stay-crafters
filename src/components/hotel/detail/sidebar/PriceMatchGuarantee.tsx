
import React from 'react';
import { Shield, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface PriceMatchDetails {
  available: boolean;
  description: string;
  termsUrl: string;
}

interface PriceMatchGuaranteeProps {
  priceMatch?: PriceMatchDetails;
}

const PriceMatchGuarantee: React.FC<PriceMatchGuaranteeProps> = ({ priceMatch }) => {
  // If priceMatch is not provided or not available, don't render anything
  if (!priceMatch || !priceMatch.available) return null;
  
  // Default description and terms URL if not provided
  const description = priceMatch.description || 'Found this hotel cheaper elsewhere? We\'ll match the price and give you an additional 10% off.';
  const termsUrl = priceMatch.termsUrl || '/terms/price-match';
  
  return (
    <div className="bg-white rounded-lg border border-stone-200 p-4">
      <div className="flex items-center mb-3">
        <Shield className="h-5 w-5 text-green-600 mr-2" />
        <h3 className="font-semibold">Price Match Guarantee</h3>
      </div>
      
      <p className="text-sm text-stone-600 mb-3">
        {description}
      </p>
      
      <div className="flex justify-between items-center">
        <Button
          variant="link"
          size="sm"
          className="p-0 h-auto text-blue-600 text-xs flex items-center"
          asChild
        >
          <a href={termsUrl}>
            <Info className="h-3 w-3 mr-1" />
            View terms
          </a>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open('/submit-price-match', '_blank')}
        >
          Submit Claim
        </Button>
      </div>
    </div>
  );
};

export default PriceMatchGuarantee;
