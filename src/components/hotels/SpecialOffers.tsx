
import React from 'react';
import { Clock, Tag, Gift, Calendar, ChevronRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SpecialOffer {
  id: string;
  title: string;
  description: string;
  discount: number;
  expiresAt: string;
  code?: string;
  type: 'flash' | 'seasonal' | 'loyalty' | 'package';
}

interface SpecialOffersProps {
  hotelId?: number;
  offers: SpecialOffer[];
}

const SpecialOffers: React.FC<SpecialOffersProps> = ({
  hotelId,
  offers = []
}) => {
  // Calculate time remaining for flash deals
  const getTimeRemaining = (expiresAt: string) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diff = expiry.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };
  
  // Get icon based on offer type
  const getOfferIcon = (type: string) => {
    switch (type) {
      case 'flash':
        return <Clock className="h-5 w-5 mr-2 text-red-500" />;
      case 'seasonal':
        return <Calendar className="h-5 w-5 mr-2 text-green-500" />;
      case 'loyalty':
        return <Shield className="h-5 w-5 mr-2 text-blue-500" />;
      case 'package':
        return <Gift className="h-5 w-5 mr-2 text-purple-500" />;
      default:
        return <Tag className="h-5 w-5 mr-2 text-blue-500" />;
    }
  };
  
  // Get badge color based on offer type
  const getBadgeStyle = (type: string) => {
    switch (type) {
      case 'flash':
        return "bg-red-100 text-red-800 border-red-200";
      case 'seasonal':
        return "bg-green-100 text-green-800 border-green-200";
      case 'loyalty':
        return "bg-blue-100 text-blue-800 border-blue-200";
      case 'package':
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };
  
  if (!offers || offers.length === 0) {
    return null;
  }
  
  return (
    <div className="bg-white rounded-lg border border-stone-200 overflow-hidden shadow-sm">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-3 text-white flex justify-between items-center">
        <h3 className="font-semibold text-sm">Special Offers & Deals</h3>
        <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 border-none">
          {offers.length} Available
        </Badge>
      </div>
      
      <div>
        {offers.map((offer) => (
          <div key={offer.id} className="border-b last:border-b-0 border-stone-100 p-3.5">
            <div className="flex">
              {getOfferIcon(offer.type)}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-sm">{offer.title}</h4>
                  <Badge variant="outline" className={getBadgeStyle(offer.type)}>
                    {offer.type === 'flash' ? (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {getTimeRemaining(offer.expiresAt)}
                      </span>
                    ) : (
                      offer.discount + '% OFF'
                    )}
                  </Badge>
                </div>
                
                <p className="text-xs text-stone-500 mt-1">{offer.description}</p>
                
                {offer.code && (
                  <div className="mt-2 bg-stone-50 p-1.5 rounded flex justify-between items-center">
                    <div className="text-xs text-stone-500">Use code:</div>
                    <div className="font-mono text-xs font-bold bg-stone-100 px-2 py-0.5 rounded">
                      {offer.code}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Button variant="ghost" size="sm" className="w-full flex items-center justify-center py-2 text-blue-600">
        See all offers
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
};

export default SpecialOffers;
