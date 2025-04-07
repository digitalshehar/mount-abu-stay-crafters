
import React from "react";
import { Destination } from "@/integrations/supabase/custom-types";

interface DestinationOverviewTabProps {
  destination: Destination;
}

const DestinationOverviewTab: React.FC<DestinationOverviewTabProps> = ({ destination }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">About {destination.name}</h3>
        <div className="text-stone-600 space-y-4">
          {destination.description?.split('\n').map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </div>
      
      {destination.highlights && destination.highlights.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Highlights</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
            {destination.highlights.slice(0, 6).map((highlight, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-primary font-bold mr-2">•</span>
                <span className="text-stone-600">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {destination.bestTimeToVisit && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Best Time to Visit</h3>
          <p className="text-stone-600">{destination.bestTimeToVisit}</p>
        </div>
      )}
    </div>
  );
};

export default DestinationOverviewTab;
