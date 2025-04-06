
import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import EarlyHotelFaqsManager from './components/EarlyHotelFaqsManager';
import EarlyHotelImagesManager from './components/EarlyHotelImagesManager';

interface EarlyHotelDetailsTabProps {
  hotelId: number;
}

const EarlyHotelDetailsTab: React.FC<EarlyHotelDetailsTabProps> = ({ hotelId }) => {
  const [activeTab, setActiveTab] = useState('images');
  const [loading, setLoading] = useState(false);
  
  return (
    <div className="space-y-4">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
        </TabsList>
        
        <TabsContent value="images" className="space-y-4">
          <EarlyHotelImagesManager hotelId={hotelId} />
        </TabsContent>
        
        <TabsContent value="faqs" className="space-y-4">
          <EarlyHotelFaqsManager hotelId={hotelId} />
        </TabsContent>
        
        <TabsContent value="availability" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hotel Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Manage the availability of rooms for hourly bookings. You can set the number of available slots for specific dates.
              </p>
              
              <div className="flex justify-center py-4">
                <Button>Manage Availability Calendar</Button>
              </div>
              
              <p className="text-xs text-gray-500 text-center">
                Note: This feature is under development
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EarlyHotelDetailsTab;
