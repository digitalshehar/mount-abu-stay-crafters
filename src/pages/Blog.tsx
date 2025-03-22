
import React from "react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BlogPost = ({ title, date, excerpt, image, category }) => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md">
    <img 
      src={image} 
      alt={title} 
      className="w-full h-48 object-cover"
    />
    <div className="p-6">
      <div className="mb-2">
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
          {category}
        </span>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-stone-600 text-sm mb-4">{excerpt}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-stone-500">{date}</span>
        <Button variant="outline" size="sm">Read more</Button>
      </div>
    </div>
  </div>
);

const Blog = () => {
  const blogPosts = [
    {
      title: "Top 10 Must-Visit Places in Mount Abu",
      date: "June 15, 2023",
      excerpt: "Discover the breathtaking views and hidden gems that make Mount Abu a perfect getaway destination.",
      image: "https://images.unsplash.com/photo-1585123388867-3bfe6dd4bdbf?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      category: "Travel Guide"
    },
    {
      title: "Best Time to Visit Mount Abu: Weather Guide",
      date: "July 23, 2023",
      excerpt: "Plan your trip to Mount Abu with our comprehensive weather guide to ensure the perfect vacation experience.",
      image: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      category: "Travel Tips"
    },
    {
      title: "Local Cuisine of Mount Abu: A Food Journey",
      date: "August 10, 2023",
      excerpt: "Explore the delicious local cuisine and must-try dishes during your visit to Mount Abu.",
      image: "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      category: "Food"
    },
    {
      title: "Mount Abu on a Budget: Affordable Travel Guide",
      date: "September 5, 2023",
      excerpt: "Experience the beauty of Mount Abu without breaking the bank with our budget-friendly travel tips.",
      image: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      category: "Budget Travel"
    },
    {
      title: "Adventure Activities in Mount Abu for Thrill Seekers",
      date: "October 12, 2023",
      excerpt: "From trekking to water sports, discover the best adventure activities for an adrenaline-filled trip to Mount Abu.",
      image: "https://images.unsplash.com/photo-1682686580186-b55d2a91053c?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      category: "Adventure"
    },
    {
      title: "Historical Sites in Mount Abu: A Cultural Tour",
      date: "November 20, 2023",
      excerpt: "Explore the rich history and cultural heritage of Mount Abu through its ancient temples and historical monuments.",
      image: "https://images.unsplash.com/photo-1609766418204-94aae0ecfdec?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      category: "History"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Mount Abu Travel Blog | Stories & Tips" 
        description="Read the latest travel stories, tips, and insights about Mount Abu. Discover hidden gems and expert advice for your perfect trip."
      />
      <Header />
      
      <main className="flex-1 bg-stone-50">
        <div className="container-custom py-12 md:py-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">Mount Abu Travel Blog</h1>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto">
              Discover travel stories, tips, and insights to make your Mount Abu trip memorable.
            </p>
          </div>
          
          {/* Featured article */}
          <div className="mb-16">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3" 
                    alt="A beautiful view of Mount Abu" 
                    className="h-64 md:h-full w-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                  <div className="mb-3">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                      Featured
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Ultimate Guide to Mount Abu: Everything You Need to Know</h2>
                  <p className="text-stone-600 mb-6">
                    From the best accommodations to top-rated attractions, our comprehensive guide covers everything you need to plan the perfect Mount Abu vacation.
                  </p>
                  <div className="mt-auto">
                    <Button>Read Full Article</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Blog post grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <BlogPost key={index} {...post} />
            ))}
          </div>
          
          {/* Newsletter subscription */}
          <div className="mt-16 bg-primary/5 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-semibold mb-3">Subscribe to Our Newsletter</h2>
            <p className="text-stone-600 mb-6 max-w-2xl mx-auto">
              Stay updated with the latest travel tips, promotions, and Mount Abu insights delivered directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-4 py-2 rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
