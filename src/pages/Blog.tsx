
import React from "react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Blog = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Mount Abu Travel Blog | Stories & Tips" 
        description="Read the latest travel stories, tips, and insights about Mount Abu. Discover hidden gems and expert advice for your perfect trip."
      />
      <Header />
      
      <main className="flex-1 bg-stone-50">
        <div className="container-custom py-12 md:py-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">Mount Abu Travel Blog</h1>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto">
              Discover travel stories, tips, and insights to make your Mount Abu trip memorable.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold mb-4">Coming Soon: Travel Stories & Tips</h2>
              <p className="text-stone-600 mb-6">
                Our travel experts are preparing amazing stories, tips, and guides about Mount Abu. Check back soon for insightful content to plan your perfect trip!
              </p>
              <div className="mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3" 
                  alt="Blog coming soon" 
                  className="rounded-lg mx-auto max-h-80 object-cover"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" onClick={() => window.history.back()}>
                  Go Back
                </Button>
                <Button asChild>
                  <a href="/">Back to Homepage</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
