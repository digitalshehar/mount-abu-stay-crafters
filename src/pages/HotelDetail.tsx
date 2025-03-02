
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Star, MapPin, Calendar, Users, Wifi, Coffee, Tv, Bath, Utensils, Dumbbell, Snowflake, Car } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

// Mock hotel data
const hotelDatabase = [
  {
    id: 1,
    slug: "hilltop-luxury-resort",
    name: "Hilltop Luxury Resort",
    location: "Near Nakki Lake",
    description: "Perched on the highest point in Mount Abu, the Hilltop Luxury Resort offers breathtaking panoramic views of the surrounding valleys and Nakki Lake. This 5-star property features elegantly designed rooms with modern amenities, an infinity pool that seems to merge with the horizon, and a world-class spa offering rejuvenating Ayurvedic treatments. The resort's fine dining restaurant serves authentic Rajasthani cuisine prepared with locally sourced ingredients, along with a selection of international dishes. With its dedicated service and luxurious facilities, the resort provides an unforgettable retreat in the lap of nature.",
    price: 5800,
    rating: 4.8,
    reviewCount: 312,
    images: [
      "https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1540304453527-62f979142a17?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3",
    ],
    amenities: ["Wifi", "Breakfast", "Swimming Pool", "Spa", "Restaurant", "Gym", "Air Conditioning", "Parking"],
    rooms: [
      { type: "Deluxe Room", price: 5800, capacity: 2 },
      { type: "Premium Room", price: 7500, capacity: 2 },
      { type: "Luxury Suite", price: 12000, capacity: 4 },
    ],
    reviews: [
      { name: "Rahul Sharma", rating: 5, comment: "Absolutely stunning views and exceptional service!" },
      { name: "Priya Patel", rating: 4, comment: "Loved the infinity pool and the restaurant. Room was spacious and clean." },
      { name: "David Wilson", rating: 5, comment: "One of the best hotels I've stayed at in India. Highly recommended!" },
    ]
  },
  {
    id: 2,
    slug: "palace-heritage-hotel",
    name: "Palace Heritage Hotel",
    location: "Central Mount Abu",
    description: "Housed in a meticulously restored royal palace dating back to the 19th century, the Palace Heritage Hotel is a living testament to the rich cultural heritage of Rajasthan. Each room and suite is uniquely decorated with period furniture, traditional artwork, and modern conveniences discreetly integrated to ensure a comfortable stay. The central courtyard features a beautiful garden with fountains, perfect for evening tea or cultural performances that are regularly hosted here. The hotel's restaurant serves royal recipes passed down through generations, offering guests a taste of authentic royal cuisine. With its warm hospitality and regal ambiance, the Palace Heritage Hotel offers a truly majestic experience.",
    price: 7200,
    rating: 4.9,
    reviewCount: 245,
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1614957004131-9e8f2a13636a?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1605346434674-a440ca2acc6c?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
    ],
    amenities: ["Wifi", "Breakfast", "Restaurant", "Gym", "Heritage Tours", "Cultural Programs", "Air Conditioning", "Valet Parking"],
    rooms: [
      { type: "Heritage Room", price: 7200, capacity: 2 },
      { type: "Royal Suite", price: 12000, capacity: 2 },
      { type: "Maharaja Suite", price: 18000, capacity: 4 },
    ],
    reviews: [
      { name: "Amita Desai", rating: 5, comment: "A truly royal experience! The architecture and interiors are breathtaking." },
      { name: "Michael Brown", rating: 5, comment: "The cultural performances and heritage tours made our stay memorable." },
      { name: "Sanjay Mehta", rating: 4, comment: "Excellent service and amazing food. A bit pricey but worth it." },
    ]
  },
  {
    id: 3,
    slug: "green-valley-resort",
    name: "Green Valley Resort",
    location: "Near Wildlife Sanctuary",
    description: "Nestled amidst the lush greenery near Mount Abu Wildlife Sanctuary, Green Valley Resort is an eco-friendly retreat that blends harmoniously with its natural surroundings. The resort comprises of well-appointed cottages built using sustainable materials, each offering private verandas with stunning forest views. The property features nature trails, bird watching spots, and organic gardens where guests can harvest vegetables for their meals. The resort's restaurant focuses on farm-to-table dining, serving fresh, organic produce in both local and international cuisines. With its emphasis on sustainability and proximity to nature, Green Valley Resort is perfect for eco-conscious travelers and nature enthusiasts.",
    price: 4300,
    rating: 4.6,
    reviewCount: 187,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1470770903876-2b4779d7a66e?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1591825729269-caeb344f6df2?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1561134643-a21550b752e1?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
    ],
    amenities: ["Wifi", "Parking", "Restaurant", "Garden", "Nature Trails", "Bird Watching", "Organic Farm"],
    rooms: [
      { type: "Garden Cottage", price: 4300, capacity: 2 },
      { type: "Forest View Cottage", price: 5500, capacity: 2 },
      { type: "Family Cottage", price: 8000, capacity: 4 },
    ],
    reviews: [
      { name: "Neha Gupta", rating: 5, comment: "Perfect place for nature lovers. Peaceful and beautiful!" },
      { name: "Mark Johnson", rating: 4, comment: "Loved the organic food and nature walks. Cottages are very comfortable." },
      { name: "Anita Singh", rating: 5, comment: "An amazing eco-friendly resort with wonderful staff." },
    ]
  },
  {
    id: 4,
    slug: "mountain-view-cottages",
    name: "Mountain View Cottages",
    location: "Sunset Point",
    description: "Located near the famous Sunset Point, Mountain View Cottages offers charming accommodations with spectacular views of the Aravalli range. These cozy cottages feature rustic wooden interiors, comfortable furnishings, and private balconies where guests can enjoy the cool mountain breeze and scenic vistas. The property has a multi-cuisine restaurant, a bonfire area perfect for evening gatherings, and offers activities like trekking and rock climbing. The friendly staff can arrange guided tours to nearby attractions, making it convenient for guests to explore the region. With its homely atmosphere and stunning location, Mountain View Cottages provides a peaceful retreat away from the hustle and bustle of city life.",
    price: 3500,
    rating: 4.5,
    reviewCount: 156,
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1520333789090-1afc82db536a?auto=format&fit=crop&q=80&w=2571&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1571512599285-9ac4fdf3dba9?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
    ],
    amenities: ["Wifi", "Breakfast", "TV", "Bathroom", "Mountain View", "Bonfire", "Trekking"],
    rooms: [
      { type: "Standard Cottage", price: 3500, capacity: 2 },
      { type: "Deluxe Cottage", price: 4500, capacity: 2 },
      { type: "Family Cottage", price: 6500, capacity: 4 },
    ],
    reviews: [
      { name: "Vikram Malhotra", rating: 4, comment: "Beautiful views and cozy cottages. Great value for money." },
      { name: "Sarah Thompson", rating: 5, comment: "The sunset views from our balcony were incredible! Staff was very helpful." },
      { name: "Rajesh Kumar", rating: 4, comment: "Comfortable stay with good amenities. The bonfire evening was the highlight." },
    ]
  },
  {
    id: 5,
    slug: "lakeside-retreat",
    name: "Lakeside Retreat",
    location: "Nakki Lake",
    description: "Situated on the serene shores of Nakki Lake, Lakeside Retreat offers a tranquil getaway with direct access to the lake. The modern rooms feature large windows and balconies that provide stunning lake views and allow natural light to flood in. Guests can enjoy boat rides, lakeside walks, and picnics arranged by the hotel. The in-house restaurant specializes in freshwater fish delicacies along with a variety of Indian and Continental dishes. The hotel also features a spa offering therapeutic treatments, a well-equipped fitness center, and a rooftop infinity pool overlooking the lake. With its idyllic setting and comprehensive facilities, Lakeside Retreat is perfect for a relaxing holiday experience.",
    price: 4800,
    rating: 4.7,
    reviewCount: 203,
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1489084917528-a57e68a79a1e?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3",
    ],
    amenities: ["Wifi", "Breakfast", "TV", "Lake View", "Swimming Pool", "Spa", "Fitness Center", "Boating"],
    rooms: [
      { type: "Lake View Room", price: 4800, capacity: 2 },
      { type: "Premium Lake View", price: 6000, capacity: 2 },
      { type: "Lake View Suite", price: 9000, capacity: 4 },
    ],
    reviews: [
      { name: "Anjali Sharma", rating: 5, comment: "The lake views are breathtaking! Room was comfortable and clean." },
      { name: "Robert Chen", rating: 4, comment: "Great location and facilities. Enjoyed the boat rides and spa treatments." },
      { name: "Meera Reddy", rating: 5, comment: "Perfect romantic getaway. The restaurant serves amazing food!" },
    ]
  }
];

