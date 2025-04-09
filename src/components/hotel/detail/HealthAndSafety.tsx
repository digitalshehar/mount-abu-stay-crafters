
import React from 'react';
import { Shield, CheckCircle, AlertCircle, Droplets, Stethoscope, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from '@/components/ui/separator';

const HealthAndSafety: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-green-50">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            <CardTitle>Enhanced Health & Safety Measures</CardTitle>
          </div>
          <CardDescription>
            This property has implemented comprehensive protocols to ensure guest safety during your stay.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Hygiene & Cleanliness
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Droplets className="h-4 w-4 text-blue-500 mt-0.5" />
                  <span>Enhanced cleaning protocols using hospital-grade disinfectants</span>
                </li>
                <li className="flex items-start gap-2">
                  <Droplets className="h-4 w-4 text-blue-500 mt-0.5" />
                  <span>Frequent sanitization of high-touch surfaces</span>
                </li>
                <li className="flex items-start gap-2">
                  <Droplets className="h-4 w-4 text-blue-500 mt-0.5" />
                  <span>Hand sanitizer stations available throughout the property</span>
                </li>
                <li className="flex items-start gap-2">
                  <Droplets className="h-4 w-4 text-blue-500 mt-0.5" />
                  <span>Room sealed after cleaning for your safety</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <Stethoscope className="h-4 w-4 text-red-600" />
                Medical Assistance
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>24/7 access to medical professionals</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>First aid kits available on every floor</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Staff trained in emergency response procedures</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Nearby hospital contact information readily available</span>
                </li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-indigo-600" />
              Social Distancing Measures
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-50 p-3 rounded-md">
                <p className="font-medium">Elevator Protocol</p>
                <p className="text-slate-600">Capacity restrictions for elevators to maintain safe distance</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-md">
                <p className="font-medium">Common Areas</p>
                <p className="text-slate-600">Furniture arranged to allow proper distancing</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-md">
                <p className="font-medium">Restaurant Seating</p>
                <p className="text-slate-600">Tables spaced adequately apart with reduced capacity</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-md">
                <p className="font-medium">Contactless Options</p>
                <p className="text-slate-600">Digital check-in and mobile key options where available</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
        <div className="flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
          <div>
            <h3 className="font-medium text-amber-800">Important Notice</h3>
            <p className="text-sm text-amber-700">
              Health and safety measures may vary based on local guidelines. Please contact the property directly for specific details about current protocols.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthAndSafety;
