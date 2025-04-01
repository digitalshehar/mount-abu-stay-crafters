
import React, { useState } from "react";
import { Star, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

const HotelReviews = ({ rating = 0, reviewCount = 0, reviews = [] }: HotelReviewsProps) => {
  const [sortBy, setSortBy] = useState<string>("newest");
  const [filterRating, setFilterRating] = useState<string>("all");
  
  // Ensure reviews is always an array
  const safeReviews = Array.isArray(reviews) ? reviews : [];
  
  // Add some default reviews if none are provided
  const displayReviews = safeReviews.length > 0 ? safeReviews : [
    { name: "Rahul Sharma", rating: 5, date: "June 2023", comment: "Excellent hotel with outstanding service. The rooms were spotless and very comfortable. The staff went above and beyond to make our stay memorable." },
    { name: "Priya Patel", rating: 4, date: "May 2023", comment: "Very good experience. Clean rooms, friendly staff, and great location. The breakfast was delicious with many options. Would definitely recommend." }
  ];
  
  // Filter and sort reviews
  const filteredReviews = displayReviews.filter(review => 
    filterRating === "all" || Math.round(review.rating) === parseInt(filterRating)
  );
  
  // Sort reviews
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.date || "").getTime() - new Date(a.date || "").getTime();
    } else if (sortBy === "highest") {
      return b.rating - a.rating;
    } else if (sortBy === "lowest") {
      return a.rating - b.rating;
    }
    return 0;
  });

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
      
      {/* Filters and Sort */}
      <div className="flex justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-stone-500" />
          <span className="text-sm font-medium">Filter by rating:</span>
          <Select value={filterRating} onValueChange={setFilterRating}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="All Ratings" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="5">5 Stars</SelectItem>
              <SelectItem value="4">4 Stars</SelectItem>
              <SelectItem value="3">3 Stars</SelectItem>
              <SelectItem value="2">2 Stars</SelectItem>
              <SelectItem value="1">1 Star</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Newest First" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="highest">Highest Rating</SelectItem>
              <SelectItem value="lowest">Lowest Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews.length > 0 ? (
          sortedReviews.map((review: Review, index: number) => (
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
          ))
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100 text-center">
            <p className="text-stone-500">No reviews match your current filters.</p>
          </div>
        )}
      </div>
      
      {/* Write a review button */}
      <div className="mt-8 text-center">
        <Button className="px-8">
          Write a Review
        </Button>
      </div>
    </div>
  );
};

export default HotelReviews;
