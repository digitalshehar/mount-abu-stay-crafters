
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import HotelMap from '@/components/hotels/map/HotelMap';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { Hotel } from '@/components/admin/hotels/types';

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
      
      // Transform data to match the Hotel type
      return (data || []).map(hotel => ({
        id: hotel.id,
        name: hotel.name,
        slug: hotel.slug,
        location: hotel.location,
        stars: hotel.stars,
        pricePerNight: hotel.price_per_night,
        image: hotel.image,
        status: hotel.status as 'active' | 'inactive',
        description: hotel.description || '',
        amenities: hotel.amenities || [],
        rooms: [],
        featured: hotel.featured || false,
        reviewCount: hotel.review_count || 0,
        rating: hotel.rating || 0,
        gallery: hotel.gallery || [],
        categories: hotel.categories || [],
        latitude: hotel.latitude,
        longitude: hotel.longitude,
      })) as Hotel[];
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
