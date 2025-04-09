import React from 'react';
import { MapPin, Navigation, Phone, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface NearbyAttraction {
  name: string;
  distance: string;
  description?: string;
}

interface Landmarks {
  airport: string;
  busStation: string;
  cityCenter: string;
}

interface ContactInfo {
  phone: string;
  email: string;
  website?: string;
}

interface HotelLocationProps {
  address: string;
  latitude?: number;
  longitude?: number;
  nearbyAttractions?: NearbyAttraction[];
  landmarks?: Partial<Landmarks>;
  contactInfo?: Partial<ContactInfo>;
}

const HotelLocation: React.FC<HotelLocationProps> = ({
  address,
  latitude = 24.5927,
  longitude = 72.7156,
  nearbyAttractions = [],
  landmarks,
  contactInfo
}) => {
  const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${latitude},${longitude}&zoom=15`;
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video relative rounded-md overflow-hidden border mb-4">
                <iframe
                  src={googleMapsUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              </div>
              
              <div className="flex items-start space-x-2 mb-4">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-gray-600">{address}</p>
                </div>
              </div>
              
              <div className="flex justify-between gap-4">
                <Button variant="outline" className="flex-1">
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Directions
                </Button>
                
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button variant="outline" className="w-full">
                    <MapPin className="h-4 w-4 mr-2" />
                    View on Google Maps
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Contact & Landmarks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {contactInfo && (
                <div className="space-y-2">
                  <h3 className="font-medium text-sm text-gray-500">Contact Information</h3>
                  
                  {contactInfo.phone && (
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-primary" />
                      <a href={`tel:${contactInfo.phone}`} className="text-gray-700 hover:text-primary">
                        {contactInfo.phone}
                      </a>
                    </div>
                  )}
                  
                  {contactInfo.email && (
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <a href={`mailto:${contactInfo.email}`} className="text-gray-700 hover:text-primary">
                        {contactInfo.email}
                      </a>
                    </div>
                  )}
                  
                  {contactInfo.website && (
                    <div className="flex items-center space-x-2">
                      <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      <a 
                        href={contactInfo.website.startsWith('http') ? contactInfo.website : `https://${contactInfo.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-primary"
                      >
                        {contactInfo.website}
                      </a>
                    </div>
                  )}
                </div>
              )}
              
              {landmarks && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <h3 className="font-medium text-sm text-gray-500">Nearby Landmarks</h3>
                    
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Airport</span>
                        <span className="text-gray-800 font-medium">{landmarks.airport}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bus Station</span>
                        <span className="text-gray-800 font-medium">{landmarks.busStation}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">City Center</span>
                        <span className="text-gray-800 font-medium">{landmarks.cityCenter}</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      {nearbyAttractions && nearbyAttractions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Nearby Attractions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {nearbyAttractions.map((attraction, index) => (
                <div key={index} className="flex space-x-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{attraction.name}</h4>
                      <span className="text-sm text-gray-500">{attraction.distance}</span>
                    </div>
                    {attraction.description && (
                      <p className="text-sm text-gray-600 mt-1">{attraction.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HotelLocation;
