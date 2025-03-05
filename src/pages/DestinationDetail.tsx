
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Calendar, Star, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Adventure, Destination } from "@/integrations/supabase/custom-types";

const DestinationDetail = () => {
  const { destinationSlug } = useParams();
  const { toast } = useToast();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [relatedAdventures, setRelatedAdventures] = useState<Adventure[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This would normally fetch from Supabase, but we're using static data for demonstration
    // In a real implementation, replace this with actual data fetching
    const fetchDestination = () => {
      setLoading(true);
      
      // Sample destinations data - replace with actual API call
      const destinations = [
        {
          id: 1,
          name: "Nakki Lake",
          slug: "nakki-lake",
          description: "A beautiful scenic lake in the heart of Mount Abu, perfect for boating and relaxation. Surrounded by hills, this man-made lake is approximately 1200 meters above sea level and offers a serene atmosphere for visitors. Legend has it that the lake was dug out by gods using their nails ('nakki' in Hindi), hence its name.",
          image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&auto=format&fit=crop",
          activities: ["Boating", "Picnic", "Photography", "Bird Watching"],
          location: "Central Mount Abu",
          bestTimeToVisit: "October to March",
          highlights: [
            "Paddle boating on the serene waters",
            "Toad Rock viewpoint nearby",
            "Raghunath Temple on the shore",
            "Sunset views over the lake"
          ]
        },
        {
          id: 2,
          name: "Dilwara Temples",
          slug: "dilwara-temples",
          description: "Exquisitely carved Jain temples built between the 11th and 13th centuries, known for their stunning marble work. These architectural marvels are among the finest examples of Jain temple architecture with intricate marble carvings that showcase exceptional craftsmanship. The complex consists of five temples dedicated to different Jain Tirthankaras.",
          image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&auto=format&fit=crop",
          activities: ["Temple Visit", "Architecture Tour", "Cultural Experience", "Photography"],
          location: "2.5 km from Mount Abu",
          bestTimeToVisit: "Throughout the year, 12pm-5pm daily",
          highlights: [
            "Vimal Vasahi temple dedicated to the first Tirthankara",
            "Luna Vasahi temple with intricate marble ceilings",
            "Pittalhar temple with unique metal casting",
            "Parshvanath temple's ornate pillars and archways"
          ]
        },
        {
          id: 3,
          name: "Sunset Point",
          slug: "sunset-point",
          description: "A perfect spot to witness breathtaking sunsets over the Aravalli hills and valleys. This popular viewpoint offers panoramic vistas of the surrounding landscapes bathed in the golden glow of the setting sun. The dramatic sky colors make it a photographer's paradise and a romantic destination.",
          image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&auto=format&fit=crop",
          activities: ["Sunset Viewing", "Photography", "Nature Walk", "Hiking"],
          location: "3 km from Mount Abu town center",
          bestTimeToVisit: "5:30pm-7pm, October to March for clearest views",
          highlights: [
            "Panoramic views of the valley",
            "Dramatic sky colors during sunset",
            "Surrounding nature trails",
            "Local vendors offering chai and snacks"
          ]
        },
        {
          id: 4,
          name: "Guru Shikhar",
          slug: "guru-shikhar",
          description: "The highest peak in the Aravalli Range, offering panoramic views of Mount Abu and surrounding regions. Rising 1,722 meters above sea level, this peak is named after Guru Dattatreya, whose temple and a shrine to his footprint are located at the summit. The trek to the top rewards visitors with breathtaking 360-degree views.",
          image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop",
          activities: ["Trekking", "Hiking", "Wildlife Spotting", "Temple Visit"],
          location: "15 km from Mount Abu",
          bestTimeToVisit: "Early morning for clear views, October to March",
          highlights: [
            "Dattatreya temple at the summit",
            "Mount Abu Observatory nearby",
            "View of the entire Aravalli range",
            "Rich biodiversity along the trek"
          ]
        },
        {
          id: 5,
          name: "Wildlife Sanctuary",
          slug: "wildlife-sanctuary",
          description: "A rich biodiversity hub with leopards, sambar deer, wild boars, and over 250 species of birds. Covering an area of 288 square kilometers, this sanctuary encompasses a varied terrain of rocky hills, dense forests, and streams. The sanctuary is home to the endangered Mount Abu Grey Langur and numerous medicinal plants.",
          image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&auto=format&fit=crop",
          activities: ["Jungle Safari", "Bird Watching", "Nature Trail", "Wildlife Photography"],
          location: "5 km from Mount Abu",
          bestTimeToVisit: "October to March, early mornings for wildlife",
          highlights: [
            "Jeep safaris through diverse terrain",
            "Over 250 species of birds",
            "Chance to spot leopards and sloth bears",
            "Guided nature walks with local experts"
          ]
        },
        {
          id: 6,
          name: "Achalgarh Fort",
          slug: "achalgarh-fort",
          description: "An ancient fort built by the Paramara dynasty, featuring historic temples and stunning architecture. Later reconstructed by Maharana Kumbha in 1452 CE, this fort complex includes impressive stone fortifications, several Jain temples, and the popular Achaleshwar Mahadev Temple dedicated to Lord Shiva. The fort offers spectacular views of the surrounding landscape.",
          image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&auto=format&fit=crop",
          activities: ["Historical Tour", "Photography", "Temple Visit", "Trekking"],
          location: "11 km from Mount Abu",
          bestTimeToVisit: "9am-6pm daily, October to March",
          highlights: [
            "Achaleshwar Mahadev Temple with its Nandi statue",
            "Ancient Jain temples with marble carvings",
            "Mandakini Lake within the complex",
            "Original fort walls and architecture"
          ]
        },
        {
          id: 7,
          name: "Honeymoon Point",
          slug: "honeymoon-point",
          description: "Also known as Anadra Point, offering spectacular views and a peaceful atmosphere. This romantic viewpoint provides a stunning vista of verdant valleys and the countryside below. The point is particularly popular among honeymooners and couples for its serene environment and picturesque backdrop.",
          image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&auto=format&fit=crop",
          activities: ["Scenic Views", "Photography", "Relaxation", "Sunset Watching"],
          location: "2.5 km from Mount Abu town center",
          bestTimeToVisit: "Early morning for sunrise or evening for sunset",
          highlights: [
            "Valley view from a different perspective",
            "Less crowded than Sunset Point",
            "Peaceful ambiance for relaxation",
            "Horse riding available nearby"
          ]
        },
        {
          id: 8,
          name: "Toad Rock",
          slug: "toad-rock",
          description: "A rock formation resembling a toad, perched on a hill near Nakki Lake. This natural rock formation is one of Mount Abu's most iconic landmarks and a popular spot for photography. The surrounding area offers short trekking paths and vantage points for viewing Nakki Lake and the town.",
          image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&auto=format&fit=crop",
          activities: ["Rock Climbing", "Photography", "Hiking", "Sightseeing"],
          location: "Near Nakki Lake",
          bestTimeToVisit: "Morning hours for clear views, all year round",
          highlights: [
            "Unique toad-shaped rock formation",
            "Short trekking paths around the formation",
            "Views of Nakki Lake and surroundings",
            "Nearby garden for relaxation"
          ]
        },
      ];

      const selectedDestination = destinations.find(d => d.slug === destinationSlug);

      if (selectedDestination) {
        setDestination(selectedDestination);
        document.title = `${selectedDestination.name} - Mount Abu Tourism`;
        
        // Sample adventures data - replace with actual API call
        const adventures = [
          {
            id: 1,
            name: "Sunset Point Trekking",
            slug: "sunset-point-trekking",
            type: "Trekking",
            duration: "3 hours",
            difficulty: "Easy",
            rating: 4.8,
            reviewCount: 124,
            price: 800,
            image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=1574&ixlib=rb-4.0.3",
            location: "Sunset Point"
          },
          {
            id: 2,
            name: "Wildlife Safari",
            slug: "wildlife-safari",
            type: "Sightseeing",
            duration: "5 hours",
            difficulty: "Easy",
            rating: 4.5,
            reviewCount: 98,
            price: 1200,
            image: "https://images.unsplash.com/photo-1561040594-a1b8785b8d1e?auto=format&fit=crop&q=80&w=1548&ixlib=rb-4.0.3",
            location: "Wildlife Sanctuary"
          },
          {
            id: 3,
            name: "Nakki Lake Boating",
            slug: "nakki-lake-boating",
            type: "Water Activity",
            duration: "1 hour",
            difficulty: "Easy",
            rating: 4.3,
            reviewCount: 210,
            price: 500,
            image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
            location: "Nakki Lake"
          },
          {
            id: 4,
            name: "Overnight Camping",
            slug: "overnight-camping",
            type: "Camping",
            duration: "24 hours",
            difficulty: "Moderate",
            rating: 4.9,
            reviewCount: 76,
            price: 2500,
            image: "https://images.unsplash.com/photo-1517823382935-51bfcb0ec6bc?auto=format&fit=crop&q=80&w=1740&ixlib=rb-4.0.3",
            location: "Guru Shikhar"
          },
        ];

        // Filter adventures related to this destination
        const filteredAdventures = adventures.filter(
          a => a.location.toLowerCase().includes(selectedDestination.name.toLowerCase()) ||
               selectedDestination.name.toLowerCase().includes(a.location.toLowerCase())
        );
        
        setRelatedAdventures(filteredAdventures);
      } else {
        toast({
          title: "Destination not found",
          description: "We couldn't find the destination you're looking for.",
          variant: "destructive"
        });
      }
      
      setLoading(false);
    };

    fetchDestination();
  }, [destinationSlug, toast]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="pt-28 pb-16">
          <div className="container-custom">
            <div className="animate-pulse space-y-4">
              <div className="h-10 bg-stone-200 rounded w-3/4"></div>
              <div className="h-6 bg-stone-200 rounded w-1/2"></div>
              <div className="h-96 bg-stone-200 rounded"></div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!destination) {
    return (
      <>
        <Header />
        <main className="pt-28 pb-16 min-h-[70vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-display font-bold mb-4">Destination Not Found</h1>
            <p className="text-stone-600 mb-6">The destination you're looking for doesn't exist or has been moved.</p>
            <Link to="/destinations">
              <Button>View All Destinations</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-20 pb-16">
        {/* Hero Section */}
        <div className="relative h-[60vh] mb-10">
          <div className="absolute inset-0">
            <img 
              src={destination.image} 
              alt={destination.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30"></div>
          </div>
          <div className="relative h-full container-custom flex flex-col justify-end pb-10">
            <div className="flex items-center text-white/80 text-sm mb-2">
              <MapPin className="h-4 w-4 mr-1" /> {destination.location}
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
              {destination.name}
            </h1>
            <div className="flex flex-wrap gap-3">
              {destination.activities.map((activity, index) => (
                <span 
                  key={index}
                  className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm"
                >
                  {activity}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-display font-bold mb-4">About {destination.name}</h2>
                <p className="text-stone-600 leading-relaxed mb-6">{destination.description}</p>
                
                <h3 className="text-xl font-semibold mt-8 mb-3">Highlights</h3>
                <ul className="space-y-2 mb-6">
                  {destination.highlights?.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related Activities */}
              {relatedAdventures.length > 0 && (
                <div className="mt-10">
                  <h2 className="text-2xl font-display font-bold mb-6">
                    Popular Activities at {destination.name}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {relatedAdventures.map((adventure) => (
                      <Card key={adventure.id} className="overflow-hidden card-hover">
                        <div className="aspect-[4/3] relative">
                          <img
                            src={adventure.image}
                            alt={adventure.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
                            {adventure.difficulty}
                          </div>
                        </div>
                        <CardContent className="p-5">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm text-primary font-medium">{adventure.type}</p>
                              <h3 className="font-bold text-lg mb-1">{adventure.name}</h3>
                              <div className="flex items-center text-sm text-stone-500">
                                <Calendar size={14} className="mr-1" />
                                <span>{adventure.duration}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-primary font-bold text-xl">₹{adventure.price}</p>
                              <p className="text-xs text-stone-500">per person</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center text-sm text-stone-500 mt-3 mb-4">
                            <Star size={16} className="text-yellow-500 fill-yellow-500 mr-1" />
                            <span className="mr-1">{adventure.rating}</span>
                            <span>({adventure.reviewCount} reviews)</span>
                          </div>
                          
                          <Link
                            to={`/adventure/${adventure.slug}`}
                            className="block w-full bg-primary hover:bg-primary/90 text-white text-center font-medium py-2 px-4 rounded-lg transition-all"
                          >
                            Book Now
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="mt-6 text-center">
                    <Link to="/adventures" className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors">
                      View All Activities <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Information</h3>
                  
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium mb-1">Location</p>
                        <p className="text-stone-600">{destination.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-primary mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium mb-1">Best Time to Visit</p>
                        <p className="text-stone-600">{destination.bestTimeToVisit}</p>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-2">Popular Activities</h4>
                      <div className="flex flex-wrap gap-2">
                        {destination.activities.map((activity, index) => (
                          <span key={index} className="bg-stone-100 text-stone-800 px-2 py-1 rounded-full text-xs">
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Planning to Visit?</h3>
                  <p className="text-sm text-stone-600 mb-4">
                    Make the most of your trip to {destination.name} with our guided adventures and experiences.
                  </p>
                  
                  <Link to="/adventures">
                    <Button className="w-full">Explore Adventures</Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Nearby Destinations</h3>
                  <div className="space-y-4">
                    {/* Static nearby destinations - replace with dynamic in real implementation */}
                    {[1, 2, 3].map((_, index) => {
                      // Get random destinations that are not the current one
                      const randomDestinations = [
                        {slug: "sunset-point", name: "Sunset Point", image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&auto=format&fit=crop", distance: "3 km"},
                        {slug: "nakki-lake", name: "Nakki Lake", image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&auto=format&fit=crop", distance: "1.5 km"},
                        {slug: "toad-rock", name: "Toad Rock", image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&auto=format&fit=crop", distance: "2 km"}
                      ].filter(d => d.slug !== destinationSlug);
                      
                      const nearbyDestination = randomDestinations[index % randomDestinations.length];
                      
                      return (
                        <Link key={index} to={`/destination/${nearbyDestination.slug}`} className="flex items-center hover:bg-stone-50 p-2 rounded-lg transition-colors">
                          <div className="h-14 w-14 rounded-md overflow-hidden shrink-0">
                            <img src={nearbyDestination.image} alt={nearbyDestination.name} className="h-full w-full object-cover" />
                          </div>
                          <div className="ml-3">
                            <h4 className="font-medium text-stone-800">{nearbyDestination.name}</h4>
                            <p className="text-xs text-stone-500">{nearbyDestination.distance} away</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DestinationDetail;
