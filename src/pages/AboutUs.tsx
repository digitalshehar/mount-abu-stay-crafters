
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";

const AboutUs = () => {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-display font-bold mb-6">About Us</h1>
            
            <div className="prose prose-stone max-w-none">
              <p className="lead text-xl text-muted-foreground mb-8">
                Welcome to HotelInMountAbu, your premier destination for finding the perfect accommodations in the beautiful hill station of Mount Abu, Rajasthan.
              </p>
              
              <div className="bg-stone-50 p-8 rounded-xl mb-12">
                <h2 className="text-2xl font-display font-semibold mb-4">Our Story</h2>
                <p>
                  Founded in 2018, HotelInMountAbu began with a simple mission: to help travelers find the perfect stay in Mount Abu while supporting local businesses. What started as a small directory of family-run hotels has grown into a comprehensive platform connecting thousands of travelers with their ideal accommodations, activities, and transportation options in this beautiful hill station.
                </p>
                <p className="mt-4">
                  Our team consists of local Mount Abu experts who have extensive knowledge of the area, its attractions, and the best places to stay. We personally visit and vet each hotel before listing it on our platform to ensure it meets our quality standards.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h2 className="text-2xl font-display font-semibold mb-4">Our Mission</h2>
                  <p>
                    We strive to provide an easy, reliable way for travelers to discover and book the best accommodations and experiences in Mount Abu, while supporting local businesses and sustainable tourism practices.
                  </p>
                  <p className="mt-4">
                    HotelInMountAbu is committed to promoting responsible tourism that respects the natural beauty, cultural heritage, and local communities of Mount Abu.
                  </p>
                </div>
                <div>
                  <h2 className="text-2xl font-display font-semibold mb-4">Our Vision</h2>
                  <p>
                    To be the most trusted resource for travelers visiting Mount Abu, known for our curated selection of accommodations, personalized service, and commitment to sustainable tourism.
                  </p>
                  <p className="mt-4">
                    We envision a future where tourism contributes positively to the preservation of Mount Abu's natural environment and the prosperity of its local communities.
                  </p>
                </div>
              </div>
              
              <h2 className="text-2xl font-display font-semibold mb-4">What We Offer</h2>
              <ul className="space-y-4 mb-12">
                <li className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">1</div>
                  <div>
                    <strong className="text-lg">Curated Hotel Selection</strong>
                    <p className="text-muted-foreground">We personally visit and evaluate each hotel before listing it on our platform, ensuring a high-quality selection.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">2</div>
                  <div>
                    <strong className="text-lg">Local Expertise</strong>
                    <p className="text-muted-foreground">Our team of local Mount Abu experts provides insider tips and recommendations for the best experiences.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">3</div>
                  <div>
                    <strong className="text-lg">Comprehensive Services</strong>
                    <p className="text-muted-foreground">Beyond hotels, we offer car and bike rentals, adventure activities, and guided tours to enhance your Mount Abu experience.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">4</div>
                  <div>
                    <strong className="text-lg">Customer Support</strong>
                    <p className="text-muted-foreground">Our dedicated customer service team is available to assist you before, during, and after your trip to ensure a smooth experience.</p>
                  </div>
                </li>
              </ul>
              
              <h2 className="text-2xl font-display font-semibold mb-4">Meet Our Team</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                {[
                  { name: "Rajiv Sharma", position: "Founder & CEO", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" },
                  { name: "Meera Patel", position: "Operations Manager", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" },
                  { name: "Amit Singh", position: "Head of Partnerships", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" },
                ].map((member, index) => (
                  <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg">{member.name}</h3>
                      <p className="text-muted-foreground">{member.position}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AboutUs;
