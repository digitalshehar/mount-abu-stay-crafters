
import React from "react";
import { Star, MapPin, Coffee, Check, Award, Clock, Shield } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">About This Property</h2>
        <div 
          className="text-stone-600 leading-relaxed space-y-4"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-stone-50 p-4 rounded-lg border border-stone-100">
            <div className="flex items-center mb-3">
              <Award className="h-5 w-5 text-amber-500 mr-2" />
              <h3 className="font-medium">Hotel Category</h3>
            </div>
            <div className="flex">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star 
                  key={idx} 
                  className={`w-5 h-5 ${idx < stars ? "text-amber-500 fill-amber-500" : "text-stone-300"}`} 
                />
              ))}
            </div>
            <p className="text-sm text-stone-500 mt-2">{stars}-star hotel in {location}</p>
          </div>
          
          <div className="bg-stone-50 p-4 rounded-lg border border-stone-100">
            <div className="flex items-center mb-3">
              <Clock className="h-5 w-5 text-primary mr-2" />
              <h3 className="font-medium">Check-in & Check-out</h3>
            </div>
            <div className="space-y-2 text-stone-600 text-sm">
              <div className="flex justify-between">
                <span>Check-in:</span>
                <span className="font-medium">2:00 PM - 10:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Check-out:</span>
                <span className="font-medium">Until 12:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Reception:</span>
                <span className="font-medium">24/7</span>
              </div>
            </div>
          </div>
          
          <div className="bg-stone-50 p-4 rounded-lg border border-stone-100">
            <div className="flex items-center mb-3">
              <Shield className="h-5 w-5 text-green-600 mr-2" />
              <h3 className="font-medium">Policies</h3>
            </div>
            <div className="space-y-2 text-stone-600 text-sm">
              <div className="flex items-start">
                <Check className="h-4 w-4 text-green-600 mt-0.5 mr-1.5 flex-shrink-0" />
                <span>Free cancellation (before 48 hours)</span>
              </div>
              <div className="flex items-start">
                <Check className="h-4 w-4 text-green-600 mt-0.5 mr-1.5 flex-shrink-0" />
                <span>No smoking rooms available</span>
              </div>
              <div className="flex items-start">
                <Check className="h-4 w-4 text-green-600 mt-0.5 mr-1.5 flex-shrink-0" />
                <span>Pets not allowed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Why Choose This Hotel</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="mt-1 mr-3 bg-primary/10 rounded-full p-1.5">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Prime Location</h3>
                <p className="text-sm text-stone-600">Located in the heart of {location}, offering easy access to major attractions and scenic spots.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mt-1 mr-3 bg-primary/10 rounded-full p-1.5">
                <Coffee className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Exceptional Service</h3>
                <p className="text-sm text-stone-600">Our staff is dedicated to providing personalized service to make your stay comfortable and memorable.</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="mt-1 mr-3 bg-primary/10 rounded-full p-1.5">
                <Star className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Highly Rated</h3>
                <p className="text-sm text-stone-600">Consistently rated {rating}/5 by our guests for cleanliness, comfort, and overall experience.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mt-1 mr-3 bg-primary/10 rounded-full p-1.5">
                <Shield className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Safe & Clean</h3>
                <p className="text-sm text-stone-600">Enhanced cleaning protocols and safety measures to ensure a worry-free stay for all guests.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-primary/5 p-6 rounded-xl">
        <h3 className="font-semibold mb-3">Guest Testimonial</h3>
        <p className="text-stone-600 italic">
          "{name} exceeded our expectations in every way. The staff was incredibly attentive, 
          the rooms were spotless, and the location couldn't be more perfect. 
          We especially enjoyed the beautiful views from our room and the delicious breakfast. 
          We'll definitely be coming back on our next visit to {location}."
        </p>
        <p className="text-right mt-3 text-sm font-medium">- Recent Guest</p>
      </div>
    </div>
  );
};

export default HotelInfo;
