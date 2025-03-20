
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Dialog } from "@/components/ui/dialog";

interface HotelPageStructureProps {
  children: React.ReactNode;
  title: string;
  metaDescription: string;
  seoKeywords?: string;
  schemaMarkup: string;
  isLoading?: boolean;
  error?: string | null;
  errorMessage?: string;
}

const HotelPageStructure = ({ 
  children, 
  title, 
  metaDescription, 
  seoKeywords,
  schemaMarkup,
  isLoading,
  error,
  errorMessage = "Sorry, we couldn't find the hotel you're looking for."
}: HotelPageStructureProps) => {
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col w-full">
        <Header />
        <div className="flex-1 flex items-center justify-center w-full">
          <div className="animate-pulse space-y-8 w-full max-w-7xl mx-auto p-8">
            <div className="h-10 bg-gray-200 rounded-md w-3/4"></div>
            <div className="h-64 bg-gray-200 rounded-lg w-full"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-2 space-y-4">
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
              </div>
              <div>
                <div className="h-64 bg-gray-200 rounded-lg w-full"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col w-full">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-8 max-w-md">
            <h1 className="text-3xl font-bold mb-4">Hotel Not Found</h1>
            <p className="text-stone-600 mb-6">{error || errorMessage}</p>
            <div className="space-y-4">
              <button className="w-full bg-primary text-white py-2 rounded">
                <a href="/hotels">Browse All Hotels</a>
              </button>
              <button className="w-full border border-primary text-primary py-2 rounded">
                <a href="/">Return to Home</a>
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col w-full">
      <title>{title}</title>
      <meta name="description" content={metaDescription} />
      {seoKeywords && <meta name="keywords" content={seoKeywords} />}
      
      <script type="application/ld+json">
        {schemaMarkup}
      </script>
      
      <Header />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default HotelPageStructure;
