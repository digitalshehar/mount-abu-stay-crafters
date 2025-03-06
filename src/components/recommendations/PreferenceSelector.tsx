
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';

interface PreferenceSelectorProps {
  preferences: string[];
  togglePreference: (preference: string) => void;
}

const PreferenceSelector: React.FC<PreferenceSelectorProps> = ({ preferences, togglePreference }) => {
  const preferenceOptions = [
    'luxury', 'budget', 'adventure', 'relaxation', 'family-friendly', 
    'couples', 'cultural', 'nature', 'food', 'shopping', 'historic', 'photography'
  ];
  
  return (
    <div className="mb-4 p-3 border rounded-lg bg-gray-50">
      <h4 className="text-sm font-medium mb-2">Your Travel Preferences</h4>
      <div className="grid grid-cols-2 gap-2">
        {preferenceOptions.map(pref => (
          <div key={pref} className="flex items-center space-x-2">
            <Checkbox 
              id={`pref-${pref}`} 
              checked={preferences.includes(pref)}
              onCheckedChange={() => togglePreference(pref)}
            />
            <label
              htmlFor={`pref-${pref}`}
              className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
            >
              {pref}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreferenceSelector;
