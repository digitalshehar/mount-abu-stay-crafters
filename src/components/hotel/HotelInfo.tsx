
import React from "react";
import { Star, MapPin, Coffee, Check, Award, Clock, Shield } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import HotelTestimonial from "./info/HotelTestimonial";
import HotelCategory from "./info/HotelCategory";
import HotelCheckInInfo from "./info/HotelCheckInInfo";
import HotelPolicyItems from "./info/HotelPolicyItems";
import HotelFeatureItem from "./info/HotelFeatureItem";

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
          <HotelCategory stars={stars} location={location} />
          <HotelCheckInInfo />
          <HotelPolicyItems />
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Why Choose This Hotel</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <HotelFeatureItem 
              icon={<MapPin className="w-4 h-4 text-primary" />}
              title="Prime Location"
              description={`Located in the heart of ${location}, offering easy access to major attractions and scenic spots.`}
            />
            
            <HotelFeatureItem 
              icon={<Coffee className="w-4 h-4 text-primary" />}
              title="Exceptional Service"
              description="Our staff is dedicated to providing personalized service to make your stay comfortable and memorable."
            />
          </div>
          
          <div className="space-y-3">
            <HotelFeatureItem 
              icon={<Star className="w-4 h-4 text-primary" />}
              title="Highly Rated"
              description={`Consistently rated ${rating}/5 by our guests for cleanliness, comfort, and overall experience.`}
            />
            
            <HotelFeatureItem 
              icon={<Shield className="w-4 h-4 text-primary" />}
              title="Safe & Clean"
              description="Enhanced cleaning protocols and safety measures to ensure a worry-free stay for all guests."
            />
          </div>
        </div>
      </div>
      
      <HotelTestimonial name={name} location={location} />
    </div>
  );
};

export default HotelInfo;
