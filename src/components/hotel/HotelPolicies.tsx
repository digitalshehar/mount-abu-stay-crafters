
import React from "react";
import { Clock, MapPin, Phone, Mail, Globe, Shield } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface HotelPoliciesProps {
  checkInTime: string;
  checkOutTime: string;
  policies: string[];
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

const HotelPolicies = ({ 
  checkInTime, 
  checkOutTime, 
  policies,
  contactInfo,
  address,
  landmarks 
}: HotelPoliciesProps) => {
  return (
    <div>
      <h2 className="text-2xl font-display font-semibold mb-6">Hotel Policies & Information</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="check-in-out">
          <AccordionTrigger className="font-medium">Check-in & Check-out</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Check-in Time</p>
                  <p className="text-stone-600">{checkInTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Check-out Time</p>
                  <p className="text-stone-600">{checkOutTime}</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="hotel-policies">
          <AccordionTrigger className="font-medium">Hotel Policies</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2 text-stone-600">
              {policies.map((policy: string, idx: number) => (
                <li key={idx} className="flex items-start">
                  <Shield className="h-4 w-4 mr-2 mt-1 text-primary flex-shrink-0" />
                  <span>{policy}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="contact-information">
          <AccordionTrigger className="font-medium">Contact Information</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <p className="text-stone-600">{address}</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                <p className="text-stone-600">{contactInfo.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <p className="text-stone-600">{contactInfo.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                <p className="text-stone-600">{contactInfo.website}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="nearby-landmarks">
          <AccordionTrigger className="font-medium">Nearby Landmarks</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium">Airport</p>
                  <p className="text-stone-600">{landmarks.airport}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium">Bus Station</p>
                  <p className="text-stone-600">{landmarks.busStation}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium">City Center</p>
                  <p className="text-stone-600">{landmarks.cityCenter}</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default HotelPolicies;
