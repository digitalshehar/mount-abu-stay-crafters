
import React from "react";
import { MapPin, Users } from "lucide-react";
import { Adventure } from "@/integrations/supabase/custom-types";

interface AdventureOverviewTabProps {
  adventure: Adventure;
}

const AdventureOverviewTab: React.FC<AdventureOverviewTabProps> = ({ adventure }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-semibold mb-4">About this adventure</h2>
        <p className="text-stone-600 leading-relaxed">{adventure.description}</p>
      </div>
      
      <div>
        <h3 className="text-xl font-display font-semibold mb-3">Meeting Point</h3>
        <div className="bg-stone-100 p-4 rounded-lg flex items-start">
          <MapPin className="text-primary mt-1 mr-2 flex-shrink-0" />
          <div>
            <p className="font-medium">{adventure.meetingPoint}</p>
            <p className="text-stone-600 text-sm">You'll receive detailed directions upon booking</p>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-display font-semibold mb-3">Group Size</h3>
        <div className="flex items-center text-stone-600">
          <Users className="mr-2" />
          <span>Maximum {adventure.maxGroupSize} participants</span>
        </div>
      </div>
    </div>
  );
};

export default AdventureOverviewTab;
