
import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>About Us | Mount Abu Travel Guide</title>
        <meta name="description" content="Learn about our mission to provide the best travel experiences in Mount Abu, Rajasthan." />
      </Helmet>
      
      <Header />
      
      <main className="flex-1 bg-stone-50 pt-24 pb-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">About Us</h1>
            
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
              <p className="text-stone-700 mb-6">
                Founded in 2020, Mount Abu Travel Guide was born from a passion for showcasing the beauty and wonder of Mount Abu, Rajasthan's only hill station. Our founders, all locals with deep connections to the region, wanted to create a platform that would help travelers discover the authentic experiences that make Mount Abu special.
              </p>
              <p className="text-stone-700 mb-6">
                What started as a small blog has grown into a comprehensive travel service, helping thousands of visitors each year plan their perfect Mount Abu getaway. We take pride in our local expertise and commitment to sustainable tourism that benefits both visitors and the local community.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <img 
                  src="https://images.unsplash.com/photo-1585134259000-d31747354478?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3" 
                  alt="Mount Abu landscape" 
                  className="rounded-lg shadow-sm"
                />
                <img 
                  src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3" 
                  alt="Mount Abu temple" 
                  className="rounded-lg shadow-sm"
                />
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-stone-700 mb-4">
                We're on a mission to make travel to Mount Abu more accessible, enjoyable, and sustainable. We believe that travel should:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-stone-700 mb-6">
                <li>Connect travelers with authentic local experiences</li>
                <li>Support local businesses and communities</li>
                <li>Preserve the natural beauty and cultural heritage of Mount Abu</li>
                <li>Provide accurate and helpful information to make trip planning stress-free</li>
                <li>Offer personalized service that goes beyond a typical booking platform</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
              <p className="text-stone-700 mb-6">
                Our diverse team combines local knowledge with travel industry expertise. From experienced guides who know every trail on the mountain to customer service specialists who ensure your booking process is smooth, we're united by our love for Mount Abu and dedication to excellent service.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="rounded-full overflow-hidden w-32 h-32 mx-auto mb-4">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3" 
                      alt="Team member" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold">Priya Sharma</h3>
                  <p className="text-stone-600 text-sm">Founder & CEO</p>
                </div>
                <div className="text-center">
                  <div className="rounded-full overflow-hidden w-32 h-32 mx-auto mb-4">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3" 
                      alt="Team member" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold">Rahul Patel</h3>
                  <p className="text-stone-600 text-sm">Head of Operations</p>
                </div>
                <div className="text-center">
                  <div className="rounded-full overflow-hidden w-32 h-32 mx-auto mb-4">
                    <img 
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3" 
                      alt="Team member" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold">Anjali Singh</h3>
                  <p className="text-stone-600 text-sm">Customer Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
