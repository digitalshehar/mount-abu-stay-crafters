
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

interface FooterSettingsProps {
  settings: {
    copyrightText: string;
    footerTagline: string;
    showSocialIcons: boolean;
    showContactInfo: boolean;
    showQuickLinks: boolean;
    showNewsletterSignup: boolean;
  };
  onChange: (name: string, value: string | boolean) => void;
  onSave: (e: React.FormEvent) => void;
}

const FooterSettings: React.FC<FooterSettingsProps> = ({ 
  settings, 
  onChange, 
  onSave 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Footer Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSave} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="copyrightText">Copyright Text</Label>
              <Input 
                id="copyrightText"
                name="copyrightText"
                value={settings.copyrightText}
                onChange={(e) => onChange('copyrightText', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="footerTagline">Footer Tagline</Label>
              <Input 
                id="footerTagline"
                name="footerTagline"
                value={settings.footerTagline}
                onChange={(e) => onChange('footerTagline', e.target.value)}
              />
            </div>
            
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="showSocialIcons">Show Social Icons</Label>
                  <p className="text-sm text-muted-foreground">Display social media icons in the footer</p>
                </div>
                <Switch 
                  id="showSocialIcons"
                  name="showSocialIcons"
                  checked={settings.showSocialIcons}
                  onCheckedChange={(checked) => onChange('showSocialIcons', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="showContactInfo">Show Contact Info</Label>
                  <p className="text-sm text-muted-foreground">Display contact information in the footer</p>
                </div>
                <Switch 
                  id="showContactInfo"
                  name="showContactInfo"
                  checked={settings.showContactInfo}
                  onCheckedChange={(checked) => onChange('showContactInfo', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="showQuickLinks">Show Quick Links</Label>
                  <p className="text-sm text-muted-foreground">Display quick navigation links in the footer</p>
                </div>
                <Switch 
                  id="showQuickLinks"
                  name="showQuickLinks"
                  checked={settings.showQuickLinks}
                  onCheckedChange={(checked) => onChange('showQuickLinks', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="showNewsletterSignup">Show Newsletter Signup</Label>
                  <p className="text-sm text-muted-foreground">Display a newsletter signup form in the footer</p>
                </div>
                <Switch 
                  id="showNewsletterSignup"
                  name="showNewsletterSignup"
                  checked={settings.showNewsletterSignup}
                  onCheckedChange={(checked) => onChange('showNewsletterSignup', checked)}
                />
              </div>
            </div>
          </div>
          
          <Button type="submit">Save Footer Settings</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FooterSettings;
