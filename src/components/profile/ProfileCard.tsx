
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { UserProfile } from '@/context/AuthContext';

interface ProfileCardProps {
  profile: UserProfile | null;
  userEmail?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, userEmail }) => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex flex-col items-center">
        <Avatar className="w-24 h-24 mb-4">
          <AvatarImage src={profile?.avatar_url || ''} alt={profile?.username || 'User'} />
          <AvatarFallback>
            {profile?.username?.charAt(0)?.toUpperCase() || userEmail?.charAt(0)?.toUpperCase() || 'U'}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-semibold">{profile?.full_name || profile?.username || userEmail}</h2>
        <p className="text-stone-500 text-sm mt-1">{userEmail}</p>
        <Button className="mt-6 w-full" variant="outline" onClick={() => navigate('/auth?tab=edit-profile')}>
          Edit Profile
        </Button>
      </div>
    </div>
  );
};

export default ProfileCard;
