
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const DestinationSidebar: React.FC = () => {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-xl shadow-md p-6 border border-stone-100 sticky top-24">
        <h2 className="text-2xl font-display font-semibold mb-4">Location Information</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Weather</h3>
            <p className="text-stone-600">Due to its elevation, Mount Abu enjoys a pleasant climate throughout most of the year. Summers (April to June) are mild compared to the surrounding regions, while winters (November to February) can get quite cool.</p>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-medium mb-2">How to Reach</h3>
            <div className="space-y-2 text-stone-600">
              <p><span className="font-medium">By Air:</span> The nearest airport is Udaipur (185 km).</p>
              <p><span className="font-medium">By Train:</span> Abu Road railway station (28 km) is well connected.</p>
              <p><span className="font-medium">By Road:</span> Well connected to major cities in Rajasthan and Gujarat.</p>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-medium mb-2">Local Transportation</h3>
            <p className="text-stone-600">Taxis, auto-rickshaws, and rental vehicles are readily available for local transportation.</p>
          </div>
        </div>
        
        <div className="mt-6">
          <Button asChild className="w-full">
            <Link to="/adventures">Explore All Adventures</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DestinationSidebar;
