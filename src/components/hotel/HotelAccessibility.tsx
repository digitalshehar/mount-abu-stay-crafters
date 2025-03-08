
import React from "react";
import { Check, X } from "lucide-react";

interface AccessibilityFeature {
  name: string;
  available: boolean;
}

interface HotelAccessibilityProps {
  features?: AccessibilityFeature[];
}

const HotelAccessibility = ({ features }: HotelAccessibilityProps) => {
  // Default accessibility features if none provided
  const accessibilityFeatures = features || [
    { name: "Wheelchair accessible entrance", available: true },
    { name: "Accessible parking", available: true },
    { name: "Elevator access", available: true },
    { name: "Accessible bathroom", available: true },
    { name: "Roll-in shower", available: false },
    { name: "Visual alarms", available: false },
    { name: "Braille signage", available: true },
    { name: "Service animals allowed", available: true },
    { name: "Accessible restaurant", available: true },
    { name: "Hearing accessible rooms", available: false }
  ];

  return (
    <div>
      <h2 className="text-2xl font-display font-semibold mb-6">Accessibility Features</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {accessibilityFeatures.map((feature, index) => (
          <div key={index} className="flex items-center gap-3 p-3 rounded-md">
            {feature.available ? (
              <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
            ) : (
              <X className="h-5 w-5 text-stone-400 flex-shrink-0" />
            )}
            <span className={feature.available ? "text-stone-800" : "text-stone-500"}>
              {feature.name}
            </span>
          </div>
        ))}
      </div>
      
      <div className="mt-6 bg-stone-50 p-4 rounded-lg border border-stone-200">
        <p className="text-sm text-stone-600">
          Need specific accessibility accommodations? Please contact the hotel directly at 
          <span className="font-semibold"> +91 2974 123456</span> to ensure your needs are met before arrival.
        </p>
      </div>
    </div>
  );
};

export default HotelAccessibility;
