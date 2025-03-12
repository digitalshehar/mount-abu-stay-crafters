
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Globe, Mail, Phone, MapPin } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface GeneralSettingsProps {
  settings: {
    siteName: string;
    siteTagline: string;
    siteDescription: string;
    siteEmail: string;
    sitePhone: string;
    siteAddress: string;
  };
  onChange: (name: string, value: string) => void;
  onSave: (e: React.FormEvent) => void;
}

const GeneralSettings: React.FC<GeneralSettingsProps> = ({ 
  settings, 
  onChange, 
  onSave 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSave} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Site Name</Label>
              <div className="flex items-center">
                <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="siteName"
                  name="siteName"
                  value={settings.siteName}
                  onChange={(e) => onChange('siteName', e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="siteTagline">Site Tagline</Label>
              <Input 
                id="siteTagline"
                name="siteTagline"
                value={settings.siteTagline}
                onChange={(e) => onChange('siteTagline', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="siteDescription">Site Description</Label>
              <Textarea 
                id="siteDescription"
                name="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => onChange('siteDescription', e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="siteEmail">Contact Email</Label>
              <div className="flex items-center">
                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="siteEmail"
                  name="siteEmail"
                  type="email"
                  value={settings.siteEmail}
                  onChange={(e) => onChange('siteEmail', e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sitePhone">Contact Phone</Label>
              <div className="flex items-center">
                <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="sitePhone"
                  name="sitePhone"
                  value={settings.sitePhone}
                  onChange={(e) => onChange('sitePhone', e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="siteAddress">Address</Label>
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                <Textarea 
                  id="siteAddress"
                  name="siteAddress"
                  value={settings.siteAddress}
                  onChange={(e) => onChange('siteAddress', e.target.value)}
                  rows={2}
                />
              </div>
            </div>
          </div>
          
          <Button type="submit">Save General Settings</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default GeneralSettings;
