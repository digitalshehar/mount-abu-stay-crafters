
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { FileText } from 'lucide-react';

interface SeoSettingsProps {
  settings: {
    metaTitle: string;
    metaDescription: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    enableSitemap: boolean;
    enableRobotsTxt: boolean;
    enableCanonicalUrls: boolean;
    enableStructuredData: boolean;
  };
  onChange: (name: string, value: string | boolean) => void;
  onSave: (e: React.FormEvent) => void;
}

const SeoSettings: React.FC<SeoSettingsProps> = ({ 
  settings, 
  onChange, 
  onSave 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSave} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="metaTitle">Meta Title</Label>
              <div className="flex items-center">
                <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="metaTitle"
                  name="metaTitle"
                  value={settings.metaTitle}
                  onChange={(e) => onChange('metaTitle', e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="metaDescription">Meta Description</Label>
              <Textarea 
                id="metaDescription"
                name="metaDescription"
                value={settings.metaDescription}
                onChange={(e) => onChange('metaDescription', e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ogTitle">Open Graph Title</Label>
              <Input 
                id="ogTitle"
                name="ogTitle"
                value={settings.ogTitle}
                onChange={(e) => onChange('ogTitle', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ogDescription">Open Graph Description</Label>
              <Textarea 
                id="ogDescription"
                name="ogDescription"
                value={settings.ogDescription}
                onChange={(e) => onChange('ogDescription', e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ogImage">Open Graph Image URL</Label>
              <Input 
                id="ogImage"
                name="ogImage"
                value={settings.ogImage}
                onChange={(e) => onChange('ogImage', e.target.value)}
                placeholder="https://example.com/og-image.jpg"
              />
            </div>
            
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableSitemap">Enable Sitemap</Label>
                  <p className="text-sm text-muted-foreground">Generate an XML sitemap for search engines</p>
                </div>
                <Switch 
                  id="enableSitemap"
                  name="enableSitemap"
                  checked={settings.enableSitemap}
                  onCheckedChange={(checked) => onChange('enableSitemap', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableRobotsTxt">Enable robots.txt</Label>
                  <p className="text-sm text-muted-foreground">Create a robots.txt file for search engine crawlers</p>
                </div>
                <Switch 
                  id="enableRobotsTxt"
                  name="enableRobotsTxt"
                  checked={settings.enableRobotsTxt}
                  onCheckedChange={(checked) => onChange('enableRobotsTxt', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableCanonicalUrls">Enable Canonical URLs</Label>
                  <p className="text-sm text-muted-foreground">Add canonical URL tags to all pages</p>
                </div>
                <Switch 
                  id="enableCanonicalUrls"
                  name="enableCanonicalUrls"
                  checked={settings.enableCanonicalUrls}
                  onCheckedChange={(checked) => onChange('enableCanonicalUrls', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableStructuredData">Enable Structured Data</Label>
                  <p className="text-sm text-muted-foreground">Add JSON-LD structured data for rich snippets</p>
                </div>
                <Switch 
                  id="enableStructuredData"
                  name="enableStructuredData"
                  checked={settings.enableStructuredData}
                  onCheckedChange={(checked) => onChange('enableStructuredData', checked)}
                />
              </div>
            </div>
          </div>
          
          <Button type="submit">Save SEO Settings</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SeoSettings;
