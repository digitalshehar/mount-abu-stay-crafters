
import React from "react";
import { Destination } from "@/integrations/supabase/custom-types";

interface DestinationHighlightsTabProps {
  destination: Destination;
}

const DestinationHighlightsTab: React.FC<DestinationHighlightsTabProps> = ({ destination }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-semibold mb-4">Top Attractions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {destination.highlights?.map((highlight, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-stone-100">
              <h3 className="font-semibold">{highlight}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationHighlightsTab;
