
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, Globe, Clock } from 'lucide-react';

interface HotelContactProps {
  phone?: string;
  email?: string;
  website?: string;
  checkInTime?: string;
  checkOutTime?: string;
}

const HotelContact: React.FC<HotelContactProps> = ({ 
  phone = "+91 2974 123456",
  email = "info@hotelmountabu.com",
  website = "www.hotelmountabu.com",
  checkInTime = "2:00 PM",
  checkOutTime = "12:00 PM" 
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Contact & Check-in</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-3">
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-2 text-primary" />
            <span className="text-sm">{phone}</span>
          </div>
          
          <div className="flex items-center">
            <Mail className="h-4 w-4 mr-2 text-primary" />
            <span className="text-sm">{email}</span>
          </div>
          
          <div className="flex items-center">
            <Globe className="h-4 w-4 mr-2 text-primary" />
            <span className="text-sm">{website}</span>
          </div>
          
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-primary" />
            <div>
              <div className="text-sm">Check-in: {checkInTime}</div>
              <div className="text-sm">Check-out: {checkOutTime}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HotelContact;
