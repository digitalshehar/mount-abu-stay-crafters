
import React from 'react';
import { Phone, Mail, Globe, MapPin, ExternalLink } from 'lucide-react';

interface ContactLocationProps {
  contactInfo: {
    phone: string;
    email: string;
    website: string;
  };
  address: string;
  landmarks: {
    airport: string;
    busStation: string;
    cityCenter: string;
  };
}

const ContactLocation: React.FC<ContactLocationProps> = ({
  contactInfo,
  address,
  landmarks
}) => {
  return (
    <div className="bg-white rounded-lg border border-stone-200 p-4">
      <h3 className="font-semibold mb-3">Contact & Location</h3>
      
      {/* Contact Info */}
      <div className="space-y-2 mb-4">
        {contactInfo?.phone && (
          <div className="flex items-center text-sm">
            <Phone className="h-4 w-4 mr-2 text-blue-500" />
            <a href={`tel:${contactInfo.phone}`} className="hover:text-blue-600">
              {contactInfo.phone}
            </a>
          </div>
        )}
        
        {contactInfo?.email && (
          <div className="flex items-center text-sm">
            <Mail className="h-4 w-4 mr-2 text-blue-500" />
            <a href={`mailto:${contactInfo.email}`} className="hover:text-blue-600">
              {contactInfo.email}
            </a>
          </div>
        )}
        
        {contactInfo?.website && (
          <div className="flex items-center text-sm">
            <Globe className="h-4 w-4 mr-2 text-blue-500" />
            <a 
              href={`https://${contactInfo.website}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-600 flex items-center"
            >
              {contactInfo.website}
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
        )}
      </div>
      
      {/* Address */}
      {address && (
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-1">Address</h4>
          <div className="flex text-sm">
            <MapPin className="h-4 w-4 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
            <p>{address}</p>
          </div>
        </div>
      )}
      
      {/* Landmarks */}
      {landmarks && (
        <div>
          <h4 className="text-sm font-medium mb-1">Nearby Landmarks</h4>
          <ul className="space-y-1 text-sm">
            {landmarks.airport && (
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                <span>Airport: {landmarks.airport}</span>
              </li>
            )}
            {landmarks.busStation && (
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                <span>Bus Station: {landmarks.busStation}</span>
              </li>
            )}
            {landmarks.cityCenter && (
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                <span>City Center: {landmarks.cityCenter}</span>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ContactLocation;
