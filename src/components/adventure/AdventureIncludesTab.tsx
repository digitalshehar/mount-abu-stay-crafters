
import React from "react";
import { Check } from "lucide-react";
import { Adventure } from "@/integrations/supabase/custom-types";

interface AdventureIncludesTabProps {
  adventure: Adventure;
}

const AdventureIncludesTab: React.FC<AdventureIncludesTabProps> = ({ adventure }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-semibold mb-4">What's Included</h2>
        <ul className="space-y-2">
          {adventure.includes?.map((item, index) => (
            <li key={index} className="flex items-center text-stone-600">
              <Check className="text-green-500 mr-2 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdventureIncludesTab;
