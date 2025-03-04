
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Map, Calendar, Sun, Cloud, Utensils, Bus, Landmark, Wallet } from "lucide-react";

const TravelGuide = () => {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-display font-bold mb-4">Mount Abu Travel Guide</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Your comprehensive guide to planning the perfect trip to Mount Abu, 
                Rajasthan's only hill station and a beautiful oasis in the desert state.
              </p>
            </div>
            
            <Tabs defaultValue="overview" className="mb-12">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="attractions">Attractions</TabsTrigger>
                <TabsTrigger value="planning">Trip Planning</TabsTrigger>
                <TabsTrigger value="tips">Travel Tips</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div className="prose prose-stone max-w-none">
                  <p className="lead text-lg">
                    Mount Abu is a popular hill station in the Aravalli Range in Rajasthan, India. 
                    Known for its scenic beauty, temples, and pleasant climate, it's a favorite 
                    destination for both domestic and international tourists.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                          <Map className="h-5 w-5 text-primary" />
                          Geography
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>
                          Located at an elevation of 1,220 meters (4,003 ft) above sea level, 
                          Mount Abu sits on a high rocky plateau surrounded by forests and the 
                          Aravalli mountain range. It's home to several lakes, the most famous 
                          being Nakki Lake.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-primary" />
                          Best Time to Visit
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>
                          The ideal time to visit Mount Abu is from October to March when the 
                          weather is pleasant. April to June can be warmer but still comfortable 
                          compared to the rest of Rajasthan. July to September brings the monsoon, 
                          with lush greenery but occasional heavy rainfall.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="bg-stone-50 p-8 rounded-xl mb-8">
                    <h2 className="text-2xl font-display font-semibold mb-4">Weather in Mount Abu</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { season: "Winter (Oct-Feb)", temp: "4°C - 20°C", icon: <Cloud className="h-8 w-8 text-blue-500" />, desc: "Cool and pleasant with occasional chilly nights" },
                        { season: "Summer (Mar-Jun)", temp: "20°C - 33°C", icon: <Sun className="h-8 w-8 text-amber-500" />, desc: "Warm days but cooler than the plains of Rajasthan" },
                        { season: "Monsoon (Jul-Sep)", temp: "15°C - 26°C", icon: <Cloud className="h-8 w-8 text-indigo-500" />, desc: "Moderate rainfall with lush green surroundings" },
                        { season: "Post-Monsoon (Sep-Oct)", temp: "12°C - 25°C", icon: <Sun className="h-8 w-8 text-green-500" />, desc: "Pleasant with clear skies and greenery" },
                      ].map((item, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-medium">{item.season}</h3>
                              <p className="text-lg font-semibold">{item.temp}</p>
                            </div>
                            {item.icon}
                          </div>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-display font-semibold mb-4">How to Reach Mount Abu</h2>
                  <div className="space-y-4 mb-8">
                    <div className="flex gap-4 items-start">
                      <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <Bus className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">By Road</h3>
                        <p>
                          Mount Abu is well-connected by road to major cities in Rajasthan and Gujarat. 
                          Regular buses operate from Jaipur (490 km), Udaipur (160 km), and Ahmedabad (220 km). 
                          Taxis are available from nearby cities.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 items-start">
                      <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-train-front">
                          <path d="M8 3a4 4 0 0 1 8 0" />
                          <path d="M10 15h.01" />
                          <path d="M14 15h.01" />
                          <path d="M10 19v-4" />
                          <path d="M14 19v-4" />
                          <path d="M6 19h12" />
                          <path d="M4 9.5V15h16V9.5a2.5 2.5 0 0 0-2.5-2.5h-11A2.5 2.5 0 0 0 4 9.5Z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">By Train</h3>
                        <p>
                          The nearest railway stations are Abu Road (28 km) and Ikkawali (33 km). Both are well-connected 
                          to major cities like Delhi, Mumbai, and Jaipur. From the station, taxis and buses are available 
                          to reach Mount Abu.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 items-start">
                      <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plane">
                          <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">By Air</h3>
                        <p>
                          The nearest airports are Udaipur (Dabok) Airport (185 km) and Ahmedabad Airport (220 km). 
                          Both airports have good connectivity with major Indian cities. From the airports, you can 
                          hire a taxi or take a bus to Mount Abu.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="attractions" className="space-y-6">
                <div className="prose prose-stone max-w-none">
                  <p className="lead text-lg">
                    Mount Abu is home to numerous natural wonders, historical sites, and religious 
                    places that attract visitors from around the world. Here are the top attractions 
                    you shouldn't miss during your visit.
                  </p>
                  
                  <h2 className="text-2xl font-display font-semibold mb-4 mt-8">Top Attractions in Mount Abu</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                    {[
                      {
                        name: "Dilwara Temples",
                        desc: "Dating back to the 11th century, these exquisitely carved marble Jain temples are known for their stunning architecture and intricate carvings.",
                        image: "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80"
                      },
                      {
                        name: "Nakki Lake",
                        desc: "A beautiful natural lake surrounded by hills, offering boating facilities. According to local legend, it was dug by gods using their nails (nakki).",
                        image: "https://images.unsplash.com/photo-1626621331169-5f38b34d739c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80"
                      },
                      {
                        name: "Guru Shikhar",
                        desc: "The highest peak in the Aravalli Range at 1,722 meters, offering panoramic views of Mount Abu and surroundings. It is also home to a temple dedicated to Dattatreya.",
                        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80"
                      },
                      {
                        name: "Sunset Point",
                        desc: "A popular viewpoint offering spectacular sunset views over the hills. The location is perfect for photography and peaceful evening walks.",
                        image: "https://images.unsplash.com/photo-1496614932623-0a3a9743552e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80"
                      },
                      {
                        name: "Mount Abu Wildlife Sanctuary",
                        desc: "Covering 290 sq km of forest, this sanctuary is home to leopards, sloth bears, sambar deer, and over 250 species of birds. Perfect for nature lovers and wildlife enthusiasts.",
                        image: "https://images.unsplash.com/photo-1504173010664-32509aeebb62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80"
                      },
                      {
                        name: "Achalgarh Fort",
                        desc: "An ancient fort built in the 14th century by Rana Kumbha, featuring impressive architecture and temples within its premises.",
                        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80"
                      },
                    ].map((attraction, index) => (
                      <Card key={index} className="overflow-hidden">
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={attraction.image} 
                            alt={attraction.name} 
                            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                          />
                        </div>
                        <CardHeader className="pb-2">
                          <CardTitle>{attraction.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{attraction.desc}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <h2 className="text-2xl font-display font-semibold mb-4">Local Experiences</h2>
                  <ul className="space-y-3 mb-8">
                    <li className="flex gap-3 items-start">
                      <Landmark className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <strong>Heritage Walking Tour</strong>: Explore the colonial architecture and historical sites of Mount Abu with a guided walking tour.
                      </div>
                    </li>
                    <li className="flex gap-3 items-start">
                      <Utensils className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <strong>Culinary Exploration</strong>: Try local Rajasthani cuisine at authentic restaurants, including the famous Dal Baati Churma.
                      </div>
                    </li>
                    <li className="flex gap-3 items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-0.5">
                        <circle cx="12" cy="12" r="10" />
                        <path d="m4.9 4.9 14.2 14.2" />
                      </svg>
                      <div>
                        <strong>Shopping for Handicrafts</strong>: Visit local markets to purchase Rajasthani handicrafts, textiles, and souvenirs.
                      </div>
                    </li>
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="planning" className="space-y-6">
                <div className="prose prose-stone max-w-none">
                  <p className="lead text-lg">
                    Planning a trip to Mount Abu is easy with these helpful itineraries and accommodation recommendations. 
                    Whether you're visiting for a weekend or a week, we've got you covered.
                  </p>
                  
                  <h2 className="text-2xl font-display font-semibold mb-4 mt-8">Suggested Itineraries</h2>
                  
                  <div className="bg-stone-50 p-6 rounded-xl mb-8">
                    <h3 className="text-xl font-display font-semibold mb-3">Weekend Trip (2-3 Days)</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium">Day 1:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Arrive in Mount Abu and check into your accommodation</li>
                          <li>Visit Nakki Lake and enjoy boating</li>
                          <li>Explore the local market</li>
                          <li>Watch sunset at Sunset Point</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium">Day 2:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Visit Dilwara Temples in the morning</li>
                          <li>Explore Mount Abu Wildlife Sanctuary</li>
                          <li>Visit Honeymoon Point (Andra Point)</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium">Day 3:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Early morning visit to Guru Shikhar</li>
                          <li>Visit Achalgarh Fort</li>
                          <li>Depart from Mount Abu</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-stone-50 p-6 rounded-xl mb-8">
                    <h3 className="text-xl font-display font-semibold mb-3">Extended Trip (4-5 Days)</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium">Day 1-3:</p>
                        <p>Follow the weekend itinerary above</p>
                      </div>
                      <div>
                        <p className="font-medium">Day 4:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Visit Trevor's Tank for bird watching</li>
                          <li>Explore Brahma Kumari World Spiritual University</li>
                          <li>Relax at Peace Park</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium">Day 5:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Day trip to nearby attractions like Ambaji Temple (87 km)</li>
                          <li>Enjoy shopping for souvenirs</li>
                          <li>Depart from Mount Abu</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-display font-semibold mb-4">Accommodation Options</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Luxury Stays</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>Cama Rajputana Club Resort</li>
                          <li>Palace Hotel</li>
                          <li>The Calmness Villa</li>
                          <li>WelcomHeritage Connaught House</li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Mid-Range Options</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>Hotel Hillock</li>
                          <li>Hotel Karnavati</li>
                          <li>Toppers Resort</li>
                          <li>Hotel Mount Regency</li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Budget Stays</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>Hotel Lake Palace</li>
                          <li>Hotel Samidarshan</li>
                          <li>RTDC Hotel Shikhar</li>
                          <li>Hotel Banjara</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="tips" className="space-y-6">
                <div className="prose prose-stone max-w-none">
                  <p className="lead text-lg">
                    Make the most of your Mount Abu trip with these essential travel tips, 
                    information about local customs, and practical advice for a smooth experience.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Wallet className="h-5 w-5 text-primary" />
                          Money Matters
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <p className="font-medium">Currency</p>
                          <p className="text-muted-foreground">Indian Rupee (INR) is the local currency. ATMs are available in Mount Abu town.</p>
                        </div>
                        <div>
                          <p className="font-medium">Credit Cards</p>
                          <p className="text-muted-foreground">Major hotels and restaurants accept credit cards, but always carry cash for smaller establishments and local markets.</p>
                        </div>
                        <div>
                          <p className="font-medium">Tipping</p>
                          <p className="text-muted-foreground">Tipping is not mandatory but appreciated. A 5-10% tip at restaurants and for guides is common.</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                            <path d="M2 12h20" />
                            <path d="M2 12v4.5A1.5 1.5 0 0 0 3.5 18h17a1.5 1.5 0 0 0 1.5-1.5V12" />
                            <path d="M2 12v-4.5A1.5 1.5 0 0 1 3.5 6h17A1.5 1.5 0 0 1 22 7.5V12" />
                            <path d="M18 12v6" />
                            <path d="M22 12H13a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h9" />
                          </svg>
                          Packing Essentials
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>Light woolens in winter (October to February)</li>
                          <li>Comfortable walking shoes for sightseeing</li>
                          <li>Sun protection (hat, sunglasses, sunscreen)</li>
                          <li>Rainwear during monsoon (July to September)</li>
                          <li>Basic medications and first aid kit</li>
                          <li>Insect repellent</li>
                          <li>Reusable water bottle</li>
                          <li>Camera</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <h2 className="text-2xl font-display font-semibold mb-4">Local Customs & Etiquette</h2>
                  <div className="space-y-4 mb-8">
                    <div>
                      <p className="font-medium">Dress Code</p>
                      <p className="text-muted-foreground">
                        When visiting religious places like Dilwara Temples, modest clothing is required. 
                        Shoulders and knees should be covered. Remove shoes before entering temples.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Photography</p>
                      <p className="text-muted-foreground">
                        Photography is prohibited inside the Dilwara Temples. Always ask permission before 
                        photographing local people, especially in rural areas and tribal settlements.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Language</p>
                      <p className="text-muted-foreground">
                        Hindi and Rajasthani are commonly spoken. English is understood in hotels and 
                        tourist areas but learning a few basic Hindi phrases can be helpful and appreciated.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
                    <h3 className="text-amber-800 font-semibold text-lg mb-2">Safety Tips</h3>
                    <ul className="space-y-2 text-amber-700">
                      <li>Keep valuables secure and be cautious in crowded areas.</li>
                      <li>Drink bottled or filtered water to avoid stomach issues.</li>
                      <li>Use sunscreen and stay hydrated, especially during summer months.</li>
                      <li>Avoid hiking alone in remote areas of the wildlife sanctuary.</li>
                      <li>Keep emergency contact numbers handy.</li>
                      <li>Follow guidelines and warnings at viewpoints and natural attractions.</li>
                    </ul>
                  </div>
                  
                  <h2 className="text-2xl font-display font-semibold mb-4">Getting Around</h2>
                  <div className="space-y-3 mb-8">
                    <div>
                      <p className="font-medium">Taxis and Auto-rickshaws</p>
                      <p className="text-muted-foreground">
                        Available throughout Mount Abu town. Negotiate the fare before starting your journey or ask for metered fare.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Rental Vehicles</p>
                      <p className="text-muted-foreground">
                        Cars and bikes are available for rent in Mount Abu. You'll need a valid driving license.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Walking</p>
                      <p className="text-muted-foreground">
                        The town is small and many attractions are within walking distance if you're staying in the central area.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TravelGuide;
