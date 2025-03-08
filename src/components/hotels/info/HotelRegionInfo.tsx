
import React from "react";
import { MapPin, Calendar, Info, Star, Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const HotelRegionInfo = () => {
  return (
    <div className="space-y-6 mt-10">
      <div className="bg-white p-6 rounded-lg border border-stone-200">
        <h2 className="text-xl font-semibold mb-4">Mount Abu Hotels</h2>
        <p className="text-stone-600 mb-4">
          Mount Abu is Rajasthan's only hill station, located in the Aravalli Range. Known for its
          stunning Nakki Lake and ancient Dilwara Temples, it offers a cool retreat from the desert heat.
          Visitors can enjoy boating, hiking, and panoramic views from Sunset Point.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-primary mr-2 mt-0.5" />
            <div>
              <h3 className="font-medium">Location</h3>
              <p className="text-sm text-stone-600">
                Mount Abu is located in the Sirohi district of Rajasthan, approximately 160 km from Udaipur.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Calendar className="h-5 w-5 text-primary mr-2 mt-0.5" />
            <div>
              <h3 className="font-medium">Best Time to Visit</h3>
              <p className="text-sm text-stone-600">
                October to March offers pleasant weather with temperatures ranging from 12°C to 25°C.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Star className="h-5 w-5 text-primary mr-2 mt-0.5" />
            <div>
              <h3 className="font-medium">Popular Areas</h3>
              <p className="text-sm text-stone-600">
                Nakki Lake area, Dilwara Road, Sunset Road, and Guru Shikhar vicinity.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg border border-stone-200">
        <h2 className="text-xl font-semibold mb-4">Hotel Types in Mount Abu</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="border border-stone-200 rounded-lg p-4 hover:bg-stone-50 transition-colors">
            <h3 className="font-medium mb-2">Luxury Hotels</h3>
            <p className="text-sm text-stone-600">
              5-star properties with premium amenities, often with lake or mountain views.
            </p>
          </div>
          
          <div className="border border-stone-200 rounded-lg p-4 hover:bg-stone-50 transition-colors">
            <h3 className="font-medium mb-2">Mid-Range Hotels</h3>
            <p className="text-sm text-stone-600">
              Comfortable 3-4 star accommodations with good facilities and services.
            </p>
          </div>
          
          <div className="border border-stone-200 rounded-lg p-4 hover:bg-stone-50 transition-colors">
            <h3 className="font-medium mb-2">Budget Options</h3>
            <p className="text-sm text-stone-600">
              Affordable guesthouses and hotels with basic amenities for budget travelers.
            </p>
          </div>
          
          <div className="border border-stone-200 rounded-lg p-4 hover:bg-stone-50 transition-colors">
            <h3 className="font-medium mb-2">Heritage Properties</h3>
            <p className="text-sm text-stone-600">
              Historic buildings and palaces converted into luxury hotels with royal ambiance.
            </p>
          </div>
          
          <div className="border border-stone-200 rounded-lg p-4 hover:bg-stone-50 transition-colors">
            <h3 className="font-medium mb-2">Lakeside Resorts</h3>
            <p className="text-sm text-stone-600">
              Properties situated around Nakki Lake offering scenic views and water activities.
            </p>
          </div>
          
          <div className="border border-stone-200 rounded-lg p-4 hover:bg-stone-50 transition-colors">
            <h3 className="font-medium mb-2">Family Resorts</h3>
            <p className="text-sm text-stone-600">
              Kid-friendly accommodations with activities and facilities for all ages.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg border border-stone-200">
        <div className="flex items-start">
          <Info className="h-5 w-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-lg mb-2">Travel Tips for Mount Abu</h3>
            <ul className="space-y-2 text-sm text-stone-600">
              <li>• The high season runs from October to March with peak rates.</li>
              <li>• Most hotels are within walking distance of Nakki Lake and other attractions.</li>
              <li>• Advance booking is recommended during weekends and holidays.</li>
              <li>• Some heritage hotels may not have elevators, so check accessibility if needed.</li>
              <li>• Hotels in Mount Abu often organize sightseeing tours to nearby attractions.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelRegionInfo;
