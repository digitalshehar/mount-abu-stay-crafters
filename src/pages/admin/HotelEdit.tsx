
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const HotelEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // In a real app, you would fetch the hotel data based on the id
  // For now, we'll use dummy data
  const hotel = {
    id: parseInt(id || '0'),
    name: 'Sample Hotel',
    description: 'This is a sample hotel for demonstration purposes.',
    location: 'Mount Abu, Rajasthan',
    pricePerNight: 5000,
    rating: 4.5,
    isFeatured: true,
  };
  
  const handleSave = () => {
    // In a real app, you would save the hotel data here
    toast({
      title: "Changes saved",
      description: "Hotel information has been updated successfully."
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin/hotels')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Edit Hotel: {hotel.name}</h1>
        </div>
        
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="rooms">Rooms</TabsTrigger>
          <TabsTrigger value="amenities">Amenities</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p>General hotel information form would go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="rooms">
          <Card>
            <CardHeader>
              <CardTitle>Room Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Room management interface would go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="amenities">
          <Card>
            <CardHeader>
              <CardTitle>Hotel Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Amenities selection interface would go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="gallery">
          <Card>
            <CardHeader>
              <CardTitle>Photo Gallery</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Photo gallery management would go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p>SEO settings form would go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HotelEdit;
