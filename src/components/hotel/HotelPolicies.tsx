
import React from 'react';
import { Clock, Calendar, Shield, Phone, Mail, Globe, MapPin, Plane, Bus, Building } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface ContactInfo {
  phone: string;
  email: string;
  website: string;
}

interface Landmarks {
  airport: string;
  busStation: string;
  cityCenter: string;
}

export interface HotelPoliciesProps {
  checkInTime: string;
  checkOutTime: string;
  policies: string[];
  contactInfo: ContactInfo;
  address: string;
  landmarks: Landmarks;
}

const HotelPolicies: React.FC<HotelPoliciesProps> = ({
  checkInTime,
  checkOutTime,
  policies,
  contactInfo,
  address,
  landmarks
}) => {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-display font-semibold mb-6">Hotel Policies</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Clock className="mr-2 h-5 w-5 text-primary" />
                Check-in & Check-out
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Check-in Time</p>
                  <p className="text-sm text-stone-600">{checkInTime}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Check-out Time</p>
                  <p className="text-sm text-stone-600">{checkOutTime}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-primary" />
                Cancellation Policy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-stone-600">
                Free cancellation up to 48 hours before check-in. After that, cancellation will incur a fee equivalent to one night's stay.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section>
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Shield className="mr-2 h-5 w-5 text-primary" />
          House Rules
        </h3>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100">
          <ul className="space-y-3">
            {policies.map((policy, index) => (
              <li key={index} className="text-stone-600 flex items-start">
                <span className="text-primary mr-2">•</span>
                {policy}
              </li>
            ))}
          </ul>
        </div>
      </section>
      
      <Separator />
      
      <section>
        <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">How to Reach Us</h4>
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-stone-600">{contactInfo.phone}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-stone-600">{contactInfo.email}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Globe className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Website</p>
                  <p className="text-sm text-stone-600">{contactInfo.website}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Location</h4>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Address</p>
                    <p className="text-sm text-stone-600">{address}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Plane className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Nearest Airport</p>
                  <p className="text-sm text-stone-600">{landmarks.airport}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Bus className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Nearest Bus Station</p>
                  <p className="text-sm text-stone-600">{landmarks.busStation}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Building className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Distance from City Center</p>
                  <p className="text-sm text-stone-600">{landmarks.cityCenter}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HotelPolicies;
