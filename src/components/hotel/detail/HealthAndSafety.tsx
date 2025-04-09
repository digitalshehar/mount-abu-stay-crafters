
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Shield, Thermometer, SprayCan, Users, Hand, Utensils, Award } from 'lucide-react';

const HealthAndSafety: React.FC = () => {
  const cleaningMeasures = [
    { icon: <SprayCan className="h-4 w-4" />, label: 'Regular sanitization of high-touch surfaces' },
    { icon: <Shield className="h-4 w-4" />, label: 'EPA-approved disinfectants used for cleaning' },
    { icon: <Thermometer className="h-4 w-4" />, label: 'Temperature checks for staff' },
  ];
  
  const physicalDistancing = [
    { icon: <Users className="h-4 w-4" />, label: 'Contactless check-in and check-out available' },
    { icon: <Hand className="h-4 w-4" />, label: 'Protective screens at front desks' },
    { icon: <Utensils className="h-4 w-4" />, label: 'Modified food service with safety protocols' },
  ];
  
  const certifications = [
    { name: 'COVID-19 Safety Certified', color: 'bg-green-100 text-green-800 border-green-200' },
    { name: 'Enhanced Cleaning Protocol', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    { name: 'Safe Travel Verified', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  ];
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center">
            <Shield className="h-5 w-5 mr-2 text-blue-600" />
            <CardTitle>Health & Safety Measures</CardTitle>
          </div>
          <CardDescription>
            Special measures implemented at this property to provide a safe and healthy stay
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {certifications.map((cert, index) => (
              <Badge key={index} variant="outline" className={cert.color}>
                <Award className="h-3 w-3 mr-1" />
                {cert.name}
              </Badge>
            ))}
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3 flex items-center">
                <SprayCan className="h-4 w-4 mr-2 text-green-600" />
                Enhanced Cleaning Procedures
              </h3>
              <ul className="space-y-2">
                {cleaningMeasures.map((measure, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{measure.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-3 flex items-center">
                <Users className="h-4 w-4 mr-2 text-blue-600" />
                Physical Distancing
              </h3>
              <ul className="space-y-2">
                {physicalDistancing.map((measure, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{measure.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-md border border-amber-100">
            <h3 className="font-medium text-amber-800 mb-2">Cancellation Policy During COVID-19</h3>
            <p className="text-sm text-amber-700">
              Special cancellation conditions may apply. Please check with the property for specific terms and conditions.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthAndSafety;
