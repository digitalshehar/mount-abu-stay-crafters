
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '@/components/profile/ProfileCard';
import FavoritesList from '@/components/profile/FavoritesList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useFavorites } from '@/hooks/useFavorites';

const UserProfile = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [favoriteType, setFavoriteType] = useState<string>('hotel');
  
  // Use the hook to manage favorites
  const { favorites, loading: favoritesLoading, removeFavorite } = useFavorites(user);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div className="container mx-auto py-8">Loading profile...</div>;
  }

  if (!user || !profile) {
    return null; // This will redirect in the useEffect
  }

  const handleUpdateProfile = async (data: any) => {
    // Profile update logic here
    console.log('Update profile with:', data);
  };

  // Convert our useFavorites favorites to FavoritesList component format
  const formattedFavorites = favorites.map(fav => ({
    id: fav.id, // Already a string from useFavorites
    user_id: fav.user_id,
    item_id: fav.item_id,
    item_type: fav.item_type as 'hotel' | 'destination' | 'adventure' | 'activity',
    created_at: fav.created_at || new Date().toISOString()
  }));

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">My Account</h1>
      
      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <ProfileCard 
            profile={profile}
            userEmail={user.email || ''}
            onUpdateProfile={handleUpdateProfile}
          />
        </TabsContent>
        
        <TabsContent value="favorites">
          <FavoritesList 
            favorites={formattedFavorites} 
            activeTab={favoriteType} 
            setActiveTab={(value: string) => setFavoriteType(value)}
            loading={favoritesLoading}
            onRemoveFavorite={(id: string) => removeFavorite(id)}
          />
        </TabsContent>
        
        <TabsContent value="bookings">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Your Bookings</h2>
            <p className="text-stone-500">No bookings found.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="settings">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
            <p className="text-stone-500">Account settings coming soon.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;
