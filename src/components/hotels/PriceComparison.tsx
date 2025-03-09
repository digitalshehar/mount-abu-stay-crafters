
import React from 'react';
import { Check, ExternalLink, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface PriceComparisonProps {
  hotelName: string;
  hotelPrice: number;
  competitorPrices: {
    name: string;
    price: number;
    logo: string;
  }[];
}

const PriceComparison: React.FC<PriceComparisonProps> = ({
  hotelName,
  hotelPrice,
  competitorPrices
}) => {
  // Sort competitor prices from lowest to highest
  const sortedPrices = [...competitorPrices].sort((a, b) => a.price - b.price);
  
  // Find the best price
  const lowestPrice = Math.min(hotelPrice, ...sortedPrices.map(p => p.price));
  const hasLowestPrice = lowestPrice === hotelPrice;
  
  return (
    <div className="bg-white rounded-lg border border-stone-200 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm">Price Comparison</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <AlertCircle className="h-4 w-4 text-stone-400" />
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
              <p className="text-xs">
                We compared prices across major travel sites to help you find the best deal.
                Prices may vary based on dates and availability.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="space-y-3">
        {/* Our price */}
        <div className={`flex items-center justify-between p-2 rounded ${hasLowestPrice ? 'bg-green-50 border border-green-100' : ''}`}>
          <div className="flex items-center">
            <div className="bg-blue-600 text-white text-xs font-bold rounded-sm h-6 w-6 flex items-center justify-center mr-2">
              MA
            </div>
            <div>
              <div className="text-sm font-medium">Our Price</div>
              {hasLowestPrice && (
                <div className="flex items-center text-green-600 text-xs font-medium">
                  <Check className="h-3 w-3 mr-1" />
                  Best Price
                </div>
              )}
            </div>
          </div>
          <div className="font-semibold">₹{hotelPrice.toLocaleString()}</div>
        </div>
        
        {/* Competitor prices */}
        {sortedPrices.map((competitor, index) => (
          <div key={competitor.name} className="flex items-center justify-between p-2 rounded">
            <div className="flex items-center">
              <img 
                src={competitor.logo || 'https://placehold.co/30x30?text=' + competitor.name.substring(0, 1)} 
                alt={competitor.name}
                className="h-6 w-6 object-contain mr-2 rounded-sm"
              />
              <div className="text-sm">{competitor.name}</div>
            </div>
            <div className="text-sm">₹{competitor.price.toLocaleString()}</div>
          </div>
        ))}
      </div>
      
      {/* Best deal available here indicator */}
      {hasLowestPrice && (
        <div className="mt-4 bg-green-50 border border-green-100 rounded p-2 text-center">
          <p className="text-green-700 text-xs font-medium">
            You're getting the best price available for {hotelName}!
          </p>
        </div>
      )}
      
      <Button variant="link" size="sm" className="w-full mt-2 text-xs flex items-center justify-center" asChild>
        <a href="#" target="_blank" rel="noopener noreferrer">
          View all prices
          <ExternalLink className="h-3 w-3 ml-1" />
        </a>
      </Button>
    </div>
  );
};

export default PriceComparison;
