
import React from "react";
import { Star } from "lucide-react";

interface Review {
  name: string;
  rating: number;
  date?: string;
  comment: string;
}

interface HotelReviewsProps {
  rating: number;
  reviewCount: number;
  reviews: Review[];
}

const HotelReviews = ({ rating, reviewCount, reviews }: HotelReviewsProps) => {
  return (
    <div>
      <h2 className="text-2xl font-display font-semibold mb-6">Guest Reviews</h2>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-primary text-white text-2xl font-bold rounded-lg h-16 w-16 flex items-center justify-center">
            {rating.toFixed(1)}
          </div>
          <div>
            <div className="font-semibold text-lg">Guest Rating</div>
            <div className="flex">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star 
                  key={idx} 
                  className={`h-5 w-5 ${idx < Math.round(rating) ? 'text-yellow-500 fill-yellow-500' : 'text-stone-300'}`} 
                />
              ))}
            </div>
            <div className="text-sm text-stone-500">Based on {reviewCount} reviews</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Cleanliness</span>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star 
                    key={idx} 
                    className={`h-4 w-4 ${idx < 4 ? 'text-yellow-500 fill-yellow-500' : 'text-stone-300'}`} 
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Comfort</span>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star 
                    key={idx} 
                    className={`h-4 w-4 ${idx < 5 ? 'text-yellow-500 fill-yellow-500' : 'text-stone-300'}`} 
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Location</span>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star 
                    key={idx} 
                    className={`h-4 w-4 ${idx < 5 ? 'text-yellow-500 fill-yellow-500' : 'text-stone-300'}`} 
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Value</span>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star 
                    key={idx} 
                    className={`h-4 w-4 ${idx < 4 ? 'text-yellow-500 fill-yellow-500' : 'text-stone-300'}`} 
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        {[
          { name: "Rahul Sharma", rating: 5, date: "June 2023", comment: "Excellent hotel with outstanding service. The rooms were spotless and very comfortable. The staff went above and beyond to make our stay memorable." },
          { name: "Priya Patel", rating: 4, date: "May 2023", comment: "Very good experience. Clean rooms, friendly staff, and great location. The breakfast was delicious with many options. Would definitely recommend." },
          ...reviews
        ].map((review: Review, index: number) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-stone-100">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-semibold">{review.name}</h3>
                <p className="text-xs text-stone-500">{review.date || "April 2023"}</p>
              </div>
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
  );
};

export default HotelReviews;
