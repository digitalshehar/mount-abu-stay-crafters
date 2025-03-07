
import React from "react";
import { Award, MapPin, Users } from "lucide-react";

const HotelFeatures = () => {
  return (
    <div>
      <h2 className="text-2xl font-display font-semibold mb-6">Why Choose Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100 text-center">
          <Award className="h-10 w-10 mx-auto mb-4 text-primary" />
          <h3 className="font-semibold mb-2">Top-Rated Hotel</h3>
          <p className="text-stone-600 text-sm">Consistently rated among the best hotels in Mount Abu</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100 text-center">
          <MapPin className="h-10 w-10 mx-auto mb-4 text-primary" />
          <h3 className="font-semibold mb-2">Prime Location</h3>
          <p className="text-stone-600 text-sm">Conveniently located near all major attractions</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100 text-center">
          <Users className="h-10 w-10 mx-auto mb-4 text-primary" />
          <h3 className="font-semibold mb-2">Exceptional Service</h3>
          <p className="text-stone-600 text-sm">Our dedicated staff provides personalized attention</p>
        </div>
      </div>
    </div>
  );
};

export default HotelFeatures;
