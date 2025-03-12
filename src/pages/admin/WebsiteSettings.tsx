
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

// Import our refactored components
import GeneralSettings from "./settings/GeneralSettings";
import SeoSettings from "./settings/SeoSettings";
import SocialSettings from "./settings/SocialSettings";
import FooterSettings from "./settings/FooterSettings";

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
  const handleGeneralChange = (name, value) => {
    setGeneralSettings({
      ...generalSettings,
      [name]: value
    });
  };
  
  const handleSeoChange = (name, value) => {
    setSeoSettings({
      ...seoSettings,
      [name]: value
    });
  };
  
  const handleSocialChange = (name, value) => {
    setSocialSettings({
      ...socialSettings,
      [name]: value
    });
  };
  
  const handleFooterChange = (name, value) => {
    setFooterSettings({
      ...footerSettings,
      [name]: value
    });
  };
  
  // Handle form submissions
  const saveGeneralSettings = (e) => {
    e.preventDefault();
    toast({
      title: "General settings saved",
      description: "Your website's general settings have been updated successfully."
    });
  };
  
  const saveSeoSettings = (e) => {
    e.preventDefault();
    toast({
      title: "SEO settings saved",
      description: "Your website's SEO settings have been updated successfully."
    });
  };
  
  const saveSocialSettings = (e) => {
    e.preventDefault();
    toast({
      title: "Social media settings saved",
      description: "Your website's social media settings have been updated successfully."
    });
  };
  
  const saveFooterSettings = (e) => {
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
          <GeneralSettings 
            settings={generalSettings}
            onChange={handleGeneralChange}
            onSave={saveGeneralSettings}
          />
        </TabsContent>
        
        <TabsContent value="seo">
          <SeoSettings 
            settings={seoSettings}
            onChange={handleSeoChange}
            onSave={saveSeoSettings}
          />
        </TabsContent>
        
        <TabsContent value="social">
          <SocialSettings 
            settings={socialSettings}
            onChange={handleSocialChange}
            onSave={saveSocialSettings}
          />
        </TabsContent>
        
        <TabsContent value="footer">
          <FooterSettings 
            settings={footerSettings}
            onChange={handleFooterChange}
            onSave={saveFooterSettings}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WebsiteSettings;
