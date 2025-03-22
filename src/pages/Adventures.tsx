
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AdventureCard = ({ title, description, image, difficulty, duration, price }) => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md group">
    <div className="relative">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-56 object-cover transition-transform group-hover:scale-105"
      />
      <div className="absolute top-3 right-3">
        <span className={`text-xs font-medium px-2 py-1 rounded-full 
          ${difficulty === 'Easy' ? 'bg-green-100 text-green-700' : 
            difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-700' : 
            'bg-red-100 text-red-700'}`}
        >
          {difficulty}
        </span>
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-stone-600 text-sm mb-4">{description}</p>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-stone-500 mb-1">{duration}</div>
          <div className="text-lg font-semibold">₹{price}</div>
        </div>
        <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-white">
          Explore <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
);

const Adventures = () => {
  const adventures = [
    {
      title: "Sunset Trekking at Guru Shikhar",
      description: "Experience breathtaking views from the highest peak in the Aravalli Range with our guided sunset trek.",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      difficulty: "Moderate",
      duration: "4-5 hours",
      price: "1,200"
    },
    {
      title: "Wildlife Safari in Mount Abu",
      description: "Explore the diverse wildlife of Mount Abu Wildlife Sanctuary with expert guides and spotting opportunities.",
      image: "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      difficulty: "Easy",
      duration: "3 hours",
      price: "950"
    },
    {
      title: "Rock Climbing Adventure",
      description: "Challenge yourself with rock climbing experiences suitable for beginners and experienced climbers alike.",
      image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      difficulty: "Difficult",
      duration: "6 hours",
      price: "1,800"
    },
    {
      title: "Nakki Lake Boating",
      description: "Enjoy a serene boating experience on the historic Nakki Lake with stunning surroundings.",
      image: "https://images.unsplash.com/photo-1472457974886-0ebcd59440cc?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      difficulty: "Easy",
      duration: "1-2 hours",
      price: "600"
    },
    {
      title: "Mountain Biking Trails",
      description: "Discover Mount Abu's beautiful terrain on exciting mountain biking trails with varying difficulty levels.",
      image: "https://images.unsplash.com/photo-1486349311681-8ded3b07dbf0?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      difficulty: "Moderate",
      duration: "3-4 hours",
      price: "1,500"
    },
    {
      title: "Sunrise Yoga Retreat",
      description: "Rejuvenate with peaceful sunrise yoga sessions amidst the serene natural beauty of Mount Abu.",
      image: "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      difficulty: "Easy",
      duration: "2 hours",
      price: "800"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Mount Abu Adventures | Thrilling Activities" 
        description="Discover exciting adventure activities in Mount Abu. Book trekking, hiking, watersports, and other thrilling experiences."
      />
      <Header />
      
      <main className="flex-1 bg-stone-50">
        {/* Hero section */}
        <div className="relative h-96">
          <img 
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3" 
            alt="Mount Abu Adventures" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 flex items-center justify-center text-center p-4">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-display font-bold mb-4">
                Adventures in Mount Abu
              </h1>
              <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
                Discover thrilling adventures and activities in the beautiful landscapes of Mount Abu.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Explore All Adventures
              </Button>
            </div>
          </div>
        </div>
        
        <div className="container-custom py-12 md:py-16">
          {/* Adventure categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['All Adventures', 'Trekking', 'Water Activities', 'Wildlife', 'Camping', 'Yoga & Wellness'].map((category) => (
              <Button 
                key={category} 
                variant={category === 'All Adventures' ? "default" : "outline"}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
          
          {/* Adventure listings */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {adventures.map((adventure, index) => (
              <AdventureCard key={index} {...adventure} />
            ))}
          </div>
          
          {/* Call to action */}
          <div className="mt-16 bg-primary/5 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-semibold mb-3">Looking for Custom Adventures?</h2>
            <p className="text-stone-600 mb-6 max-w-2xl mx-auto">
              We can create personalized adventure packages tailored to your preferences and group size.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline">Contact Us</Button>
              <Button>Create Custom Package</Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Adventures;
