
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HotelSearchSection from '@/components/hotels/HotelSearchSection';
import FeaturedHotelsSection from '@/components/hotels/FeaturedHotelsSection';
import PopularDestinations from '@/components/hotels/PopularDestinations';
import SpecialOffers from '@/components/hotels/SpecialOffers';
import { Button } from '@/components/ui/button';

const Index: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/hotels?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <div className="absolute inset-0">
          <img 
            src="/images/mount-abu-hero.jpg" 
            alt="Mount Abu" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        <div className="relative container-custom pt-12 pb-24">
          <div className="max-w-3xl mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find your perfect stay in Mount Abu
            </h1>
            <p className="text-xl mb-8">
              Best prices for 500+ hotels and accommodations
            </p>
          </div>
          
          <div className="bg-white rounded-lg overflow-hidden p-0 shadow-lg transform translate-y-12">
            <HotelSearchSection 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
            />
          </div>
        </div>
      </div>
      
      {/* Featured Hotels */}
      <div className="bg-stone-50 py-24">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-2">Featured Hotels & Resorts</h2>
            <p className="text-stone-600">Handpicked accommodations for your perfect stay</p>
          </div>
          
          <FeaturedHotelsSection />
          
          <div className="mt-8 text-center">
            <Button 
              onClick={() => navigate('/hotels')}
              variant="outline"
              className="mt-4"
            >
              View All Hotels
            </Button>
          </div>
        </div>
      </div>
      
      {/* Popular Destinations */}
      <div className="py-16 bg-white">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-2">Popular Locations in Mount Abu</h2>
            <p className="text-stone-600">Explore the most sought-after areas with great stays</p>
          </div>
          
          <PopularDestinations />
        </div>
      </div>
      
      {/* Special Offers */}
      <div className="py-16 bg-stone-50">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-2">Limited Time Offers</h2>
            <p className="text-stone-600">Grab these deals before they're gone</p>
          </div>
          
          <SpecialOffers />
        </div>
      </div>
      
      {/* Trust Factors */}
      <div className="bg-white py-16 border-t border-stone-200">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Secure Booking</h3>
              <p className="text-stone-600 text-sm">Your payment and personal information are always protected</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Best Price Guarantee</h3>
              <p className="text-stone-600 text-sm">We promise you'll get the best rates available</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">24/7 Support</h3>
              <p className="text-stone-600 text-sm">Contact our support team anytime for assistance</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Verified Reviews</h3>
              <p className="text-stone-600 text-sm">Real reviews from real guests who have stayed at our properties</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Newsletter */}
      <div className="bg-blue-800 text-white py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Get the Best Hotel Deals</h2>
            <p className="mb-6">Sign up for our newsletter and never miss out on special promotions</p>
            
            <div className="flex max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 text-black rounded-l-md focus:outline-none" 
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-r-md transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
