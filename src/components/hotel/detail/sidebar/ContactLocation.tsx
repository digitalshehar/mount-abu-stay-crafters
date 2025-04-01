
import React from 'react';
import { MapPin, Phone, Mail, Globe, ExternalLink, Navigation } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ContactLocationProps {
  address?: string;
  contactInfo?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  landmarks?: {
    airport?: string;
    busStation?: string;
    cityCenter?: string;
  };
}

const ContactLocation: React.FC<ContactLocationProps> = ({ 
  address = '', 
  contactInfo = {}, 
  landmarks = {} 
}) => {
  // Safely access nested properties
  const { phone = '', email = '', website = '' } = contactInfo;
  const { airport = '', busStation = '', cityCenter = '' } = landmarks;
  
  // Generate Google Maps URL for the address
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  
  return (
    <div className="bg-white rounded-lg border border-stone-200 p-4">
      <h3 className="font-semibold mb-3">Contact & Location</h3>
      
      {/* Address */}
      <div className="mb-4">
        <div className="flex items-start">
          <MapPin className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
          <div>
            <p className="text-sm text-stone-600">{address}</p>
            <Button
              variant="link"
              size="sm"
              className="p-0 h-auto text-blue-600 text-xs flex items-center mt-1"
              asChild
            >
              <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3 w-3 mr-1" />
                View on map
              </a>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Contact info */}
      <div className="space-y-2 mb-4">
        {phone && (
          <div className="flex items-center">
            <Phone className="h-4 w-4 text-primary mr-2" />
            <a href={`tel:${phone}`} className="text-sm text-stone-600 hover:text-stone-900">
              {phone}
            </a>
          </div>
        )}
        
        {email && (
          <div className="flex items-center">
            <Mail className="h-4 w-4 text-primary mr-2" />
            <a href={`mailto:${email}`} className="text-sm text-stone-600 hover:text-stone-900">
              {email}
            </a>
          </div>
        )}
        
        {website && (
          <div className="flex items-center">
            <Globe className="h-4 w-4 text-primary mr-2" />
            <a 
              href={website.startsWith('http') ? website : `https://${website}`} 
              className="text-sm text-stone-600 hover:text-stone-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              {website}
            </a>
          </div>
        )}
      </div>
      
      {/* Nearby landmarks */}
      {(airport || busStation || cityCenter) && (
        <div>
          <h4 className="text-sm font-medium mb-2">Nearby</h4>
          <div className="space-y-2">
            {airport && (
              <div className="flex items-start">
                <Navigation className="h-3 w-3 text-stone-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-xs text-stone-600">{airport}</span>
              </div>
            )}
            
            {busStation && (
              <div className="flex items-start">
                <Navigation className="h-3 w-3 text-stone-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-xs text-stone-600">{busStation}</span>
              </div>
            )}
            
            {cityCenter && (
              <div className="flex items-start">
                <Navigation className="h-3 w-3 text-stone-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-xs text-stone-600">{cityCenter}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactLocation;
