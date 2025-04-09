
import React from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface HotelMapProps {
  isOpen: boolean;
  onClose: () => void;
  hotelName: string;
  latitude: number;
  longitude: number;
}

const HotelMap: React.FC<HotelMapProps> = ({
  isOpen,
  onClose,
  hotelName,
  latitude,
  longitude
}) => {
  // Create an embed URL for Google Maps
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBLo0Q0LmQRxwBpCQ1WmRs7_tJnlgLrTQ4&q=${latitude},${longitude}&zoom=15`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] p-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle>Location of {hotelName}</DialogTitle>
          <Button 
            variant="ghost" 
            className="absolute right-2 top-2 h-8 w-8 p-0" 
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="h-[450px] w-full">
          <iframe
            title={`Map showing location of ${hotelName}`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            src={mapUrl}
            allowFullScreen
          ></iframe>
        </div>

        <div className="p-4 border-t bg-slate-50">
          <div className="text-sm text-slate-600">
            <p className="font-medium">{hotelName}</p>
            <p className="text-slate-500">Coordinates: {latitude.toFixed(4)}, {longitude.toFixed(4)}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HotelMap;
