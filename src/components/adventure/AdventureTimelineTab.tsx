
import React from "react";
import { Adventure } from "@/integrations/supabase/custom-types";

interface AdventureTimelineTabProps {
  adventure: Adventure;
}

const AdventureTimelineTab: React.FC<AdventureTimelineTabProps> = ({ adventure }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-semibold mb-4">Activity Timeline</h2>
        <div className="space-y-4">
          {adventure.timeline?.map((item, index) => (
            <div key={index} className="flex">
              <div className="mr-4 relative">
                <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center">
                  {index + 1}
                </div>
                {index < adventure.timeline.length - 1 && (
                  <div className="absolute top-6 bottom-0 left-3 w-px bg-stone-200"></div>
                )}
              </div>
              <div className="pb-6">
                <p className="text-stone-600">{item}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdventureTimelineTab;