const HotelDetail = () => {
  const { hotelSlug } = useParams<{ hotelSlug: string }>();
  const [hotel, setHotel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState("2");
  const [selectedRoom, setSelectedRoom] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, this would be an API call
    const foundHotel = hotelDatabase.find((h) => h.slug === hotelSlug);
    setHotel(foundHotel || null);
    setLoading(false);
    
    // Set document title
    if (foundHotel) {
      document.title = `${foundHotel.name} - HotelInMountAbu`;
    } else {
      document.title = "Hotel Not Found - HotelInMountAbu";
    }
  }, [hotelSlug]);

  const handleBookNow = () => {
    if (!checkInDate || !checkOutDate || !selectedRoom) {
      toast({
        title: "Please fill in all fields",
        description: "Check-in date, check-out date and room type are required.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Booking successful!",
      description: `Your booking at ${hotel.name} has been confirmed. Check your email for details.`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-3xl font-bold mb-4">Hotel Not Found</h1>
            <p className="text-stone-600 mb-6">Sorry, we couldn't find the hotel you're looking for.</p>
            <Button asChild>
              <a href="/hotels">Browse All Hotels</a>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Function to render amenity icon
  const renderAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="h-4 w-4" />;
      case "breakfast":
        return <Coffee className="h-4 w-4" />;
      case "tv":
        return <Tv className="h-4 w-4" />;
      case "bathroom":
        return <Bath className="h-4 w-4" />;
      case "restaurant":
        return <Utensils className="h-4 w-4" />;
      case "gym":
        return <Dumbbell className="h-4 w-4" />;
      case "air conditioning":
        return <Snowflake className="h-4 w-4" />;
      case "parking":
        return <Car className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative h-[50vh] overflow-hidden">
          <img 
            src={hotel.images[0]} 
            alt={hotel.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 flex items-end">
            <div className="container-custom pb-12">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">{hotel.name}</h1>
              <div className="flex items-center text-white gap-4">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{hotel.location}</span>
                </div>
                <div className="flex items-center bg-white/20 px-2 py-1 rounded-lg">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span>{hotel.rating}</span>
                  <span className="text-sm ml-1">({hotel.reviewCount} reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Gallery */}
              <div className="grid grid-cols-3 gap-4">
                {hotel.images.slice(1, 4).map((image: string, index: number) => (
                  <img 
                    key={index}
                    src={image} 
                    alt={`${hotel.name} - image ${index + 2}`} 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ))}
              </div>
              
              {/* Description */}
              <div>
                <h2 className="text-2xl font-display font-semibold mb-4">About this hotel</h2>
                <p className="text-stone-600 leading-relaxed">{hotel.description}</p>
              </div>
              
              {/* Amenities */}
              <div>
                <h2 className="text-2xl font-display font-semibold mb-6">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {hotel.amenities.map((amenity: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2 text-stone-600">
                      {renderAmenityIcon(amenity)}
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Room Types */}
              <div>
                <h2 className="text-2xl font-display font-semibold mb-6">Available Rooms</h2>
                <div className="space-y-4">
                  {hotel.rooms.map((room: any, index: number) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-stone-100 flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-lg">{room.type}</h3>
                        <p className="text-stone-500">Max {room.capacity} guests</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold">₹{room.price}<span className="text-sm font-normal">/night</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Reviews */}
              <div>
                <h2 className="text-2xl font-display font-semibold mb-6">Guest Reviews</h2>
                <div className="space-y-6">
                  {hotel.reviews.map((review: any, index: number) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-stone-100">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold">{review.name}</h3>
                        <div className="flex items-center bg-primary/5 px-2 py-1 rounded">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span>{review.rating}/5</span>
                        </div>
                      </div>
                      <p className="text-stone-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Booking Panel */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 border border-stone-100 sticky top-24">
                <h2 className="text-2xl font-display font-semibold mb-2">Book Your Stay</h2>
                <p className="text-2xl font-bold text-primary mb-6">₹{hotel.price}<span className="text-sm font-normal text-stone-500">/night</span></p>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label htmlFor="check-in" className="block text-sm font-medium text-stone-600 mb-1">Check-in Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
                      <Input 
                        id="check-in"
                        type="date"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="check-out" className="block text-sm font-medium text-stone-600 mb-1">Check-out Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
                      <Input 
                        id="check-out"
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="guests" className="block text-sm font-medium text-stone-600 mb-1">Guests</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
                      <select
                        id="guests"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-md border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
                      >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="room-type" className="block text-sm font-medium text-stone-600 mb-1">Room Type</label>
                    <select
                      id="room-type"
                      value={selectedRoom}
                      onChange={(e) => setSelectedRoom(e.target.value)}
                      className="w-full px-4 py-2 rounded-md border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
                    >
                      <option value="">Select Room Type</option>
                      {hotel.rooms.map((room: any, index: number) => (
                        <option key={index} value={room.type}>
                          {room.type} - ₹{room.price}/night
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-stone-600">Room charges</span>
                    <span>₹{hotel.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Taxes & fees</span>
                    <span>₹{Math.round(hotel.price * 0.18)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-semibold">
                    <span>Total (per night)</span>
                    <span>₹{hotel.price + Math.round(hotel.price * 0.18)}</span>
                  </div>
                </div>
                
                <Button className="w-full" size="lg" onClick={handleBookNow}>
                  Book Now
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

export default HotelDetail;
