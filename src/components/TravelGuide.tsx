
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Family, Briefcase, Heart, Tent, Camera } from 'lucide-react';

interface TravelGuideProps {
  className?: string;
}

const TravelGuide: React.FC<TravelGuideProps> = ({ className = '' }) => {
  return (
    <Card className={`${className} bg-white overflow-hidden`}>
      <CardHeader className="pb-2">
        <CardTitle>Mount Abu Travel Guide</CardTitle>
        <CardDescription>
          Customized guides for different types of travelers
        </CardDescription>
      </CardHeader>
      
      <Tabs defaultValue="family">
        <div className="px-6">
          <TabsList className="grid grid-cols-5 mb-2">
            <TabsTrigger value="family" className="flex flex-col items-center py-2 h-auto">
              <Family className="h-4 w-4 mb-1" />
              <span className="text-xs">Family</span>
            </TabsTrigger>
            <TabsTrigger value="business" className="flex flex-col items-center py-2 h-auto">
              <Briefcase className="h-4 w-4 mb-1" />
              <span className="text-xs">Business</span>
            </TabsTrigger>
            <TabsTrigger value="couples" className="flex flex-col items-center py-2 h-auto">
              <Heart className="h-4 w-4 mb-1" />
              <span className="text-xs">Couples</span>
            </TabsTrigger>
            <TabsTrigger value="adventure" className="flex flex-col items-center py-2 h-auto">
              <Tent className="h-4 w-4 mb-1" />
              <span className="text-xs">Adventure</span>
            </TabsTrigger>
            <TabsTrigger value="solo" className="flex flex-col items-center py-2 h-auto">
              <Camera className="h-4 w-4 mb-1" />
              <span className="text-xs">Solo</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="pt-2">
          <ScrollArea className="h-[280px] pr-4">
            <TabsContent value="family" className="mt-0">
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-medium mb-2">Perfect for Families</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Mount Abu offers a perfect blend of natural beauty, kid-friendly attractions, and relaxing experiences for the whole family.
                  </p>
                  
                  <h4 className="text-sm font-medium mb-2">Recommended Activities:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Badge variant="outline" className="mt-0.5 mr-2">1</Badge>
                      <div>
                        <p className="text-sm font-medium">Nakki Lake Paddle Boating</p>
                        <p className="text-xs text-gray-500">Enjoy a fun boating session with kids at the beautiful Nakki Lake.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Badge variant="outline" className="mt-0.5 mr-2">2</Badge>
                      <div>
                        <p className="text-sm font-medium">Wildlife Sanctuary Visit</p>
                        <p className="text-xs text-gray-500">Spot wild animals and birds in their natural habitat.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Badge variant="outline" className="mt-0.5 mr-2">3</Badge>
                      <div>
                        <p className="text-sm font-medium">Honeymoon Point</p>
                        <p className="text-xs text-gray-500">Despite its name, this viewpoint is perfect for family photos.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Badge variant="outline" className="mt-0.5 mr-2">4</Badge>
                      <div>
                        <p className="text-sm font-medium">Dilwara Temples</p>
                        <p className="text-xs text-gray-500">Marvel at the incredible marble carvings and architecture.</p>
                      </div>
                    </li>
                  </ul>
                  
                  <h4 className="text-sm font-medium mt-4 mb-2">Where to Stay:</h4>
                  <p className="text-xs text-gray-600">
                    Look for family resorts with kid-friendly amenities like Palace Heritage Hotel, Green Valley Resort, or Hilltop Luxury Resort.
                  </p>
                  
                  <h4 className="text-sm font-medium mt-4 mb-2">Best Time to Visit with Family:</h4>
                  <p className="text-xs text-gray-600">
                    October to March offers pleasant weather perfect for outdoor activities with children.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="business" className="mt-0">
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-medium mb-2">Business Traveler's Guide</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Mount Abu provides a serene retreat for business meetings and corporate events, away from the chaos of city life.
                  </p>
                  
                  <h4 className="text-sm font-medium mb-2">Business Facilities:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Badge variant="outline" className="mt-0.5 mr-2">1</Badge>
                      <div>
                        <p className="text-sm font-medium">Hilltop Luxury Resort Conference Center</p>
                        <p className="text-xs text-gray-500">Modern meeting rooms with panoramic views of the mountains.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Badge variant="outline" className="mt-0.5 mr-2">2</Badge>
                      <div>
                        <p className="text-sm font-medium">Palace Heritage Business Lounge</p>
                        <p className="text-xs text-gray-500">Historic setting with contemporary business amenities.</p>
                      </div>
                    </li>
                  </ul>
                  
                  <h4 className="text-sm font-medium mt-4 mb-2">Networking Opportunities:</h4>
                  <p className="text-xs text-gray-600">
                    Visit the Mount Abu Business Club or attend seasonal business meetups at major hotels.
                  </p>
                  
                  <h4 className="text-sm font-medium mt-4 mb-2">Unwinding After Work:</h4>
                  <p className="text-xs text-gray-600">
                    Sunset Point for evening relaxation, spa services at luxury hotels, or a quiet dinner at rooftop restaurants.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="couples" className="mt-0">
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-medium mb-2">Romantic Getaway Guide</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Experience magical moments with your partner in the scenic mountain surroundings of Mount Abu.
                  </p>
                  
                  <h4 className="text-sm font-medium mb-2">Romantic Spots:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Badge variant="outline" className="mt-0.5 mr-2">1</Badge>
                      <div>
                        <p className="text-sm font-medium">Sunset Point</p>
                        <p className="text-xs text-gray-500">Watch the sun go down in a spectacular display of colors.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Badge variant="outline" className="mt-0.5 mr-2">2</Badge>
                      <div>
                        <p className="text-sm font-medium">Nakki Lake Boat Ride</p>
                        <p className="text-xs text-gray-500">Private boat rides especially during sunrise or sunset.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Badge variant="outline" className="mt-0.5 mr-2">3</Badge>
                      <div>
                        <p className="text-sm font-medium">Bailey's Walk</p>
                        <p className="text-xs text-gray-500">A scenic trail perfect for hand-in-hand walks.</p>
                      </div>
                    </li>
                  </ul>
                  
                  <h4 className="text-sm font-medium mt-4 mb-2">Couple-friendly Accommodations:</h4>
                  <p className="text-xs text-gray-600">
                    Luxurious honeymoon suites at Hilltop Luxury Resort or private cottages with lake views.
                  </p>
                  
                  <h4 className="text-sm font-medium mt-4 mb-2">Dining Experiences:</h4>
                  <p className="text-xs text-gray-600">
                    Candlelight dinners at rooftop restaurants or private dining setups by the lake.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="adventure" className="mt-0">
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-medium mb-2">Adventure Seeker's Guide</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Discover the thrilling side of Mount Abu with these exciting outdoor adventures.
                  </p>
                  
                  <h4 className="text-sm font-medium mb-2">Top Adventures:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Badge variant="outline" className="mt-0.5 mr-2">1</Badge>
                      <div>
                        <p className="text-sm font-medium">Trekking to Guru Shikhar</p>
                        <p className="text-xs text-gray-500">Climb to the highest peak in the Aravalli Range.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Badge variant="outline" className="mt-0.5 mr-2">2</Badge>
                      <div>
                        <p className="text-sm font-medium">Rock Climbing</p>
                        <p className="text-xs text-gray-500">Challenge yourself on natural rock formations with experienced guides.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Badge variant="outline" className="mt-0.5 mr-2">3</Badge>
                      <div>
                        <p className="text-sm font-medium">Mountain Biking</p>
                        <p className="text-xs text-gray-500">Off-road trails through forests and hills.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Badge variant="outline" className="mt-0.5 mr-2">4</Badge>
                      <div>
                        <p className="text-sm font-medium">Night Safari</p>
                        <p className="text-xs text-gray-500">Explore wildlife after dark in the sanctuary.</p>
                      </div>
                    </li>
                  </ul>
                  
                  <h4 className="text-sm font-medium mt-4 mb-2">Essential Gear:</h4>
                  <p className="text-xs text-gray-600">
                    Hiking boots, weather-appropriate clothing, backpack with essentials, and camera for capturing adventures.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="solo" className="mt-0">
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-medium mb-2">Solo Traveler's Guide</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Explore Mount Abu at your own pace with this guide tailored for independent travelers.
                  </p>
                  
                  <h4 className="text-sm font-medium mb-2">Solo-Friendly Activities:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Badge variant="outline" className="mt-0.5 mr-2">1</Badge>
                      <div>
                        <p className="text-sm font-medium">Photography Tours</p>
                        <p className="text-xs text-gray-500">Capture the natural beauty at your own pace.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Badge variant="outline" className="mt-0.5 mr-2">2</Badge>
                      <div>
                        <p className="text-sm font-medium">Meditation Sessions</p>
                        <p className="text-xs text-gray-500">Join peaceful meditation at various spiritual centers.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Badge variant="outline" className="mt-0.5 mr-2">3</Badge>
                      <div>
                        <p className="text-sm font-medium">Local Market Exploration</p>
                        <p className="text-xs text-gray-500">Discover handicrafts and local cuisine in the markets.</p>
                      </div>
                    </li>
                  </ul>
                  
                  <h4 className="text-sm font-medium mt-4 mb-2">Safety Tips:</h4>
                  <p className="text-xs text-gray-600">
                    Mount Abu is generally safe for solo travelers, but stick to popular areas after dark and keep emergency contacts handy.
                  </p>
                  
                  <h4 className="text-sm font-medium mt-4 mb-2">Social Opportunities:</h4>
                  <p className="text-xs text-gray-600">
                    Join group walking tours, cooking classes, or stay at hostels to meet fellow travelers.
                  </p>
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default TravelGuide;
