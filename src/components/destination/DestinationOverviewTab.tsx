
import React from "react";
import { Destination } from "@/integrations/supabase/custom-types";

interface DestinationOverviewTabProps {
  destination: Destination;
}

const DestinationOverviewTab: React.FC<DestinationOverviewTabProps> = ({ destination }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-semibold mb-4">About {destination.name}</h2>
        <p className="text-stone-600 leading-relaxed mb-4">{destination.description}</p>
      </div>
      
      {destination.bestTimeToVisit && (
        <div className="bg-stone-100 p-6 rounded-lg">
          <h3 className="text-xl font-display font-semibold mb-3">Best Time to Visit</h3>
          <p className="text-stone-600">{destination.bestTimeToVisit}</p>
        </div>
      )}
    </div>
  );
};

export default DestinationOverviewTab;
