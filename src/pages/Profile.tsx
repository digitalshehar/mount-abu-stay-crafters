import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileCard, { UserProfile } from '@/components/profile/ProfileCard';
import FavoritesList, { Favorite } from '@/components/profile/FavoritesList';
import { useToast } from '@/components/ui/use-toast';

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [activeFavoritesTab, setActiveFavoritesTab] = useState('hotels');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loadingFavorites, setLoadingFavorites] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchFavorites();
    }
  }, [user]);

  const fetchProfile = async () => {
    setLoadingProfile(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Create a default profile if none exists
      setProfile({
        id: user?.id || '',
        full_name: user?.user_metadata?.name || 'Hotel Guest',
        avatar_url: user?.user_metadata?.avatar_url || '',
        member_since: new Date().toDateString()
      });
    } finally {
      setLoadingProfile(false);
    }
  };

  const fetchFavorites = async () => {
    setLoadingFavorites(true);
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select(`*`)
        .eq('user_id', user?.id);

      if (error) throw error;
      
      // Transform to match our Favorite type
      const mappedFavorites: Favorite[] = (data || []).map((item: any) => ({
        id: item.id,
        user_id: item.user_id,
        item_id: item.item_id,
        item_type: item.item_type,
        created_at: item.created_at,
      }));
      
      setFavorites(mappedFavorites);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      setFavorites([]);
    } finally {
      setLoadingFavorites(false);
    }
  };

  const handleRemoveFavorite = async (favoriteId: string) => {
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('id', favoriteId);

      if (error) throw error;

      setFavorites(favorites.filter(fav => fav.id !== favoriteId));
      
      toast({
        title: "Favorite removed",
        description: "The item has been removed from your favorites",
      });
    } catch (error) {
      console.error('Error removing favorite:', error);
      toast({
        title: "Error",
        description: "Failed to remove favorite",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>My Profile | HotelInMountAbu</title>
      </Helmet>
      
      <Header />
      
      <div className="bg-stone-50 min-h-screen py-8 sm:py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="lg:flex lg:flex-col">
                <TabsList className="lg:flex-col lg:h-auto bg-white rounded-xl shadow-sm p-1 lg:p-2">
                  <TabsTrigger 
                    value="profile" 
                    className="data-[state=active]:bg-primary data-[state=active]:text-white w-full justify-start px-4 py-3"
                  >
                    My Profile
                  </TabsTrigger>
                  <TabsTrigger 
                    value="favorites" 
                    className="data-[state=active]:bg-primary data-[state=active]:text-white w-full justify-start px-4 py-3"
                  >
                    Favorites
                  </TabsTrigger>
                  <TabsTrigger 
                    value="bookings" 
                    className="data-[state=active]:bg-primary data-[state=active]:text-white w-full justify-start px-4 py-3"
                  >
                    My Bookings
                  </TabsTrigger>
                  <TabsTrigger 
                    value="settings" 
                    className="data-[state=active]:bg-primary data-[state=active]:text-white w-full justify-start px-4 py-3"
                  >
                    Account Settings
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="lg:col-span-3">
              <TabsContent value="profile" className="m-0">
                {loadingProfile ? (
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
                    <div className="h-32 bg-stone-200"></div>
                    <div className="p-6">
                      <div className="flex justify-between items-start -mt-16 mb-4">
                        <div className="h-32 w-32 rounded-full bg-stone-300 border-4 border-white"></div>
                      </div>
                      <div className="h-8 bg-stone-200 rounded w-1/3 mb-2"></div>
                      <div className="h-4 bg-stone-200 rounded w-1/4 mb-4"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-stone-200 rounded w-full"></div>
                        <div className="h-4 bg-stone-200 rounded w-full"></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <ProfileCard 
                    profile={profile || { id: user?.id || '' }}
                    userEmail={user?.email || ''}
                    onEdit={() => setActiveTab('settings')}
                  />
                )}
              </TabsContent>
              
              <TabsContent value="favorites" className="m-0">
                <FavoritesList 
                  favorites={favorites}
                  activeTab={activeFavoritesTab}
                  setActiveTab={setActiveFavoritesTab}
                  loading={loadingFavorites}
                  onRemoveFavorite={handleRemoveFavorite}
                />
              </TabsContent>
              
              <TabsContent value="bookings" className="m-0">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-bold mb-6">My Bookings</h3>
                  <p className="text-stone-500">
                    Your booking history will appear here once you make a reservation.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="m-0">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-bold mb-6">Account Settings</h3>
                  <p className="text-stone-500">
                    Account settings page is under development.
                  </p>
                </div>
              </TabsContent>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Profile;
