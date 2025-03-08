
import React from "react";
import { Star, MapPin, Coffee, Check } from "lucide-react";

interface HotelInfoProps {
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  stars: number;
  description: string;
}

const HotelInfo = ({ name, location, rating, reviewCount, stars, description }: HotelInfoProps) => {
  return (
    <div className="relative">
      {/* Hotel status badge */}
      <div className="absolute -top-6 right-0">
        <div className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium shadow-md">
          Recommended
        </div>
      </div>
      
      {/* Location and ratings */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center bg-stone-100 px-3 py-1.5 rounded-full">
          <MapPin className="w-4 h-4 text-primary mr-1.5" />
          <span className="text-stone-700 font-medium">{location}</span>
        </div>
        
        <div className="flex items-center bg-amber-50 px-3 py-1.5 rounded-full">
          <Star className="w-4 h-4 text-amber-500 fill-amber-500 mr-1.5" />
          <span className="font-medium text-stone-700">{rating}</span>
          <span className="text-sm text-stone-500 ml-1">({reviewCount} reviews)</span>
        </div>
        
        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, idx) => (
            <Star 
              key={idx} 
              className={`w-4 h-4 ${idx < stars ? "text-amber-500 fill-amber-500" : "text-stone-300"}`} 
            />
          ))}
        </div>
      </div>
      
      {/* Hotel information */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-display font-semibold mb-4 border-b pb-2">About {name}</h2>
          <div 
            className="text-stone-600 leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
        
        <div className="bg-stone-50 p-6 rounded-xl border border-stone-100">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Coffee className="w-5 h-5 mr-2 text-primary" />
            Why Choose Us
          </h3>
          
          <div className="grid md:grid-cols-2 gap-3">
            {[
              "Complimentary breakfast buffet",
              "Free high-speed WiFi",
              "24/7 concierge service",
              "Daily housekeeping",
              "Prime location near attractions",
              "Special discounts for longer stays"
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start">
                <div className="mt-1 mr-2 bg-primary/10 rounded-full p-1">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-stone-700 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-5 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl">
          <p className="text-stone-600 italic font-light text-sm">
            "{name} is located in the heart of {location}, offering a perfect blend of luxury and comfort. 
            With stunning views and easy access to major attractions, 
            our hotel is the ideal choice for both leisure and business travelers. 
            We pride ourselves on exceptional service and attention to detail, 
            ensuring a memorable stay for all our guests."
          </p>
        </div>
      </div>
    </div>
  );
};

export default HotelInfo;
