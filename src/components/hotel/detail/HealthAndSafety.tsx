
import React from "react";
import { Info, Check } from "lucide-react";

const HealthAndSafety = () => {
  return (
    <div className="mt-8 bg-green-50 p-6 rounded-lg border border-green-100">
      <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
        <Info className="h-5 w-5 mr-2 text-green-700" />
        Health & Safety Measures
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
        {[
          "Enhanced cleaning practices",
          "Social distancing measures",
          "Staff trained in safety protocol",
          "Temperature checks for staff",
          "Contactless check-in/out available",
          "Hand sanitizer provided"
        ].map((measure, idx) => (
          <div key={idx} className="flex items-start">
            <Check className="h-4 w-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
            <span className="text-sm text-green-800">{measure}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthAndSafety;
