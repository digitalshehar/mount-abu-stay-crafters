
import React, { useState } from "react";
import { Star, ThumbsUp, Filter, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import UserReviewForm from "./reviews/UserReviewForm";

interface Review {
  id?: string | number;
  name: string;
  rating: number;
  date?: string;
  comment: string;
  travelType?: string;
  helpful?: number;
}

interface HotelReviewSummary {
  cleanliness: number;
  comfort: number;
  location: number;
  value: number;
  service: number;
}

interface HotelReviewsProps {
  rating: number;
  reviewCount: number;
  reviews: Review[];
  summary?: HotelReviewSummary;
}

const HotelReviews = ({ 
  rating, 
  reviewCount, 
  reviews, 
  summary = {
    cleanliness: 4.2,
    comfort: 4.5,
    location: 4.8,
    value: 4.0,
    service: 4.3
  }
}: HotelReviewsProps) => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
  const [helpfulReviews, setHelpfulReviews] = useState<Record<string, boolean>>({});
  
  // Filter reviews based on the active tab
  const filteredReviews = activeTab === "all" 
    ? reviews 
    : reviews.filter(review => {
        const reviewRating = Math.round(review.rating);
        if (activeTab === "positive") return reviewRating >= 4;
        if (activeTab === "negative") return reviewRating <= 2;
        if (activeTab === "neutral") return reviewRating === 3;
        return true;
      });
      
  // Calculate rating counts for the chart
  const ratingCounts = {
    5: reviews.filter(r => Math.round(r.rating) === 5).length,
    4: reviews.filter(r => Math.round(r.rating) === 4).length,
    3: reviews.filter(r => Math.round(r.rating) === 3).length,
    2: reviews.filter(r => Math.round(r.rating) === 2).length,
    1: reviews.filter(r => Math.round(r.rating) === 1).length,
  };
  
  // Calculate percentages for the chart
  const ratingPercentages = Object.entries(ratingCounts).reduce((acc, [rating, count]) => {
    acc[rating] = reviewCount > 0 ? (count / reviewCount) * 100 : 0;
    return acc;
  }, {} as Record<string, number>);
  
  // Handle marking a review as helpful
  const handleMarkHelpful = (reviewId: string | number) => {
    setHelpfulReviews(prev => ({
      ...prev,
      [reviewId.toString()]: true
    }));
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-6">
        <h2 className="text-2xl font-display font-semibold">Guest Reviews</h2>
        <Button 
          onClick={() => setShowReviewForm(!showReviewForm)}
          variant="outline"
          className="mt-3 md:mt-0"
        >
          {showReviewForm ? "Cancel" : "Write a Review"}
        </Button>
      </div>
      
      {showReviewForm && (
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-stone-100">
          <UserReviewForm onCancel={() => setShowReviewForm(false)} />
        </div>
      )}
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Overall Rating */}
          <div className="flex items-center gap-4">
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
          
          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map(stars => (
              <div key={stars} className="flex items-center gap-2">
                <div className="w-8 text-sm text-stone-600">{stars} ★</div>
                <Progress value={ratingPercentages[stars]} className="h-2" />
                <div className="w-12 text-xs text-stone-500">{ratingPercentages[stars].toFixed(0)}%</div>
              </div>
            ))}
          </div>
          
          {/* Detailed Ratings */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Cleanliness</span>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star 
                    key={idx} 
                    className={`h-4 w-4 ${idx < Math.round(summary.cleanliness) ? 'text-yellow-500 fill-yellow-500' : 'text-stone-300'}`} 
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
                    className={`h-4 w-4 ${idx < Math.round(summary.comfort) ? 'text-yellow-500 fill-yellow-500' : 'text-stone-300'}`} 
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Location</span>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star 
                    key={idx} 
                    className={`h-4 w-4 ${idx < Math.round(summary.location) ? 'text-yellow-500 fill-yellow-500' : 'text-stone-300'}`} 
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
                    className={`h-4 w-4 ${idx < Math.round(summary.value) ? 'text-yellow-500 fill-yellow-500' : 'text-stone-300'}`} 
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Service</span>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star 
                    key={idx} 
                    className={`h-4 w-4 ${idx < Math.round(summary.service) ? 'text-yellow-500 fill-yellow-500' : 'text-stone-300'}`} 
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Review Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center">
          <Filter className="h-4 w-4 mr-2 text-stone-500" />
          <span className="text-sm font-medium">Filter reviews:</span>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="positive">Positive</TabsTrigger>
            <TabsTrigger value="neutral">Neutral</TabsTrigger>
            <TabsTrigger value="negative">Negative</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Reviews List */}
      {filteredReviews.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100 text-center">
          <p className="text-stone-500">No reviews match your filter criteria.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredReviews.map((review, index) => {
            const reviewId = review.id || `review-${index}`;
            const isHelpful = helpfulReviews[reviewId.toString()];
            
            return (
              <div key={reviewId} className="bg-white p-6 rounded-lg shadow-sm border border-stone-100">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold">{review.name}</h3>
                    <p className="text-xs text-stone-500">{review.date || "April 2023"}</p>
                    {review.travelType && (
                      <Badge variant="outline" className="mt-1 text-xs bg-blue-50 text-blue-600 border-blue-100">
                        {review.travelType}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center bg-primary/5 px-2 py-1 rounded">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span>{review.rating}/5</span>
                  </div>
                </div>
                <p className="text-stone-600 mb-4">{review.comment}</p>
                <div className="flex justify-end">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleMarkHelpful(reviewId)}
                    disabled={isHelpful}
                    className={`h-8 text-xs flex items-center ${isHelpful ? 'text-green-600' : 'text-stone-500 hover:text-blue-600'}`}
                  >
                    <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                    {isHelpful ? "Marked as helpful" : "Helpful"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HotelReviews;
