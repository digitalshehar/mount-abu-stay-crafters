
import React, { useState } from "react";
import { Save, Globe, Layout, Palette, Share2, BellRing } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const AdminWebsiteSettings = () => {
  const { toast } = useToast();
  
  // Sample website settings
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Mount Abu Tourism",
    tagline: "Experience the Beauty of Rajasthan's Hill Station",
    contactEmail: "info@mountabu-tourism.com",
    contactPhone: "+91 9876543210",
    address: "Tourist Office, Mount Abu, Rajasthan, India",
    footerText: "© 2023 Mount Abu Tourism. All rights reserved.",
  });
  
  const [seoSettings, setSeoSettings] = useState({
    metaTitle: "Mount Abu Tourism - Rajasthan's Only Hill Station",
    metaDescription: "Discover the beauty of Mount Abu, Rajasthan's only hill station. Book hotels, tours, and activities for your perfect vacation.",
    ogImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1640&ixlib=rb-4.0.3",
    twitterHandle: "@mountabu",
    googleAnalyticsId: "UA-12345678-9",
  });
  
  const [appearanceSettings, setAppearanceSettings] = useState({
    primaryColor: "#0F766E",
    secondaryColor: "#f59e0b",
    fontFamily: "Inter, sans-serif",
    showLogo: true,
    logoUrl: "https://placekitten.com/100/100", // Placeholder
    favicon: "https://placekitten.com/32/32", // Placeholder
  });
  
  const [socialSettings, setSocialSettings] = useState({
    facebook: "https://facebook.com/mountabu",
    twitter: "https://twitter.com/mountabu",
    instagram: "https://instagram.com/mountabu",
    youtube: "https://youtube.com/mountabu",
    pinterest: "",
  });

  // Handle form input changes for general settings
  const handleGeneralSettingsChange = (e) => {
    const { name, value } = e.target;
    setGeneralSettings({
      ...generalSettings,
      [name]: value
    });
  };
  
  // Handle form input changes for SEO settings
  const handleSeoSettingsChange = (e) => {
    const { name, value } = e.target;
    setSeoSettings({
      ...seoSettings,
      [name]: value
    });
  };
  
  // Handle form input changes for appearance settings
  const handleAppearanceSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAppearanceSettings({
      ...appearanceSettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  // Handle form input changes for social settings
  const handleSocialSettingsChange = (e) => {
    const { name, value } = e.target;
    setSocialSettings({
      ...socialSettings,
      [name]: value
    });
  };

  // Handle saving settings
  const handleSaveSettings = () => {
    // In a real app, you would save these settings to your backend
    toast({
      title: "Settings saved",
      description: "Your website settings have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Website Settings</h1>
        
        <Button onClick={handleSaveSettings} className="gap-2">
          <Save size={16} />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="general" className="gap-2">
            <Globe size={16} />
            <span>General</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Palette size={16} />
            <span>Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="seo" className="gap-2">
            <Layout size={16} />
            <span>SEO</span>
          </TabsTrigger>
          <TabsTrigger value="social" className="gap-2">
            <Share2 size={16} />
            <span>Social Media</span>
          </TabsTrigger>
        </TabsList>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <TabsContent value="general" className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="siteName">Website Name</Label>
                <Input 
                  id="siteName"
                  name="siteName"
                  value={generalSettings.siteName}
                  onChange={handleGeneralSettingsChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tagline">Tagline</Label>
                <Input 
                  id="tagline"
                  name="tagline"
                  value={generalSettings.tagline}
                  onChange={handleGeneralSettingsChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input 
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  value={generalSettings.contactEmail}
                  onChange={handleGeneralSettingsChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input 
                  id="contactPhone"
                  name="contactPhone"
                  value={generalSettings.contactPhone}
                  onChange={handleGeneralSettingsChange}
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Textarea 
                  id="address"
                  name="address"
                  value={generalSettings.address}
                  onChange={handleGeneralSettingsChange}
                  rows={2}
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="footerText">Footer Text</Label>
                <Input 
                  id="footerText"
                  name="footerText"
                  value={generalSettings.footerText}
                  onChange={handleGeneralSettingsChange}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="appearance" className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex gap-3">
                  <Input 
                    id="primaryColor"
                    name="primaryColor"
                    type="color"
                    value={appearanceSettings.primaryColor}
                    onChange={handleAppearanceSettingsChange}
                    className="w-16 h-10 p-1"
                  />
                  <Input 
                    value={appearanceSettings.primaryColor}
                    onChange={handleAppearanceSettingsChange}
                    name="primaryColor"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="secondaryColor">Secondary Color</Label>
                <div className="flex gap-3">
                  <Input 
                    id="secondaryColor"
                    name="secondaryColor"
                    type="color"
                    value={appearanceSettings.secondaryColor}
                    onChange={handleAppearanceSettingsChange}
                    className="w-16 h-10 p-1"
                  />
                  <Input 
                    value={appearanceSettings.secondaryColor}
                    onChange={handleAppearanceSettingsChange}
                    name="secondaryColor"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fontFamily">Font Family</Label>
                <select
                  id="fontFamily"
                  name="fontFamily"
                  value={appearanceSettings.fontFamily}
                  onChange={handleAppearanceSettingsChange}
                  className="w-full h-10 px-3 py-2 border border-stone-200 rounded-md"
                >
                  <option value="Inter, sans-serif">Inter</option>
                  <option value="Roboto, sans-serif">Roboto</option>
                  <option value="Poppins, sans-serif">Poppins</option>
                  <option value="Montserrat, sans-serif">Montserrat</option>
                  <option value="Open Sans, sans-serif">Open Sans</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="showLogo">Logo Settings</Label>
                <div className="flex items-center space-x-2 pt-2">
                  <input
                    type="checkbox"
                    id="showLogo"
                    name="showLogo"
                    checked={appearanceSettings.showLogo}
                    onChange={handleAppearanceSettingsChange}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="showLogo" className="text-sm font-normal">Show logo</Label>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="logoUrl">Logo URL</Label>
                <Input 
                  id="logoUrl"
                  name="logoUrl"
                  value={appearanceSettings.logoUrl}
                  onChange={handleAppearanceSettingsChange}
                  disabled={!appearanceSettings.showLogo}
                />
                {appearanceSettings.logoUrl && appearanceSettings.showLogo && (
                  <div className="mt-2 p-2 border rounded w-fit">
                    <img src={appearanceSettings.logoUrl} alt="Logo Preview" className="h-10" />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="favicon">Favicon URL</Label>
                <Input 
                  id="favicon"
                  name="favicon"
                  value={appearanceSettings.favicon}
                  onChange={handleAppearanceSettingsChange}
                />
                {appearanceSettings.favicon && (
                  <div className="mt-2 p-2 border rounded w-fit">
                    <img src={appearanceSettings.favicon} alt="Favicon Preview" className="h-8" />
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="seo" className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input 
                  id="metaTitle"
                  name="metaTitle"
                  value={seoSettings.metaTitle}
                  onChange={handleSeoSettingsChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                <Input 
                  id="googleAnalyticsId"
                  name="googleAnalyticsId"
                  value={seoSettings.googleAnalyticsId}
                  onChange={handleSeoSettingsChange}
                  placeholder="UA-XXXXXXXXX-X"
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea 
                  id="metaDescription"
                  name="metaDescription"
                  value={seoSettings.metaDescription}
                  onChange={handleSeoSettingsChange}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ogImage">OG Image URL</Label>
                <Input 
                  id="ogImage"
                  name="ogImage"
                  value={seoSettings.ogImage}
                  onChange={handleSeoSettingsChange}
                />
                {seoSettings.ogImage && (
                  <div className="mt-2 p-2 border rounded">
                    <img src={seoSettings.ogImage} alt="OG Image Preview" className="h-24 object-cover" />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="twitterHandle">Twitter Handle</Label>
                <Input 
                  id="twitterHandle"
                  name="twitterHandle"
                  value={seoSettings.twitterHandle}
                  onChange={handleSeoSettingsChange}
                  placeholder="@yourtwitterhandle"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="social" className="p-6 space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook URL</Label>
                <Input 
                  id="facebook"
                  name="facebook"
                  value={socialSettings.facebook}
                  onChange={handleSocialSettingsChange}
                  placeholder="https://facebook.com/yourpage"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter URL</Label>
                <Input 
                  id="twitter"
                  name="twitter"
                  value={socialSettings.twitter}
                  onChange={handleSocialSettingsChange}
                  placeholder="https://twitter.com/yourhandle"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram URL</Label>
                <Input 
                  id="instagram"
                  name="instagram"
                  value={socialSettings.instagram}
                  onChange={handleSocialSettingsChange}
                  placeholder="https://instagram.com/yourprofile"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="youtube">YouTube URL</Label>
                <Input 
                  id="youtube"
                  name="youtube"
                  value={socialSettings.youtube}
                  onChange={handleSocialSettingsChange}
                  placeholder="https://youtube.com/yourchannel"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pinterest">Pinterest URL</Label>
                <Input 
                  id="pinterest"
                  name="pinterest"
                  value={socialSettings.pinterest}
                  onChange={handleSocialSettingsChange}
                  placeholder="https://pinterest.com/yourprofile"
                />
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default AdminWebsiteSettings;
