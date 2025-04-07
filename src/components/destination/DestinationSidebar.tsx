
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Info } from "lucide-react";

interface DestinationSidebarProps {
  location: string;
  bestTimeToVisit?: string;
  onBookClick?: () => void;
}

const DestinationSidebar: React.FC<DestinationSidebarProps> = ({ 
  location, 
  bestTimeToVisit,
  onBookClick
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-stone-500">Location</h3>
              <p className="font-medium">{location}</p>
            </div>
          </div>
          
          {bestTimeToVisit && (
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-stone-500">Best Time to Visit</h3>
                <p className="font-medium">{bestTimeToVisit}</p>
              </div>
            </div>
          )}
          
          <Button 
            className="w-full" 
            onClick={onBookClick}
          >
            Book Adventures
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1 mr-3">
              <Info className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium mb-2">Travel Tips</h3>
              <ul className="space-y-2 text-stone-600 text-sm">
                <li>• Carry enough water when exploring outdoor attractions</li>
                <li>• Early morning is the best time for sightseeing</li>
                <li>• Local transportation options include taxis and auto-rickshaws</li>
                <li>• Keep emergency contact numbers handy</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DestinationSidebar;
