
import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAdventureDetails } from "@/hooks/useAdventureDetails";
import AdventureHero from "@/components/adventure/AdventureHero";
import AdventureOverviewTab from "@/components/adventure/AdventureOverviewTab";
import AdventureIncludesTab from "@/components/adventure/AdventureIncludesTab";
import AdventureTimelineTab from "@/components/adventure/AdventureTimelineTab";
import AdventureRequirementsTab from "@/components/adventure/AdventureRequirementsTab";
import RelatedAdventures from "@/components/adventure/RelatedAdventures";
import BookingPanel from "@/components/adventure/BookingPanel";

const AdventureDetail = () => {
  const { adventureSlug } = useParams<{ adventureSlug: string }>();
  const { adventure, relatedAdventures, loading } = useAdventureDetails(adventureSlug);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!adventure) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-3xl font-bold mb-4">Adventure Not Found</h1>
            <p className="text-stone-600 mb-6">Sorry, we couldn't find the adventure you're looking for.</p>
            <Button asChild>
              <Link to="/adventures">Browse All Adventures</Link>
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
        <AdventureHero adventure={adventure} />
        
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview">
                <TabsList className="mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="includes">What's Included</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="requirements">Requirements</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                  <AdventureOverviewTab adventure={adventure} />
                </TabsContent>
                
                <TabsContent value="includes">
                  <AdventureIncludesTab adventure={adventure} />
                </TabsContent>
                
                <TabsContent value="timeline">
                  <AdventureTimelineTab adventure={adventure} />
                </TabsContent>
                
                <TabsContent value="requirements">
                  <AdventureRequirementsTab adventure={adventure} />
                </TabsContent>
              </Tabs>
              
              {/* Related Adventures */}
              <RelatedAdventures adventures={relatedAdventures} />
            </div>
            
            {/* Booking Panel */}
            <BookingPanel adventure={adventure} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdventureDetail;
