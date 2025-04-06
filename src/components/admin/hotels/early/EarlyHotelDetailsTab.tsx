
import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import EarlyHotelFaqsManager from './components/EarlyHotelFaqsManager';
import EarlyHotelImagesManager from './components/EarlyHotelImagesManager';
import EarlyHotelAvailabilityManager from './components/EarlyHotelAvailabilityManager';

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
          <EarlyHotelAvailabilityManager hotelId={hotelId} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EarlyHotelDetailsTab;
