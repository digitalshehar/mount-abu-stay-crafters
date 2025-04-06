
import React from "react";
import { TagIcon, Clock, Gift, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const specialOffers = [
  {
    title: "Early Bird Discount",
    description: "Book at least 30 days in advance and get 15% off your stay",
    icon: <Clock className="h-5 w-5" />,
    buttonText: "Book Early",
    color: "bg-blue-50 text-blue-700 border-blue-100"
  },
  {
    title: "Extended Stay Offer",
    description: "Stay for 5 nights or more and get 1 night free",
    icon: <Calendar className="h-5 w-5" />,
    buttonText: "View Offer",
    color: "bg-amber-50 text-amber-700 border-amber-100"
  },
  {
    title: "Complimentary Dinner",
    description: "Book a luxury suite and enjoy a complimentary dinner for two",
    icon: <Gift className="h-5 w-5" />,
    buttonText: "Book Suite",
    color: "bg-green-50 text-green-700 border-green-100"
  }
];

const SpecialOffers = () => {
  return (
    <div className="mt-8">
      <div className="flex items-center mb-4">
        <TagIcon className="h-5 w-5 text-primary mr-2" />
        <h3 className="text-lg font-semibold">Special Offers</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {specialOffers.map((offer, index) => (
          <div 
            key={index} 
            className={`p-4 rounded-lg border ${offer.color} hover:shadow-sm transition-shadow`}
          >
            <div className="flex items-center mb-2">
              {offer.icon}
              <h4 className="font-medium ml-2">{offer.title}</h4>
            </div>
            <p className="text-sm mb-3">{offer.description}</p>
            <Button 
              variant="outline" 
              size="sm" 
              className={`w-full ${offer.color.includes('blue') ? 'border-blue-200 hover:bg-blue-100' : 
                offer.color.includes('amber') ? 'border-amber-200 hover:bg-amber-100' : 
                'border-green-200 hover:bg-green-100'}`}
            >
              {offer.buttonText}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialOffers;
