
import React from "react";
import { Check, Shield } from "lucide-react";

const HotelPolicyItems = () => {
  return (
    <div className="bg-stone-50 p-4 rounded-lg border border-stone-100">
      <div className="flex items-center mb-3">
        <Shield className="h-5 w-5 text-green-600 mr-2" />
        <h3 className="font-medium">Policies</h3>
      </div>
      <div className="space-y-2 text-stone-600 text-sm">
        <div className="flex items-start">
          <Check className="h-4 w-4 text-green-600 mt-0.5 mr-1.5 flex-shrink-0" />
          <span>Free cancellation (before 48 hours)</span>
        </div>
        <div className="flex items-start">
          <Check className="h-4 w-4 text-green-600 mt-0.5 mr-1.5 flex-shrink-0" />
          <span>No smoking rooms available</span>
        </div>
        <div className="flex items-start">
          <Check className="h-4 w-4 text-green-600 mt-0.5 mr-1.5 flex-shrink-0" />
          <span>Pets not allowed</span>
        </div>
      </div>
    </div>
  );
};

export default HotelPolicyItems;
