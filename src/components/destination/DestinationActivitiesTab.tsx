
import React from "react";
import { Destination } from "@/integrations/supabase/custom-types";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface DestinationActivitiesTabProps {
  destination: Destination;
}

const DestinationActivitiesTab: React.FC<DestinationActivitiesTabProps> = ({ destination }) => {
  if (!destination.activities || destination.activities.length === 0) {
    return (
      <div className="text-center py-6 text-stone-500">
        No activities available for this destination.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destination.activities.map((activity, index) => (
          <Card key={index} className="overflow-hidden group hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
                    <span className="text-lg font-bold">{index + 1}</span>
                  </div>
                  <h3 className="font-medium mb-2">{activity}</h3>
                </div>
                <div className="p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DestinationActivitiesTab;
