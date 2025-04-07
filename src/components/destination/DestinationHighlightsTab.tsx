
import React from "react";
import { Destination } from "@/integrations/supabase/custom-types";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

interface DestinationHighlightsTabProps {
  destination: Destination;
}

const DestinationHighlightsTab: React.FC<DestinationHighlightsTabProps> = ({ destination }) => {
  if (!destination.highlights || destination.highlights.length === 0) {
    return (
      <div className="text-center py-6 text-stone-500">
        No highlights available for this destination.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {destination.highlights.map((highlight, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="rounded-full bg-primary text-white p-1">
                    <Check className="h-4 w-4" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-stone-600">{highlight}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {destination.bestTimeToVisit && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-3">Best Time to Visit</h3>
          <p className="text-stone-600">{destination.bestTimeToVisit}</p>
        </div>
      )}
    </div>
  );
};

export default DestinationHighlightsTab;
