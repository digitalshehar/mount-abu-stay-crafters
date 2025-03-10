
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProfileCard from '@/components/profile/ProfileCard';
import FavoritesList from '@/components/profile/FavoritesList';
import { useFavorites } from '@/hooks/useFavorites';

const Profile = () => {
  const { user, profile, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<'hotel' | 'adventure' | 'car' | 'bike'>('hotel');
  const { favorites, loading, removeFavorite } = useFavorites(user);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Header />
      <main className="flex-1 container-custom py-8 md:py-12">
        {/* Profile section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="col-span-1 order-2 md:order-1">
            <ProfileCard profile={profile} userEmail={user?.email} />
          </div>
          
          <div className="col-span-1 md:col-span-2 order-1 md:order-2">
            <FavoritesList 
              favorites={favorites}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              loading={loading}
              onRemoveFavorite={removeFavorite}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
