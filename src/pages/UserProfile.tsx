
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import FavoritesList from '@/components/profile/FavoritesList';

const UserProfile = () => {
  const { user } = useAuth();
  
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user?.avatar_url || ''} alt={user?.name || 'User'} />
              <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            
            <div>
              <h1 className="text-3xl font-bold">{user?.name || 'User Profile'}</h1>
              <p className="text-gray-600">{user?.email}</p>
              <p className="text-sm mt-2">Member since {new Date(user?.created_at || Date.now()).toLocaleDateString()}</p>
            </div>
          </div>
          
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium">Full Name</h3>
                      <p>{user?.name || 'Not provided'}</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p>{user?.email || 'Not provided'}</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p>{user?.phone || 'Not provided'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="bookings">
              <Card>
                <CardHeader>
                  <CardTitle>Your Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>You have no bookings yet.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="favorites">
              <Card>
                <CardHeader>
                  <CardTitle>Your Favorites</CardTitle>
                </CardHeader>
                <CardContent>
                  <FavoritesList />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Account settings will be available soon.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default UserProfile;
