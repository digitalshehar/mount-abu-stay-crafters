
import React from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDestinationDetails } from "@/hooks/useDestinationDetails";
import DestinationHero from "@/components/destination/DestinationHero";
import DestinationOverviewTab from "@/components/destination/DestinationOverviewTab";
import DestinationHighlightsTab from "@/components/destination/DestinationHighlightsTab";
import DestinationActivitiesTab from "@/components/destination/DestinationActivitiesTab";
import DestinationAdventures from "@/components/destination/DestinationAdventures";
import DestinationSidebar from "@/components/destination/DestinationSidebar";

const DestinationDetail = () => {
  const { destinationSlug } = useParams<{ destinationSlug: string }>();
  const { destination, adventures, loading } = useDestinationDetails(destinationSlug);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-3xl font-bold mb-4">Destination Not Found</h1>
            <p className="text-stone-600 mb-6">Sorry, we couldn't find the destination you're looking for.</p>
            <Button asChild>
              <Link to="/destinations">Browse All Destinations</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Header />
      
      <main className="flex-1">
        <DestinationHero destination={destination} />
        
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview">
                <TabsList className="mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="highlights">Highlights</TabsTrigger>
                  <TabsTrigger value="activities">Activities</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                  <DestinationOverviewTab destination={destination} />
                </TabsContent>
                
                <TabsContent value="highlights">
                  <DestinationHighlightsTab destination={destination} />
                </TabsContent>
                
                <TabsContent value="activities">
                  <DestinationActivitiesTab destination={destination} />
                </TabsContent>
              </Tabs>
              
              {/* Adventures at this location */}
              <DestinationAdventures 
                adventures={adventures} 
                destinationName={destination.name} 
              />
            </div>
            
            {/* Sidebar */}
            <DestinationSidebar 
              location={destination.location || "Mount Abu"}
              bestTimeToVisit={destination.bestTimeToVisit}
              onBookClick={() => window.location.href = "/adventures"}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DestinationDetail;
