
import React from "react";
import { Clock, CreditCard, ShieldCheck, Users } from "lucide-react";

export interface HotelPoliciesProps {
  checkInTime?: string;
  checkOutTime?: string;
  policies?: string[];
  contactInfo?: {
    phone?: string;
    email?: string;
  };
  cancellationPolicy?: string;
  paymentOptions?: string[];
}

const HotelPolicies = ({
  checkInTime = "12:00 PM",
  checkOutTime = "10:00 AM",
  policies = [],
  contactInfo = {},
  cancellationPolicy = "Free cancellation up to 24 hours before check-in",
  paymentOptions = ["Credit Card", "Debit Card", "Cash"]
}: HotelPoliciesProps) => {
  // Default policies if none provided
  const defaultPolicies = [
    "Pets are not allowed",
    "Non-smoking rooms available",
    "No parties or events",
    "ID required at check-in"
  ];

  const allPolicies = policies.length > 0 ? policies : defaultPolicies;

  return (
    <div>
      <h2 className="text-2xl font-display font-semibold mb-6">Hotel Policies</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Check-in & Check-out</h3>
          </div>
          <div className="space-y-2 text-stone-600">
            <p className="text-sm">Check-in: from {checkInTime}</p>
            <p className="text-sm">Check-out: until {checkOutTime}</p>
            <p className="text-sm mt-4">
              Early check-in and late check-out available on request, subject to availability.
            </p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Cancellation Policy</h3>
          </div>
          <p className="text-sm text-stone-600">{cancellationPolicy}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100">
          <div className="flex items-center gap-3 mb-4">
            <Users className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">General Policies</h3>
          </div>
          <ul className="list-disc list-inside space-y-2 text-sm text-stone-600">
            {allPolicies.map((policy, index) => (
              <li key={index}>{policy}</li>
            ))}
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100">
          <div className="flex items-center gap-3 mb-4">
            <CreditCard className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Payment Options</h3>
          </div>
          <div className="space-y-4">
            <div>
              <ul className="list-disc list-inside space-y-2 text-sm text-stone-600">
                {paymentOptions.map((option, index) => (
                  <li key={index}>{option}</li>
                ))}
              </ul>
            </div>
            
            {(contactInfo.phone || contactInfo.email) && (
              <div className="mt-4 pt-4 border-t border-stone-100">
                <h4 className="font-medium text-sm mb-2">Contact for inquiries:</h4>
                {contactInfo.phone && (
                  <p className="text-sm text-stone-600">Phone: {contactInfo.phone}</p>
                )}
                {contactInfo.email && (
                  <p className="text-sm text-stone-600">Email: {contactInfo.email}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelPolicies;
