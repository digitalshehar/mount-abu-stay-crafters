
import React from 'react';
import { User } from '@supabase/supabase-js';
import { Badge } from '@/components/ui/badge';
import { Edit, Mail, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface UserProfile {
  id: string;
  full_name?: string;
  username?: string;
  avatar_url?: string;
  location?: string;
  bio?: string;
  created_at?: string;
  website?: string;
  member_since?: string;
}

export interface ProfileCardProps {
  profile: UserProfile;
  userEmail: string;
  onEdit?: () => void;
  isCurrentUser?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ 
  profile, 
  userEmail, 
  onEdit, 
  isCurrentUser = true 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-primary/80 to-primary"></div>
      
      <div className="px-6 pb-6">
        <div className="flex justify-between items-start -mt-16 mb-4">
          <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-white bg-white">
            <img 
              src={profile.avatar_url || `https://ui-avatars.com/api/?name=${profile.full_name || 'User'}&background=random`} 
              alt={profile.full_name || 'User profile'} 
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${profile.full_name || 'User'}&background=random`;
              }}
            />
          </div>
          
          {isCurrentUser && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={onEdit}
              className="mt-20"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </div>
        
        <h2 className="text-2xl font-bold mb-1">{profile.full_name || 'Hotel Guest'}</h2>
        <p className="text-stone-500 mb-4">@{profile.username || 'user'}</p>
        
        <div className="flex items-center gap-2 mb-2">
          <Mail className="h-4 w-4 text-stone-400" />
          <span className="text-sm text-stone-600">{userEmail}</span>
        </div>
        
        {profile.location && (
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-4 w-4 text-stone-400" />
            <span className="text-sm text-stone-600">{profile.location}</span>
          </div>
        )}
        
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-4 w-4 text-stone-400" />
          <span className="text-sm text-stone-600">
            Member since {profile.member_since || 'recently'}
          </span>
        </div>
        
        {profile.bio && (
          <p className="text-stone-700 text-sm mb-4 border-t border-stone-100 pt-4">
            {profile.bio}
          </p>
        )}
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">Traveler</Badge>
          <Badge variant="outline">Mount Abu Explorer</Badge>
          <Badge variant="outline">Hotel Booker</Badge>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
