
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Dialog } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HotelPageStructureProps {
  children: React.ReactNode;
  title: string;
  metaDescription: string;
  seoKeywords?: string;
  schemaMarkup: string;
  isLoading?: boolean;
  error?: string | null;
  errorMessage?: string;
  errorImage?: string;
}

const HotelPageStructure = ({ 
  children, 
  title, 
  metaDescription, 
  seoKeywords,
  schemaMarkup,
  isLoading,
  error,
  errorMessage = "Sorry, we couldn't find the hotel you're looking for.",
  errorImage = "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3"
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
          <div className="container-custom py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <div className="max-w-lg">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
                    Hotel Not Found
                  </h1>
                  <p className="text-stone-600 text-lg mb-8">
                    {error || errorMessage}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={() => window.history.back()}
                      variant="outline"
                      className="flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="h-5 w-5" />
                      <span>Go Back</span>
                    </Button>
                    <Button
                      asChild
                      className="flex items-center justify-center gap-2"
                    >
                      <Link to="/hotels">
                        <Home className="h-5 w-5" />
                        <span>Browse All Hotels</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="rounded-2xl overflow-hidden shadow-lg max-h-[500px]">
                  <img
                    src={errorImage}
                    alt="Not Found"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                </div>
              </div>
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
