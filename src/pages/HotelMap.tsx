
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import HotelMap from '@/components/hotels/map/HotelMap';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';

const HotelMapPage = () => {
  // Fetch hotels data
  const { data: hotels, isLoading } = useQuery({
    queryKey: ['hotels'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hotels')
        .select('*')
        .order('id', { ascending: true });
      
      if (error) {
        throw error;
      }
      
      return data || [];
    }
  });
  
  return (
    <>
      <Helmet>
        <title>Hotel Map | Mount Abu Hotels</title>
        <meta name="description" content="Explore hotels in Mount Abu on an interactive map. Find the perfect location for your stay." />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen bg-stone-50 pt-16">
        <HotelMap 
          hotels={hotels || []} 
          isLoading={isLoading} 
        />
      </main>
      
      <Footer />
    </>
  );
};

export default HotelMapPage;
