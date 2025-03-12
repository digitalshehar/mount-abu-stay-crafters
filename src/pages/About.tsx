
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">About Us</h1>
        
        <div className="prose max-w-none">
          <p>Welcome to our hotel booking platform. We're dedicated to helping travelers find the perfect accommodations for their journeys.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p>Our mission is to make travel planning easier by providing a seamless hotel booking experience with transparent pricing, detailed information, and authentic reviews.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Story</h2>
          <p>Founded in 2023, our platform was born from a passion for travel and a frustration with existing booking solutions. We set out to create something better—a platform that prioritizes the traveler's needs above all else.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Team</h2>
          <p>Our diverse team brings together expertise in hospitality, technology, and customer service. We're united by our love of travel and our commitment to creating exceptional experiences for our users.</p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default About;
