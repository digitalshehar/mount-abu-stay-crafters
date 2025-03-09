
import React from 'react';
import { Map, Phone, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ContactLocationProps {
  hotel: any;
}

const ContactLocation: React.FC<ContactLocationProps> = ({ hotel }) => {
  return (
    <div className="bg-white rounded-lg border border-stone-200 p-6 shadow-sm">
      <h3 className="font-semibold text-lg mb-4">Contact & Location</h3>
      <div className="space-y-4">
        <div className="flex items-start">
          <Map className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
          <div>
            <p className="font-medium">Address</p>
            <p className="text-sm text-stone-600">{hotel.address || `${hotel.location}, India`}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Phone className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
          <div>
            <p className="font-medium">Phone</p>
            <p className="text-sm text-stone-600">{hotel.contactInfo?.phone || "+91 2974 123456"}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Mail className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
          <div>
            <p className="font-medium">Email</p>
            <p className="text-sm text-stone-600">{hotel.contactInfo?.email || "info@hotelinmountabu.com"}</p>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-3">
          <p className="font-medium">Nearby Landmarks</p>
          {Object.entries(hotel.landmarks || {
            "Airport": "100 km",
            "Bus Station": "1.5 km",
            "City Center": "0.5 km"
          }).map(([key, value], idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span className="text-stone-600">{key}</span>
              <span className="text-stone-800">{value?.toString() || ""}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactLocation;
