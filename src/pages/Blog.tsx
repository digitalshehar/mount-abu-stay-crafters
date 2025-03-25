
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Calendar, User, ArrowRight, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Top 10 Places to Visit in Mount Abu",
      excerpt: "Discover the most stunning locations and hidden gems in Mount Abu that every traveler should experience...",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      author: "Priya Sharma",
      date: "June 12, 2023",
      category: "Travel Guide",
      readTime: "8 min read"
    },
    {
      id: 2,
      title: "The Best Time to Visit Mount Abu: A Seasonal Guide",
      excerpt: "Learn about the different seasons in Mount Abu and plan your trip during the perfect time based on your preferences...",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      author: "Rahul Verma",
      date: "April 28, 2023",
      category: "Travel Tips",
      readTime: "6 min read"
    },
    {
      id: 3,
      title: "A Complete Guide to Nakki Lake: History and Activities",
      excerpt: "Explore the legendary Nakki Lake, its fascinating history, mythology, and the various activities you can enjoy...",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      author: "Amit Patel",
      date: "March 15, 2023",
      category: "Attractions",
      readTime: "10 min read"
    },
    {
      id: 4,
      title: "Traditional Rajasthani Cuisine to Try in Mount Abu",
      excerpt: "Savor the flavors of authentic Rajasthani food available in Mount Abu, from dal baati churma to gatte ki sabzi...",
      image: "https://images.unsplash.com/photo-1605478371310-a9f1e96b4ff4?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3",
      author: "Neha Gupta",
      date: "February 3, 2023",
      category: "Food Guide",
      readTime: "7 min read"
    },
    {
      id: 5,
      title: "Budget-Friendly Accommodations in Mount Abu",
      excerpt: "Find the best affordable hotels, hostels, and guesthouses in Mount Abu without compromising on comfort...",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3",
      author: "Vikram Singh",
      date: "January 20, 2023",
      category: "Accommodations",
      readTime: "5 min read"
    },
    {
      id: 6,
      title: "Adventure Activities for Thrill Seekers in Mount Abu",
      excerpt: "Get your adrenaline pumping with these exciting adventure activities available in and around Mount Abu...",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=1574&ixlib=rb-4.0.3",
      author: "Arjun Mathur",
      date: "December 8, 2022",
      category: "Adventure",
      readTime: "9 min read"
    },
  ];

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-stone-100">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="title-medium mb-4">Mount Abu Travel Blog</h1>
              <p className="subtitle mb-8">
                Insider tips, travel guides, and stories to help you plan the perfect Mount Abu experience
              </p>

              {/* Search */}
              <div className="max-w-md mx-auto relative">
                <input
                  type="text"
                  placeholder="Search for articles..."
                  className="w-full pl-4 pr-12 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button className="absolute right-4 top-3">
                  <Search className="h-5 w-5 text-stone-400" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-10 bg-white border-b border-stone-200">
          <div className="container-custom">
            <div className="flex flex-wrap justify-center gap-4">
              {['All', 'Travel Guide', 'Travel Tips', 'Attractions', 'Food Guide', 'Accommodations', 'Adventure'].map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    category === 'All' 
                      ? 'bg-primary text-white' 
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white rounded-2xl overflow-hidden shadow-md">
              <div className="relative h-full min-h-[300px] lg:h-[500px]">
                <img
                  src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3"
                  alt="Mount Abu landscape"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-8 lg:p-12">
                <div className="flex items-center gap-4 text-sm text-stone-500 mb-4">
                  <span className="text-primary font-medium">Featured</span>
                  <span>•</span>
                  <span>Travel Guide</span>
                </div>
                <h2 className="title-small mb-4">Top 10 Places to Visit in Mount Abu</h2>
                <p className="text-stone-600 mb-6">
                  Discover the most stunning locations and hidden gems in Mount Abu that every traveler should experience. From the serene Nakki Lake to the ancient Dilwara Temples, this comprehensive guide covers all the must-visit attractions.
                </p>
                <div className="flex items-center gap-4 text-sm text-stone-500 mb-6">
                  <div className="flex items-center">
                    <User size={14} className="mr-1" />
                    <span>Priya Sharma</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    <span>June 12, 2023</span>
                  </div>
                  <span>8 min read</span>
                </div>
                <Link
                  to="/blog/1"
                  className="inline-flex items-center font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Read Full Article
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 bg-stone-50">
          <div className="container-custom">
            <h2 className="title-small text-center mb-12">Latest Articles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(0, 6).map((post) => (
                <article key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden card-hover">
                  <Link to={`/blog/${post.id}`} className="block relative h-48">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-primary">
                      {post.category}
                    </div>
                  </Link>
                  <div className="p-6">
                    <Link to={`/blog/${post.id}`}>
                      <h3 className="font-display font-bold text-xl mb-3 hover:text-primary transition-colors">{post.title}</h3>
                    </Link>
                    <p className="text-stone-600 text-sm mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <div className="flex items-center">
                        <User size={12} className="mr-1" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar size={12} className="mr-1" />
                        <span>{post.date}</span>
                      </div>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            
            <div className="flex justify-center mt-12">
              <button className="px-6 py-3 bg-white border border-stone-200 rounded-lg text-primary font-medium hover:bg-stone-50 transition-colors">
                Load More Articles
              </button>
            </div>
          </div>
        </section>
        
        {/* Newsletter */}
        <section className="py-16 bg-primary text-white">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="title-small mb-4">Subscribe to Our Newsletter</h2>
              <p className="mb-8 text-white/80">
                Get the latest travel tips, exclusive offers, and Mount Abu insights delivered directly to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-3 rounded-lg text-foreground focus:outline-none"
                />
                <button className="bg-white text-primary font-medium px-6 py-3 rounded-lg hover:bg-white/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
