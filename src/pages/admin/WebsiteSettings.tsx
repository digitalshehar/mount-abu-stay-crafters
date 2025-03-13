import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Globe, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, FileText } from "lucide-react";

const WebsiteSettings = () => {
  const { toast } = useToast();
  
  // General settings
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Hotel in Mount Abu",
    siteTagline: "Your perfect stay in the hills",
    siteDescription: "Find the best hotels, activities, and experiences in Mount Abu, Rajasthan.",
    siteEmail: "contact@mountabu.com",
    sitePhone: "+91 1234567890",
    siteAddress: "Mount Abu, Rajasthan, India"
  });
  
  // SEO settings
  const [seoSettings, setSeoSettings] = useState({
    metaTitle: "Hotel in Mount Abu - Find Your Perfect Stay",
    metaDescription: "Discover the best hotels, activities, and experiences in Mount Abu, Rajasthan. Book your perfect stay today!",
    ogTitle: "Mount Abu - Your Perfect Hill Station Retreat",
    ogDescription: "Discover the beauty of Mount Abu with our curated selection of hotels and experiences.",
    ogImage: "https://example.com/og-image.jpg",
    enableSitemap: true,
    enableRobotsTxt: true,
    enableCanonicalUrls: true,
    enableStructuredData: true
  });
  
  // Social media settings
  const [socialSettings, setSocialSettings] = useState({
    facebookUrl: "https://facebook.com/mountabu",
    twitterUrl: "https://twitter.com/mountabu",
    instagramUrl: "https://instagram.com/mountabu",
    linkedinUrl: "https://linkedin.com/company/mountabu",
    youtubeUrl: "",
    pinterestUrl: "",
    enableSocialSharing: true
  });
  
  // Footer settings
  const [footerSettings, setFooterSettings] = useState({
    copyrightText: "© 2023 Hotel in Mount Abu. All rights reserved.",
    footerTagline: "Your perfect stay in the hills",
    showSocialIcons: true,
    showContactInfo: true,
    showQuickLinks: true,
    showNewsletterSignup: true
  });
  
  // Handle changes in form fields
  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGeneralSettings({
      ...generalSettings,
      [name]: value
    });
  };
  
  const handleSeoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setSeoSettings({
      ...seoSettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? e.target.checked : undefined;
    
    setSocialSettings({
      ...socialSettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleFooterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? e.target.checked : undefined;
    
    setFooterSettings({
      ...footerSettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  // Handle form submissions
  const saveGeneralSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "General settings saved",
      description: "Your website's general settings have been updated successfully."
    });
  };
  
  const saveSeoSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "SEO settings saved",
      description: "Your website's SEO settings have been updated successfully."
    });
  };
  
  const saveSocialSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Social media settings saved",
      description: "Your website's social media settings have been updated successfully."
    });
  };
  
  const saveFooterSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Footer settings saved",
      description: "Your website's footer settings have been updated successfully."
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Website Settings</h1>
      </div>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={saveGeneralSettings} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <div className="flex items-center">
                      <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="siteName"
                        name="siteName"
                        value={generalSettings.siteName}
                        onChange={handleGeneralChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="siteTagline">Site Tagline</Label>
                    <Input 
                      id="siteTagline"
                      name="siteTagline"
                      value={generalSettings.siteTagline}
                      onChange={handleGeneralChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="siteDescription">Site Description</Label>
                    <Textarea 
                      id="siteDescription"
                      name="siteDescription"
                      value={generalSettings.siteDescription}
                      onChange={handleGeneralChange}
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
                        value={generalSettings.siteEmail}
                        onChange={handleGeneralChange}
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
                        value={generalSettings.sitePhone}
                        onChange={handleGeneralChange}
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
                        value={generalSettings.siteAddress}
                        onChange={handleGeneralChange}
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
                
                <Button type="submit">Save General Settings</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={saveSeoSettings} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="metaTitle">Meta Title</Label>
                    <div className="flex items-center">
                      <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="metaTitle"
                        name="metaTitle"
                        value={seoSettings.metaTitle}
                        onChange={handleSeoChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="metaDescription">Meta Description</Label>
                    <Textarea 
                      id="metaDescription"
                      name="metaDescription"
                      value={seoSettings.metaDescription}
                      onChange={handleSeoChange}
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="ogTitle">Open Graph Title</Label>
                    <Input 
                      id="ogTitle"
                      name="ogTitle"
                      value={seoSettings.ogTitle}
                      onChange={handleSeoChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="ogDescription">Open Graph Description</Label>
                    <Textarea 
                      id="ogDescription"
                      name="ogDescription"
                      value={seoSettings.ogDescription}
                      onChange={handleSeoChange}
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="ogImage">Open Graph Image URL</Label>
                    <Input 
                      id="ogImage"
                      name="ogImage"
                      value={seoSettings.ogImage}
                      onChange={handleSeoChange}
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
                        checked={seoSettings.enableSitemap}
                        onCheckedChange={(checked) => setSeoSettings({...seoSettings, enableSitemap: checked})}
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
                        checked={seoSettings.enableRobotsTxt}
                        onCheckedChange={(checked) => setSeoSettings({...seoSettings, enableRobotsTxt: checked})}
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
                        checked={seoSettings.enableCanonicalUrls}
                        onCheckedChange={(checked) => setSeoSettings({...seoSettings, enableCanonicalUrls: checked})}
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
                        checked={seoSettings.enableStructuredData}
                        onCheckedChange={(checked) => setSeoSettings({...seoSettings, enableStructuredData: checked})}
                      />
                    </div>
                  </div>
                </div>
                
                <Button type="submit">Save SEO Settings</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={saveSocialSettings} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="facebookUrl">Facebook URL</Label>
                    <div className="flex items-center">
                      <Facebook className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="facebookUrl"
                        name="facebookUrl"
                        value={socialSettings.facebookUrl}
                        onChange={handleSocialChange}
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
                        value={socialSettings.twitterUrl}
                        onChange={handleSocialChange}
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
                        value={socialSettings.instagramUrl}
                        onChange={handleSocialChange}
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
                        value={socialSettings.linkedinUrl}
                        onChange={handleSocialChange}
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
                        checked={socialSettings.enableSocialSharing}
                        onCheckedChange={(checked) => setSocialSettings({...socialSettings, enableSocialSharing: checked})}
                      />
                    </div>
                  </div>
                </div>
                
                <Button type="submit">Save Social Media Settings</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="footer">
          <Card>
            <CardHeader>
              <CardTitle>Footer Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={saveFooterSettings} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="copyrightText">Copyright Text</Label>
                    <Input 
                      id="copyrightText"
                      name="copyrightText"
                      value={footerSettings.copyrightText}
                      onChange={handleFooterChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="footerTagline">Footer Tagline</Label>
                    <Input 
                      id="footerTagline"
                      name="footerTagline"
                      value={footerSettings.footerTagline}
                      onChange={handleFooterChange}
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
                        checked={footerSettings.showSocialIcons}
                        onCheckedChange={(checked) => setFooterSettings({...footerSettings, showSocialIcons: checked})}
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
                        checked={footerSettings.showContactInfo}
                        onCheckedChange={(checked) => setFooterSettings({...footerSettings, showContactInfo: checked})}
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
                        checked={footerSettings.showQuickLinks}
                        onCheckedChange={(checked) => setFooterSettings({...footerSettings, showQuickLinks: checked})}
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
                        checked={footerSettings.showNewsletterSignup}
                        onCheckedChange={(checked) => setFooterSettings({...footerSettings, showNewsletterSignup: checked})}
                      />
                    </div>
                  </div>
                </div>
                
                <Button type="submit">Save Footer Settings</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WebsiteSettings;
