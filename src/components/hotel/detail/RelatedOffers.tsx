
import React from 'react';
import { Tag, AlertCircle } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface RelatedOffer {
  id: string;
  title: string;
  description: string;
  discount: number;
  expiresAt: string;
  tag: string;
}

interface RelatedOffersProps {
  hotelId?: number;
  hotelName?: string;
}

const RelatedOffers: React.FC<RelatedOffersProps> = ({ hotelId, hotelName }) => {
  // Mock data - in a real app, you would fetch this from an API based on the hotelId
  const offers = [
    {
      id: '1',
      title: 'Early Bird Booking',
      description: 'Book at least 30 days in advance and save 15% on your stay.',
      discount: 15,
      expiresAt: '2023-12-31',
      tag: 'early-booking'
    },
    {
      id: '2',
      title: 'Weekend Special',
      description: 'Enjoy 10% off on weekend stays with complimentary breakfast.',
      discount: 10,
      expiresAt: '2023-12-31',
      tag: 'weekend'
    },
    {
      id: '3',
      title: 'Stay Longer, Save More',
      description: 'Stay for 5 nights or more and get 20% off your entire stay.',
      discount: 20,
      expiresAt: '2023-12-31',
      tag: 'extended-stay'
    }
  ];

  if (!offers.length) {
    return (
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Related Offers</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
          <AlertCircle className="h-10 w-10 mb-2 opacity-40" />
          <p>No special offers available at this time.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Related Offers</CardTitle>
        <CardDescription>Special promotions available for this hotel</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {offers.map(offer => (
          <div key={offer.id} className="border rounded-md p-3 bg-card">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-start gap-2">
                <Tag className="h-4 w-4 mt-1 text-primary" />
                <div>
                  <h4 className="font-medium">{offer.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{offer.description}</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                {offer.discount}% OFF
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">View All Offers</Button>
      </CardFooter>
    </Card>
  );
};

export default RelatedOffers;
