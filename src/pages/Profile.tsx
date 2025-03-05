
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, Heart, MapPin, Calendar, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { user, profile, loading, signOut, updateProfile } = useAuth();
  const { toast } = useToast();
  
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [updating, setUpdating] = useState(false);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loadingFavorites, setLoadingFavorites] = useState(true);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setUsername(profile.username || '');
    }
  }, [profile]);

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const fetchFavorites = async () => {
    try {
      setLoadingFavorites(true);
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user?.id);

      if (error) throw error;

      // Fetch the details for each favorite
      const detailedFavorites = await Promise.all(
        (data || []).map(async (fav) => {
          let itemDetails = null;
          
          try {
            const { data: details, error: detailsError } = await supabase
              .from(getTableName(fav.item_type))
              .select('*')
              .eq('id', fav.item_id)
              .single();
              
            if (!detailsError) {
              itemDetails = details;
            }
          } catch (e) {
            console.error(`Error fetching details for ${fav.item_type}:`, e);
          }
          
          return {
            ...fav,
            details: itemDetails
          };
        })
      );

      setFavorites(detailedFavorites);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      toast({
        title: 'Error',
        description: 'Failed to load your favorites.',
        variant: 'destructive',
      });
    } finally {
      setLoadingFavorites(false);
    }
  };

  const getTableName = (itemType: string) => {
    switch (itemType) {
      case 'hotel': return 'hotels';
      case 'car': return 'car_rentals';
      case 'bike': return 'bike_rentals';
      case 'adventure': return 'adventures';
      default: return '';
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setUpdating(true);
      await updateProfile({
        full_name: fullName,
        username: username
      });
    } catch (error) {
      // Error handled in auth context
    } finally {
      setUpdating(false);
    }
  };

  const removeFavorite = async (favoriteId: string) => {
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('id', favoriteId);

      if (error) throw error;

      // Update the local state
      setFavorites(favorites.filter(fav => fav.id !== favoriteId));
      
      toast({
        title: 'Success',
        description: 'Item removed from favorites.',
      });
    } catch (error) {
      console.error('Error removing favorite:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove from favorites.',
        variant: 'destructive',
      });
    }
  };

  // Redirect to login if not authenticated
  if (!loading && !user) {
    return <Navigate to="/auth" replace />;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Profile Information */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="flex items-center space-x-4 mb-6">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={profile?.avatar_url || ''} />
                      <AvatarFallback>{profile?.username?.slice(0, 2) || user?.email?.slice(0, 2) || 'U'}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{profile?.full_name || 'Your Name'}</h3>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input 
                      id="full-name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input 
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Your username"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email"
                      value={user?.email || ''}
                      disabled
                      className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground">
                      Your email cannot be changed
                    </p>
                  </div>
                  
                  <Button type="submit" disabled={updating}>
                    {updating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            {/* Account Management */}
            <Card>
              <CardHeader>
                <CardTitle>Account Management</CardTitle>
                <CardDescription>
                  Manage your account settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Change Password</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Update your password to keep your account secure
                  </p>
                  <Button variant="outline">Change Password</Button>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Delete Account</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Permanently delete your account and all your data
                  </p>
                  <Button variant="destructive">Delete Account</Button>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Sign Out</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Sign out from your account on this device
                  </p>
                  <Button variant="outline" onClick={signOut}>Sign Out</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="favorites">
          <Card>
            <CardHeader>
              <CardTitle>Your Favorites</CardTitle>
              <CardDescription>
                Items you've saved for later
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loadingFavorites ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : favorites.length === 0 ? (
                <div className="text-center py-12">
                  <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No favorites yet</h3>
                  <p className="text-muted-foreground">
                    Save hotels, cars, bikes, and adventures to find them easily later.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {favorites.map((favorite) => (
                    favorite.details ? (
                      <Card key={favorite.id} className="overflow-hidden">
                        <div className="relative h-48 w-full">
                          <img 
                            src={favorite.details.image} 
                            alt={favorite.details.name}
                            className="h-full w-full object-cover"
                          />
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="absolute top-2 right-2 bg-white/80 hover:bg-white text-rose-500"
                            onClick={() => removeFavorite(favorite.id)}
                          >
                            <Heart className="h-5 w-5 fill-current" />
                          </Button>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium truncate mb-1">{favorite.details.name}</h3>
                          
                          {favorite.item_type === 'hotel' && (
                            <div className="flex items-center text-sm text-muted-foreground mb-2">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{favorite.details.location}</span>
                            </div>
                          )}
                          
                          {favorite.item_type === 'car' && (
                            <div className="flex items-center text-sm text-muted-foreground mb-2">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{favorite.details.transmission} · {favorite.details.capacity} seats</span>
                            </div>
                          )}
                          
                          {favorite.item_type === 'adventure' && (
                            <div className="flex items-center text-sm text-muted-foreground mb-2">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{favorite.details.duration} · {favorite.details.difficulty}</span>
                            </div>
                          )}
                          
                          <div className="mt-2">
                            <span className="font-bold text-primary">
                              ₹{favorite.details.price || favorite.details.price_per_night}
                              {favorite.item_type === 'hotel' ? '/night' : favorite.item_type === 'adventure' ? '/person' : '/day'}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ) : null
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>Your Bookings</CardTitle>
              <CardDescription>
                View and manage your booking history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No bookings yet</h3>
                <p className="text-muted-foreground">
                  When you book a hotel, car, bike, or adventure, it will appear here.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
