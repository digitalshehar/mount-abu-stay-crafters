
import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarClock, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sample data for special offers
const specialOffers = [
  {
    id: 1,
    title: 'Summer Monsoon Special',
    image: '/images/offer1.jpg',
    discount: 25,
    description: 'Beat the heat with our special monsoon package. Book a 3-night stay and get 25% off.',
    validUntil: '2023-08-31',
    code: 'MONSOON25'
  },
  {
    id: 2,
    title: 'Honeymoon Package',
    image: '/images/offer2.jpg',
    discount: 15,
    description: 'Special romantic package including deluxe room, candlelight dinner, and couples spa treatment.',
    validUntil: '2023-09-30',
    code: 'LOVE15'
  },
  {
    id: 3,
    title: 'Weekend Gateway',
    image: '/images/offer3.jpg',
    discount: 10,
    description: 'Weekend special: 10% off on all room types for Friday to Sunday stays.',
    validUntil: '2023-10-31',
    code: 'WEEKEND10'
  }
];

const SpecialOffers: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {specialOffers.map((offer) => (
        <div key={offer.id} className="bg-white rounded-lg overflow-hidden shadow-md border border-stone-200">
          <div className="relative h-48">
            <img 
              src={offer.image} 
              alt={offer.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {offer.discount}% OFF
            </div>
          </div>
          
          <div className="p-5">
            <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
            <p className="text-stone-600 text-sm mb-4">{offer.description}</p>
            
            <div className="flex items-center mb-2 text-sm text-stone-500">
              <CalendarClock size={16} className="mr-1" />
              <span>Valid until {new Date(offer.validUntil).toLocaleDateString()}</span>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <div className="bg-stone-100 px-3 py-1 rounded-md border border-stone-200">
                <span className="text-xs text-stone-500">Promo code:</span>
                <span className="font-mono font-medium text-stone-800 ml-1">{offer.code}</span>
              </div>
              
              <Button size="sm" asChild>
                <Link to="/hotels">Book Now</Link>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SpecialOffers;
