
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Ban, Key, Users, FileText, Shield } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface HotelPoliciesProps {
  checkInTime: string;
  checkOutTime: string;
  policies: string[];
}

const HotelPolicies: React.FC<HotelPoliciesProps> = ({ 
  checkInTime = '2:00 PM', 
  checkOutTime = '12:00 PM', 
  policies = [] 
}) => {
  const defaultPolicies = [
    'No smoking in rooms',
    'Pets not allowed',
    'Free cancellation up to 48 hours before check-in',
    'Extra bed available upon request (additional charges may apply)'
  ];

  const allPolicies = policies.length > 0 ? policies : defaultPolicies;

  // Categorize policies
  const policyCategories = {
    'Check-in & Check-out': [
      `Check-in time: ${checkInTime}`,
      `Check-out time: ${checkOutTime}`,
      'Photo ID required at check-in',
      'Early check-in and late check-out subject to availability and may incur charges'
    ],
    'General Policies': allPolicies.filter(p => 
      p.toLowerCase().includes('smoking') || 
      p.toLowerCase().includes('pet') ||
      p.toLowerCase().includes('age') ||
      p.toLowerCase().includes('child')
    ),
    'Cancellation': allPolicies.filter(p => 
      p.toLowerCase().includes('cancel') || 
      p.toLowerCase().includes('refund')
    ),
    'Other': allPolicies.filter(p => 
      !p.toLowerCase().includes('smoking') && 
      !p.toLowerCase().includes('pet') &&
      !p.toLowerCase().includes('age') &&
      !p.toLowerCase().includes('child') &&
      !p.toLowerCase().includes('cancel') && 
      !p.toLowerCase().includes('refund')
    )
  };

  // Get icon for policy category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Check-in & Check-out':
        return <Clock className="h-5 w-5" />;
      case 'General Policies':
        return <Ban className="h-5 w-5" />;
      case 'Cancellation':
        return <FileText className="h-5 w-5" />;
      default:
        return <Shield className="h-5 w-5" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hotel Policies</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 bg-primary/5 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Key className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">Check-in</h3>
              <p className="text-sm text-gray-600">{checkInTime}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">Check-out</h3>
              <p className="text-sm text-gray-600">{checkOutTime}</p>
            </div>
          </div>
        </div>
        
        {Object.entries(policyCategories).map(([category, categoryPolicies], idx) => 
          categoryPolicies.length > 0 && (
            <React.Fragment key={category}>
              {idx > 0 && <Separator className="my-4" />}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <div className="text-primary">
                    {getCategoryIcon(category)}
                  </div>
                  <h3 className="font-medium">{category}</h3>
                </div>
                <ul className="space-y-2 ml-7">
                  {categoryPolicies.map((policy, index) => (
                    <li key={index} className="text-gray-700 list-disc">
                      {policy}
                    </li>
                  ))}
                </ul>
              </div>
            </React.Fragment>
          )
        )}
      </CardContent>
    </Card>
  );
};

export default HotelPolicies;
