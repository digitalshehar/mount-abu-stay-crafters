
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const AdminSettings = () => {
  const { toast } = useToast();
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Mount Abu Tourism",
    siteDescription: "Discover the beauty of Mount Abu",
    contactEmail: "contact@mountabu.com",
    contactPhone: "+91 1234567890",
    enableNotifications: true,
    enableBookingConfirmations: true,
    enableReviewModeration: false,
    maintenanceMode: false
  });

  const handleGeneralSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleChange = (name: string, checked: boolean) => {
    setGeneralSettings(prev => ({ ...prev, [name]: checked }));
  };

  const handleSaveSettings = () => {
    console.log("Saving settings:", generalSettings);
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Settings</h1>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your website's general settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input 
                    id="siteName" 
                    name="siteName" 
                    value={generalSettings.siteName} 
                    onChange={handleGeneralSettingChange} 
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Input 
                    id="siteDescription" 
                    name="siteDescription" 
                    value={generalSettings.siteDescription} 
                    onChange={handleGeneralSettingChange} 
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input 
                    id="contactEmail" 
                    name="contactEmail" 
                    type="email" 
                    value={generalSettings.contactEmail} 
                    onChange={handleGeneralSettingChange} 
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input 
                    id="contactPhone" 
                    name="contactPhone" 
                    value={generalSettings.contactPhone} 
                    onChange={handleGeneralSettingChange} 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Enable Notifications</p>
                  <p className="text-sm text-stone-500">Receive notifications about bookings and inquiries</p>
                </div>
                <Switch 
                  checked={generalSettings.enableNotifications} 
                  onCheckedChange={(checked) => handleToggleChange('enableNotifications', checked)} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Booking Confirmations</p>
                  <p className="text-sm text-stone-500">Automatically send booking confirmation emails</p>
                </div>
                <Switch 
                  checked={generalSettings.enableBookingConfirmations} 
                  onCheckedChange={(checked) => handleToggleChange('enableBookingConfirmations', checked)} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Review Moderation</p>
                  <p className="text-sm text-stone-500">Require approval before reviews are published</p>
                </div>
                <Switch 
                  checked={generalSettings.enableReviewModeration} 
                  onCheckedChange={(checked) => handleToggleChange('enableReviewModeration', checked)} 
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>System settings and maintenance options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Maintenance Mode</p>
                  <p className="text-sm text-stone-500">Put site in maintenance mode</p>
                </div>
                <Switch 
                  checked={generalSettings.maintenanceMode} 
                  onCheckedChange={(checked) => handleToggleChange('maintenanceMode', checked)} 
                />
              </div>
              
              <div className="mt-6">
                <Button variant="destructive">Clear Cache</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings}>Save Settings</Button>
      </div>
    </div>
  );
};

export default AdminSettings;
