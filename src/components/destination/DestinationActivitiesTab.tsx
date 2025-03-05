
import React from "react";
import { Destination } from "@/integrations/supabase/custom-types";

interface DestinationActivitiesTabProps {
  destination: Destination;
}

const DestinationActivitiesTab: React.FC<DestinationActivitiesTabProps> = ({ destination }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-semibold mb-4">Popular Activities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {destination.activities?.map((activity, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-stone-100">
              <h3 className="font-semibold">{activity}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationActivitiesTab;
