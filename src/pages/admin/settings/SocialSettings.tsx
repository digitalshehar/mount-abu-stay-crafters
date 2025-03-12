
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

interface SocialSettingsProps {
  settings: {
    facebookUrl: string;
    twitterUrl: string;
    instagramUrl: string;
    linkedinUrl: string;
    youtubeUrl: string;
    pinterestUrl: string;
    enableSocialSharing: boolean;
  };
  onChange: (name: string, value: string | boolean) => void;
  onSave: (e: React.FormEvent) => void;
}

const SocialSettings: React.FC<SocialSettingsProps> = ({ 
  settings, 
  onChange, 
  onSave 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Media Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSave} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="facebookUrl">Facebook URL</Label>
              <div className="flex items-center">
                <Facebook className="mr-2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="facebookUrl"
                  name="facebookUrl"
                  value={settings.facebookUrl}
                  onChange={(e) => onChange('facebookUrl', e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="twitterUrl">Twitter URL</Label>
              <div className="flex items-center">
                <Twitter className="mr-2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="twitterUrl"
                  name="twitterUrl"
                  value={settings.twitterUrl}
                  onChange={(e) => onChange('twitterUrl', e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="instagramUrl">Instagram URL</Label>
              <div className="flex items-center">
                <Instagram className="mr-2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="instagramUrl"
                  name="instagramUrl"
                  value={settings.instagramUrl}
                  onChange={(e) => onChange('instagramUrl', e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
              <div className="flex items-center">
                <Linkedin className="mr-2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="linkedinUrl"
                  name="linkedinUrl"
                  value={settings.linkedinUrl}
                  onChange={(e) => onChange('linkedinUrl', e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableSocialSharing">Enable Social Sharing</Label>
                  <p className="text-sm text-muted-foreground">Add social sharing buttons to pages</p>
                </div>
                <Switch 
                  id="enableSocialSharing"
                  name="enableSocialSharing"
                  checked={settings.enableSocialSharing}
                  onCheckedChange={(checked) => onChange('enableSocialSharing', checked)}
                />
              </div>
            </div>
          </div>
          
          <Button type="submit">Save Social Media Settings</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SocialSettings;
