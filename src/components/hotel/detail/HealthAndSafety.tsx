
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, CheckCircle, AlertCircle, Sparkles, Virus, HeartPulse, Utensils, Check } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const HealthAndSafety: React.FC = () => {
  const safetyMeasures = [
    {
      category: 'Cleanliness & Sanitization',
      icon: <Sparkles className="h-5 w-5 text-blue-500" />,
      measures: [
        'Enhanced cleaning protocols using hospital-grade disinfectants',
        'Sanitization of high-touch surfaces every 2 hours',
        'Rooms sealed after cleaning until guest arrival',
        'Contactless check-in and check-out options',
        'Hand sanitizing stations throughout the property'
      ]
    },
    {
      category: 'COVID-19 Precautions',
      icon: <Virus className="h-5 w-5 text-amber-500" />,
      measures: [
        'Staff trained in COVID-19 safety protocols',
        'Staff temperature checks before each shift',
        'Masks available for all guests upon request',
        'Social distancing measures in public areas',
        'Improved ventilation systems throughout the property'
      ]
    },
    {
      category: 'Medical Services',
      icon: <HeartPulse className="h-5 w-5 text-red-500" />,
      measures: [
        'On-call doctor available 24/7',
        'First aid-trained staff on every shift',
        'First aid kits on each floor',
        'AED (Automated External Defibrillator) on premises',
        'Nearby hospital information provided at check-in'
      ]
    },
    {
      category: 'Food Safety',
      icon: <Utensils className="h-5 w-5 text-green-500" />,
      measures: [
        'HACCP certified kitchen practices',
        'Regular food safety audits',
        'Allergen information available upon request',
        'Individually packaged food options available',
        'In-room dining with contactless delivery'
      ]
    }
  ];

  const certifications = [
    {
      name: 'ISO 9001 Quality Management',
      description: 'International standard for quality management systems'
    },
    {
      name: 'ISO 22000 Food Safety',
      description: 'International standard for food safety management'
    },
    {
      name: 'Green Key Certification',
      description: 'Eco-friendly practices and sustainability'
    },
    {
      name: 'SafeGuard Hygiene Excellence',
      description: 'Enhanced cleaning and disinfection protocols'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle>Health & Safety Measures</CardTitle>
          </div>
          <CardDescription>
            Comprehensive measures implemented to ensure your safety and well-being during your stay
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {safetyMeasures.map((category, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  {category.icon}
                  <h3 className="font-medium">{category.category}</h3>
                </div>
                <ul className="space-y-2">
                  {category.measures.map((measure, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{measure}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Certifications & Compliance</CardTitle>
          <CardDescription>
            Standards and certifications maintained by the property
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-start gap-2 p-3 border rounded-lg">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">{cert.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{cert.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Emergency Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="emergency-contacts">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span>Emergency Contacts</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pl-6">
                  <div>
                    <h4 className="font-medium text-sm">Hotel Emergency</h4>
                    <p className="text-sm">Dial 9 from your room phone</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Police</h4>
                    <p className="text-sm">100</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Ambulance</h4>
                    <p className="text-sm">108</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Fire</h4>
                    <p className="text-sm">101</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="evacuation">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span>Evacuation Procedures</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pl-6">
                  <p className="text-sm">In case of an emergency requiring evacuation:</p>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Remain calm and exit your room immediately</li>
                    <li>Follow the emergency exit signs</li>
                    <li>Do not use elevators</li>
                    <li>Proceed to the assembly point in the parking area</li>
                    <li>Wait for further instructions from hotel staff</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="medical">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span>Medical Emergencies</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pl-6">
                  <p className="text-sm">For medical emergencies:</p>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Call front desk by dialing 0 from your room phone</li>
                    <li>Request medical assistance</li>
                    <li>On-call doctor available 24/7</li>
                    <li>Nearest hospital: City Hospital (3 km away)</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthAndSafety;
