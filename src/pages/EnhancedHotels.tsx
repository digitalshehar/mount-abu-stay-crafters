
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout';
import { Helmet } from 'react-helmet-async';
import HotelSearchSection from '@/components/hotels/HotelSearchSection';
import FilterSidebar from '@/components/hotels/FilterSidebar';
import HotelsTabs from '@/components/hotels/HotelsTabs';
import useEnhancedFilters from '@/hooks/useEnhancedFilters';
import { supabase } from '@/integrations/supabase/client';
import { Hotel } from '@/types';
import { useResponsive } from '@/context/ResponsiveContext';
import { Drawer, DrawerContent } from '@/components/ui/drawer';

const EnhancedHotels = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const { isMobile } = useResponsive();
  
  // Initial search query from URL params
  const searchParams = new URLSearchParams(window.location.search);
  const initialSearchQuery = searchParams.get('q') || '';
  
  const {
    searchQuery,
    setSearchQuery,
    priceRange,
    setPriceRange,
    selectedStars,
    setSelectedStars,
    selectedAmenities,
    setSelectedAmenities,
    activeFilterCount,
    filteredHotels,
    handleStarFilter,
    handleAmenityFilter,
    clearFilters,
    commonAmenities,
    sortOption,
    setSortOption
  } = useEnhancedFilters(hotels);

  // Set initial search query
  useEffect(() => {
    if (initialSearchQuery) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery, setSearchQuery]);

  // Handle form search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update URL with search query
    const url = new URL(window.location.href);
    if (searchQuery) {
      url.searchParams.set('q', searchQuery);
    } else {
      url.searchParams.delete('q');
    }
    window.history.pushState({}, '', url.toString());
  };

  // Fetch hotels
  useEffect(() => {
    const fetchHotels = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.from('hotels').select('*');
        
        if (error) {
          throw error;
        }
        
        if (data) {
          // Transform the data
          const formattedHotels = data.map(hotel => ({
            id: hotel.id,
            name: hotel.name,
            slug: hotel.slug || '',
            location: hotel.location || 'Mount Abu',
            description: hotel.description || '',
            pricePerNight: hotel.price_per_night || 0,
            image: hotel.image || '',
            stars: hotel.stars || 3,
            rating: hotel.rating || 0,
            reviewCount: hotel.review_count || 0,
            amenities: hotel.amenities || [],
            status: hotel.status || 'active',
            featured: hotel.featured || false,
            gallery: hotel.gallery || []
          }));
          
          setHotels(formattedHotels);
        }
      } catch (error) {
        console.error('Error fetching hotels:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchHotels();
  }, []);

  // Close filter drawer when changing to non-mobile view
  useEffect(() => {
    if (!isMobile) {
      setIsFilterDrawerOpen(false);
    }
  }, [isMobile]);

  // Setup event listener for filter drawer
  useEffect(() => {
    const handleOpenFilters = () => {
      setIsFilterDrawerOpen(true);
    };
    
    document.addEventListener('open-hotel-filters', handleOpenFilters);
    
    return () => {
      document.removeEventListener('open-hotel-filters', handleOpenFilters);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Hotels in Mount Abu - Find Best Places to Stay | Mount Abu Travel Guide</title>
        <meta 
          name="description" 
          content="Browse and book hotels in Mount Abu. Filter by price, amenities, and more to find your perfect stay."
        />
      </Helmet>
      
      <Layout>
        <div className="container-custom py-6 md:py-8">
          <HotelSearchSection 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-8">
            {!isMobile && (
              <div className="md:col-span-3 lg:col-span-2">
                <FilterSidebar
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  selectedStars={selectedStars}
                  handleStarFilter={handleStarFilter}
                  selectedAmenities={selectedAmenities}
                  handleAmenityFilter={handleAmenityFilter}
                  commonAmenities={commonAmenities}
                  clearFilters={clearFilters}
                  sortOption={sortOption}
                  setSortOption={setSortOption}
                />
              </div>
            )}
            
            <div className="md:col-span-9 lg:col-span-10">
              <HotelsTabs 
                hotels={filteredHotels}
                isLoading={isLoading}
                activeFilterCount={activeFilterCount}
                clearFilters={clearFilters}
              />
            </div>
          </div>
        </div>
        
        {/* Mobile filter drawer */}
        {isMobile && (
          <Drawer open={isFilterDrawerOpen} onOpenChange={setIsFilterDrawerOpen}>
            <DrawerContent className="max-h-[85vh]">
              <div className="px-4 py-6">
                <FilterSidebar
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  selectedStars={selectedStars}
                  handleStarFilter={handleStarFilter}
                  selectedAmenities={selectedAmenities}
                  handleAmenityFilter={handleAmenityFilter}
                  commonAmenities={commonAmenities}
                  clearFilters={clearFilters}
                  sortOption={sortOption}
                  setSortOption={setSortOption}
                  onClose={() => setIsFilterDrawerOpen(false)}
                />
              </div>
            </DrawerContent>
          </Drawer>
        )}
      </Layout>
    </>
  );
};

export default EnhancedHotels;
