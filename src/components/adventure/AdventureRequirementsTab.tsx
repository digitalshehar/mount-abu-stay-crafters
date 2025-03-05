
import React from "react";
import { Check, AlertTriangle } from "lucide-react";
import { Adventure } from "@/integrations/supabase/custom-types";

interface AdventureRequirementsTabProps {
  adventure: Adventure;
}

const AdventureRequirementsTab: React.FC<AdventureRequirementsTabProps> = ({ adventure }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-semibold mb-4">Requirements</h2>
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-4">
          <div className="flex items-start">
            <AlertTriangle className="text-amber-500 mt-1 mr-2 flex-shrink-0" />
            <div>
              <p className="font-medium text-amber-900">Important Information</p>
              <p className="text-amber-800">Minimum age: {adventure.minAge} years</p>
            </div>
          </div>
        </div>
        <ul className="space-y-2">
          {adventure.requirements?.map((item, index) => (
            <li key={index} className="flex items-center text-stone-600">
              <Check className="text-primary mr-2 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdventureRequirementsTab;
