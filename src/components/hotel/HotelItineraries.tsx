
import React from "react";
import { Clock, MapPin, Route, Navigation } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Itinerary {
  id: number;
  title: string;
  duration: string;
  description: string;
  locations: string[];
  difficulty: "easy" | "moderate" | "challenging";
  tags: string[];
  image?: string;
}

interface HotelItinerariesProps {
  hotelLocation: string;
}

const HotelItineraries = ({ hotelLocation }: HotelItinerariesProps) => {
  // Sample itineraries data
  const itineraries: Itinerary[] = [
    {
      id: 1,
      title: "Sunset Point & Nakki Lake",
      duration: "Half day",
      description: "Visit the famous Sunset Point for panoramic views, followed by a relaxing boat ride at Nakki Lake.",
      locations: ["Sunset Point", "Nakki Lake"],
      difficulty: "easy",
      tags: ["scenic", "popular", "family-friendly"],
      image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3"
    },
    {
      id: 2,
      title: "Dilwara Temples & Wildlife Sanctuary",
      duration: "Full day",
      description: "Explore the ancient Dilwara Jain Temples in the morning, then spot wildlife at the Mount Abu Wildlife Sanctuary.",
      locations: ["Dilwara Temples", "Mount Abu Wildlife Sanctuary"],
      difficulty: "moderate",
      tags: ["cultural", "nature", "historical"],
      image: "https://images.unsplash.com/photo-1504233529578-6d46baba6d34?auto=format&fit=crop&q=80&w=2274&ixlib=rb-4.0.3"
    },
    {
      id: 3,
      title: "Guru Shikhar Trekking Adventure",
      duration: "Full day",
      description: "Trek to Guru Shikhar, the highest peak in the Aravalli Range, for breathtaking views of Mount Abu and surrounding areas.",
      locations: ["Guru Shikhar", "Achalgarh Fort"],
      difficulty: "challenging",
      tags: ["adventure", "trekking", "panoramic-views"],
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-100 text-green-800 border-green-200";
      case "moderate": return "bg-amber-100 text-amber-800 border-amber-200";
      case "challenging": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-display font-semibold mb-6">Recommended Itineraries</h2>
      <p className="text-stone-600 mb-6">
        Make the most of your stay in {hotelLocation} with these specially curated itineraries that showcase the best attractions and experiences.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {itineraries.map((itinerary) => (
          <div key={itinerary.id} className="bg-white rounded-lg shadow-sm border border-stone-100 overflow-hidden flex flex-col">
            {itinerary.image && (
              <div className="h-48 overflow-hidden">
                <img 
                  src={itinerary.image} 
                  alt={itinerary.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
            )}
            
            <div className="p-5 flex-grow flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{itinerary.title}</h3>
                <Badge className={getDifficultyColor(itinerary.difficulty)}>
                  {itinerary.difficulty}
                </Badge>
              </div>
              
              <div className="flex items-center text-stone-500 text-sm mb-3">
                <Clock className="h-4 w-4 mr-1" /> 
                {itinerary.duration}
              </div>
              
              <p className="text-stone-600 text-sm mb-4">{itinerary.description}</p>
              
              <div className="mt-auto">
                <h4 className="text-sm font-medium mb-2">Key Locations:</h4>
                <div className="space-y-1 mb-4">
                  {itinerary.locations.map((location, index) => (
                    <div key={index} className="flex items-center text-sm text-stone-600">
                      <MapPin className="h-3 w-3 mr-1 text-primary" />
                      <span>{location}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {itinerary.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <Button variant="outline" size="sm" className="w-full">
                  <Route className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelItineraries;
