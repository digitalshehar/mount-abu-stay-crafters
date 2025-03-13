import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Lock, 
  Mail, 
  Bell, 
  User, 
  Globe, 
  Smartphone,
  ImagePlus
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminSettings = () => {
  const { toast } = useToast();
  
  // Profile settings
  const [profileSettings, setProfileSettings] = useState({
    name: "Admin User",
    email: "admin@mountabu.com",
    phone: "+91 9876543210",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=1740&ixlib=rb-4.0.3"
  });

  // Website settings
  const [websiteSettings, setWebsiteSettings] = useState({
    siteName: "Hotel in Mount Abu",
    contactEmail: "contact@mountabu.com",
    contactPhone: "+91 9876543210",
    currency: "INR",
    maintenanceMode: false,
    allowBookings: true,
    showPromotions: true
  });
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    bookingAlerts: true,
    marketingEmails: false,
    smsAlerts: true
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your profile settings have been updated successfully.",
    });
  };

  const handleWebsiteSettingsUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Website settings updated",
      description: "Your website settings have been updated successfully.",
    });
  };

  const handleNotificationSettingsUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Notification settings updated",
      description: "Your notification preferences have been updated successfully.",
    });
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileSettings({ ...profileSettings, [name]: value });
  };

  const handleWebsiteSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setWebsiteSettings({ 
      ...websiteSettings, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setWebsiteSettings({ ...websiteSettings, [name]: checked });
  };
  
  const handleNotificationChange = (name: string, checked: boolean) => {
    setNotificationSettings({ ...notificationSettings, [name]: checked });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Admin Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User size={18} />
              Profile Settings
            </CardTitle>
            <CardDescription>
              Manage your personal information and account settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-stone-200 mb-4">
                  <img 
                    src={profileSettings.avatar} 
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <ImagePlus size={14} />
                  Change Avatar
                </Button>
              </div>
            
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={profileSettings.name}
                  onChange={handleProfileChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" size={16} />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profileSettings.email}
                    onChange={handleProfileChange}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" size={16} />
                  <Input
                    id="phone"
                    name="phone"
                    value={profileSettings.phone}
                    onChange={handleProfileChange}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <Button type="submit">Update Profile</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Website Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe size={18} />
              Website Settings
            </CardTitle>
            <CardDescription>
              Configure general settings for your website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleWebsiteSettingsUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">Website Name</Label>
                <Input
                  id="siteName"
                  name="siteName"
                  value={websiteSettings.siteName}
                  onChange={handleWebsiteSettingChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  value={websiteSettings.contactEmail}
                  onChange={handleWebsiteSettingChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input
                  id="contactPhone"
                  name="contactPhone"
                  value={websiteSettings.contactPhone}
                  onChange={handleWebsiteSettingChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currency">Default Currency</Label>
                <select
                  id="currency"
                  name="currency"
                  value={websiteSettings.currency}
                  onChange={(e) => setWebsiteSettings({ ...websiteSettings, currency: e.target.value })}
                  className="w-full rounded-md border border-stone-200 px-3 py-2"
                >
                  <option value="INR">Indian Rupee (₹)</option>
                  <option value="USD">US Dollar ($)</option>
                  <option value="EUR">Euro (€)</option>
                  <option value="GBP">British Pound (£)</option>
                </select>
              </div>
              
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                    <p className="text-sm text-stone-500">Temporarily disable public access to the website</p>
                  </div>
                  <Switch
                    id="maintenanceMode"
                    checked={websiteSettings.maintenanceMode}
                    onCheckedChange={(checked) => handleSwitchChange('maintenanceMode', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allowBookings">Allow Bookings</Label>
                    <p className="text-sm text-stone-500">Enable users to make bookings on the website</p>
                  </div>
                  <Switch
                    id="allowBookings"
                    checked={websiteSettings.allowBookings}
                    onCheckedChange={(checked) => handleSwitchChange('allowBookings', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="showPromotions">Show Promotions</Label>
                    <p className="text-sm text-stone-500">Display promotional banners and special offers</p>
                  </div>
                  <Switch
                    id="showPromotions"
                    checked={websiteSettings.showPromotions}
                    onCheckedChange={(checked) => handleSwitchChange('showPromotions', checked)}
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell size={18} />
              Notification Settings
            </CardTitle>
            <CardDescription>
              Configure how and when you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleNotificationSettingsUpdate} className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-stone-500">Receive notifications via email</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => handleNotificationChange('emailNotifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="bookingAlerts">Booking Alerts</Label>
                    <p className="text-sm text-stone-500">Get notified for new bookings</p>
                  </div>
                  <Switch
                    id="bookingAlerts"
                    checked={notificationSettings.bookingAlerts}
                    onCheckedChange={(checked) => handleNotificationChange('bookingAlerts', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="smsAlerts">SMS Alerts</Label>
                    <p className="text-sm text-stone-500">Receive SMS alerts for critical updates</p>
                  </div>
                  <Switch
                    id="smsAlerts"
                    checked={notificationSettings.smsAlerts}
                    onCheckedChange={(checked) => handleNotificationChange('smsAlerts', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="marketingEmails">Marketing Emails</Label>
                    <p className="text-sm text-stone-500">Receive marketing and promotional emails</p>
                  </div>
                  <Switch
                    id="marketingEmails"
                    checked={notificationSettings.marketingEmails}
                    onCheckedChange={(checked) => handleNotificationChange('marketingEmails', checked)}
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <Button type="submit">Update Preferences</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock size={18} />
              Security Settings
            </CardTitle>
            <CardDescription>
              Manage your account security and password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  placeholder="Enter your current password"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Enter new password"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                />
              </div>
              
              <div className="pt-4">
                <Button type="submit" onClick={(e) => {
                  e.preventDefault();
                  toast({
                    title: "Password updated",
                    description: "Your password has been changed successfully.",
                  });
                }}>
                  Change Password
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettings;
