
import React from 'react';
import Hero from '@/components/Hero';
import FeatureSection from '@/components/FeatureSection';
import DestinationSection from '@/components/DestinationSection';
import TestimonialSection from '@/components/TestimonialSection';

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <FeatureSection />
      <DestinationSection />
      <TestimonialSection />
    </div>
  );
};

export default Home;
